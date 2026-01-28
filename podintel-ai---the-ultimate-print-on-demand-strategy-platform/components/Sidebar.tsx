
import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Lightbulb, 
  BarChart3, 
  FileEdit, 
  Radar, 
  ShieldCheck,
  Info
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Search, label: 'Keyword Intel', path: '/keywords' },
  { icon: Lightbulb, label: 'Design Generator', path: '/ideas' },
  { icon: BarChart3, label: 'Product Demand', path: '/demand' },
  { icon: FileEdit, label: 'Listing Copy', path: '/listings' },
  { icon: Radar, label: 'Trend Radar', path: '/trends' },
  { icon: ShieldCheck, label: 'Saturation Check', path: '/saturation' },
  { icon: Info, label: 'System Arch', path: '/architecture' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-slate-300 flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Radar className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight font-display">PODIntel</h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-2xl p-4">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Plan</p>
          <p className="text-sm font-bold text-white mb-3">Enterprise Pro</p>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
            <div className="w-3/4 h-full bg-indigo-500"></div>
          </div>
          <p className="text-[10px] text-slate-400 text-right">75% Credits Used</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
