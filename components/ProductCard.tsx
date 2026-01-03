
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLimited = product.isLimited;

  return (
    <div 
      className={`group relative glass-morphism rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] ${isLimited ? 'border-amber-500/40 shadow-2xl shadow-amber-500/10' : 'hover:shadow-red-500/10 border-white/5 hover:border-red-500/20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {/* Shine Effect */}
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <img 
          src={product.imageUrl} 
          alt={product.color} 
          className="w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-110 brightness-110 contrast-105"
        />
        
        {/* Scarcity Overlay */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
           {isLimited && (
             <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                Limited Genesis
             </div>
           )}
           <div className="bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full text-[9px] font-bold text-red-400 border border-red-500/20 uppercase tracking-widest">
              Stock: {product.stock.toLocaleString()} units
           </div>
        </div>

        {/* Color Orb */}
        <div 
          className="absolute bottom-6 right-6 w-8 h-8 rounded-full border-2 border-white/30 shadow-2xl z-20 overflow-hidden"
          style={{ backgroundColor: product.colorHex }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-black/40 to-transparent"></div>
        </div>
      </div>
      
      <div className="p-8 relative">
        {isLimited && (
          <div className="absolute -top-[1px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        )}

        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-2xl font-black italic tracking-tighter ${isLimited ? 'text-amber-100' : 'text-white'}`}>{product.model}</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">{product.color}</p>
          </div>
          <div className="text-right">
             <span className="text-sm text-gray-500 line-through block font-mono opacity-50">${product.price}</span>
             <span className="text-2xl font-black text-red-600 tracking-tighter italic">${product.deposit}<span className="text-[10px] ml-1 uppercase opacity-60">Dep.</span></span>
          </div>
        </div>
        
        <p className="text-gray-400 text-xs leading-relaxed mb-8 line-clamp-2 h-10 italic">
          "{product.description}"
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {product.features.map((feature, i) => (
            <span key={i} className="text-[8px] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300 font-bold">
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/5">
          <div className="flex-1">
             <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-1000 ${isLimited ? 'bg-amber-500' : 'bg-red-600'}`}
                  style={{ width: `${(product.stock / product.totalAllocation) * 100}%` }}
                />
             </div>
             <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest">
               Inventory Availability: {Math.round((product.stock / product.totalAllocation) * 100)}%
             </p>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className={`${isLimited ? 'bg-amber-500 hover:bg-amber-400' : 'bg-white hover:bg-red-50'} text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap shadow-xl shadow-black/50`}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
