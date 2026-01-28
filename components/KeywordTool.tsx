
import React, { useState } from 'react';
import { Search, Loader2, TrendingUp, AlertCircle, Sparkles, LogIn } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';
import { useUser } from '../App.tsx';
import { NavLink } from 'react-router-dom';

const KeywordTool: React.FC = () => {
  const { useCredit, user, isGuest } = useUser();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    setError(null);

    if (isGuest) {
      setError("Guests cannot perform AI niche analysis. Please sign up to claim 10 free credits!");
      return;
    }

    // Credit Check
    if (!user?.isPro && user?.credits === 0) {
      setError("Out of credits! Please upgrade to continue researching.");
      return;
    }

    setLoading(true);
    try {
      const data = await geminiService.analyzeNiche(keyword);
      if (data) {
        useCredit(); // Deduct credit on success
        setResults(data);
      } else {
        setError("Failed to fetch niche data. Try a different term.");
      }
    } catch (err) {
      setError("Market intelligence server is currently busy. Please try again.");
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
          className="w-full h-20 pl-14 pr-40 rounded-[2.5rem] glass-card border-none shadow-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-xl font-medium"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 w-6 h-6" />
        <button 
          disabled={loading || !keyword}
          className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-full font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Analyze
        </button>
      </form>

      {isGuest && (
        <div className="p-6 bg-slate-100 rounded-[2rem] border border-slate-200 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-500">Discover winning niches with 10 free AI credits when you sign up.</p>
          <NavLink to="/auth" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black flex items-center gap-2">
            <LogIn className="w-3 h-3" />
            Join Free
          </NavLink>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-10 rounded-[3rem] space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-indigo-500" />
              Niche Metrics
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-3xl">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Volume</span>
                <p className="text-3xl font-black text-slate-800 mt-1">{results.mainMetric.volume.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Competition</span>
                <p className={`text-3xl font-black mt-1 ${
                  results.mainMetric.competition === 'Low' ? 'text-emerald-500' : 'text-rose-500'
                }`}>{results.mainMetric.competition}</p>
              </div>
            </div>
            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Buyer Intent</span>
              <p className="text-xl font-bold text-indigo-900 mt-1">{results.mainMetric.intent}</p>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem] space-y-6">
            <h2 className="text-xl font-bold">Long-Tail Suggestions</h2>
            <div className="space-y-4">
              {results.longTail.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all cursor-default">
                  <div>
                    <p className="font-bold text-slate-800 text-lg leading-none">{item.keyword}</p>
                    <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">{item.volume.toLocaleString()} VOL</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
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
