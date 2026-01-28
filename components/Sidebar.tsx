
import React from 'react';
import { AppView } from '../types';
import { 
  LayoutDashboard, 
  Search, 
  Target, 
  PenTool, 
  Zap, 
  HeartPulse, 
  LogOut,
  Flower2
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { view: AppView.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { view: AppView.KEYWORDS, label: 'Keyword Intel', icon: Search },
    { view: AppView.COMPETITOR, label: 'Competitor Reverse', icon: Target },
    { view: AppView.OPTIMIZER, label: 'AI Optimizer', icon: PenTool },
    { view: AppView.TRENDS, label: 'Trend Radar', icon: Zap },
    { view: AppView.HEALTH, label: 'Shop Health', icon: HeartPulse },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#020617] transition-all hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
          <Flower2 size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Bloom SEO</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.view
                ? 'bg-indigo-600/10 text-indigo-400 font-medium border border-indigo-500/20 shadow-inner shadow-indigo-500/10'
                : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            {currentView === item.view && (
              <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 mb-4">
          <p className="text-xs font-semibold text-indigo-400 mb-1">CREDITS REMAINING</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-white">420 / 1000</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[42%]" />
          </div>
          <button className="w-full mt-4 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg transition-colors">
            UPGRADE PLAN
          </button>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
