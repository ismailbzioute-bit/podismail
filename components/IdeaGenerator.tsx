
import React, { useState } from 'react';
import { Lightbulb, Loader2, Sparkles, Wand2, Copy, Check } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';

const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const data = await geminiService.generateDesignIdeas(niche);
      setIdeas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Design Concept Generator</h1>
          <p className="text-slate-500">From keywords to viral design blueprints.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <input 
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Enter a niche (e.g., Retiree Golfing)..."
          className="flex-1 h-16 px-6 rounded-2xl glass-card focus:ring-2 focus:ring-indigo-500 border-none outline-none text-lg font-medium"
        />
        <button 
          onClick={generate}
          disabled={loading || !niche}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-8 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
          Generate Ideas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea, idx) => (
          <div key={idx} className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-b-4 border-indigo-500">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {idea.type}
                </span>
                <button 
                  onClick={() => copyToClipboard(idea.slogan, idx)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-indigo-600"
                >
                  {copiedIndex === idx ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 font-display">"{idea.slogan}"</h3>
              <p className="text-slate-600 mb-6 leading-relaxed italic">{idea.concept}</p>
              
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase w-20">Audience</span>
                  <span className="text-sm font-semibold text-slate-700">{idea.targetAudience}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase w-20">Saturation</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${idea.saturation}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && ideas.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">Input your niche above to see creative design sparks.</p>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
