
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProblemBank from './components/ProblemBank';
import PlanView from './components/PlanView';
import AIChat from './components/AIChat';
import { ProblemStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatContext, setChatContext] = useState<string>('');
  
  // Central State for Problem Status (Completed/Incomplete/Flagged)
  const [problemProgress, setProblemProgress] = useState<Record<string, ProblemStatus>>({});

  const handleAskAI = (context: string) => {
    setChatContext(context);
    setActiveTab('chat');
  };

  const updateProblemStatus = (problemId: string, status: ProblemStatus) => {
    setProblemProgress(prev => ({
      ...prev,
      [problemId]: status
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard problemProgress={problemProgress} />;
      case 'plan':
        return <PlanView />;
      case 'problems':
        return (
          <ProblemBank 
            onAskAI={handleAskAI} 
            problemProgress={problemProgress}
            onStatusChange={updateProblemStatus}
          />
        );
      case 'chat':
        return <AIChat initialContext={chatContext} onClearContext={() => setChatContext('')} />;
      default:
        return <Dashboard problemProgress={problemProgress} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
