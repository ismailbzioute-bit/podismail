
import React from 'react';
import { Flower2, ArrowRight, Check, Zap, Shield, BarChart2 } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <Flower2 size={24} />
          </div>
          <span className="text-xl font-bold">Bloom SEO</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Testimonials</a>
          <a href="#" className="hover:text-white transition-colors">AI Ethics</a>
        </div>
        <button 
          onClick={onGetStarted}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
        >
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-xs font-bold mb-8 animate-bounce">
          <Zap size={14} /> NEW: GEN-3 AI OPTIMIZER IS LIVE
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent leading-[1.1]">
          Etsy SEO that actually <br /> grows your shop.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one intelligence platform that outperforms eRank. Stop guessing keywords and let Bloom AI predict your next best-seller.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onGetStarted}
            className="group w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            Start Growing for Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
            Watch Demo
          </button>
        </div>

        <div className="mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="https://picsum.photos/1200/600?grayscale" 
            alt="Bloom Dashboard Preview" 
            className="relative rounded-3xl border border-slate-800 shadow-2xl mx-auto grayscale opacity-50"
          />
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-950 py-24 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'AI-First Intelligence', desc: 'Not just raw data. Real actionable insights powered by Gemini 3 Pro.', icon: Zap },
            { title: 'Reverse Engineering', desc: 'Paste any competitor URL and see exactly how they rank. No secrets left.', icon: Shield },
            { title: 'Predictive Trends', desc: 'We correlate Pinterest and TikTok data to find niches before they explode.', icon: BarChart2 },
          ].map((feature, i) => (
            <div key={i} className="space-y-4">
              <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; 2024 Bloom SEO Intelligence. All rights reserved. Not affiliated with Etsy, Inc.</p>
      </footer>
    </div>
  );
};

export default Landing;
