
import React from 'react';
import { ShieldCheck, Zap, BarChart3, Rocket, CheckCircle2, Star, Users, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="text-indigo-600 w-8 h-8 fill-indigo-600" />
          <span className="text-2xl font-black tracking-tighter uppercase">POD<span className="text-indigo-600">Intel</span></span>
        </div>
        <div className="flex items-center gap-6">
          <NavLink to="/auth" className="text-sm font-bold text-slate-600 hover:text-indigo-600">Login</NavLink>
          <NavLink to="/auth" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">Get Started</NavLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full mb-8 border border-indigo-100 animate-bounce">
          <Star className="w-4 h-4 fill-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-widest">The #1 POD Research Suite</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Viral Design</span> Before Your Competition.
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate AI-powered intelligence platform for Etsy, Amazon Merch, and Shopify sellers. Validate niches, generate slogans, and create professional mockups in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink to="/auth" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2">
            Register Now - Free Credits
            <ArrowRight className="w-5 h-5" />
          </NavLink>
          <a href="#features" className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Everything You Need To Scale</h2>
            <p className="text-slate-500">Professional-grade tools for serious Print-on-Demand creators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BarChart3} 
              title="Keyword Intelligence" 
              desc="Real-time search volume and competition analysis across Etsy, Amazon, and Redbubble." 
            />
            <FeatureCard 
              icon={Zap} 
              title="Design Idea Generator" 
              desc="Never run out of inspiration. AI-generated slogans and concepts for your specific niches." 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Saturation Checker" 
              desc="Avoid copyright risks and saturated slogans. Know your profit potential before you design." 
            />
          </div>
        </div>
      </section>

      {/* Sign Up / Register Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-64 -mt-64"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join 10,000+ POD Sellers</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-xl mx-auto">
            Stop guessing. Start growing. Create your free account today and get 10 AI credits to analyze your first niche.
          </p>
          <div className="flex justify-center">
            <NavLink to="/auth" className="bg-white text-indigo-600 px-12 py-6 rounded-[2rem] font-black text-2xl hover:scale-105 transition-transform shadow-2xl">
              Register for FREE Account
            </NavLink>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-indigo-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-sm font-bold uppercase tracking-widest">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="text-sm font-bold uppercase tracking-widest">10 Free Credits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600 w-6 h-6 fill-indigo-600" />
            <span className="text-xl font-black tracking-tighter uppercase">PODIntel</span>
          </div>
          <p className="text-slate-400 text-sm">© 2025 PODIntel AI. Built for the modern ecommerce entrepreneur.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="text-indigo-600 w-8 h-8" />
    </div>
    <h3 className="text-2xl font-black mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
