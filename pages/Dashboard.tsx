
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, ShoppingBag, Search } from 'lucide-react';
import { MOCK_CHART_DATA, MOCK_TRENDS } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Shop Views', value: '42,912', change: '+12.5%', icon: Users, color: 'text-indigo-400' },
          { label: 'SEO Score', value: '84/100', change: '+2.1%', icon: Search, color: 'text-emerald-400' },
          { label: 'Est. Revenue', value: '$12,450', change: '+18.4%', icon: ShoppingBag, color: 'text-purple-400' },
          { label: 'Active Trends', value: '18', change: '+4', icon: TrendingUp, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl bg-slate-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ArrowUpRight size={12} /> {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Sales Performance</h2>
              <p className="text-sm text-slate-500">Track your shop growth across search & social</p>
            </div>
            <select className="bg-slate-800 border-slate-700 text-xs text-slate-300 rounded-lg focus:ring-indigo-500">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4">Trending Now</h2>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            {MOCK_TRENDS.map((trend, i) => (
              <div key={i} className="group p-4 rounded-xl border border-slate-800 bg-slate-800/20 hover:border-slate-700 hover:bg-slate-800/40 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-200">{trend.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    trend.status === 'Rising' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {trend.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex gap-1">
                    {trend.platforms.map(p => <span key={p} className="bg-slate-800 px-1.5 py-0.5 rounded uppercase">{p}</span>)}
                  </div>
                  <span className="text-indigo-400 font-bold">+{trend.growth}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
            View Trend Radar →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
