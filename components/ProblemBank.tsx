
import React, { useState } from 'react';
import { ALL_PROBLEMS, TAG_CN } from '../constants';
import { Difficulty, Problem, ProblemStatus, AlgorithmType } from '../types';
import { ChevronRight, Brain, Lightbulb, ExternalLink, Code, FileText, CheckCircle2, HelpCircle, Circle, Filter } from 'lucide-react';
import Visualizer from './Visualizer';

interface ProblemBankProps {
  onAskAI: (context: string) => void;
  problemProgress: Record<string, ProblemStatus>;
  onStatusChange: (id: string, status: ProblemStatus) => void;
}

const ProblemBank: React.FC<ProblemBankProps> = ({ onAskAI, problemProgress, onStatusChange }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.T1);
  const [selectedTag, setSelectedTag] = useState<AlgorithmType | 'All'>('All');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const filteredProblems = ALL_PROBLEMS.filter(p => {
    const matchDiff = p.difficulty === selectedDifficulty;
    const matchTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    return matchDiff && matchTag;
  });

  const difficultyColor = {
    [Difficulty.T1]: 'text-green-600 bg-green-50 border-green-200',
    [Difficulty.T2]: 'text-blue-600 bg-blue-50 border-blue-200',
    [Difficulty.T3]: 'text-orange-600 bg-orange-50 border-orange-200',
    [Difficulty.T4]: 'text-red-600 bg-red-50 border-red-200',
  };

  const getLuoguColor = (label: string) => {
    // Luogu Difficulty Color Mapping
    if (label.includes('入门')) return 'bg-[#FE4C61] text-white'; // Red
    if (label.includes('普及-')) return 'bg-[#F39C11] text-white'; // Orange
    if (label.includes('普及/提高-')) return 'bg-[#FFC116] text-white'; // Yellow
    if (label.includes('普及+/提高')) return 'bg-[#52C41A] text-white'; // Green
    if (label.includes('提高+/省选-')) return 'bg-[#3498DB] text-white'; // Blue
    if (label.includes('省选/NOI-')) return 'bg-[#9D3DCF] text-white'; // Purple
    return 'bg-slate-400 text-white';
  };

  const statusConfig = {
    'completed': { label: '已完成', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
    'incomplete': { label: '未完成', icon: Circle, color: 'text-slate-300', bg: 'bg-slate-50' },
    'flagged': { label: '有疑问', icon: HelpCircle, color: 'text-orange-500', bg: 'bg-orange-50' }
  };

  const formatKeyInsights = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim().match(/^\d+\./)) {
        return <p key={i} className="font-bold text-slate-800 mt-3 first:mt-0">{line}</p>;
      }
      return <p key={i} className="ml-4 text-slate-600">{line}</p>;
    });
  };

  if (selectedProblem) {
    const currentStatus = problemProgress[selectedProblem.id] || 'incomplete';
    
    return (
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedProblem(null)}
          className="mb-4 text-sm text-slate-500 hover:text-brand-600 flex items-center w-fit"
        >
          ← Back to List
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto pb-10">
          {/* Left: Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${difficultyColor[selectedProblem.difficulty]}`}>
                    {selectedProblem.difficulty}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getLuoguColor(selectedProblem.luoguDifficulty)}`}>
                    {selectedProblem.luoguDifficulty}
                  </span>
                  <span className="text-slate-500 text-sm">{selectedProblem.source}</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{selectedProblem.title}</h2>
              </div>

              {/* Status Selector in Detail View */}
              <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                 {(['incomplete', 'completed', 'flagged'] as ProblemStatus[]).map((status) => {
                    const Config = statusConfig[status];
                    const isActive = currentStatus === status;
                    return (
                      <button
                        key={status}
                        onClick={() => onStatusChange(selectedProblem.id, status)}
                        className={`p-2 rounded flex items-center gap-2 text-xs font-medium transition-colors ${isActive ? `${Config.bg} ${Config.color}` : 'text-slate-400 hover:bg-slate-50'}`}
                        title={Config.label}
                      >
                        <Config.icon className="w-4 h-4" />
                        <span className={isActive ? 'block' : 'hidden'}>{Config.label}</span>
                      </button>
                    )
                 })}
              </div>
            </div>

            {/* Problem Description */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <FileText className="w-5 h-5 text-slate-500" />
                Problem Description
              </h3>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line text-sm font-sans">
                {selectedProblem.description}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <Brain className="w-5 h-5 text-purple-500" />
                Knowledge Points
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProblem.knowledgePoints.map((kp, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                    {kp}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Key Insight & Strategy
              </h3>
              <div className="text-sm bg-slate-50 p-4 rounded border border-slate-200 leading-relaxed">
                {formatKeyInsights(selectedProblem.keyInsights)}
              </div>
            </div>

            <div className="flex gap-4">
               <button 
                onClick={() => onAskAI(`I am working on ${selectedProblem.title} (${selectedProblem.difficulty}). The key insight is "${selectedProblem.keyInsights}". Can you explain the algorithm in more detail and give a hint without solving it completely?`)}
                className="flex-1 bg-brand-600 text-white py-3 rounded-lg hover:bg-brand-700 transition font-medium flex items-center justify-center gap-2"
               >
                 <MessageIcon /> Ask AI Tutor
               </button>
               <a 
                 href={`https://www.luogu.com.cn/problem/${selectedProblem.source}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-lg hover:bg-slate-50 transition font-medium flex items-center justify-center gap-2"
               >
                 <ExternalLink className="w-4 h-4" /> Open in Luogu
               </a>
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="flex flex-col h-full">
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-1 min-h-[500px]">
                <div className="bg-slate-50 border-b border-slate-100 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                    <Code className="w-5 h-5 text-green-500" />
                    Algorithm Visualizer
                  </h3>
                </div>
                <div className="p-0 h-full">
                   <Visualizer type={selectedProblem.visualizerType} />
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 mb-2">
          <h2 className="text-2xl font-bold text-slate-800">Problem Bank</h2>
          <div className="flex bg-slate-100 rounded-lg p-1">
            {Object.values(Difficulty).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Type Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-2 shrink-0 uppercase tracking-wide">
                <Filter className="w-3.5 h-3.5" />
                Algorithm:
            </div>
            <button
                onClick={() => setSelectedTag('All')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border shrink-0 ${
                    selectedTag === 'All' 
                    ? 'bg-slate-800 text-white border-slate-800' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:text-brand-600'
                }`}
            >
                全部 All
            </button>
            {Object.values(AlgorithmType).map((tag) => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border shrink-0 ${
                        selectedTag === tag 
                        ? 'bg-brand-600 text-white border-brand-600' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:text-brand-600'
                    }`}
                >
                    {TAG_CN[tag] || tag}
                </button>
            ))}
        </div>
      </div>

      {/* Problem Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProblems.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
                <p>No problems found for this filter.</p>
            </div>
        ) : (
            filteredProblems.map((problem) => {
            const status = problemProgress[problem.id] || 'incomplete';
            const StatusIcon = statusConfig[status].icon;

            return (
                <div 
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`
                    group bg-white rounded-xl p-5 border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between
                    ${status === 'completed' ? 'border-green-200 bg-green-50/10' : 'border-slate-200 hover:border-brand-300'}
                `}
                >
                <div>
                    <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium border ${difficultyColor[problem.difficulty]}`}>
                        {problem.difficulty}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${getLuoguColor(problem.luoguDifficulty)}`}>
                            {problem.luoguDifficulty}
                        </span>
                    </div>
                    {/* Card Status Toggle */}
                    <button 
                        onClick={(e) => {
                        e.stopPropagation();
                        // Cycle status on click: Incomplete -> Completed -> Flagged -> Incomplete
                        const nextStatus = status === 'incomplete' ? 'completed' : status === 'completed' ? 'flagged' : 'incomplete';
                        onStatusChange(problem.id, nextStatus);
                        }}
                        className={`p-1 rounded-full hover:bg-slate-100 transition-colors ${statusConfig[status].color}`}
                    >
                        <StatusIcon className="w-4 h-4" />
                    </button>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm h-10">
                    {problem.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-4 h-6 overflow-hidden">
                    {problem.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded whitespace-nowrap">
                        {TAG_CN[tag] || tag}
                        </span>
                    ))}
                    </div>
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-mono">{problem.source}</span>
                    <div className="flex items-center text-brand-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Details <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                </div>
                </div>
            )
            })
        )}
      </div>
    </div>
  );
};

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
)

export default ProblemBank;
