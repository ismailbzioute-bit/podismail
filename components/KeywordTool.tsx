
import React, { useState } from 'react';
import { Search, Loader2, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';
import { CompetitionLevel } from '../types.ts';

const KeywordTool: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    setLoading(true);
    try {
      const data = await geminiService.analyzeNiche(keyword);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Keyword Intelligence</h1>
        <p className="text-slate-500 text-lg">Cross-platform data to validate your next design idea.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <input 
          type="text" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. funny nurse coffee lover..."
          className="w-full h-16 pl-14 pr-32 rounded-3xl glass-card border-none shadow-xl focus:ring-2 focus:ring-indigo-500 transition-all text-lg font-medium"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
        <button 
          disabled={loading}
          className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Analyze'}
        </button>
      </form>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-indigo-500" />
              Niche Metrics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-400 uppercase">Est. Monthly Vol</span>
                <p className="text-2xl font-black text-slate-800">{results.mainMetric.volume.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <span className="text-xs font-bold text-slate-400 uppercase">Competition</span>
                <p className={`text-2xl font-black ${
                  results.mainMetric.competition === 'Low' ? 'text-emerald-500' : 'text-rose-500'
                }`}>{results.mainMetric.competition}</p>
              </div>
            </div>
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <span className="text-xs font-bold text-indigo-400 uppercase">Buyer Intent</span>
              <p className="text-lg font-bold text-indigo-900">{results.mainMetric.intent}</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold">Long-Tail Opportunities</h2>
            <div className="space-y-3">
              {results.longTail.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                  <div>
                    <p className="font-bold text-slate-800">{item.keyword}</p>
                    <p className="text-xs text-slate-500">{item.volume.toLocaleString()} searches</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    item.competition === 'Low' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.competition}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordTool;
