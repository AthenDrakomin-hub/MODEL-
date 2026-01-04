
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Globe, Zap, Menu, MessageCircle } from 'lucide-react';
import { INITIAL_PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import PreOrderPortal from './components/PreOrderPortal';
import CartDrawer from './components/CartDrawer';
import AllocationOverview from './components/AllocationOverview';
import CountdownTimer from './components/CountdownTimer';
import LegalDocuments from './components/LegalDocuments';
import ComplianceSection from './components/ComplianceSection';
import ImageWithFallback from './components/ImageWithFallback';
import ImagePreloader from './components/ImagePreloader';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import ResourcePreloader from './components/ResourcePreloader';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [liveCount, setLiveCount] = useState(100000);
  const [showLegalPage, setShowLegalPage] = useState(false);
  
  // 图片预加载
  const allImageUrls = [
    'https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye1.jpg',
    'https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye2.jpg',
    ...INITIAL_PRODUCTS.map(product => product.imageUrl)
  ];

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

  const getNavClassName = () => {
    const baseClasses = 'fixed top-8 sm:top-12 left-0 right-0 h-12 sm:h-16 z-50 transition-all duration-700';
    const scrolledClasses = scrolled ? 'bg-white/[0.95] backdrop-blur-xl border-b border-gray-100 shadow-sm' : '';
    return `${baseClasses} ${scrolledClasses}`;
  };
  
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <ResourcePreloader />
      <SEO 
        title="Model π - Revolutionary Smart Phone with Starlink Integration | Pre-order Now"
        description="Experience the future with Model π, featuring Starlink satellite connectivity, solar charging, and revolutionary AI. Pre-order now with 30% deposit."
        keywords="Tesla, Model π, smart phone, Starlink, satellite phone, solar charging, revolutionary technology, AI phone, 5G smartphone"
        url="https://model-pi.xyz/"
        image="https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye1.jpg"
      />
      <StructuredData 
        products={INITIAL_PRODUCTS}
        selectedProduct={selectedProduct}
      />
      
      {/* Loading indicator for better UX */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white" id="loading-screen" style={{ display: 'none' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading Model π...</p>
        </div>
      </div>
      
      {/* 生产模式顶部库存条 */}
      <div className="bg-black py-3 text-center sticky top-0 z-[70] border-b border-white/[0.05]">
        <div className="flex justify-center items-center gap-6 px-4">
          <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
            Node Status: {liveCount.toLocaleString()} / 100,000 Units Available
          </span>
          <div className="hidden sm:block h-3 w-px bg-white/[0.2]"></div>
          <button 
            onClick={() => scrollTo(buyRef)} 
            className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-[0.3em] underline decoration-2 underline-offset-4 transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* 极简导航栏 */}
      <nav className={getNavClassName()}>
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-10">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={`text-2xl sm:text-3xl font-bold tracking-tighter transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>π</button>
          
          <div className={`hidden lg:flex gap-6 sm:gap-12 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-colors ${scrolled ? 'text-gray-500' : 'text-white/[0.7]'}`}>
            <button onClick={() => scrollTo(heroRef)} className="hover:text-black">Overview</button>
            <button onClick={() => scrollTo(videoRef)} className="hover:text-black">Reveal</button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-black">Tech</button>
            <button onClick={() => scrollTo(allocationRef)} className="hover:text-black">Logistics</button>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
             <button onClick={(e) => {e.stopPropagation(); setIsCartOpen(true);}} className={`relative p-2 rounded-full transition-all ${scrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/[0.1] text-white'}`} aria-label="Open shopping cart">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cart.length > 0 && <span className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-600 rounded-full border-2 border-white" />}
             </button>
             <button className={`lg:hidden p-2 ${scrolled ? 'text-black' : 'text-white'}`}><Menu className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          </div>
        </div>
      </nav>

      {/* 预售倒计时 */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 mt-12 sm:mt-24 mb-8 sm:mb-12">
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 py-6 sm:py-8 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border border-blue-100">
          <p className="font-bold text-blue-800 text-base sm:text-lg">PRE-ORDER PHASE - PAY 30% NOW, 70% AT LAUNCH</p>
          <div className="mt-3 sm:mt-4">
            <p className="text-blue-600 text-xs sm:text-sm mb-2">Official Launch: January 31, 2026</p>
            <CountdownTimer targetDate={new Date('2026-01-31T00:00:00')} />
          </div>
        </div>
      </div>
      
      {/* 图片预加载 */}
      <ImagePreloader imageUrls={allImageUrls} />
      
      {/* 移除固定的法律合规信息链接条 - 避免遮挡主要内容 */}

      {/* Hero 区域 */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black text-white">
         <div className="z-10 animate-fade-up px-4 sm:px-6 space-y-6 sm:space-y-8 mt-8 sm:mt-12">
            <h1 className="text-[10vw] sm:text-[12vw] md:text-[180px] font-bold tracking-tighter italic leading-none select-none drop-shadow-2xl">Model π</h1>
            <p className="text-lg sm:text-xl md:text-3xl font-light text-gray-400 tracking-[0.3em] sm:tracking-[0.6em] uppercase">Interplanetary Standard</p>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 tracking-wide mt-2 sm:mt-4 max-w-xs sm:max-w-2xl mx-auto">
              Revolutionary Smart Phone with Starlink Satellite Connectivity & Solar Charging
            </p>
            <div className="pt-8 sm:pt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
               <button onClick={() => scrollTo(buyRef)} className="w-full sm:w-64 bg-white text-black px-6 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-2xl active:scale-95">Pre-order Now</button>
               <button onClick={() => scrollTo(videoRef)} className="w-full sm:w-64 border border-white/[0.2] backdrop-blur-md text-white px-6 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-xs sm:text-sm hover:bg-white/[0.1] transition-all active:scale-95">Watch Film</button>
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
            <h2 className="text-7xl font-bold text-white tracking-tighter italic">Official Model π Reveal</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed italic">
              "Engineering the next frontier of mobile communication."
            </p>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg font-normal">
              Discover the revolutionary features of Model π: Starlink satellite connectivity, solar charging, and AI-powered capabilities.
            </p>
          </div>
          
          <div className="relative w-full overflow-hidden rounded-[3rem] shadow-[0_0_150px_rgba(255,255,255,0.1)] border border-white/[0.1] bg-gray-950" style={{ aspectRatio: '1184 / 752' }}>
            <video 
              src="https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/shiping/IMG_0116.MP4" 
              title="MODEL PI Π" 
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 'inherit',
                background: 'linear-gradient(45deg, #1e293b, #334155)'
              }}
            ></video>
          </div>
        </div>
      </section>

      {/* 技术特性展示 */}
      <section ref={specsRef} className="py-20 sm:py-30 md:py-60 space-y-30 sm:space-y-50 md:space-y-80 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20 md:gap-32 items-center">
          <div className="space-y-6 sm:space-y-10">
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-50 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-blue-600 shadow-inner">
               <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Starlink Connectivity</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 leading-relaxed font-medium italic">
              Native orbital handshake. Global 1Gbps uplink anywhere on the planet.
            </p>
            <p className="text-base sm:text-lg md:text-lg text-gray-600 mt-2 sm:mt-4">
              Experience true global connectivity with direct Starlink satellite integration
            </p>
          </div>
          <div className="bg-[#f5f5f7] rounded-[3rem] sm:rounded-[4rem] md:rounded-[5rem] p-8 sm:p-12 md:p-16 aspect-square shadow-2xl overflow-hidden group">
             <ImageWithFallback 
               src="https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye1.jpg" 
               className="w-full h-full object-cover rounded-[2rem] sm:rounded-[3rem] md:rounded-[3rem] group-hover:scale-105 transition-transform duration-[3s]" 
               alt="Starlink" 
               loading="lazy"
             />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20 md:gap-32 items-center">
          <div className="bg-[#f5f5f7] rounded-[3rem] sm:rounded-[4rem] md:rounded-[5rem] p-8 sm:p-12 md:p-16 aspect-square shadow-2xl overflow-hidden order-2 md:order-1 group">
             <ImageWithFallback 
               src="https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye2.jpg" 
               className="w-full h-full object-cover rounded-[2rem] sm:rounded-[3rem] md:rounded-[3rem] group-hover:scale-105 transition-transform duration-[3s]" 
               alt="Solar" 
               loading="lazy"
             />
          </div>
          <div className="space-y-6 sm:space-y-10 order-1 md:order-2">
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-orange-50 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center text-orange-600 shadow-inner">
               <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Solar Charging</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 leading-relaxed font-medium italic">
              Integrated photo-voltaic backplate. Autonomous charging from ambient photons.
            </p>
            <p className="text-base sm:text-lg md:text-lg text-gray-600 mt-2 sm:mt-4">
              Never worry about battery life with revolutionary solar charging technology
            </p>
          </div>
        </div>
      </section>

      {/* 购买区域 */}
      <section ref={buyRef} className="bg-white py-20 sm:py-30 md:py-60 border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 md:gap-32">
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

            <div className="space-y-10 sm:space-y-20 md:space-y-32">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <span className="text-blue-600 font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em]">Phase 1 Allocation</span>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Configure Your Model π</h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">Customize your revolutionary smart phone with exclusive features</p>
              </div>

              <div className="space-y-10 sm:space-y-15 md:space-y-20">
                <section className="space-y-4 sm:space-y-6 md:space-y-8">
                  <h3 className="text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.4em]">1. Select Model</h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-5">
                    {models.map(m => (
                      <button 
                        key={m}
                        onClick={() => handleModelChange(m)}
                        className={`w-full p-6 sm:p-8 md:p-10 text-left rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] border-2 transition-all duration-500 flex justify-between items-center ${selectedProduct.model === m ? 'border-blue-500 bg-blue-50/[0.1] shadow-xl scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}`}
                      >
                        <div>
                          <p className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight">{m}</p>
                          <p className="text-[9px] sm:text-[11px] text-gray-400 mt-1 sm:mt-2 uppercase tracking-widest font-black">Fluid XDR Display</p>
                        </div>
                        <span className="text-base sm:text-lg md:text-xl font-black text-gray-900">${INITIAL_PRODUCTS.find(p => p.model === m)?.price}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-6 sm:space-y-8 md:space-y-10">
                  <h3 className="text-[9px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.4em]">2. Choose Finish</h3>
                  <div className="flex gap-4 sm:gap-6 md:gap-10">
                    {INITIAL_PRODUCTS
                      .filter(p => p.model === selectedProduct.model)
                      .map(p => (
                        <button 
                          key={p.id}
                          onClick={() => handleColorChange(p.color)}
                          className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 p-1 transition-all ${selectedProduct.color === p.color ? 'border-blue-500 scale-110 shadow-xl' : 'border-transparent hover:scale-110'}`}
                        >
                          <div className="w-full h-full rounded-full border border-gray-100 shadow-inner" style={{ backgroundColor: p.colorHex }} />
                        </button>
                      ))
                    }
                  </div>
                  <p className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Signature Finish: <span className="text-black">{selectedProduct.color}</span></p>
                </section>
              </div>

              <div className="pt-8 sm:pt-12 md:pt-24 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <div className="space-y-2 mb-4 sm:mb-0">
                  <p className="text-3xl sm:text-5xl md:text-7xl font-black italic tracking-tighter">${selectedProduct.price}</p>
                  <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em]">Fully Refundable Deposit: ${selectedProduct.deposit}</p>
                </div>
                <button 
                  onClick={handleAddToBag} 
                  className="bg-black text-white px-12 sm:px-16 md:px-20 py-5 sm:py-6 md:py-7 rounded-full font-black text-[10px] sm:text-[11px] md:text-[12px] shadow-2xl hover:bg-gray-800 transition-all active:scale-95 uppercase tracking-[0.1em] sm:tracking-[0.2em]"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 库存与物流仪表盘 */}
      <section ref={allocationRef} className="bg-[#f5f5f7] py-20 sm:py-30 md:py-60 px-4 sm:px-6 lg:px-10">
         <div className="max-w-[1100px] mx-auto space-y-10 sm:space-y-20 md:space-y-32">
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter italic uppercase">Global Logistics & Inventory</h2>
               <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto font-medium">Monitoring inventory flow across planetary nodes.</p>
               <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-xl md:max-w-3xl mx-auto">
                  Track your Model π pre-order status and estimated delivery timeline.
               </p>
            </div>
            <AllocationOverview />
         </div>
      </section>

      <ComplianceSection />

      {/* 页面切换 - 主页或法律页面 */}
      {!showLegalPage ? (
        <>
          {/* 页脚 */}
          <footer className="bg-white py-20 sm:py-30 md:py-48 px-4 sm:px-6 lg:px-12 border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto text-center">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 md:gap-24 text-[8px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <p className="text-black">Model π</p>
                  <button onClick={() => scrollTo(heroRef)} className="block hover:text-black">Overview</button>
                  <button onClick={() => scrollTo(videoRef)} className="block hover:text-black">Film</button>
                </div>
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  <p className="text-black">Orders</p>
                  <button onClick={() => scrollTo(buyRef)} className="block hover:text-black">Reservation</button>
                  <button className="block hover:text-black">Status Hub</button>
                  <button onClick={() => setShowLegalPage(true)} className="block hover:text-black">Legal Documents</button>
                  <button onClick={() => setShowLegalPage(true)} className="block hover:text-black">Compliance Certificates</button>
                </div>
                <div className="md:col-span-2 space-y-8 sm:space-y-12 md:space-y-20 normal-case text-[12px] sm:text-[15px] tracking-normal font-medium text-gray-400">
                  <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-black tracking-tighter italic">π</div>
                  <p className="leading-relaxed text-xs sm:text-sm md:text-base">
                    Model π - Revolutionary Smart Phone with Starlink Satellite Connectivity & Solar Charging. 
                    Pre-order the future of mobile communication with 30% deposit. 
                    Model π. © 2025. This platform is the official hub for Model π reservations. 
                    Final hardware specifications are subject to planetary synchronization.
                  </p>
                  <div className="pt-2 sm:pt-4">
                    <h3 className="font-bold text-base sm:text-lg text-black mb-2">Explore Model π</h3>
                    <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                      <li><a href="#hero" className="hover:text-blue-600">Overview</a></li>
                      <li><a href="#video" className="hover:text-blue-600">Video</a></li>
                      <li><a href="#specs" className="hover:text-blue-600">Features</a></li>
                      <li><a href="#buy" className="hover:text-blue-600">Configure</a></li>
                      <li><a href="#allocation" className="hover:text-blue-600">Availability</a></li>
                      <li><a href="#" onClick={() => setShowLegalPage(true)} className="hover:text-blue-600">Legal</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          {/* 购物车抽屉 */}
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={(id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))}
            onRemove={(id) => setCart(prev => prev.filter(item => item.id !== id))}
            onCheckout={() => { setIsCartOpen(false); setIsPortalOpen(true); }}
          />

          {/* 预订门户弹窗 */}
          {isPortalOpen && (
            <PreOrderPortal 
              cart={cart}
              onClearCart={() => setCart([])}
              onClose={() => setIsPortalOpen(false)}
              onShowLegal={() => setShowLegalPage(true)}
            />
          )}
        </>
      ) : (
        /* 内置法律页面 - 不显示页脚 */
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Legal Documents</h1>
              <button 
                onClick={() => setShowLegalPage(false)}
                className="px-6 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>←</span> <span>Back to Store</span>
              </button>
            </div>
            <LegalDocuments />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;