
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Sparkles, Orbit } from 'lucide-react';
import { CartItem } from '../types';
import CountdownTimer from '../components/CountdownTimer';
import ImageWithFallback from '../components/ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[70] transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[440px] bg-white z-[80] shadow-[0_0_100px_rgba(0,0,0,0.2)] transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-10 py-8 flex items-center justify-between border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-black tracking-tighter italic">Your Reservation</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Model π Pre-Order System</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-all active:scale-90">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-10 py-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-1000">
                {/* Futuristic Illustration */}
                <div className="relative mb-14">
                  {/* Orbital Rings Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute w-60 h-60 border border-gray-100 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute w-2 h-2 bg-blue-500 rounded-full top-0 left-1/2 -translate-x-1/2 animate-[ping_3s_ease-in-out_infinite]"></div>
                  </div>
                  
                  <div className="relative w-32 h-32 bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[inset_0_2px_10px_rgba(0,0,0,0.02),0_20px_40px_rgba(0,0,0,0.05)] border border-gray-100">
                    <ShoppingBag className="w-14 h-14 text-gray-200 stroke-[1.5]" />
                    <div className="absolute -bottom-2 -right-2 bg-black text-white p-2.5 rounded-2xl shadow-xl ring-4 ring-white">
                      <Orbit className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter italic leading-none">
                  Awaiting <br/>Allocation.
                </h3>
                <p className="text-base text-gray-500 mb-6 leading-relaxed font-medium px-4">
                  The first 100,000 units are moving fast. Secure your position in the satellite communication revolution.
                </p>
                
                <button 
                  onClick={onClose} 
                  className="group w-full relative overflow-hidden bg-black text-white px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    View Model Lineup
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
                
                <div className="mt-12 flex items-center justify-center gap-3 text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">
                  <div className="w-12 h-px bg-gray-100"></div>
                  <span>Starlink Connected</span>
                  <div className="w-12 h-px bg-gray-100"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="w-28 h-28 bg-gray-50 rounded-[2rem] p-4 flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                      <ImageWithFallback 
                        src={item.imageUrl} 
                        alt={item.model} 
                        className="h-full w-full object-contain" 
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-lg font-black tracking-tight">{item.model}</h4>
                        <p className="text-lg font-black text-gray-900">${item.price}</p>
                      </div>
                      <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-4">{item.color}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-gray-400 hover:text-black transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-black transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-10 py-12 border-t border-gray-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <span>Global Logistics</span>
                  <span className="text-blue-600">Complimentary</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-gray-100 mt-4">
                  <span className="text-xl font-bold">Reservation Total</span>
                  <span className="text-4xl font-black italic tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                    <span>30% Deposit Due Now</span>
                    <span className="text-blue-600">${(total * 0.3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                    <span>70% Final Payment (Jan 31, 2026)</span>
                    <span className="text-gray-900">${(total * 0.7).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] hover:bg-gray-900 transition-all flex items-center justify-center gap-3"
              >
                Continue to Delivery Info
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Encryption Protocol Active
              </div>
              <div className="mt-4 text-center">
                <p className="text-[8px] text-gray-400">
                  By continuing, you agree to our{' '}
                  <button className="text-blue-600 hover:underline" onClick={() => {/* This would need to be passed from parent */}}>
                    Terms
                  </button>
                  {' '}and{' '}
                  <button className="text-blue-600 hover:underline" onClick={() => {/* This would need to be passed from parent */}}>
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;