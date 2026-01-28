
import React, { useState } from 'react';
import { Search, Sparkles, TrendingUp, HelpCircle, ArrowRight, BarChart3 } from 'lucide-react';
import { analyzeKeywordIntelligence } from '../services/geminiService';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const KeywordIntelligence: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleSearch = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      const result = await analyzeKeywordIntelligence(keyword);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const seasonalityData = data?.seasonality.map((val: number, idx: number) => ({
    name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx],
    value: val
  })) || [];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-3">Keyword Intelligence</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Uncover real Etsy search volume, difficulty scores, and buyer intent. 
            Stop guessing and start ranking with semantic clustering.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter an Etsy keyword (e.g., 'vintage leather satchel')"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-8 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Analyze <Sparkles size={18} /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
                  <BarChart3 size={14} /> Est. Volume
                </div>
                <div className="text-3xl font-bold text-white">{data.volume.toLocaleString()}</div>
                <div className="text-[10px] text-indigo-400 mt-1 font-bold">AVG. MONTHLY SEARCHES</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
                  <TrendingUp size={14} /> Difficulty
                </div>
                <div className="text-3xl font-bold text-white">{data.difficulty}/100</div>
                <div className={`text-[10px] mt-1 font-bold ${data.difficulty < 40 ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {data.difficulty < 40 ? 'LOW COMPETITION' : 'HIGH COMPETITION'}
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
                  <Target size={14} /> Buyer Intent
                </div>
                <div className="text-3xl font-bold text-white">{data.intent}</div>
                <div className="text-[10px] text-purple-400 mt-1 font-bold">PURCHASE PROBABILITY</div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-6">Seasonality Trend</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={seasonalityData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                      itemStyle={{ color: '#818cf8' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#818cf8" fill="#818cf820" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Long-Tail Generators</h3>
              <div className="space-y-3">
                {data.longTails.map((tail: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                    <span className="text-sm text-slate-300">{tail}</span>
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Semantic Clusters</h3>
              <div className="flex flex-wrap gap-2">
                {data.clusters.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Generic Icon missing Target import fix locally
const Target = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

export default KeywordIntelligence;
