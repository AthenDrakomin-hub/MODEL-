import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 初始化时间
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <div className="text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black text-white rounded-xl font-black text-xl md:text-2xl">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-wider">Days</div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-300">:</div>
      <div className="text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black text-white rounded-xl font-black text-xl md:text-2xl">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-wider">Hours</div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-300">:</div>
      <div className="text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black text-white rounded-xl font-black text-xl md:text-2xl">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-wider">Minutes</div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-300">:</div>
      <div className="text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-black text-white rounded-xl font-black text-xl md:text-2xl">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-bold text-gray-500 mt-2 uppercase tracking-wider">Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;