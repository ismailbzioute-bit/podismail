
import React, { useState } from 'react';
import { Share2, Check, Power, RefreshCw, AlertCircle, ExternalLink, ShieldCheck, Palette, MessageSquare } from 'lucide-react';

interface PlatformIntegration {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  type: 'Marketplace' | 'Production' | 'Design' | 'AI Tool';
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>([
    { id: 'etsy', name: 'Etsy', icon: 'https://www.vectorlogo.zone/logos/etsy/etsy-icon.svg', status: 'connected', lastSync: '10 mins ago', type: 'Marketplace' },
    { id: 'canva', name: 'Canva', icon: <Palette className="w-8 h-8 text-cyan-500" />, status: 'disconnected', type: 'Design' },
    { id: 'chatgpt', name: 'ChatGPT (OpenAI)', icon: <MessageSquare className="w-8 h-8 text-emerald-600" />, status: 'disconnected', type: 'AI Tool' },
    { id: 'shopify', name: 'Shopify Store', icon: 'https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg', status: 'disconnected', type: 'Marketplace' },
    { id: 'printify', name: 'Printify', icon: 'https://printify.com/wp-content/uploads/2019/04/printify_logo_short.png', status: 'connected', lastSync: '2 hours ago', type: 'Production' },
    { id: 'amazon', name: 'Amazon Merch', icon: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg', status: 'disconnected', type: 'Marketplace' },
  ]);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleConnection = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setIntegrations(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === 'connected' ? 'disconnected' : 'connected',
            lastSync: item.status === 'disconnected' ? 'Just now' : item.lastSync
          };
        }
        return item;
      }));
      setLoadingId(null);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Platform Connectors</h1>
          <p className="text-slate-500 text-lg">Unify your POD workflow with Canva, ChatGPT, and top marketplaces.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          Secure API Tunneling
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((platform) => (
          <div key={platform.id} className={`glass-card p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-2xl group ${
            platform.status === 'connected' ? 'border-emerald-100' : 'border-slate-100'
          }`}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 p-3 flex items-center justify-center border border-slate-100 overflow-hidden">
                {typeof platform.icon === 'string' ? (
                  <img src={platform.icon} alt={platform.name} className="max-w-full max-h-full object-contain grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                ) : (
                  platform.icon
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                platform.status === 'connected' ? 'bg-emerald-100 text-emerald-700' : 
                platform.status === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400'
              }`}>
                {platform.status}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-1">{platform.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{platform.type}</p>
              {platform.status === 'connected' && (
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <RefreshCw className="w-3 h-3 text-emerald-500" />
                  Last sync: {platform.lastSync}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => toggleConnection(platform.id)}
                disabled={loadingId === platform.id}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  platform.status === 'connected' 
                    ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                }`}
              >
                {loadingId === platform.id ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : platform.status === 'connected' ? (
                  <>
                    <Power className="w-4 h-4" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Connect
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        <div className="p-8 border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-100 hover:bg-indigo-50/10 transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-all">
            <Share2 className="text-slate-300 group-hover:text-indigo-500 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-400 group-hover:text-indigo-600">New Connector</h4>
          <p className="text-xs text-slate-300 mt-2">Request a custom API link.</p>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
