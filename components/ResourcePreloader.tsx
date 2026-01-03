import { useEffect } from 'react';

const ResourcePreloader: React.FC = () => {
  useEffect(() => {
    // Preconnect to important external domains
    const preconnectDomains = [
      'https://zlbemopcgjohrnyyiwvs.supabase.co',
      'https://cdn.tailwindcss.com',
      'https://esm.sh',
      'https://fonts.googleapis.com',
      'https://cdnjs.cloudflare.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Prefetch critical resources
    const criticalResources = [
      { href: 'https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye1.jpg', as: 'image' },
      { href: 'https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/shouye2.jpg', as: 'image' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource.href;
      if (resource.as) {
        link.as = resource.as;
      }
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical resources
    const preloadResources = [
      { href: 'https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/shiping/IMG_0116.MP4', as: 'video' }
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      if (resource.as) {
        link.as = resource.as;
      }
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

  }, []);

  return null; // This component doesn't render anything visible
};

export default ResourcePreloader;