
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

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
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[80] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-xl font-bold tracking-tight">Your Bag</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in-95 duration-700">
                <div className="relative mb-10">
                  <div className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <ShoppingBag className="w-12 h-12 text-gray-200" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight italic">The future is waiting.</h3>
                <p className="text-base text-gray-500 mb-12 leading-relaxed font-medium">
                  Your reservation slot for the first 100,000 Model π units is still open. Start configuring your handheld of the future today.
                </p>
                
                <button 
                  onClick={onClose} 
                  className="group w-full flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Priority Shipping for Early Reservations
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-6 animate-in fade-in slide-in-from-right-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                    <img src={item.imageUrl} alt={item.model} className="h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold leading-tight">{item.model}</h4>
                      <p className="text-sm font-bold text-gray-900">${item.price}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">{item.color}</p>
                    
                    <div className="flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-gray-400 hover:text-black"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-black"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-8 py-10 border-t border-gray-100 bg-gray-50/50">
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-end pt-2 border-t border-gray-200 mt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black italic tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-[#0071e3] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-[0.98] hover:bg-[#0077ed] transition-colors"
              >
                Review & Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
