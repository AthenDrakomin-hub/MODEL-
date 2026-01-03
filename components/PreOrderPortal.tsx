
import React, { useState } from 'react';
import { X, ChevronRight, Lock, CheckCircle2, CreditCard, ShoppingBag, Truck, Coins, ArrowLeft } from 'lucide-react';
import { CartItem, Order } from '../types';

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
      {/* Header */}
      <header className="h-14 border-b border-gray-200 flex items-center justify-center sticky top-0 bg-white z-10 px-6">
        <div className="max-w-[1000px] w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step === 'payment' && (
               <button onClick={() => setStep('review')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <ArrowLeft className="w-4 h-4" />
               </button>
            )}
            <span className="text-xl font-bold">Checkout</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1000px] mx-auto w-full px-6 py-12">
        {step === 'review' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-4">
            <h2 className="text-4xl font-bold tracking-tight">Review your bag.</h2>
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
                      <p className="text-sm text-gray-500 mt-2">Ships: 2-3 weeks</p>
                      <p className="text-sm text-gray-500">Free Shipping</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-start gap-4 p-6 apple-bg rounded-2xl">
                  <Truck className="w-6 h-6 text-gray-400" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold">Shipping to your location</p>
                    <p className="text-gray-500">Items will be delivered via Tesla Global Logistics. Tracking number provided on dispatch.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-4 text-sm font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-4">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Deposit Due</span>
                    <span className="text-blue-600">${deposit.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep('payment')}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-gray-800 transition-all active:scale-95"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-md mx-auto space-y-10 animate-in slide-in-from-right-4">
             <div className="text-center space-y-4">
               <h2 className="text-4xl font-bold tracking-tight">Payment Method</h2>
               <p className="text-gray-500 text-sm">Select your preferred secure payment for the reservation deposit.</p>
             </div>

             <div className="space-y-4">
               {/* Credit Card */}
               <button 
                 onClick={() => setPaymentMethod('card')}
                 className={`w-full p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-100 hover:border-gray-300'}`}
               >
                 <div className="flex items-center gap-4">
                   <CreditCard className="w-6 h-6 text-gray-600" />
                   <span className="font-bold">Credit Card</span>
                 </div>
                 {paymentMethod === 'card' && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
               </button>

               {/* PayPal */}
               <button 
                 onClick={() => setPaymentMethod('paypal')}
                 className={`w-full p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-100 hover:border-gray-300'}`}
               >
                 <div className="flex items-center gap-4">
                   <i className="fa-brands fa-paypal text-xl text-[#003087]"></i>
                   <span className="font-bold">PayPal</span>
                 </div>
                 {paymentMethod === 'paypal' && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
               </button>

               {/* USDT Crypto */}
               <div className="space-y-3">
                 <button 
                   onClick={() => setPaymentMethod('usdt')}
                   className={`w-full p-6 rounded-2xl border-2 transition-all flex justify-between items-center ${paymentMethod === 'usdt' ? 'border-blue-500 bg-blue-50/20' : 'border-gray-100 hover:border-gray-300'}`}
                 >
                   <div className="flex items-center gap-4">
                     <Coins className="w-6 h-6 text-green-600" />
                     <span className="font-bold">USDT (Tether)</span>
                   </div>
                   {paymentMethod === 'usdt' && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
                 </button>

                 {paymentMethod === 'usdt' && (
                    <div className="grid grid-cols-2 gap-3 p-2 bg-gray-50 rounded-2xl animate-in slide-in-from-top-2">
                       <button 
                         onClick={() => setCryptoNetwork('ERC20')}
                         className={`py-3 rounded-xl text-xs font-bold transition-all ${cryptoNetwork === 'ERC20' ? 'bg-white shadow-sm ring-1 ring-gray-200 text-black' : 'text-gray-400 hover:text-gray-600'}`}
                       >
                         ERC20 (Ethereum)
                       </button>
                       <button 
                         onClick={() => setCryptoNetwork('TRC20')}
                         className={`py-3 rounded-xl text-xs font-bold transition-all ${cryptoNetwork === 'TRC20' ? 'bg-white shadow-sm ring-1 ring-gray-200 text-black' : 'text-gray-400 hover:text-gray-600'}`}
                       >
                         TRC20 (Tron)
                       </button>
                    </div>
                 )}
               </div>

               <button className="w-full p-6 rounded-2xl border-2 border-transparent text-left opacity-30 grayscale pointer-events-none">
                 <div className="flex items-center gap-4">
                   <ShoppingBag className="w-6 h-6" />
                   <span className="font-bold text-gray-400">Tesla Pay (Coming Soon)</span>
                 </div>
               </button>
             </div>

             <div className="pt-8 border-t border-gray-100">
               <button 
                onClick={handleFinalize}
                disabled={!paymentMethod || (paymentMethod === 'usdt' && !cryptoNetwork)}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
               >
                 Confirm and Pay Deposit
               </button>
               <p className="text-center text-[10px] text-gray-400 mt-6 flex items-center justify-center gap-2">
                 <Lock className="w-3 h-3" /> Securely handled by Tesla Global Nodes
               </p>
             </div>
          </div>
        )}

        {step === 'done' && (
          <div className="max-w-xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-1000 py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight italic">Thank you.</h2>
              <p className="text-gray-500 text-lg">Your reservation is confirmed.</p>
            </div>
            <div className="apple-bg p-8 rounded-[2.5rem] text-left space-y-6">
              <div className="flex justify-between border-b border-gray-200 pb-4">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Order Number</span>
                <span className="text-sm font-black text-black">{orderId}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                We’ve sent a confirmation email to your account. Your Model π is now in the production queue at Giga Texas. You can monitor satellite synchronization and logistics status via the official Tesla app.
              </p>
              <div className="bg-white/50 p-4 rounded-xl border border-white flex items-center gap-3">
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Status: In Production Queue</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="bg-black text-white px-12 py-4 rounded-full font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-xl"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PreOrderPortal;
