
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ALL_PROBLEMS, CSP_HISTORY_STATS } from '../constants';
import { Difficulty, AlgorithmType, ProblemStatus } from '../types';

interface DashboardProps {
  problemProgress: Record<string, ProblemStatus>;
}

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

const Dashboard: React.FC<DashboardProps> = ({ problemProgress }) => {
  
  // --- 1. PROGRESS BY DIFFICULTY ---
  const progressStats = useMemo(() => {
    const diffLevels = ['T1', 'T2', 'T3', 'T4'];
    return diffLevels.map(diff => {
      const problemsInDiff = ALL_PROBLEMS.filter(p => p.difficulty === diff);
      const total = problemsInDiff.length;
      
      let completed = 0;
      let flagged = 0;
      let incomplete = 0;

      problemsInDiff.forEach(p => {
        const status = problemProgress[p.id] || 'incomplete';
        if (status === 'completed') completed++;
        else if (status === 'flagged') flagged++;
        else incomplete++;
      });

      return {
        name: diff,
        completed,
        flagged,
        incomplete,
        total
      };
    });
  }, [problemProgress]);

  const statsTopics = useMemo(() => {
    const topicCounts: Record<string, number> = {};
    ALL_PROBLEMS.forEach(p => {
      p.tags.forEach(tag => {
        topicCounts[tag] = (topicCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(topicCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7);
  }, []);

  const historyTopicStats = useMemo(() => {
    const topicCounts: Record<string, number> = {};
    CSP_HISTORY_STATS.forEach(year => {
      year.problems.forEach(p => {
        p.tags.forEach(tag => {
          topicCounts[tag] = (topicCounts[tag] || 0) + 1;
        });
      });
    });
    return Object.entries(topicCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="space-y-8">
      {/* TOP ROW: KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Exam Countdown</h3>
           <p className="text-4xl font-bold text-slate-900 mt-2">142 <span className="text-sm font-normal text-slate-400">Days</span></p>
           <p className="text-xs text-brand-600 mt-2 font-medium">Target: October 2025</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Problems</h3>
           <p className="text-4xl font-bold text-slate-900 mt-2">{ALL_PROBLEMS.length}</p>
           <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Completed: {Object.values(problemProgress).filter(s=>s==='completed').length}</span>
              <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">Flagged: {Object.values(problemProgress).filter(s=>s==='flagged').length}</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Focus Area</h3>
           <p className="text-2xl font-bold text-slate-900 mt-2">Dynamic Programming</p>
           <p className="text-xs text-slate-400 mt-2">Historical Frequency: High</p>
        </div>
      </div>

      {/* MIDDLE ROW: PROGRESS & DATABASE ANALYSIS */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-brand-600 rounded-full"></div>
          Progress & Question Bank
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress by Difficulty */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <h3 className="font-semibold text-slate-700 mb-4">Problem Status by Level</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={progressStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="completed" name="Completed" stackId="a" fill="#10b981" barSize={40} />
                <Bar dataKey="flagged" name="Flagged" stackId="a" fill="#f59e0b" barSize={40} />
                <Bar dataKey="incomplete" name="Incomplete" stackId="a" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic Distribution */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[400px]">
            <h3 className="font-semibold text-slate-700 mb-4">Top Knowledge Points (All Levels)</h3>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={statsTopics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statsTopics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: HISTORICAL ANALYSIS */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
          CSP-S Historical Analysis (2019-2024)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
           {/* History Topics */}
           <div className="bg-white p-4 rounded-lg shadow-sm h-[300px]">
             <h3 className="font-semibold text-slate-700 mb-4 text-sm">Topic Frequency (Past 6 Years)</h3>
             <ResponsiveContainer width="100%" height="85%">
               <BarChart data={historyTopicStats} layout="vertical" margin={{left: 20}}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                 <Tooltip cursor={{fill: '#f8fafc'}} />
                 <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>

           {/* History Difficulty Table */}
           <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
             <h3 className="font-semibold text-slate-700 mb-4 text-sm">Recent Exams Breakdown</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left text-slate-600">
                 <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                   <tr>
                     <th className="px-4 py-3">Year</th>
                     <th className="px-4 py-3">T1</th>
                     <th className="px-4 py-3">T2</th>
                     <th className="px-4 py-3">T3</th>
                     <th className="px-4 py-3">T4</th>
                   </tr>
                 </thead>
                 <tbody>
                   {CSP_HISTORY_STATS.slice().reverse().map((year) => (
                     <tr key={year.year} className="border-b border-slate-100 hover:bg-slate-50">
                       <td className="px-4 py-3 font-bold text-brand-600">{year.year}</td>
                       {year.problems.map((p, i) => (
                         <td key={i} className="px-4 py-3">
                           <div className="flex flex-col">
                             <span className="font-medium text-slate-800 truncate w-24" title={p.name}>{p.name.split(' ')[1]}</span>
                             <span className="text-[10px] text-slate-400">{p.tags[0]}</span>
                           </div>
                         </td>
                       ))}
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
