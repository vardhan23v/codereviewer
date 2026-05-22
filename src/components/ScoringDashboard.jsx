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

  const totalIssues = categoryData.reduce((sum, cat) => sum + cat.value, 0);
  const overallScore = review.overallScore ?? 0;

  const sidebarStats = [
    { key: 'Bugs', label: '🐛 Bugs', value: review.categoryCounts?.Bugs || 0, color: 'text-rose-400' },
    { key: 'Quality', label: '✨ Quality', value: review.categoryCounts?.Quality || 0, color: 'text-violet-400' },
    { key: 'Performance', label: '⚡ Performance', value: review.categoryCounts?.Performance || 0, color: 'text-amber-400' },
    { key: 'Security', label: '🔒 Security', value: review.categoryCounts?.Security || 0, color: 'text-sky-400' },
    { key: 'BestPractices', label: '📋 Best Practices', value: review.categoryCounts?.BestPractices || 0, color: 'text-emerald-400' },
  ];

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
    <div className="glass-panel h-full rounded-2xl p-5 overflow-y-auto border border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
        {/* Left Side stats panel */}
        <aside className="bg-slate-950/40 border border-white/5 p-4 rounded-xl lg:col-span-4 xl:col-span-3 shadow-inner">
          <h3 className="text-sm font-bold font-heading mb-4 text-slate-100 uppercase tracking-wider">Metrics Panel</h3>
          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Overall Score</span>
              <span className="font-bold text-slate-100 font-heading">{overallScore}/100</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Total Recommendations</span>
              <span className="font-bold text-slate-100 font-heading">{totalIssues}</span>
            </div>
            {sidebarStats.map((item) => (
              <div key={item.key} className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">{item.label}</span>
                <span className={`font-bold ${item.color} font-heading`}>{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="text-slate-400">🚨 Critical</span>
              <span className="font-semibold text-rose-400 font-heading">{severityCount.Critical}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">⚠️ Warning</span>
              <span className="font-semibold text-amber-400 font-heading">{severityCount.Warning}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ℹ️ Info</span>
              <span className="font-semibold text-sky-400 font-heading">{severityCount.Info}</span>
            </div>
          </div>
        </aside>

        {/* Charts Section */}
        <section className="space-y-5 lg:col-span-8 xl:col-span-9 flex flex-col justify-between">
          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-around shadow-inner gap-4">
            <div>
              <h3 className="text-sm font-bold font-heading text-slate-200 uppercase tracking-wider mb-2 text-center sm:text-left">Code Health Score</h3>
              <p className="text-xs text-slate-400 max-w-xs text-center sm:text-left">Based on weighted severity of issues found across all audited guidelines.</p>
            </div>
            <div className="relative w-28 h-28 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={50}
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
                  <p className="text-xl font-extrabold text-slate-100 font-heading leading-none">{overallScore}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-heading mt-0.5">health</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl shadow-inner flex-1 flex flex-col justify-between min-h-[220px]">
            <h3 className="text-sm font-bold font-heading text-slate-200 uppercase tracking-wider mb-4">Issues Distribution</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} height={20} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(8, 12, 26, 0.95)',
                      color: '#f8fafc',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryData.map((entry, index) => {
                      const colors = ['#f43f5e', '#8b5cf6', '#f59e0b', '#0ea5e9', '#10b981'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}