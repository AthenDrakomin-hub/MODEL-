
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Globe, Zap, Menu, MessageCircle } from 'lucide-react';
import { INITIAL_PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import PreOrderPortal from './components/PreOrderPortal';
import CartDrawer from './components/CartDrawer';
import AllocationOverview from './components/AllocationOverview';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [liveCount, setLiveCount] = useState(100000);

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const allocationRef = useRef<HTMLDivElement>(null);

  const models = Array.from(new Set(INITIAL_PRODUCTS.map(p => p.model)));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCount(prev => Math.max(89241, prev - Math.floor(Math.random() * 3)));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleModelChange = (modelName: string) => {
    const firstOfModel = INITIAL_PRODUCTS.find(p => p.model === modelName);
    if (firstOfModel) setSelectedProduct(firstOfModel);
  };

  const handleColorChange = (colorName: string) => {
    const matching = INITIAL_PRODUCTS.find(p => p.model === selectedProduct.model && p.color === colorName);
    if (matching) setSelectedProduct(matching);
  };

  const handleAddToBag = () => {
    setCart([{ ...selectedProduct, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* 生产模式顶部库存条 */}
      <div className="bg-black py-3 text-center sticky top-0 z-[70] border-b border-white/5">
        <div className="flex justify-center items-center gap-6 px-4">
          <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
            Node Status: {liveCount.toLocaleString()} / 100,000 Units Available
          </span>
          <div className="hidden sm:block h-3 w-px bg-white/20"></div>
          <button 
            onClick={() => scrollTo(buyRef)} 
            className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-[0.3em] underline decoration-2 underline-offset-4 transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* 极简导航栏 */}
      <nav className={`fixed top-12 left-0 right-0 h-16 z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-10">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={`text-3xl font-bold tracking-tighter transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>π</button>
          
          <div className={`hidden lg:flex gap-12 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
            <button onClick={() => scrollTo(heroRef)} className="hover:text-black">Overview</button>
            <button onClick={() => scrollTo(videoRef)} className="hover:text-black">Reveal</button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-black">Tech</button>
            <button onClick={() => scrollTo(allocationRef)} className="hover:text-black">Logistics</button>
          </div>

          <div className="flex items-center gap-6">
             <button onClick={() => setIsCartOpen(true)} className={`relative p-2.5 rounded-full transition-all ${scrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />}
             </button>
             <button className={`lg:hidden p-2 ${scrolled ? 'text-black' : 'text-white'}`}><Menu className="w-6 h-6" /></button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black text-white">
         <div className="z-10 animate-fade-up px-6 space-y-8 mt-12">
            <h1 className="text-[12vw] md:text-[180px] font-bold tracking-tighter italic leading-none select-none drop-shadow-2xl">Model π</h1>
            <p className="text-xl md:text-3xl font-light text-gray-400 tracking-[0.6em] uppercase">Interplanetary Standard</p>
            <div className="pt-16 flex flex-col sm:flex-row gap-6 justify-center">
               <button onClick={() => scrollTo(buyRef)} className="w-64 bg-white text-black px-12 py-5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-2xl active:scale-95">Pre-order Now</button>
               <button onClick={() => scrollTo(videoRef)} className="w-64 border border-white/20 backdrop-blur-md text-white px-12 py-5 rounded-full font-bold text-sm hover:bg-white/10 transition-all active:scale-95">Watch Film</button>
            </div>
         </div>
         <div className="absolute inset-0 z-0 opacity-60">
            <img src="https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Starlink Sky" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
         </div>
      </section>

      {/* 视频区域 */}
      <section ref={videoRef} className="bg-black py-48 px-6">
        <div className="max-w-[1200px] mx-auto text-center space-y-24">
          <div className="space-y-6">
            <h2 className="text-7xl font-bold text-white tracking-tighter italic">Official Reveal.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed italic">
              "Engineering the next frontier."
            </p>
          </div>
          
          <div className="relative w-full overflow-hidden rounded-[3rem] shadow-[0_0_150px_rgba(255,255,255,0.1)] border border-white/10 bg-gray-950" style={{ aspectRatio: '1184 / 752' }}>
            <iframe 
              src="https://www.youtube.com/embed/xe48lG4393M" 
              title="MODEL PI Π" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 技术特性展示 */}
      <section ref={specsRef} className="py-60 space-y-80 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="space-y-10">
            <div className="w-24 h-24 bg-blue-50 rounded-[3rem] flex items-center justify-center text-blue-600 shadow-inner">
               <Globe className="w-12 h-12" />
            </div>
            <h2 className="text-8xl font-black tracking-tighter leading-none italic uppercase">Starlink.</h2>
            <p className="text-2xl text-gray-500 leading-relaxed font-medium italic">
              Native orbital handshake. Global 1Gbps uplink anywhere on the planet.
            </p>
          </div>
          <div className="bg-[#f5f5f7] rounded-[5rem] p-16 aspect-square shadow-2xl overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover rounded-[3rem] group-hover:scale-105 transition-transform duration-[3s]" alt="Starlink" />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="bg-[#f5f5f7] rounded-[5rem] p-16 aspect-square shadow-2xl overflow-hidden order-2 md:order-1 group">
             <img src="https://images.unsplash.com/photo-1509391366360-fe5bb658582f?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover rounded-[3rem] group-hover:scale-105 transition-transform duration-[3s]" alt="Solar" />
          </div>
          <div className="space-y-10 order-1 md:order-2">
            <div className="w-24 h-24 bg-orange-50 rounded-[3rem] flex items-center justify-center text-orange-600 shadow-inner">
               <Zap className="w-12 h-12" />
            </div>
            <h2 className="text-8xl font-black tracking-tighter leading-none italic uppercase">Solar.</h2>
            <p className="text-2xl text-gray-500 leading-relaxed font-medium italic">
              Integrated photo-voltaic backplate. Autonomous charging from ambient photons.
            </p>
          </div>
        </div>
      </section>

      {/* 购买区域 */}
      <section ref={buyRef} className="bg-white py-60 border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="hidden lg:block sticky top-40 h-[700px]">
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  key={selectedProduct.id}
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.model} 
                  className="w-full max-h-full object-contain drop-shadow-[0_80px_160px_rgba(0,0,0,0.15)] animate-fade-up"
                />
              </div>
            </div>

            <div className="space-y-32">
              <div className="space-y-8">
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.5em]">Phase 1 Allocation</span>
                <h2 className="text-8xl font-black tracking-tighter leading-none italic uppercase">Configure.</h2>
              </div>

              <div className="space-y-20">
                <section className="space-y-8">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">1. Select Model</h3>
                  <div className="grid grid-cols-1 gap-5">
                    {models.map(m => (
                      <button 
                        key={m}
                        onClick={() => handleModelChange(m)}
                        className={`w-full p-10 text-left rounded-[3.5rem] border-2 transition-all duration-500 flex justify-between items-center ${selectedProduct.model === m ? 'border-blue-500 bg-blue-50/10 shadow-xl scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}`}
                      >
                        <div>
                          <p className="font-bold text-2xl tracking-tight">{m}</p>
                          <p className="text-[11px] text-gray-400 mt-2 uppercase tracking-widest font-black">Fluid XDR Display</p>
                        </div>
                        <span className="text-xl font-black text-gray-900">${INITIAL_PRODUCTS.find(p => p.model === m)?.price}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-10">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">2. Choose Finish</h3>
                  <div className="flex gap-10">
                    {INITIAL_PRODUCTS
                      .filter(p => p.model === selectedProduct.model)
                      .map(p => (
                        <button 
                          key={p.id}
                          onClick={() => handleColorChange(p.color)}
                          className={`w-16 h-16 rounded-full border-2 p-1.5 transition-all ${selectedProduct.color === p.color ? 'border-blue-500 scale-125 shadow-2xl' : 'border-transparent hover:scale-110'}`}
                        >
                          <div className="w-full h-full rounded-full border border-gray-100 shadow-inner" style={{ backgroundColor: p.colorHex }} />
                        </button>
                      ))
                    }
                  </div>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">Signature Finish: <span className="text-black">{selectedProduct.color}</span></p>
                </section>
              </div>

              <div className="pt-24 border-t border-gray-100 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-7xl font-black italic tracking-tighter">${selectedProduct.price}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Fully Refundable Deposit: ${selectedProduct.deposit}</p>
                </div>
                <button 
                  onClick={handleAddToBag} 
                  className="bg-black text-white px-20 py-7 rounded-full font-black text-[12px] shadow-2xl hover:bg-gray-800 transition-all active:scale-95 uppercase tracking-[0.2em]"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 库存与物流仪表盘 */}
      <section ref={allocationRef} className="bg-[#f5f5f7] py-60 px-10">
         <div className="max-w-[1100px] mx-auto space-y-32">
            <div className="text-center space-y-8">
               <h2 className="text-7xl font-black tracking-tighter italic uppercase">Global Logistics.</h2>
               <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium">Monitoring inventory flow across planetary nodes.</p>
            </div>
            <AllocationOverview />
         </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-white py-48 px-12 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
            <div className="space-y-8">
              <p className="text-black">Model π</p>
              <button onClick={() => scrollTo(heroRef)} className="block hover:text-black">Overview</button>
              <button onClick={() => scrollTo(videoRef)} className="block hover:text-black">Film</button>
            </div>
            <div className="space-y-8">
              <p className="text-black">Orders</p>
              <button onClick={() => scrollTo(buyRef)} className="block hover:text-black">Reservation</button>
              <button className="block hover:text-black">Status Hub</button>
            </div>
            <div className="md:col-span-2 space-y-20 normal-case text-[15px] tracking-normal font-medium text-gray-400">
              <div className="text-7xl font-bold text-black tracking-tighter italic">π</div>
              <p className="leading-relaxed">Tesla Inc. © 2025. This platform is the official hub for Model π reservations. Final hardware specifications are subject to planetary synchronization.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 侧边栏与弹窗 */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={(id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))}
        onRemove={(id) => setCart(prev => prev.filter(item => item.id !== id))}
        onCheckout={() => { setIsCartOpen(false); setIsPortalOpen(true); }}
      />
      {isPortalOpen && (
        <PreOrderPortal 
          cart={cart}
          onClearCart={() => setCart([])}
          onClose={() => setIsPortalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
