import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, BrainCircuit, Calculator, FileQuestion } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Panel' },
    { path: '/students', icon: Users, label: 'Öğrenciler' },
    { path: '/lessons', icon: Calendar, label: 'Dersler' },
    { path: '/planner', icon: BrainCircuit, label: 'Asistan' },
    { path: '/quiz', icon: FileQuestion, label: 'Sınav Hazırla' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar / Mobile Header */}
      <aside className="bg-indigo-900 text-white md:w-64 flex-shrink-0">
        <div className="p-4 border-b border-indigo-800 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-indigo-300" />
          <h1 className="text-xl font-bold tracking-wide">Matematik Asistanı</h1>
        </div>
        
        <nav className="p-4 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-indigo-700 text-white shadow-md' 
                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};