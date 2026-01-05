// Supabase Edge Function: Verify USDT TRC20 Payment
/// <reference path="../_utils.ts" />

// TRON API endpoint for checking transactions
const TRON_API_URL = 'https://api.trongrid.io';

interface USDTVerificationRequest {
  transactionId: string;
  toAddress: string;
  expectedAmount: number;
  token: string; // Should be 'USDT'
}

interface USDTVerificationResponse {
  success: boolean;
  verified: boolean;
  amount?: number;
  confirmations?: number;
  error?: string;
}

async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { transactionId, toAddress, expectedAmount }: USDTVerificationRequest = await req.json();

    if (!transactionId || !toAddress || expectedAmount === undefined) {
      return new Response(
        JSON.stringify({ error: 'Transaction ID, to address, and expected amount are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Query TRON blockchain for the transaction
    const response = await fetch(`${TRON_API_URL}/v1/transactions/${transactionId}`);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          verified: false, 
          error: `TRON API error: ${response.status}` 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const txData = await response.json();
    
    if (!txData.data || txData.data.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          verified: false, 
          error: 'Transaction not found on TRON blockchain' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transaction = txData.data[0];
    
    // Check if it's a TRC20 token transfer
    if (transaction.raw_data.contract[0].type !== 'TriggerSmartContract') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          verified: false, 
          error: 'Not a token transfer transaction' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract contract details
    const contract = transaction.raw_data.contract[0].parameter.value;
    
    // Verify the recipient address matches
    if (contract.to !== toAddress.replace('0x', '').toLowerCase()) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          verified: false, 
          error: 'Transaction recipient does not match expected address' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // The amount is stored in a different format (scaled by 10^6 for USDT)
    const amount = parseInt(contract.data, 16) / 1000000; // Convert from Sun to USDT
    
    // Verify amount matches expected amount (with small tolerance for decimals)
    if (Math.abs(amount - expectedAmount) > 0.01) { // Allow 0.01 tolerance
      return new Response(
        JSON.stringify({ 
          success: true, 
          verified: false, 
          amount: amount,
          error: `Amount mismatch. Expected: ${expectedAmount}, Found: ${amount}` 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check transaction status
    const receiptResponse = await fetch(`${TRON_API_URL}/v1/transactions/${transactionId}/receipt`);
    const receiptData = await receiptResponse.json();
    
    const confirmations = receiptData.data ? receiptData.data.length : 0;

    return new Response(
      JSON.stringify({ 
        success: true, 
        verified: true, 
        amount: amount,
        confirmations: confirmations
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('USDT verification error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        verified: false, 
        error: error.message || 'Failed to verify USDT payment' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

Deno.serve(handler);