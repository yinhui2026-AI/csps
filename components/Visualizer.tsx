
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { ALGORITHM_SCENARIOS } from '../constants';
import { AlgorithmScenario } from '../types';

interface VisualizerProps {
  type: string;
}

const Visualizer: React.FC<VisualizerProps> = ({ type }) => {
  const scenario: AlgorithmScenario = ALGORITHM_SCENARIOS[type] || ALGORITHM_SCENARIOS['binary_search'];
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  
  // Track dynamic values (like DP table updates)
  const [dynamicValues, setDynamicValues] = useState<{[key: string]: string | number}>({});

  const currentStep = scenario.steps[Math.min(stepIndex, scenario.steps.length - 1)];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset when type changes
  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
    setDynamicValues({});
  }, [type]);

  // Handle Playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= scenario.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, scenario.steps.length, playbackSpeed]);

  // Update dynamic values when step changes
  useEffect(() => {
    if (currentStep.values) {
      setDynamicValues(prev => ({ ...prev, ...currentStep.values }));
    }
  }, [stepIndex, currentStep]);

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
    setDynamicValues({});
  };

  // Determine which renderer to use based on type
  const isMatrixRenderer = ['matrix', 'simulation'].includes(type);
  const isArrayRenderer = ['binary_search', 'knapsack', 'greedy', 'string', 'math'].includes(type);
  const isTreeRenderer = ['tree'].includes(type);
  const isGraphRenderer = ['graph'].includes(type);

  // --- RENDERERS ---

  const renderMatrix = () => {
    const grid = scenario.initialData.grid as number[][];
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="grid grid-cols-3 gap-2">
          {grid.map((row, r) => (
            row.map((val, c) => {
              const index = r * 3 + c;
              const id = `${r}-${c}`;
              const isHighlighted = currentStep.highlights.includes(index);
              const isSecondary = currentStep.secondaryHighlights?.includes(index);
              const displayVal = dynamicValues[id] !== undefined ? dynamicValues[id] : '?';
              
              return (
                <div 
                  key={id}
                  className={`
                    w-12 h-12 flex items-center justify-center rounded border-2 text-sm font-bold transition-all duration-300
                    ${isHighlighted ? 'bg-brand-500 border-brand-600 text-white scale-110 shadow-lg' : 
                      isSecondary ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 
                      'bg-white border-slate-200 text-slate-400'}
                  `}
                >
                  {/* Show DP Value if calculated, else show Cost */}
                  <div className="flex flex-col items-center leading-none">
                     <span>{displayVal}</span>
                     <span className={`text-[8px] font-normal ${isHighlighted ? 'text-brand-100' : 'text-slate-400'}`}>cost: {val}</span>
                  </div>
                </div>
              );
            })
          ))}
        </div>
        <div className="mt-8 flex gap-4 text-xs text-slate-500">
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-brand-500 rounded"></div> 当前计算 (Current)</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-100 border border-indigo-300 rounded"></div> 比较对象 (Source)</div>
        </div>
      </div>
    );
  };

  const renderArray = () => {
    const arr = scenario.initialData.array as any[];
    const pointers = currentStep.activePointers || {};
    const isKnapsack = type === 'knapsack';

    return (
      <div className="flex flex-col items-center justify-center h-full pt-8">
        <div className="flex gap-1 overflow-x-auto max-w-full p-2">
          {arr.map((val, i) => {
            const isHighlighted = currentStep.highlights.includes(i);
            const isSecondary = currentStep.secondaryHighlights?.includes(i);
            
            // Determine display value (static array val vs dynamic DP val)
            const displayVal = isKnapsack ? (dynamicValues[i] !== undefined ? dynamicValues[i] : val) : val;

            // Special visual states
            const isFound = type === 'binary_search' && currentStep.lineIndex === 3 && i === pointers.mid;
            
            return (
              <div key={i} className="relative flex flex-col items-center shrink-0">
                 {/* Pointers */}
                 <div className="h-6 relative w-full">
                    {pointers.low === i && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-600">L</span>}
                    {pointers.high === i && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-600">H</span>}
                    {pointers.mid === i && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-purple-600">M</span>}
                    {pointers.i === i && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-brand-600">i</span>}
                    {pointers.j === i && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-orange-600">j</span>}
                 </div>
                 
                 {/* Bar/Block */}
                 <div className={`
                   w-8 h-10 flex items-center justify-center border rounded transition-all duration-300
                   ${isFound ? 'bg-green-500 text-white border-green-600' :
                     isHighlighted ? 'bg-brand-100 border-brand-300 text-brand-900 scale-110 z-10' : 
                     isSecondary ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                     'bg-slate-50 border-slate-100 text-slate-300'}
                 `}
                 >
                   <span className="text-xs font-mono px-1">{displayVal}</span>
                 </div>
                 <span className="text-[9px] text-slate-400 mt-1">{i}</span>
              </div>
            );
          })}
        </div>
        {isKnapsack && (
             <div className="mt-4 text-xs text-slate-500 text-center">
                 <p>Current Item: Weight={scenario.initialData.itemWeight}, Value={scenario.initialData.itemValue}</p>
             </div>
        )}
      </div>
    );
  };

  const renderTree = () => (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <g stroke="#cbd5e1" strokeWidth="2">
        <line x1="200" y1="20" x2="100" y2="80" />
        <line x1="200" y1="20" x2="300" y2="80" />
        <line x1="100" y1="80" x2="50" y2="150" />
        <line x1="100" y1="80" x2="150" y2="150" />
        <line x1="300" y1="80" x2="250" y2="150" />
        <line x1="300" y1="80" x2="350" y2="150" />
      </g>
      {[
        { x: 200, y: 20, id: 1 },
        { x: 100, y: 80, id: 2 }, { x: 300, y: 80, id: 3 },
        { x: 50, y: 150, id: 4 }, { x: 150, y: 150, id: 5 },
        { x: 250, y: 150, id: 6 }, { x: 350, y: 150, id: 7 },
      ].map((node) => {
        const isActive = currentStep.highlights.includes(node.id);
        const isSecondary = currentStep.secondaryHighlights?.includes(node.id);
        
        return (
          <g key={node.id} className="transition-all duration-500">
             <circle 
               cx={node.x} cy={node.y} r="16" 
               fill={isActive ? '#0ea5e9' : isSecondary ? '#e0e7ff' : 'white'} 
               stroke={isActive ? '#0284c7' : isSecondary ? '#6366f1' : '#94a3b8'} 
               strokeWidth={isActive ? 3 : 2} 
             />
             <text x={node.x} y={node.y} dy=".3em" textAnchor="middle" fill={isActive ? 'white' : '#64748b'} fontSize="12" fontWeight="bold">{node.id}</text>
             {isActive && <circle cx={node.x} cy={node.y} r="20" fill="none" stroke="#0ea5e9" strokeWidth="2" className="animate-ping opacity-25" />}
          </g>
        )
      })}
    </svg>
  );

  const renderGraph = () => (
    <svg viewBox="0 0 400 200" className="w-full h-full">
       {/* Edges */}
       <line x1="50" y1="100" x2="200" y2="100" stroke="#cbd5e1" strokeWidth="2" />
       <line x1="200" y1="100" x2="350" y2="50" stroke="#cbd5e1" strokeWidth="2" />
       <line x1="200" y1="100" x2="350" y2="150" stroke="#cbd5e1" strokeWidth="2" />
       
       {[
         {id: 1, x: 50, y: 100},
         {id: 2, x: 200, y: 100},
         {id: 3, x: 350, y: 50},
         {id: 4, x: 350, y: 150}
       ].map(node => {
          const isActive = currentStep.highlights.includes(node.id);
          const val = dynamicValues[node.id.toString()];
          return (
            <g key={node.id}>
              <circle 
                cx={node.x} cy={node.y} r="20" 
                fill={isActive ? "#f43f5e" : "white"} 
                stroke={isActive ? "#e11d48" : "#cbd5e1"}
                strokeWidth="2"
              />
              <text x={node.x} y={node.y} dy="-1.5em" textAnchor="middle" fill="#64748b" fontSize="10">Dist: {val ?? '∞'}</text>
              <text x={node.x} y={node.y} dy=".3em" textAnchor="middle" fill={isActive ? "white" : "#1e293b"} fontWeight="bold">{node.id}</text>
            </g>
          )
       })}
    </svg>
  );

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header / Controls */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <h3 className="font-bold text-slate-700 text-sm">{scenario.title}</h3>
           <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
             <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 hover:bg-slate-100 rounded text-brand-600 transition">
               {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
             </button>
             <button onClick={handleReset} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition border-l border-slate-100 ml-1 pl-2">
               <RotateCcw className="w-4 h-4" />
             </button>
           </div>
           
           <div className="flex items-center gap-2 text-xs text-slate-500">
             <button onClick={() => setStepIndex(s => Math.max(0, s-1))} className="p-1 hover:bg-slate-200 rounded"><ChevronLeft className="w-3 h-3"/></button>
             <span>Step {stepIndex + 1} / {scenario.steps.length}</span>
             <button onClick={() => setStepIndex(s => Math.min(scenario.steps.length - 1, s+1))} className="p-1 hover:bg-slate-200 rounded"><ChevronRight className="w-3 h-3"/></button>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-slate-400 font-medium">Speed</span>
           <button onClick={() => setPlaybackSpeed(1500)} className={`w-2 h-2 rounded-full ${playbackSpeed === 1500 ? 'bg-brand-500' : 'bg-slate-300'}`} />
           <button onClick={() => setPlaybackSpeed(1000)} className={`w-2 h-2 rounded-full ${playbackSpeed === 1000 ? 'bg-brand-500' : 'bg-slate-300'}`} />
           <button onClick={() => setPlaybackSpeed(500)} className={`w-2 h-2 rounded-full ${playbackSpeed === 500 ? 'bg-brand-500' : 'bg-slate-300'}`} />
        </div>
      </div>

      {/* Content Area: Split View */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[350px]">
        {/* Left: Visualization */}
        <div className="flex-1 bg-slate-50/50 p-4 relative border-b md:border-b-0 md:border-r border-slate-200 flex flex-col">
           {/* Context Panel - Shows what is happening logic-wise */}
           <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm border border-slate-200 z-10">
              <p className="text-sm font-medium text-slate-800">Step Explanation:</p>
              <p className="text-xs text-brand-600 mt-1">{currentStep.description}</p>
           </div>
           <div className="flex-1 mt-12">
             {isMatrixRenderer && renderMatrix()}
             {isArrayRenderer && renderArray()}
             {isTreeRenderer && renderTree()}
             {isGraphRenderer && renderGraph()}
           </div>
        </div>

        {/* Right: Code */}
        <div className="w-full md:w-[280px] bg-slate-900 text-slate-300 p-4 overflow-y-auto font-mono text-xs leading-loose">
           {scenario.code.map((line, idx) => (
             <div 
               key={idx}
               className={`
                 px-2 rounded transition-colors duration-200 whitespace-pre
                 ${currentStep.lineIndex === idx ? 'bg-brand-900/50 text-brand-200 border-l-2 border-brand-500' : 'hover:bg-slate-800/50'}
               `}
             >
               {line}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
