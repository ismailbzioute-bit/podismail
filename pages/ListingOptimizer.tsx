
import React, { useState } from 'react';
import { PenTool, CheckCircle, Copy, RefreshCw, BarChart } from 'lucide-react';
import { generateListingOptimization } from '../services/geminiService';

const ListingOptimizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState('Professional');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const result = await generateListingOptimization(input, tone);
      setOutput(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white">
              <PenTool size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Input Details</h2>
              <p className="text-sm text-slate-500">Describe your product for the AI</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Product Description</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Handmade ceramic mug with blue glaze, 12oz, dishwasher safe..."
                className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['Minimal', 'Emotional', 'Professional'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                    tone === t 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !input}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 mt-4"
            >
              {loading ? <RefreshCw className="animate-spin" /> : <PenTool size={20} />}
              {loading ? 'Generating SEO Strategy...' : 'Generate Listing'}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <div className="text-lg font-bold text-white">{output ? output.seoScore : '--'}</div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="32" cy="32" r="28"
                  fill="none" stroke="#6366f1"
                  strokeWidth="4"
                  strokeDasharray={`${output ? output.seoScore * 1.76 : 0} 176`}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white">Live SEO Meter</h3>
              <p className="text-sm text-slate-500">Based on Etsy A10 Algorithm</p>
            </div>
          </div>
          <BarChart className="text-slate-700" size={32} />
        </div>
      </div>

      <div className="space-y-6">
        {output ? (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <CheckCircle size={18} className="text-indigo-400" /> Optimized Title
                </h3>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                  <Copy size={16} />
                </button>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 font-medium">
                {output.title}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <CheckCircle size={18} className="text-indigo-400" /> 13 High-Growth Tags
                </h3>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {output.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-indigo-300 text-xs font-bold rounded-lg hover:border-indigo-500/50 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <CheckCircle size={18} className="text-indigo-400" /> Conversion Description
                </h3>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                  <Copy size={16} />
                </button>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-400 leading-relaxed whitespace-pre-line max-h-64 overflow-y-auto custom-scrollbar">
                {output.description}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center opacity-50">
            <PenTool size={48} className="text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-600">Your AI-generated listing will appear here</h3>
            <p className="text-sm text-slate-700 mt-2">Enter your product details on the left to start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingOptimizer;
