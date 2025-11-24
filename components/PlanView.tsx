import React from 'react';
import { STUDY_PLAN } from '../constants';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';

const PlanView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">50-Week Master Plan</h2>
        <p className="text-brand-100 max-w-2xl">
          Based on the CSP-S (2019-2024) analysis. From foundational stability in T1 to the "Final Boss" T4. 
          Goal: 2 hours of new knowledge + 4 hours of intensive practice per week.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 space-y-12 pb-12">
        {STUDY_PLAN.map((stage, index) => (
          <div key={index} className="relative pl-8">
            <span className="absolute -left-[11px] top-0 bg-white p-1">
               {index === 1 ? (
                 <div className="bg-brand-500 w-4 h-4 rounded-full ring-4 ring-brand-100" />
               ) : index < 1 ? (
                 <CheckCircle2 className="w-5 h-5 text-green-500" />
               ) : (
                 <Circle className="w-5 h-5 text-slate-300" />
               )}
            </span>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                 <h3 className="text-xl font-bold text-slate-800">{stage.title}</h3>
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium w-fit">
                   <Calendar className="w-4 h-4" />
                   {stage.weekRange}
                 </span>
               </div>
               
               <p className="text-slate-600 mb-6 border-b border-slate-100 pb-4">
                 {stage.description}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {stage.tasks.map((task, tIdx) => (
                   <div key={tIdx} className="flex items-start gap-3 p-3 rounded bg-slate-50 text-sm text-slate-700">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                     {task}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanView;
