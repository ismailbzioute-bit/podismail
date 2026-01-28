
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import KeywordTool from './components/KeywordTool.tsx';
import IdeaGenerator from './components/IdeaGenerator.tsx';
import TrendRadar from './components/TrendRadar.tsx';
import Architecture from './components/Architecture.tsx';

// Placeholders for remaining tools
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mb-6">
      <span className="text-4xl">🛠️</span>
    </div>
    <h2 className="text-3xl font-black mb-2">{title}</h2>
    <p className="text-slate-500 max-w-md">Our engineers are training the AI models to master this specific feature. Stay tuned!</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
        <Sidebar />
        
        <main className="flex-1 ml-64 min-h-screen p-8 relative overflow-y-auto">
          {/* Header blur overlay */}
          <div className="fixed top-0 right-0 left-64 h-16 bg-slate-50/80 backdrop-blur-md z-40 border-b border-slate-200/50 flex items-center justify-end px-8 gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Live</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
          </div>

          <div className="pt-16 pb-20">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/keywords" element={<KeywordTool />} />
              <Route path="/ideas" element={<IdeaGenerator />} />
              <Route path="/demand" element={<ComingSoon title="Product Demand Analyzer" />} />
              <Route path="/listings" element={<ComingSoon title="Listing & Copy Generator" />} />
              <Route path="/trends" element={<TrendRadar />} />
              <Route path="/saturation" element={<ComingSoon title="Design Saturation Checker" />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Persistent Footer CTA */}
          <div className="fixed bottom-6 right-8 z-50">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all font-bold">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              Analyze Current Page
            </button>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
