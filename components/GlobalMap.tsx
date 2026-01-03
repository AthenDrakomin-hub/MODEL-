
import React from 'react';

const GlobalMap: React.FC = () => {
  const regions = [
    { name: 'North America', hub: 'Giga Texas', load: 85, color: '#3b82f6' },
    { name: 'Europe', hub: 'Giga Berlin', load: 62, color: '#10b981' },
    { name: 'Asia Pacific', hub: 'Giga Shanghai', load: 94, color: '#ef4444' },
    { name: 'Mars Orbit', hub: 'Starship Gateway', load: 12, color: '#f59e0b' },
  ];

  return (
    <div className="glass-morphism rounded-3xl p-8 mb-16 overflow-hidden relative">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="z-10">
          <h3 className="text-2xl font-bold mb-2">Global Logistics Matrix</h3>
          <p className="text-gray-400 text-sm max-w-md">
            Monitoring inventory flow across planetary nodes via Starlink telemetry. Real-time allocation active.
          </p>
          <div className="mt-8 space-y-4">
            {regions.map((region) => (
              <div key={region.name} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                  <span className="text-white">{region.name}</span>
                  <span className="text-gray-500">{region.hub}</span>
                </div>
                <div className="h-1 w-64 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ width: `${region.load}%`, backgroundColor: region.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative flex-1 flex justify-center items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <i className="fa-solid fa-earth-americas text-[180px] text-blue-500 animate-pulse"></i>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950"></div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-8 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-[10px] font-mono text-green-500 uppercase tracking-tighter">Starlink Uplink Active: 48,202 Satellites Syncing</span>
      </div>
    </div>
  );
};

export default GlobalMap;
