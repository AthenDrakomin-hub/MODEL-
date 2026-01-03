import { useEffect } from 'react';

interface ImagePreloaderProps {
  imageUrls: string[];
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ imageUrls }) => {
  useEffect(() => {
    const preloadImages = () => {
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages();
  }, [imageUrls]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;