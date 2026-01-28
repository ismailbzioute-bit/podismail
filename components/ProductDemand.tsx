
import React, { useState } from 'react';
import { BarChart3, Loader2, Sparkles, TrendingUp, DollarSign, Palette, LayoutGrid } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';

const ProductDemand: React.FC = () => {
  const [product, setProduct] = useState('T-Shirt');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const analyze = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeDemand(product, niche);
      setData(result);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
          <BarChart3 className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Demand Analyzer</h1>
          <p className="text-slate-500">Calculate the probability of sales for specific item types.</p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
        <div>
          <label className="text-xs font-black text-slate-400 uppercase mb-3 block">Product Category</label>
          <select 
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
          >
            <option>T-Shirt</option>
            <option>Oversized Hoodie</option>
            <option>Ceramic Mug</option>
            <option>Matte Poster</option>
            <option>Phone Case</option>
            <option>Embroidered Hat</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="text-xs font-black text-slate-400 uppercase mb-3 block">Niche / Target</label>
          <input 
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Vintage National Parks"
            className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-end">
          <button 
            onClick={analyze}
            disabled={loading || !niche}
            className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 h-[58px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Analyze Potential
          </button>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-20">
          <div className="glass-card p-6 rounded-3xl flex flex-col items-center text-center">
            <TrendingUp className="text-indigo-500 mb-4" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Demand Score</span>
            <p className="text-3xl font-black text-slate-900 mt-2">{data.demandScore}/100</p>
          </div>
          <div className="glass-card p-6 rounded-3xl flex flex-col items-center text-center">
            <DollarSign className="text-emerald-500 mb-4" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Target</span>
            <p className="text-xl font-bold text-slate-900 mt-2">{data.priceRange}</p>
          </div>
          <div className="glass-card p-6 rounded-3xl flex flex-col items-center text-center">
            <LayoutGrid className="text-rose-500 mb-4" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Best Platform</span>
            <p className="text-xl font-bold text-slate-900 mt-2">{data.topPlatform}</p>
          </div>
          <div className="glass-card p-6 rounded-3xl flex flex-col items-center text-center">
            <Palette className="text-amber-500 mb-4" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pro Colors</span>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {data.bestColors.map((color: string) => (
                <span key={color} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{color}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDemand;
