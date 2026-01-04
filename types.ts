
export interface Product {
  id: string;
  model: string;
  color: string;
  colorHex: string;
  price: number;
  deposit: number;
  stock: number;
  totalAllocation: number;
  percentage: string;
  description: string;
  features: string[];
  imageUrl: string;
  logistics: string;
  isLimited: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalDeposit: number;
  finalPaymentAmount?: number;
  status: 'Reservation Confirmed' | 'Awaiting Final Payment' | 'In Production' | 'Satellite Syncing' | 'Logistics Prep' | 'Shipped';
}

export interface InventoryStats {
  model: string;
  color: string;
  allocation: number;
  totalPrice: number;
}

// PayPal集成相关类型定义
// 注意：在Vite前端项目中，PayPal API调用必须通过后端服务进行
// 以保护敏感凭据，以下类型用于前后端通信

export interface PayPalOrderRequest {
  amount: string;
  currency: string;
  description?: string;
}

export interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalOrderDetails {
  orderId: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
  }>;
}