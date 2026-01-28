
import React, { useState } from 'react';
import { Target, Search, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { reverseEngineerListing } from '../services/geminiService';

const CompetitorAnalysis: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const result = await reverseEngineerListing(url);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-3">Reverse Analysis</h1>
          <p className="text-slate-400 mb-8">
            Paste any Etsy listing URL to strip it down to its SEO core. 
            Identify their tag strategy and find keywords they missed.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.etsy.com/listing/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !url}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-8 rounded-2xl font-bold transition-all flex items-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Extract Data'}
            </button>
          </div>
        </div>
      </div>

      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-indigo-400" /> Competitor Tag Strategy
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-300 text-sm font-medium rounded-xl">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-red-500/20 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-400" /> Overused Keywords
                </h3>
                <div className="space-y-3">
                  {data.weaknesses.map((w: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-emerald-400" /> "Steal-Smart" Opportunities
                </h3>
                <div className="space-y-3">
                  {data.gaps.map((g: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-indigo-400" /> Listing Quality Check
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Keyword Density', score: 72 },
                { label: 'Attribute Coverage', score: 45 },
                { label: 'Long-Tail Usage', score: 88 },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
                    <span>{s.label}</span>
                    <span>{s.score}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-300 leading-relaxed">
                <strong>Pro Tip:</strong> This competitor is ranking high but missing key conversion triggers in their description. Focus on "Problem/Solution" copy to beat them.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-64 bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center opacity-50">
          <Target size={48} className="text-slate-700 mb-4" />
          <h3 className="text-lg font-bold text-slate-600">Enter a listing URL to begin reverse engineering</h3>
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysis;
