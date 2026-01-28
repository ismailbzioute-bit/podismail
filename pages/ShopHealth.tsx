
import React from 'react';
import { HeartPulse, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

const ShopHealth: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="74" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle cx="80" cy="80" r="74" fill="none" stroke="#6366f1" strokeWidth="8" strokeDasharray="465" strokeDashoffset="120" strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div>
              <div className="text-5xl font-black text-white">74</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Health Score</div>
            </div>
          </div>
          <h3 className="text-lg font-bold text-indigo-400 mb-2">Good Condition</h3>
          <p className="text-xs text-slate-500 px-4">Your shop is performing better than 82% of similar sellers.</p>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'SEO Coverage', score: 92, status: 'Healthy', icon: ShieldCheck, color: 'text-emerald-400' },
            { label: 'Conversion Rate', score: 45, status: 'Needs Focus', icon: HeartPulse, color: 'text-orange-400' },
            { label: 'Tag Diversity', score: 88, status: 'Healthy', icon: CheckCircle2, color: 'text-indigo-400' },
            { label: 'Visual Consistency', score: 61, status: 'Improving', icon: AlertTriangle, color: 'text-indigo-300' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-2 rounded-xl bg-slate-800 ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-800 ${s.color}`}>
                  {s.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{s.label}</h4>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-white">{s.score}%</span>
                <div className="flex-1 bg-slate-950 h-2 rounded-full mb-2 overflow-hidden">
                  <div className={`h-full ${s.color.replace('text', 'bg')}`} style={{ width: `${s.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Action Plan</h2>
          <span className="text-xs text-slate-500">Last updated: 2 hours ago</span>
        </div>
        <div className="divide-y divide-slate-800">
          {[
            { priority: 'High', task: 'Add alt-text to 14 listings in "Wall Art" category', time: '20 mins', impact: 'High' },
            { priority: 'Medium', task: 'Revise tags for low-converting holiday mugs', time: '45 mins', impact: 'Med' },
            { priority: 'Low', task: 'Analyze competitor pricing for digital prints', time: '15 mins', impact: 'Low' },
          ].map((item, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-800/20 transition-colors group cursor-pointer">
              <div className="flex gap-6 items-center">
                <div className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  item.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.priority}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-white">{item.task}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">⏱️ Est. {item.time}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">📈 Impact: {item.impact}</span>
                  </div>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopHealth;
