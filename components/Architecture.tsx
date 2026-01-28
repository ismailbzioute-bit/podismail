
import React from 'react';
import { Database, Server, Cpu, Globe, Lock, Code2, Sparkles } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4">Platform Architecture</h1>
        <p className="text-slate-500 text-lg">Detailed technical blueprint for PODIntel infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-bold">Data Schema (PostgreSQL)</h2>
          </div>
          <pre className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-xs overflow-x-auto">
{`-- Users & Subscriptions
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  tier VARCHAR(20) DEFAULT 'free',
  credits INTEGER DEFAULT 50,
  created_at TIMESTAMP
);

-- Niche Research Cache
CREATE TABLE niche_analysis (
  id SERIAL PRIMARY KEY,
  keyword VARCHAR(100) INDEX,
  volume INTEGER,
  competition_score FLOAT,
  buyer_intent VARCHAR(50),
  last_updated TIMESTAMP
);

-- Saved Design Ideas
CREATE TABLE design_ideas (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  phrase TEXT,
  niche VARCHAR(50),
  generated_at TIMESTAMP
);`}
          </pre>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Server className="w-6 h-6 text-emerald-500" />
            <h2 className="text-xl font-bold">API Intelligence Layer</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-800 text-sm">Trend Aggregator</h3>
              <p className="text-xs text-emerald-600">Scrapers for TikTok Creative Center, Pinterest Trends, and Etsy Search suggestions.</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-indigo-800 text-sm">LLM Processing</h3>
              <p className="text-xs text-indigo-600">Gemini-3-Flash for semantic keyword expansion and high-fidelity slogan generation.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm">Market Similarity engine</h3>
              <p className="text-xs text-slate-600">Vector database (Pinecone/pgvector) for detecting design saturation levels.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-10 rounded-[3rem] bg-indigo-900 text-white">
        <div className="flex items-center gap-4 mb-8">
          <Cpu className="w-10 h-10 text-indigo-400" />
          <h2 className="text-3xl font-black">System Flow</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-700">
              <Globe className="w-8 h-8" />
            </div>
            <h4 className="font-bold">Input</h4>
            <p className="text-sm text-indigo-300">Niche or Keyword from User</p>
          </div>
          <div className="hidden md:block w-12 h-0.5 bg-indigo-700"></div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-700">
              <Code2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold">Enrich</h4>
            <p className="text-sm text-indigo-300">Scrape + Gemini Expansion</p>
          </div>
          <div className="hidden md:block w-12 h-0.5 bg-indigo-700"></div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-indigo-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-700">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-bold">Logic</h4>
            <p className="text-sm text-indigo-300">Copyright + Trademark Check</p>
          </div>
          <div className="hidden md:block w-12 h-0.5 bg-indigo-700"></div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/50">
              {/* Fix: Added missing Sparkles icon import */}
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="font-bold">Output</h4>
            <p className="text-sm text-indigo-300">Optimized Listing & Assets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
