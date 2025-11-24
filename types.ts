
export enum Difficulty {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4',
}

export enum AlgorithmType {
  SIMULATION = 'Simulation',
  GREEDY = 'Greedy',
  SEARCH = 'Search',
  DP = 'DP',
  GRAPH = 'Graph',
  MATH = 'Math',
  DATA_STRUCTURE = 'DataStructure',
  STRING = 'String'
}

export type ProblemStatus = 'completed' | 'incomplete' | 'flagged';

export interface Problem {
  id: string;
  title: string;
  description: string; // Full problem description
  difficulty: Difficulty;
  source: string; // e.g., "P1001" (Luogu ID)
  tags: AlgorithmType[];
  knowledgePoints: string[];
  keyInsights: string;
  visualizerType: 'binary_search' | 'knapsack' | 'tree' | 'graph' | 'matrix' | 'greedy' | 'simulation' | 'math' | 'string';
  luoguDifficulty: string;
}

export interface WeekPlan {
  weekRange: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Animation Types
export interface AnimationStep {
  lineIndex: number; // The line of code to highlight
  description: string; // Explanation of the step (e.g., equation derivation)
  highlights: number[]; // IDs of visual elements to highlight (indices for arrays, node IDs for graphs/trees, flat index for matrix)
  secondaryHighlights?: number[]; // Secondary elements (e.g., comparison targets like 'up' or 'left' in DP)
  activePointers?: { [key: string]: number }; // e.g., { i: 1, j: 2, mid: 4 }
  values?: { [id: string]: string | number }; // Updates to values displayed in nodes/cells
}

export interface AlgorithmScenario {
  title: string;
  code: string[]; // The pseudo-code lines
  steps: AnimationStep[];
  initialData: any; // Initial state for the visualizer
}
