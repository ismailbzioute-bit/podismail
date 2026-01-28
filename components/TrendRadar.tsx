
import React, { useState, useEffect } from 'react';
import { Radar, RefreshCcw, ExternalLink, TrendingUp, Zap } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const TrendRadar: React.FC = () => {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const data = await geminiService.getTrends();
      setTrends(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Trend Radar</h1>
          <p className="text-slate-500">Real-time cultural momentum and rising slogans.</p>
        </div>
        <button 
          onClick={fetchTrends}
          className="p-3 hover:bg-slate-200 rounded-xl transition-all"
        >
          <RefreshCcw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((trend, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br -mr-8 -mt-8 rounded-full blur-2xl opacity-10 ${
              trend.velocity === 'Rising' ? 'from-emerald-400 to-teal-400' : 'from-indigo-400 to-violet-400'
            }`}></div>
            
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                trend.velocity === 'New' ? 'bg-indigo-100 text-indigo-700' : 
                trend.velocity === 'Rising' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {trend.velocity}
              </span>
              <span className="text-[10px] font-bold text-slate-400">{trend.source}</span>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">"{trend.phrase}"</h3>
            <p className="text-sm text-slate-500 mb-6">{trend.category}</p>

            <button className="w-full py-2 flex items-center justify-center gap-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors">
              <Zap className="w-3 h-3" />
              Analyze Slogan
            </button>
          </div>
        ))}
      </div>
      
      <div className="glass-card p-12 rounded-[3rem] text-center border-indigo-100 border-2">
         <TrendingUp className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
         <h2 className="text-2xl font-bold mb-2">Strategy Tip</h2>
         <p className="max-w-2xl mx-auto text-slate-600">
           Focus on <b>"Rising"</b> trends that haven't hit <b>"Saturated"</b> yet. 
           Trends usually stay active for 2-4 weeks before competition drives margins to zero.
         </p>
      </div>
    </div>
  );
};

export default TrendRadar;
