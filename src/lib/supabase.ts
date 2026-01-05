import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };

// Define TypeScript interfaces for our database tables
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  model: string;
  color: string;
  price: number;
  deposit_paid?: number;
  final_payment_amount?: number;
  deposit_transaction_id?: string;
  final_payment_transaction_id?: string;
  shipping_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  special_instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  model: string;
  color: string;
  total_allocation: number;
  available_count: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  payment_method: string;
  transaction_id?: string;
  amount: number;
  status: string;
  currency: string;
  payment_data?: any; // Can store additional payment-specific data
  created_at: string;
  updated_at: string;
}

// Database operations
export const database = {
  // User operations
  users: {
    create: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) throw error;
      return data as User;
    },
    
    getByEmail: async (email: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) throw error;
      return data as User | null;
    },
    
    update: async (id: string, userData: Partial<User>) => {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as User;
    }
  },
  
  // Order operations
  orders: {
    create: async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_number'>) => {
      // Generate a unique order number
      const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const { data, error } = await supabase
        .from('orders')
        .insert([{ ...orderData, order_number: orderNumber }])
        .select()
        .single();
      
      if (error) throw error;
      return data as Order;
    },
    
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    
    update: async (id: string, orderData: Partial<Order>) => {
      const { data, error } = await supabase
        .from('orders')
        .update(orderData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Order;
    },
    
    getByOrderNumber: async (orderNumber: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();
      
      if (error) throw error;
      return data as Order;
    }
  },
  
  // Inventory operations
  inventory: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('model')
        .order('color');
      
      if (error) throw error;
      return data as Inventory[];
    },
    
    getByModelAndColor: async (model: string, color: string) => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('model', model)
        .eq('color', color)
        .single();
      
      if (error) throw error;
      return data as Inventory;
    },
    
    updateStock: async (id: string, newAvailableCount: number) => {
      const { data, error } = await supabase
        .from('inventory')
        .update({ available_count: newAvailableCount })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Inventory;
    }
  },
  
  // Payment operations
  payments: {
    create: async (paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('payments')
        .insert([paymentData])
        .select()
        .single();
      
      if (error) throw error;
      return data as Payment;
    },
    
    getByOrderId: async (orderId: string) => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('order_id', orderId);
      
      if (error) throw error;
      return data as Payment[];
    },
    
    updateStatus: async (id: string, status: string) => {
      const { data, error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Payment;
    }
  }
};