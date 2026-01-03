
import React, { useState } from 'react';
import { X, Lock, CheckCircle2, CreditCard, ShoppingBag, Truck, Coins, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface PreOrderPortalProps {
  cart: CartItem[];
  onClearCart: () => void;
  onClose: () => void;
}

type CheckoutStep = 'review' | 'payment' | 'done';
type PaymentMethod = 'card' | 'paypal' | 'usdt' | null;
type CryptoNetwork = 'ERC20' | 'TRC20' | null;

const PreOrderPortal: React.FC<PreOrderPortalProps> = ({ cart, onClearCart, onClose }) => {
  const [step, setStep] = useState<CheckoutStep>('review');
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [cryptoNetwork, setCryptoNetwork] = useState<CryptoNetwork>(null);

  // Use process.env for environment variable access to resolve TypeScript compilation errors 
  // with import.meta.env and to match the required process.env.API_KEY pattern.
  const PAYPAL_ID = (process.env as any).VITE_PAYPAL_CLIENT_ID || 'CONFIG_REQUIRED';
  const USDT_ADDR = (process.env as any).VITE_USDT_WALLET_ADDR || 'ADDRESS_NOT_SET';

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const deposit = cart.reduce((sum, item) => sum + item.deposit, 0);

  const handleFinalize = () => {
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
            {step === 'payment' && (
               <button onClick={() => setStep('review')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ArrowLeft className="w-4 h-4" />
               </button>
            )}
            <span className="text-xl font-bold tracking-tight">Tesla Checkout</span>
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
                    <img src={item.imageUrl} alt={item.model} className="w-32 h-32 object-contain" />
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
                    <p className="font-bold">Tesla Global Logistics</p>
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
                    <span>Due Now</span>
                    <span className="text-blue-600">${deposit.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('payment')}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
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
                   <i className="fa-brands fa-paypal text-xl text-[#003087]"></i>
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
                           <p className="text-[11px] font-mono break-all bg-white p-3 rounded-lg border">{USDT_ADDR}</p>
                         </div>
                       )}
                    </div>
                 )}
               </div>
             </div>

             <div className="pt-8 border-t border-gray-100">
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
              <p className="text-xs text-gray-500 leading-relaxed">
                Confirmation sent to your email. Track your satellite synchronization and factory delivery through the Tesla App.
              </p>
            </div>
            <button onClick={onClose} className="bg-black text-white px-12 py-4 rounded-full font-bold text-sm shadow-xl">Return to Store</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PreOrderPortal;
