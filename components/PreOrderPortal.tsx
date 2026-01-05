
import React, { useState } from 'react';
import { X, Lock, CheckCircle2, CreditCard, ShoppingBag, Truck, Coins, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import CheckoutForm from './CheckoutForm';
import ImageWithFallback from './ImageWithFallback';
import { database } from '../lib/supabase';

interface PreOrderPortalProps {
  cart: CartItem[];
  onClearCart: () => void;
  onClose: () => void;
  onShowLegal?: () => void;
}

type CheckoutStep = 'review' | 'form' | 'payment' | 'done';
type PaymentMethod = 'card' | 'paypal' | 'usdt' | null;
type CryptoNetwork = 'ERC20' | 'TRC20' | null;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  specialInstructions?: string;
}

const PreOrderPortal: React.FC<PreOrderPortalProps> = ({ cart, onClearCart, onClose, onShowLegal }) => {
  const [step, setStep] = useState<CheckoutStep>('review');
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [cryptoNetwork, setCryptoNetwork] = useState<CryptoNetwork>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  // 使用Vercel环境变量进行真实支付配置
  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || import.meta.env.PAYPAL_CLIENT_ID || 'CONFIG_REQUIRED';
  const USDT_WALLET_ADDR = import.meta.env.VITE_USDT_WALLET_ADDR || import.meta.env.USDT_WALLET_ADDR || 'ADDRESS_NOT_SET';

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  // 预售模式：定金为商品价格的30%
  const deposit = cart.reduce((sum, item) => sum + (item.price * 0.3), 0);
  const finalPaymentAmount = cart.reduce((sum, item) => sum + (item.price * 0.7), 0);

  const handleFinalize = async () => {
    // 预售模式：用户支付30%定金完成预订
    if (paymentMethod === 'paypal') {
      await handlePayPalPayment();
    } else if (paymentMethod === 'usdt') {
      await handleUSDTVerification();
    } else {
      // 对于信用卡或其他支付方式，处理定金支付
      try {
        // 创建订单记录到数据库
        if (formData && cart.length > 0) {
          const orderData = {
            user_id: 'temp-user-id', // 在实际应用中，这里应该是实际的用户ID
            status: 'Reservation Confirmed',
            model: cart[0].model,
            color: cart[0].color,
            price: total,
            deposit_paid: deposit,
            final_payment_amount: finalPaymentAmount,
            shipping_address: formData.shippingAddress,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            country: formData.country,
            special_instructions: formData.specialInstructions
          };

          const order = await database.orders.create(orderData);
          setOrderId(order.order_number);
        }
        
        setStep('done');
        onClearCart();
      } catch (error) {
        console.error('Error creating order:', error);
        alert('There was an error processing your order. Please try again.');
      }
    }
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setStep('payment');
  };

  const handlePayPalPayment = async () => {
    if (!PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID === 'CONFIG_REQUIRED') {
      alert('PayPal is not configured. Please set PAYPAL_CLIENT_ID in environment variables.');
      return;
    }

    // 预售模式：处理30%定金的PayPal支付
    alert('PayPal payment will be processed through secure PayPal gateway. In production, this would redirect to PayPal for authentication and payment processing.\n\nPayPal Client ID configured: ' + (PAYPAL_CLIENT_ID && PAYPAL_CLIENT_ID !== 'CONFIG_REQUIRED')); 
    
    try {
      // 模拟支付成功 - 在实际应用中，这将在PayPal成功回调后处理
      const transactionId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // 创建订单记录到数据库
      if (formData && cart.length > 0) {
        const orderData = {
          user_id: 'temp-user-id', // 在实际应用中，这里应该是实际的用户ID
          status: 'Reservation Confirmed',
          model: cart[0].model,
          color: cart[0].color,
          price: total,
          deposit_paid: deposit,
          final_payment_amount: finalPaymentAmount,
          deposit_transaction_id: transactionId,
          shipping_address: formData.shippingAddress,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
          special_instructions: formData.specialInstructions
        };

        const order = await database.orders.create(orderData);
        setOrderId(order.order_number);
        
        // 创建支付记录
        await database.payments.create({
          order_id: order.id,
          payment_method: 'paypal',
          transaction_id: transactionId,
          amount: deposit,
          status: 'completed',
          currency: 'USD'
        });
      }
      
      setStep('done');
      onClearCart();
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      alert('There was an error processing your PayPal payment. Please try again.');
    }
  };

  const handleUSDTVerification = async () => {
    if (!USDT_WALLET_ADDR || USDT_WALLET_ADDR === 'ADDRESS_NOT_SET') {
      alert('USDT wallet address is not configured. Please set USDT_WALLET_ADDR in environment variables.');
      return;
    }

    if (!cryptoNetwork) {
      alert('Please select a crypto network (ERC20 or TRC20).');
      return;
    }
    
    // 提示用户输入交易ID
    const transactionId = prompt(`USDT payment initiated. Please send exactly ${deposit.toFixed(2)} USDT to the following address via ${cryptoNetwork} network:

${USDT_WALLET_ADDR}

After sending, please enter your transaction ID for verification:`);
    
    if (!transactionId) {
      alert('Transaction ID is required for payment verification.');
      return;
    }
    
    try {
      // 调用 Supabase 边缘函数验证USDT交易
      // 注意：需要将 YOUR-PROJECT-ID 替换为您的实际 Supabase 项目 ID
      const SUPABASE_PROJECT_URL = `https://rfnrosyfeivcbkimjlwo.supabase.co/functions/v1/verify-usdt-payment`;
      
      const response = await fetch(SUPABASE_PROJECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
          toAddress: USDT_WALLET_ADDR,
          expectedAmount: deposit,
        }),
      });
      
      const result = await response.json();
      
      if (result.success && result.verified) {
        alert(`Payment verified successfully! Transaction ID: ${transactionId}`);
        
        // 创建订单记录到数据库
        if (formData && cart.length > 0) {
          const orderData = {
            user_id: 'temp-user-id', // 在实际应用中，这里应该是实际的用户ID
            status: 'Reservation Confirmed',
            model: cart[0].model,
            color: cart[0].color,
            price: total,
            deposit_paid: deposit,
            final_payment_amount: finalPaymentAmount,
            deposit_transaction_id: transactionId,
            shipping_address: formData.shippingAddress,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            country: formData.country,
            special_instructions: formData.specialInstructions
          };

          const order = await database.orders.create(orderData);
          setOrderId(order.order_number);
          
          // 创建支付记录
          await database.payments.create({
            order_id: order.id,
            payment_method: 'usdt',
            transaction_id: transactionId,
            amount: deposit,
            status: 'completed',
            currency: 'USDT'
          });
        }
        
        setStep('done');
        onClearCart();
      } else {
        alert(`Payment verification failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('USDT verification error:', error);
      alert('Payment verification failed. Please try again or contact support.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-300 overflow-y-auto">
      <header className="h-14 border-b border-gray-200 flex items-center justify-center sticky top-0 bg-white z-10 px-6">
        <div className="max-w-[1000px] w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {(step === 'payment' || step === 'form') && (
               <button onClick={() => setStep('review')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ArrowLeft className="w-4 h-4" />
               </button>
            )}
            <span className="text-xl font-bold tracking-tight">Model π Checkout</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1000px] mx-auto w-full px-6 py-12">
        {step === 'review' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-bold tracking-tight italic">Review your bag.</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-8">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-8 border-b border-gray-100 pb-8">
                    <ImageWithFallback 
                      src={item.imageUrl} 
                      alt={item.model} 
                      className="w-32 h-32 object-contain" 
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{item.model} — {item.color}</h3>
                        <p className="text-lg font-bold">${item.price}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Global Shipping: 2-3 weeks</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
                  <Truck className="w-6 h-6 text-gray-400" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold">Global Logistics</p>
                    <p className="text-gray-500">Inventory is reserved for 30 minutes. Order completion triggers production allocation.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-gray-50 p-8 rounded-3xl space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Order Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-4 border-t border-gray-200">
                    <span>30% Deposit Due Now</span>
                    <span className="text-blue-600">${deposit.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-gray-500">70% Final Payment</span>
                    <span className="text-gray-500">${finalPaymentAmount.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('form')}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                  Continue to Delivery Info
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'form' && (
          <CheckoutForm 
            onSubmit={handleFormSubmit}
            onBack={() => setStep('review')}
          />
        )}

        {step === 'payment' && (
          <div className="max-w-md mx-auto space-y-10 animate-in slide-in-from-right-4">
             <div className="text-center space-y-2">
               <h2 className="text-3xl font-bold tracking-tight italic">Secure Payment</h2>
               <p className="text-gray-500 text-sm">Choose your preferred gateway.</p>
             </div>

             <div className="space-y-4">
               <button 
                 onClick={() => setPaymentMethod('paypal')}
                 className={`w-full p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-100'}`}
               >
                 <div className="flex items-center gap-4">
                   <div className="w-6 h-6 bg-[#003087] rounded text-white flex items-center justify-center text-xs font-bold">P</div>
                   <span className="font-bold">PayPal</span>
                 </div>
                 {paymentMethod === 'paypal' && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
               </button>

               <div className="space-y-3">
                 <button 
                   onClick={() => setPaymentMethod('usdt')}
                   className={`w-full p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${paymentMethod === 'usdt' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-100'}`}
                 >
                   <div className="flex items-center gap-4">
                     <Coins className="w-6 h-6 text-green-600" />
                     <span className="font-bold">USDT (Tether)</span>
                   </div>
                   {paymentMethod === 'usdt' && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
                 </button>

                 {paymentMethod === 'usdt' && (
                    <div className="p-6 bg-gray-50 rounded-2xl space-y-4 animate-in slide-in-from-top-2">
                       <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => setCryptoNetwork('ERC20')} className={`py-2 rounded-lg text-[10px] font-bold ${cryptoNetwork === 'ERC20' ? 'bg-black text-white' : 'bg-white border'}`}>ERC20</button>
                          <button onClick={() => setCryptoNetwork('TRC20')} className={`py-2 rounded-lg text-[10px] font-bold ${cryptoNetwork === 'TRC20' ? 'bg-black text-white' : 'bg-white border'}`}>TRC20</button>
                       </div>
                       {cryptoNetwork && (
                         <div className="space-y-2">
                           <p className="text-[10px] font-bold text-gray-400 uppercase">Deposit Address:</p>
                           <p className="text-[11px] font-mono break-all bg-white p-3 rounded-lg border">{USDT_WALLET_ADDR}</p>
                           <p className="text-[10px] text-gray-500">Send exactly ${deposit.toFixed(2)} USDT to this address</p>
                         </div>
                       )}
                       <div className="pt-2 space-y-2">
                         <p className="text-[10px] font-bold text-gray-400 uppercase">Payment Verification</p>
                         <button 
                           onClick={() => {
                             // In a real application, this would trigger blockchain verification
                             alert('Payment verification will check blockchain for transaction matching order amount and destination address. This is typically done automatically in the background in production.');
                           }}
                           className="w-full py-2 bg-black text-white rounded-lg text-xs font-bold"
                         >
                           Verify Payment
                         </button>
                       </div>
                    </div>
                 )}
               </div>
             </div>

             <div className="pt-8 border-t border-gray-100 space-y-4">
               <div className="flex items-start gap-3 text-xs">
                 <input 
                   type="checkbox" 
                   id="terms-agreement" 
                   className="mt-1 rounded"
                   defaultChecked={true}
                 />
                 <label htmlFor="terms-agreement" className="text-gray-600">
                   I agree to the <button 
                     onClick={() => {/* Add logic to open legal page in parent */}}
                     className="text-blue-600 hover:underline"
                   >
                     Terms of Service
                   </button> and acknowledge the <button 
                     onClick={onShowLegal}
                     className="text-blue-600 hover:underline"
                   >
                     Privacy Policy
                   </button>
                 </label>
               </div>
               <button 
                onClick={handleFinalize}
                disabled={!paymentMethod || (paymentMethod === 'usdt' && !cryptoNetwork)}
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-20 transition-all active:scale-95"
               >
                 Confirm Reservation
               </button>
             </div>
          </div>
        )}

        {step === 'done' && (
          <div className="max-w-xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-1000 py-12">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tighter italic">Reservation Confirmed.</h2>
              <p className="text-gray-500">Your Model π has been assigned a production slot.</p>
            </div>
            <div className="bg-gray-50 p-10 rounded-[2.5rem] text-left space-y-6">
              <div className="flex justify-between border-b pb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                <span className="text-sm font-black">{orderId}</span>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your reservation is confirmed! You have paid 30% deposit. The remaining 70% will be charged at official launch on January 31, 2026.
                </p>
                <div className="pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next Steps:</p>
                  <ul className="mt-2 space-y-1 text-xs text-gray-500 list-disc list-inside">
                    <li>Keep an eye on your email for updates</li>
                    <li>Final payment will be processed automatically on launch date</li>
                    <li>Track your order status in your account</li>
                  </ul>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="bg-black text-white px-12 py-4 rounded-full font-bold text-sm shadow-xl">Return to Store</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PreOrderPortal;