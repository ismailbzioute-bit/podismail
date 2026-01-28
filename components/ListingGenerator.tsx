
import React, { useState } from 'react';
import { FileEdit, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService.ts';

const ListingGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('Etsy');
  const [tone, setTone] = useState('Friendly');
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const data = await geminiService.generateListing(niche, platform, tone);
      setListing(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
          <FileEdit className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-black">AI Listing Copy</h1>
          <p className="text-slate-500">SEO-optimized titles and descriptions for any platform.</p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Niche / Design</label>
            <input 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Retro Cat Dad"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option>Etsy</option>
              <option>Amazon Merch</option>
              <option>Shopify</option>
              <option>Redbubble</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Tone</label>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option>Friendly</option>
              <option>Professional</option>
              <option>Funny</option>
              <option>Emotional</option>
            </select>
          </div>
        </div>
        <button 
          onClick={generate}
          disabled={loading || !niche}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Generate Optimized Listing
        </button>
      </div>

      {listing && (
        <div className="space-y-6 pb-20">
          <div className="glass-card p-8 rounded-3xl relative">
            <button onClick={() => copyToClipboard(listing.title, 'title')} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-lg hover:bg-slate-200">
              {copied === 'title' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4">Optimized Title</h3>
            <p className="text-xl font-bold text-slate-800 leading-tight">{listing.title}</p>
          </div>

          <div className="glass-card p-8 rounded-3xl relative">
            <button onClick={() => copyToClipboard(listing.description, 'desc')} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-lg hover:bg-slate-200">
              {copied === 'desc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4">Description</h3>
            <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{listing.description}</p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-4">SEO Tags ({listing.tags.length})</h3>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingGenerator;
