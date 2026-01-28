
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import KeywordIntelligence from './pages/KeywordIntelligence';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import ListingOptimizer from './pages/ListingOptimizer';
import TrendRadar from './pages/TrendRadar';
import ShopHealth from './pages/ShopHealth';
import Landing from './pages/Landing';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING: return <Landing onGetStarted={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.KEYWORDS: return <KeywordIntelligence />;
      case AppView.COMPETITOR: return <CompetitorAnalysis />;
      case AppView.OPTIMIZER: return <ListingOptimizer />;
      case AppView.TRENDS: return <TrendRadar />;
      case AppView.HEALTH: return <ShopHealth />;
      default: return <Dashboard />;
    }
  };

  if (currentView === AppView.LANDING) {
    return <Landing onGetStarted={() => setCurrentView(AppView.DASHBOARD)} />;
  }

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentView={currentView} />
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
