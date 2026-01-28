
import React from 'react';
import { AppView } from '../types';
import { Search, Bell, User, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const formatTitle = (view: AppView) => {
    return view.charAt(0).toUpperCase() + view.slice(1);
  };

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {formatTitle(currentView)}
        </h1>
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 gap-2 w-64">
          <Search size={16} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search keywords..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors relative">
          <Bell size={20} className="text-slate-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <Settings size={20} className="text-slate-400" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-200">The Bloom Shop</p>
            <p className="text-[10px] text-slate-500">Pro Plan</p>
          </div>
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            BS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
