
import React, { useState } from 'react';
import { X, Lock, CheckCircle2, CreditCard, ShoppingBag, Truck, Coins, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import CheckoutForm from './CheckoutForm';
import ImageWithFallback from './ImageWithFallback';

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
      const id = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setStep('done');
      onClearCart();
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
    try {
      // 模拟PayPal SDK初始化和支付处理
      const orderData = {
        intent: 'capture',
        purchase_units: [{
          amount: {
            value: deposit.toFixed(2),
            currency_code: 'USD'
          }
        }]
      };

      // 实际项目中，这里会调用真实的PayPal API
      console.log('Processing PayPal deposit payment for amount:', deposit);
      
      // 模拟支付成功
      const id = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(id);
      setStep('done');
      onClearCart();
    } catch (error) {
      console.error('PayPal payment failed:', error);
      alert('PayPal payment failed. Please try again.');
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

    // 预售模式：处理30%定金的USDT支付
    // 在实际应用中，这里需要实现区块链监控来验证支付
    const id = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setStep('done');
    onClearCart();
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
                 onClick={() => setPaymentMethod('card')}
                 className={`w-full p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-100'}`}
               >
                 <div className="flex items-center gap-4">
                   <CreditCard className="w-6 h-6" />
                   <span className="font-bold">Credit/Debit Card</span>
                 </div>
                 {paymentMethod === 'card' && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
               </button>

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
                         </div>
                       )}
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