import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function ScoringDashboard({ review }) {
  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center h-full glass-panel rounded-2xl p-6 text-center border border-white/5 min-h-[260px]">
        <div className="text-4xl mb-3 animate-pulse">📊</div>
        <p className="text-sm font-semibold text-slate-300 font-heading">Analytics Dashboard Offline</p>
        <p className="text-xs text-slate-500 max-w-xs mt-1">Submit your code to view statistical breakdowns and charts.</p>
      </div>
    );
  }

  const categoryData = [
    { name: 'Bugs', value: review.categoryCounts?.Bugs || 0 },
    { name: 'Quality', value: review.categoryCounts?.Quality || 0 },
    { name: 'Performance', value: review.categoryCounts?.Performance || 0 },
    { name: 'Security', value: review.categoryCounts?.Security || 0 },
    { name: 'Best Practices', value: review.categoryCounts?.BestPractices || 0 },
  ];

  const overallScore = review.overallScore ?? 0;

  const scoreData = [
    {
      name: 'Score',
      value: overallScore,
      fill: overallScore >= 80 ? '#10b981' : overallScore >= 60 ? '#f59e0b' : '#ef4444',
    },
    {
      name: 'Potential',
      value: 100 - overallScore,
      fill: '#1e293b',
    },
  ];

  const severityCount = {
    Critical: review.issues?.filter((i) => i.severity === 'Critical').length || 0,
    Warning: review.issues?.filter((i) => i.severity === 'Warning').length || 0,
    Info: review.issues?.filter((i) => i.severity === 'Info').length || 0,
  };

  return (
    <div className="glass-panel h-full rounded-2xl p-5 overflow-y-auto border border-white/5 space-y-4 flex flex-col justify-between">
      {/* Top section: Overall Health Score & Severity Counters */}
      <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-center justify-between shadow-inner gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold font-heading text-slate-200 uppercase tracking-wider mb-1">Code Health</h3>
          <p className="text-[11px] text-slate-400 leading-normal font-sans mb-3">Based on audited guidelines.</p>
          <div className="flex flex-wrap gap-2 text-[10px]">
            <span className="text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded font-heading">
              🐛 {severityCount.Critical} Critical
            </span>
            <span className="text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-heading">
              ⚠️ {severityCount.Warning} Warnings
            </span>
            <span className="text-sky-400 font-semibold bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded font-heading">
              ℹ️ {severityCount.Info} Info
            </span>
          </div>
        </div>
        
        <div className="relative w-24 h-24 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={scoreData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={42}
                paddingAngle={3}
                dataKey="value"
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-extrabold text-slate-100 font-heading leading-none">{overallScore}</p>
              <p className="text-[8px] text-slate-500 uppercase font-heading mt-0.5">health</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section: Issues Distribution Bar Chart */}
      <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl shadow-inner flex-1 flex flex-col justify-between min-h-[190px]">
        <h3 className="text-xs font-bold font-heading text-slate-200 uppercase tracking-wider mb-3">Issues Distribution</h3>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} height={20} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(8, 12, 26, 0.95)',
                  color: '#f8fafc',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {categoryData.map((entry, index) => {
                  const colors = ['#f43f5e', '#8b5cf6', '#f59e0b', '#0ea5e9', '#10b981'];
                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}