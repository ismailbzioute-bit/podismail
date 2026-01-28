
import React, { useState } from 'react';
import { Camera, Download, Loader2, Sparkles, Image as ImageIcon, Palette, LogIn } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';
import { useUser } from '../App.tsx';
import { NavLink } from 'react-router-dom';

const MockupStudio: React.FC = () => {
  const { user, isGuest, useCredit } = useUser();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [mockup, setMockup] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt) return;
    setError(null);

    if (isGuest) {
      setError("Guests cannot generate mockups. Please sign up to claim your 10 free credits!");
      return;
    }

    setLoading(true);
    try {
      const url = await geminiService.generateMockup(prompt);
      if (url) {
        useCredit();
        setMockup(url);
      }
    } catch (e) { 
      setError("AI generation failed. Try a simpler prompt.");
      console.error(e); 
    }
    finally { setLoading(false); }
  };

  const handleDownload = () => {
    if (!mockup) return;
    const link = document.createElement('a');
    link.href = mockup;
    link.download = `mockup-${Date.now()}.png`;
    link.click();
  };

  const openInCanva = () => {
    window.open('https://www.canva.com/design/play?type=TAB_T_SHIRT', '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-100">
          <Camera className="text-violet-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black">AI Mockup Studio</h1>
          <p className="text-slate-500">Visualize your designs on professional product models.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem] shadow-xl">
            <label className="text-xs font-black text-slate-400 uppercase mb-4 block">Garment & Design Prompt</label>
            <textarea 
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cool skeleton drinking coffee with retro sunglasses on a black distressed hoodie..."
              className="w-full p-6 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg leading-relaxed"
            />
            {error && <p className="text-rose-500 text-xs font-bold mt-2">{error}</p>}
            <button 
              onClick={generate}
              disabled={loading || !prompt}
              className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Generate Mockup
            </button>
          </div>

          {isGuest && (
            <div className="p-6 bg-violet-50 border border-violet-100 rounded-[2rem] text-center">
              <p className="text-sm font-bold text-violet-700 mb-3">Guests can browse prompts but need an account to generate visuals.</p>
              <NavLink to="/auth" className="inline-flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-xl font-bold text-xs">
                <LogIn className="w-3 h-3" />
                Sign Up Now
              </NavLink>
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              Canva Bridge
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Need to create the graphics first? Use our Canva integration to start designing immediately.
            </p>
            <button 
              onClick={openInCanva}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLinkIcon className="w-3 h-3" />
              Open Canva Designer
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {mockup ? (
            <div className="group relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={mockup} alt="Generated Mockup" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={handleDownload}
                  className="p-4 bg-white text-slate-900 rounded-2xl font-bold hover:scale-110 transition-transform flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 gap-4 bg-slate-50/50">
              {loading ? (
                <>
                  <Loader2 className="w-12 h-12 animate-spin text-indigo-400" />
                  <p className="font-bold text-indigo-400">Rendering visual...</p>
                </>
              ) : (
                <>
                  <ImageIcon className="w-16 h-16" />
                  <p className="font-bold">Enter a prompt to start</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default MockupStudio;
