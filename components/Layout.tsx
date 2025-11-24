import React from 'react';
import { LayoutDashboard, BookOpen, MessageSquare, Menu, BookMarked } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: '总览 Dashboard', icon: LayoutDashboard },
    { id: 'plan', label: '50周计划 Plan', icon: BookMarked },
    { id: 'problems', label: '题库 Practice', icon: BookOpen },
    { id: 'chat', label: 'AI 助教 Tutor', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-2xl font-bold text-brand-600">CSP-S Master</h1>
            <p className="text-xs text-slate-500 mt-1">Senior Group Prep</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
             <div className="bg-gradient-to-r from-brand-500 to-indigo-600 rounded-lg p-4 text-white">
                <p className="text-xs font-semibold opacity-90">Current Phase</p>
                <p className="text-sm font-bold mt-1">Stage 2: Graph Theory</p>
                <div className="w-full bg-white/20 h-1.5 rounded-full mt-2">
                  <div className="bg-white h-1.5 rounded-full w-[40%]"></div>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 justify-between lg:justify-end">
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-500 hidden sm:block">Welcome, Student</span>
             <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs">
                S
             </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
