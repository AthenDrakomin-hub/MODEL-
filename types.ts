
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