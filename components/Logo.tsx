
import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
  color?: string;
}

export const ModelPiLogo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  glow = false,
  color = "text-black"
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-blue-500/10 blur-[20px] rounded-full animate-pulse scale-150"></div>
      )}
      <svg 
        viewBox="0 0 100 100" 
        className={`w-full h-full relative z-10 ${color} transition-all duration-500`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M5 25C5 25 25 18 50 18C75 18 95 25 95 25L92 35H8L5 25Z" 
          fill="currentColor"
        />
        <path 
          d="M34 35L30 82H42L46 35H34Z" 
          fill="currentColor"
        />
        <path 
          d="M66 35L70 75C70 82 66 85 58 85C50 85 46 82 46 82L50 72C50 72 53 75 58 75C61 75 62 73 62 70L58 35H66Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export const ModelPiIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-black`} fill="currentColor">
    <path d="M2 5h20l-1 2H3L2 5zm5 2l-1 10h3L10 7H7zm8 0l1 10c0 1-1 2-3 2h-1l-1-2 1-10h3z" />
  </svg>
);
