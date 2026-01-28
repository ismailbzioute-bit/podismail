
import React, { useState } from 'react';
import { Camera, Download, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';

const MockupStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [mockup, setMockup] = useState<string | null>(null);

  const generate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const url = await geminiService.generateMockup(prompt);
      setMockup(url);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDownload = () => {
    if (!mockup) return;
    const link = document.createElement('a');
    link.href = mockup;
    link.download = `mockup-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
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
            <label className="text-xs font-black text-slate-400 uppercase mb-4 block">Design Prompt</label>
            <textarea 
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cool skeleton drinking coffee with retro sunglasses on a black distressed hoodie..."
              className="w-full p-6 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-lg leading-relaxed"
            />
            <button 
              onClick={generate}
              disabled={loading || !prompt}
              className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Generate Mockup
            </button>
          </div>

          <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Pro Tip
            </h4>
            <p className="text-slate-400 text-sm">
              Be specific about the lighting and garment type. Mention "cinematic lighting" or "streetwear lifestyle" for best results.
            </p>
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

export default MockupStudio;
