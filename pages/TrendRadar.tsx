
import React from 'react';
import { MOCK_TRENDS } from '../constants';
import { Zap, ArrowUpRight, ArrowDownRight, Share2, Eye } from 'lucide-react';

const TrendRadar: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Trend Radar</h1>
          <p className="text-slate-500">Cross-platform niche prediction & lifecycle tracking</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all">Daily</button>
          <button className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-indigo-600/20">Weekly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_TRENDS.map((trend, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                trend.status === 'Rising' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
              }`}>
                {trend.status}
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                {trend.growth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(trend.growth)}%
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{trend.name}</h3>
            <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">{trend.description}</p>
            
            <div className="flex items-center gap-3 mb-6">
              {trend.platforms.map((p, j) => (
                <span key={j} className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-md uppercase tracking-wider">
                  {p}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300">
                <Eye size={12} /> View Insights
              </button>
              <button className="text-slate-600 hover:text-white">
                <Share2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[100px] -mr-48 -mt-48"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="text-indigo-400" /> Lifecycle Indicator
          </h2>
          <p className="text-slate-500 text-sm mb-8">Knowing when to exit is just as important as knowing when to enter.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { label: 'RISING', color: 'bg-indigo-500', count: 12, desc: 'High momentum, low saturation. Best time to enter.' },
              { label: 'PEAK', color: 'bg-emerald-500', count: 28, desc: 'Maximum volume, high competition. Focus on differentiation.' },
              { label: 'DYING', color: 'bg-slate-600', count: 54, desc: 'Declining demand. Liquidate stock and rotate niches.' },
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 tracking-widest">{stat.label}</span>
                  <span className="text-2xl font-black text-white">{stat.count}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`${stat.color} h-full`} style={{ width: `${(stat.count / 100) * 100}%` }} />
                </div>
                <p className="text-xs text-slate-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendRadar;
