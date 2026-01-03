import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'eager' | 'lazy';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  loading = 'lazy'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    // 在真实应用中，这里可以设置一个默认图片
  };

  // 如果加载失败，显示一个占位符
  if (hasError) {
    return (
      <div 
        className={className}
        style={{ width, height }}
      >
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={handleError}
      style={{ 
        transition: 'opacity 0.3s',
        opacity: imgSrc ? 1 : 0
      }}
    />
  );
};

export default ImageWithFallback;