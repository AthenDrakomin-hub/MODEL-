
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { INITIAL_PRODUCTS } from '../constants';

const InventoryDashboard: React.FC = () => {
  const data = INITIAL_PRODUCTS.map(p => ({
    name: p.color,
    units: p.totalAllocation,
    value: p.totalAllocation * p.price,
    fill: p.colorHex === '#FFFFFF' ? '#A1A1AA' : p.colorHex
  }));

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const totalUnits = data.reduce((sum, item) => sum + item.units, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 p-6 glass-morphism rounded-3xl">
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold mb-6 text-gray-200">Inventory Distribution (Units)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="units"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(255,255,255,0.1)" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Total Units Allocated</p>
          <p className="text-3xl font-bold text-white">{totalUnits.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl font-bold mb-6 text-gray-200">Revenue Potential (USD)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Total Valuation</p>
          <p className="text-3xl font-bold text-green-400">${totalValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
