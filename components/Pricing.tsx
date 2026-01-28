
import React from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useUser } from '../App.tsx';

const Pricing: React.FC = () => {
  const { user, upgrade } = useUser();

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in">
      <div className="text-center">
        <h1 className="text-5xl font-black mb-4">Choose Your Growth Plan</h1>
        <p className="text-slate-500 text-lg">Scale your POD business with professional-grade intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-1">Starter</h3>
            <p className="text-slate-400 text-sm">Great for testing the waters.</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black">$0</span>
              <span className="text-slate-400 font-medium">/mo</span>
            </div>
          </div>
          <div className="space-y-4 mb-10 flex-1">
            <Feature item="10 AI Credits / month" />
            <Feature item="Basic Keyword Search" />
            <Feature item="Design Ideas" />
            <Feature item="Standard Support" />
          </div>
          <button disabled className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="p-8 bg-slate-900 rounded-[3rem] shadow-2xl relative border-4 border-indigo-500 flex flex-col scale-105 z-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            Most Popular
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-1">Pro Seller</h3>
            <p className="text-slate-400 text-sm">For serious entrepreneurs.</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">$29</span>
              <span className="text-slate-400 font-medium">/mo</span>
            </div>
          </div>
          <div className="space-y-4 mb-10 flex-1">
            <Feature item="Unlimited Credits" textWhite />
            <Feature item="Advanced Mockup Studio" textWhite />
            <Feature item="Bulk Keyword Export" textWhite />
            <Feature item="Trend Velocity Tracking" textWhite />
            <Feature item="Priority AI Processing" textWhite />
          </div>
          <button 
            onClick={upgrade}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30"
          >
            {user?.isPro ? 'Pro Active' : 'Upgrade to Pro'}
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-1">Agency</h3>
            <p className="text-slate-400 text-sm">For teams and high-volume shops.</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black">$99</span>
              <span className="text-slate-400 font-medium">/mo</span>
            </div>
          </div>
          <div className="space-y-4 mb-10 flex-1">
            <Feature item="Team Collaboration (5 users)" />
            <Feature item="Custom AI Training" />
            <Feature item="White-label Reports" />
            <Feature item="Dedicated Account Manager" />
            <Feature item="API Access" />
          </div>
          <button className="w-full py-4 border-2 border-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ item, textWhite }: { item: string; textWhite?: boolean }) => (
  <div className="flex items-center gap-3">
    <Check className={`w-5 h-5 ${textWhite ? 'text-indigo-400' : 'text-indigo-600'}`} />
    <span className={`text-sm font-medium ${textWhite ? 'text-slate-300' : 'text-slate-600'}`}>{item}</span>
  </div>
);

export default Pricing;
