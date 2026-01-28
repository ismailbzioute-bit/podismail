
import React, { useState } from 'react';
import { Lightbulb, Loader2, Sparkles, Wand2, Copy, Check, AlertCircle, MessageSquare, LogIn } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';
import { useUser } from '../App.tsx';
import { NavLink } from 'react-router-dom';

const IdeaGenerator: React.FC = () => {
  const { useCredit, user, isGuest } = useUser();
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!niche) return;
    setError(null);
    
    if (isGuest) {
      setError("Guests cannot use AI generation. Please sign up to claim your 10 free credits!");
      return;
    }

    if (!user?.isPro && user?.credits === 0) {
      setError("Out of credits! Upgrade to Pro for unlimited creative designs.");
      return;
    }

    setLoading(true);
    try {
      const data = await geminiService.generateDesignIdeas(niche);
      if (data) {
        useCredit();
        setIdeas(data);
      }
    } catch (err) {
      setError("AI Engine is currently at capacity. Try again in a moment.");
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

  const openInChatGPT = (slogan: string) => {
    const prompt = encodeURIComponent(`I am a Print on Demand seller. Can you help me expand this design concept into a full series of slogans and provide marketing bullet points for Etsy: "${slogan}"`);
    window.open(`https://chatgpt.com/?q=${prompt}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-14 h-14 bg-amber-100 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-amber-100">
          <Lightbulb className="w-8 h-8 text-amber-600 fill-amber-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">Concept Forge</h1>
          <p className="text-slate-500 text-lg">AI-powered slogans that convert visitors into buyers.</p>
        </div>
      </div>

      <div className="flex gap-4 p-2 bg-white rounded-[2rem] shadow-xl border border-slate-100">
        <input 
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Enter a niche (e.g., Retirement Fishing)..."
          className="flex-1 h-16 px-8 rounded-2xl bg-transparent focus:outline-none text-xl font-bold"
        />
        <button 
          onClick={generate}
          disabled={loading || !niche}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-10 rounded-2xl font-black transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
          Forge Ideas
        </button>
      </div>

      {isGuest && (
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sparkles className="text-indigo-600 w-8 h-8" />
            <div>
              <p className="font-black text-indigo-900">Guest Access</p>
              <p className="text-sm text-indigo-700">Explore the interface for free. Sign up to unlock the generator!</p>
            </div>
          </div>
          <NavLink to="/auth" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Claim 10 Free Credits
          </NavLink>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea, idx) => (
          <div key={idx} className="glass-card rounded-[3rem] p-8 hover:shadow-2xl transition-all border-b-8 border-indigo-500 flex flex-col group">
            <div className="flex justify-between items-start mb-6">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                {idea.type}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => openInChatGPT(idea.slogan)}
                  title="Refine in ChatGPT"
                  className="p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => copyToClipboard(idea.slogan, idx)}
                  className="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-indigo-600"
                >
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <h3 className="text-2xl font-black mb-4 leading-tight">"{idea.slogan}"</h3>
            <p className="text-slate-500 mb-8 leading-relaxed italic text-sm">"{idea.concept}"</p>
            
            <div className="mt-auto space-y-6 pt-6 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Audience</span>
                <span className="text-sm font-bold text-slate-700">{idea.targetAudience}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Saturation</span>
                  <span className="text-[10px] font-black text-indigo-600">{idea.saturation}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${
                    idea.saturation > 70 ? 'bg-rose-400' : 'bg-emerald-400'
                  }`} style={{ width: `${idea.saturation}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && ideas.length === 0 && (
        <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <Sparkles className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <p className="text-slate-400 font-bold text-lg">Input your niche to forge viral slogans.</p>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
