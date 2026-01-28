
import React, { useState } from 'react';
import { ShieldCheck, Search, Loader2, Zap, AlertTriangle } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';

const SaturationChecker: React.FC = () => {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const check = async () => {
    if (!phrase) return;
    setLoading(true);
    try {
      const data = await geminiService.checkSaturation(phrase);
      setReport(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <ShieldCheck className="text-indigo-400 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black">Saturation Intelligence</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Analyze market density and competitive risk for specific slogans before you print.</p>
      </div>

      <div className="relative group max-w-2xl mx-auto">
        <input 
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Paste your slogan here..."
          className="w-full h-20 pl-10 pr-40 rounded-[2.5rem] glass-card shadow-2xl border-none text-xl font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        <button 
          onClick={check}
          disabled={loading || !phrase}
          className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 text-white rounded-[2rem] font-bold hover:bg-black flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
          Analyze Risk
        </button>
      </div>

      {report && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="glass-card p-10 rounded-[3rem] space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Risk Assessment</h3>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${
                report.saturationScore > 70 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {report.riskLevel}
              </span>
            </div>
            
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="#f1f5f9" strokeWidth="16" />
                <circle cx="96" cy="96" r="80" fill="none" stroke="#6366f1" strokeWidth="16" 
                  strokeDasharray={`${report.saturationScore * 5}, 1000`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{report.saturationScore}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saturated</span>
              </div>
            </div>

            <p className="text-center text-slate-600 leading-relaxed italic">"{report.advice}"</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="text-amber-500" />
              Strategic Twists
            </h3>
            <div className="space-y-4">
              {report.uniqueTwists.map((twist: string, i: number) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold text-indigo-600">{i+1}</span>
                  </div>
                  <p className="font-semibold text-slate-700">{twist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaturationChecker;
