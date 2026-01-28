
import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Lightbulb, 
  BarChart3, 
  FileEdit, 
  Radar, 
  ShieldCheck,
  Info,
  Camera,
  Crown
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../App.tsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Search, label: 'Keyword Intel', path: '/keywords' },
  { icon: Lightbulb, label: 'Design Generator', path: '/ideas' },
  { icon: Camera, label: 'Mockup Studio', path: '/mockups' },
  { icon: BarChart3, label: 'Product Demand', path: '/demand' },
  { icon: FileEdit, label: 'Listing Copy', path: '/listings' },
  { icon: Radar, label: 'Trend Radar', path: '/trends' },
  { icon: ShieldCheck, label: 'Saturation Check', path: '/saturation' },
  { icon: Info, label: 'System Arch', path: '/architecture' },
];

const Sidebar: React.FC = () => {
  const { user, upgrade } = useUser();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-slate-300 flex flex-col z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Radar className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter font-display uppercase">POD<span className="text-indigo-400">Intel</span></h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className={`w-5 h-5 ${item.icon === Camera ? 'text-amber-400' : ''}`} />
              <span className="font-bold text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-800/80 rounded-[2rem] p-5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Plan: {user?.isPro ? 'Pro' : 'Free'}</span>
            {!user?.isPro && (
               <button onClick={upgrade} className="p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                 <Crown className="w-3 h-3" />
               </button>
            )}
          </div>
          <div className="flex items-end justify-between mb-2">
             <p className="text-xl font-black text-white">{user?.credits}</p>
             <p className="text-[10px] font-bold text-slate-500">Credits Left</p>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full bg-indigo-500 transition-all duration-500`} style={{ width: `${user?.isPro ? 100 : (user?.credits || 0) * 10}%` }}></div>
          </div>
        </div>

        <div className="text-center">
           <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">v2.4.0 Production</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
