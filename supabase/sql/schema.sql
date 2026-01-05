-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'Reservation Confirmed',
  model VARCHAR(100) NOT NULL,
  color VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  deposit_paid DECIMAL(10,2),
  final_payment_amount DECIMAL(10,2),
  deposit_transaction_id VARCHAR(255),
  final_payment_transaction_id VARCHAR(255),
  shipping_address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100),
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建库存表
CREATE TABLE IF NOT EXISTS inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model VARCHAR(100) NOT NULL,
  color VARCHAR(50) NOT NULL,
  total_allocation INTEGER DEFAULT 0,
  available_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建支付记录表
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  currency VARCHAR(10) DEFAULT 'USD',
  payment_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_inventory_model_color ON inventory(model, color);

-- 创建触发器函数来自动更新时间戳
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为所有表创建更新时间戳的触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入初始库存数据
INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Standard', 'Pearl White', 40000, 40000)
ON CONFLICT DO NOTHING;

INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Genesis', 'Flame Red', 11000, 11000)
ON CONFLICT DO NOTHING;

INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Genesis', 'Forest Green', 11000, 11000)
ON CONFLICT DO NOTHING;

INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Genesis', 'Starry Purple', 11000, 11000)
ON CONFLICT DO NOTHING;

INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Genesis', 'Flame Orange', 11000, 11000)
ON CONFLICT DO NOTHING;

INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Genesis', 'Deep Sea Blue', 11000, 11000)
ON CONFLICT DO NOTHING;

INSERT INTO inventory (model, color, total_allocation, available_count) VALUES
('Model π Ultra', 'Black-Silver', 5000, 5000)
ON CONFLICT DO NOTHING;