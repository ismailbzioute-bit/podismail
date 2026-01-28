
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './components/Dashboard.tsx';
import KeywordTool from './components/KeywordTool.tsx';
import IdeaGenerator from './components/IdeaGenerator.tsx';
import TrendRadar from './components/TrendRadar.tsx';
import Architecture from './components/Architecture.tsx';
import ListingGenerator from './components/ListingGenerator.tsx';
import ProductDemand from './components/ProductDemand.tsx';
import SaturationChecker from './components/SaturationChecker.tsx';
import MockupStudio from './components/MockupStudio.tsx';
import Auth from './components/Auth.tsx';

// Simple Context for User Session & Credits
interface UserData {
  name: string;
  email: string;
  credits: number;
  isPro: boolean;
}

interface UserContextType {
  user: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
  useCredit: () => boolean;
  upgrade: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('podintel_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data: UserData) => {
    setUser(data);
    localStorage.setItem('podintel_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('podintel_user');
  };

  const useCredit = () => {
    if (!user) return false;
    if (user.isPro) return true;
    if (user.credits <= 0) return false;
    
    const updated = { ...user, credits: user.credits - 1 };
    setUser(updated);
    localStorage.setItem('podintel_user', JSON.stringify(updated));
    return true;
  };

  const upgrade = () => {
    if (!user) return;
    const updated = { ...user, isPro: true, credits: 999 };
    setUser(updated);
    localStorage.setItem('podintel_user', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, useCredit, upgrade }}>
      <Router>
        <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
          {user && <Sidebar />}
          
          <main className={`flex-1 ${user ? 'ml-64' : ''} min-h-screen relative overflow-y-auto`}>
            {user && (
              <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-xl z-40 border-b border-slate-100 flex items-center justify-between px-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Global Markets Live</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">{user.name}</p>
                    <button onClick={logout} className="text-[10px] font-bold text-slate-400 uppercase hover:text-rose-500 transition-colors">Sign Out</button>
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </header>
            )}

            <div className={user ? "pt-28 pb-10 px-10" : "flex items-center justify-center min-h-screen bg-slate-50"}>
              <Routes>
                {user ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/keywords" element={<KeywordTool />} />
                    <Route path="/ideas" element={<IdeaGenerator />} />
                    <Route path="/demand" element={<ProductDemand />} />
                    <Route path="/listings" element={<ListingGenerator />} />
                    <Route path="/trends" element={<TrendRadar />} />
                    <Route path="/mockups" element={<MockupStudio />} />
                    <Route path="/saturation" element={<SaturationChecker />} />
                    <Route path="/architecture" element={<Architecture />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                ) : (
                  <>
                    <Route path="/auth" element={<Auth onLogin={login} />} />
                    <Route path="*" element={<Navigate to="/auth" replace />} />
                  </>
                )}
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
