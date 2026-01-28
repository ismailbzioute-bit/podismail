
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Zap,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, trends: 2400 },
  { name: 'Tue', revenue: 3000, trends: 1398 },
  { name: 'Wed', revenue: 2000, trends: 9800 },
  { name: 'Thu', revenue: 2780, trends: 3908 },
  { name: 'Fri', revenue: 1890, trends: 4800 },
  { name: 'Sat', revenue: 2390, trends: 3800 },
  { name: 'Sun', revenue: 3490, trends: 4300 },
];

const StatCard = ({ icon: Icon, label, value, change, positive }: any) => (
  <div className="glass-card p-6 rounded-3xl">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, Strategist</h1>
          <p className="text-slate-500 mt-1">Here's what's happening in the POD markets today.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Quick Analysis</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={TrendingUp} label="Global Search Vol" value="1.2M+" change="+12.5%" positive={true} />
        <StatCard icon={Users} label="Buyer Intent" value="High" change="+4.2%" positive={true} />
        <StatCard icon={ShoppingBag} label="Top Niche" value="Coffee Humor" change="-2.1%" positive={false} />
        <StatCard icon={Zap} label="Rising Trends" value="14 New" change="+200%" positive={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            Market Interest Over Time
            <InfoIcon />
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl flex flex-col">
          <h2 className="text-xl font-bold mb-6">Hot Platforms</h2>
          <div className="space-y-6 flex-1">
            {[
              { name: 'Etsy', color: 'bg-orange-500', value: 85 },
              { name: 'Amazon Merch', color: 'bg-indigo-600', value: 72 },
              { name: 'Redbubble', color: 'bg-rose-500', value: 45 },
              { name: 'Shopify', color: 'bg-emerald-500', value: 64 },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>{p.name}</span>
                  <span className="text-slate-500">{p.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color}`} style={{ width: `${p.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-indigo-600 font-bold border-2 border-indigo-50 border-dashed rounded-2xl hover:bg-indigo-50 transition-colors">
            View Platform Details
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoIcon = () => (
  <svg className="w-4 h-4 text-slate-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Dashboard;
