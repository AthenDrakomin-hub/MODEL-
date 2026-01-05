import React, { useState, useEffect } from 'react';
import { database, Order } from '../src/lib/supabase';

interface OrderHistoryProps {
  userEmail: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userEmail }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // 在实际应用中，您需要通过用户认证来获取用户ID
        // 这里我们使用一个模拟的用户ID
        console.log('Fetching orders for user:', userEmail);
        
        // 暂时返回空数组，因为我们需要一个真实的方法来获取用户ID
        setOrders([]);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Order History</h2>
      
      {orders.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
          <p className="text-gray-500 mt-2">Your orders will appear here after you complete a purchase.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Order #{order.order_number}</h3>
                  <p className="text-gray-600">{order.model} - {order.color}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.price.toFixed(2)}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Reservation Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Awaiting Final Payment'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'In Production'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Deposit Paid</p>
                  <p className="font-medium">${order.deposit_paid?.toFixed(2) || '0.00'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Final Amount</p>
                  <p className="font-medium">${order.final_payment_amount?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;