import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function ScoringDashboard({ review }) {
  if (!review) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
        <p className="text-gray-400">No review data to display</p>
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
    { key: 'Bugs', label: 'Bugs', value: review.categoryCounts?.Bugs || 0, color: 'text-red-400' },
    { key: 'Quality', label: 'Quality', value: review.categoryCounts?.Quality || 0, color: 'text-blue-400' },
    { key: 'Performance', label: 'Performance', value: review.categoryCounts?.Performance || 0, color: 'text-amber-400' },
    { key: 'Security', label: 'Security', value: review.categoryCounts?.Security || 0, color: 'text-purple-400' },
    { key: 'BestPractices', label: 'Best Practices', value: review.categoryCounts?.BestPractices || 0, color: 'text-emerald-400' },
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
      fill: '#374151',
    },
  ];

  const severityCount = {
    Critical: review.issues?.filter((i) => i.severity === 'Critical').length || 0,
    Warning: review.issues?.filter((i) => i.severity === 'Warning').length || 0,
    Info: review.issues?.filter((i) => i.severity === 'Info').length || 0,
  };

  return (
    <div className="dashboard-card h-full rounded-lg p-4 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        <aside className="dashboard-inner-card p-4 rounded-lg lg:col-span-4 xl:col-span-3">
          <h3 className="text-lg font-bold mb-4 text-slate-100">Review Sidebar</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2">
              <span className="text-slate-300">Overall Score</span>
              <span className="font-bold text-slate-100">{overallScore}/100</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-700 pb-2">
              <span className="text-slate-300">Issues by Category</span>
              <span className="font-bold text-slate-100">{totalIssues}</span>
            </div>
            {sidebarStats.map((item) => (
              <div key={item.key} className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span className="text-slate-300">{item.label}</span>
                <span className={`font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="text-slate-300">Critical</span>
              <span className="font-semibold text-red-400">{severityCount.Critical}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Warning</span>
              <span className="font-semibold text-amber-400">{severityCount.Warning}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Info</span>
              <span className="font-semibold text-blue-400">{severityCount.Info}</span>
            </div>
          </div>
        </aside>

        <section className="space-y-4 lg:col-span-8 xl:col-span-9">
          <div className="dashboard-inner-card p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-slate-100">Overall Health Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <ResponsiveContainer width={128} height={128}>
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={2}
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
                    <p className="text-2xl font-bold text-slate-100">{overallScore}</p>
                    <p className="text-xs text-gray-400">/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-inner-card p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4 text-slate-100">Issues by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#d1deef' }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12, fill: '#d1deef' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#172235',
                    color: '#e6edf7',
                    border: '1px solid #39517a',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="#4f8cff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}