// Supabase Edge Function: PayPal Order Creation
/// <reference path="./_utils.ts" />

// For Supabase Edge Functions, we need to use the built-in crypto and base64 utilities
function base64Encode(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const binString = Array.from(data, (byte) =>
    String.fromCodePoint(byte)
  ).join('');
  return btoa(binString);
}

const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID');
const PAYPAL_CLIENT_SECRET = Deno.env.get('PAYPAL_CLIENT_SECRET');
const PAYPAL_API_URL = 'https://api.sandbox.paypal.com'; // Change to https://api.paypal.com for production

interface PayPalOrderRequest {
  amount: string;
  currency: string;
  description?: string;
}

interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

async function getPayPalAccessToken(): Promise<string> {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured');
  }

  const credentials = `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`;
  const encodedCredentials = base64Encode(credentials);

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedCredentials}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('PayPal token error:', data);
    throw new Error(data.message || 'Failed to get PayPal access token');
  }

  return data.access_token;
}

async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { amount, currency, description }: PayPalOrderRequest = await req.json();

    if (!amount || !currency) {
      return new Response(
        JSON.stringify({ error: 'Amount and currency are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'PayPal-Request-Id': `req-${Date.now()}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: description,
        }],
      }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error('PayPal API Error:', orderData);
      return new Response(
        JSON.stringify({ error: orderData.message || 'Failed to create PayPal order' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(orderData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('PayPal order creation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create PayPal order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

Deno.serve(handler);