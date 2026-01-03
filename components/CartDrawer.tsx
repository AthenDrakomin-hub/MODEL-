
import React from 'react';
import { X, Minus, Plus, ShoppingBag, ChevronRight, Trash2, ArrowRight } from 'lucide-react';
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
            <h2 className="text-xl font-bold tracking-tight">Bag</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your bag is empty.</h3>
                <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-[240px] mx-auto">
                  Your journey to the next frontier of communication starts with your first Model π.
                </p>
                <button 
                  onClick={onClose} 
                  className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
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
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold">${total.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-[#0071e3] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.98] hover:bg-[#0077ed] transition-colors"
              >
                Review Bag & Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
