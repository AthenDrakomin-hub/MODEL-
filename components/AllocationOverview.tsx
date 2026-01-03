
import React from 'react';
import { INITIAL_PRODUCTS } from '../constants';

const AllocationOverview: React.FC = () => {
  return (
    <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em]">Logistics Report</span>
          <h3 className="text-4xl font-bold tracking-tight mt-2">Production Queue</h3>
          <p className="text-sm text-gray-400 font-medium mt-2">Total First Batch: 100,000 Units Worldwide</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Global Node Status</p>
             <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-600">Active Distribution</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
        {INITIAL_PRODUCTS.map((p) => (
          <div key={p.id} className="space-y-4">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-gray-900 uppercase tracking-widest">{p.model} <span className="text-gray-300 mx-2">/</span> {p.color}</span>
              <span className="text-gray-400">{p.totalAllocation.toLocaleString()} Units</span>
            </div>
            <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
              <div 
                className="h-full transition-all duration-[2000ms] ease-out" 
                style={{ 
                  width: p.percentage,
                  backgroundColor: p.colorHex === '#F5F5F7' ? '#D1D5DB' : p.colorHex 
                }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-gray-400 uppercase tracking-tighter">
              <span>Status: Logistics Prep</span>
              <span>Alloc: {p.percentage}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-gray-50 flex flex-wrap gap-8">
        <div className="flex-1 min-w-[200px] p-8 bg-gray-50 rounded-[2rem]">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Total Valuation</p>
          <p className="text-3xl font-bold tracking-tight">$36,250,000 <span className="text-xs text-blue-500">Allocated</span></p>
        </div>
        <div className="flex-1 min-w-[200px] p-8 bg-gray-50 rounded-[2rem]">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Regional Cap</p>
          <p className="text-3xl font-bold tracking-tight">85% <span className="text-xs text-orange-500">Reserved</span></p>
        </div>
      </div>
    </div>
  );
};

export default AllocationOverview;
