import React from 'react';

const TechSpecifications: React.FC = () => {
  return (
    <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em]">Technical Specifications</span>
          <h3 className="text-4xl font-bold tracking-tight mt-2">Model π Features</h3>
          <p className="text-sm text-gray-400 font-medium mt-2">Advanced technology specifications</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Certification Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-600">Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
        <div className="space-y-4">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-gray-900 uppercase tracking-widest">Starlink Direct</span>
            <span className="text-gray-400">Satellite Connectivity</span>
          </div>
          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div 
              className="h-full bg-blue-500 transition-all duration-[2000ms] ease-out" 
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 uppercase tracking-tighter">
            <span>Status: Active</span>
            <span>Global Coverage</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-gray-900 uppercase tracking-widest">Solar Charging</span>
            <span className="text-gray-400">Back Panel System</span>
          </div>
          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div 
              className="h-full bg-green-500 transition-all duration-[2000ms] ease-out" 
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 uppercase tracking-tighter">
            <span>Status: Enabled</span>
            <span>24/7 Power</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-gray-900 uppercase tracking-widest">AI Assistant</span>
            <span className="text-gray-400">Neural Interface</span>
          </div>
          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div 
              className="h-full bg-purple-500 transition-all duration-[2000ms] ease-out" 
              style={{ width: '95%' }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 uppercase tracking-tighter">
            <span>Status: Online</span>
            <span>Learning Mode</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-gray-900 uppercase tracking-widest">Quantum Security</span>
            <span className="text-gray-400">Encryption Level</span>
          </div>
          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div 
              className="h-full bg-red-500 transition-all duration-[2000ms] ease-out" 
              style={{ width: '100%' }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 uppercase tracking-tighter">
            <span>Status: Active</span>
            <span>NSA Grade</span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-50">
        <div className="mb-12">
          <h4 className="text-lg font-bold mb-6 text-center">Certification Standards</h4>
          <img 
            src="https://zlbemopcgjohrnyyiwvs.supabase.co/storage/v1/object/public/materials/model/screenshot-20260105-033526.png" 
            alt="Model π Product Compliance Certifications" 
            className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
          />
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-50 flex flex-wrap gap-8">
        <div className="flex-1 min-w-[200px] p-8 bg-gray-50 rounded-[2rem]">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Processing Power</p>
          <p className="text-3xl font-bold tracking-tight">10 TFLOPS <span className="text-xs text-blue-500">Neural</span></p>
        </div>
        <div className="flex-1 min-w-[200px] p-8 bg-gray-50 rounded-[2rem]">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Battery Life</p>
          <p className="text-3xl font-bold tracking-tight">72h <span className="text-xs text-orange-500">Standard</span></p>
        </div>
      </div>
    </div>
  );
};

export default TechSpecifications;