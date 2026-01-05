// USDT支付验证API - 适用于Vite项目的实现

interface USDTVerificationRequest {
  transactionId: string;
  toAddress: string;
  expectedAmount: number;
  token?: string; // 默认为 'USDT'
}

interface USDTVerificationResponse {
  success: boolean;
  verified: boolean;
  amount?: number;
  confirmations?: number;
  error?: string;
}

/**
 * 验证USDT TRC20支付
 * 通过Supabase边缘函数验证交易
 */
export async function verifyUSDTTransaction(verificationData: USDTVerificationRequest): Promise<USDTVerificationResponse> {
  try {
    // 调用 Supabase 边缘函数进行USDT交易验证
    // 注意：需要将 YOUR-PROJECT-ID 替换为您的实际 Supabase 项目 ID
    const SUPABASE_PROJECT_URL = `https://rfnrosyfeivcbkimjlwo.supabase.co/functions/v1/verify-usdt-payment`;
    
    const response = await fetch(SUPABASE_PROJECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 如果需要认证，可以添加：
        // 'Authorization': `Bearer ${supabaseAuth}`,
      },
      body: JSON.stringify(verificationData),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify USDT transaction: ${response.statusText}`);
    }

    const verificationResponse = await response.json();
    return verificationResponse;
  } catch (error) {
    console.error('Error verifying USDT transaction:', error);
    throw error;
  }
}

// 如果你需要在开发环境中模拟API响应，可以使用以下代码
export async function mockVerifyUSDTTransaction(verificationData: USDTVerificationRequest): Promise<USDTVerificationResponse> {
  // 模拟API响应 - 仅用于开发和测试
  return {
    success: true,
    verified: true,
    amount: verificationData.expectedAmount,
    confirmations: 25,
  };
}