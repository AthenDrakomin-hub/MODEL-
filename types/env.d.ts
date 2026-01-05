// 全局环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID?: string;
  readonly VITE_USDT_WALLET_ADDR?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly PAYPAL_CLIENT_ID?: string;
  readonly USDT_WALLET_ADDR?: string;
  // 在此处添加其他环境变量类型
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}