import React from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, LayoutDashboard, MessageSquare, Search, FileText, CheckCircle, Settings, Layers, BookMarked, BrainCircuit, Timer, Trophy } from 'lucide-react';
import { recordSession, getStats } from '../utils/stats';

const Layout = ({ children, theme, toggleTheme }) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Study Assistant', path: '/chat', icon: <MessageSquare size={20} /> },
    { label: 'Content Analyzer', path: '/analyzer', icon: <Search size={20} /> },
    { label: 'Assessments', path: '/assessments', icon: <FileText size={20} /> },
    { label: 'Focus Zone', path: '/focus', icon: <Timer size={20} /> },
    { label: 'AI Checker', path: '/checker', icon: <CheckCircle size={20} /> },
    { label: 'Memory Test', path: '/memory', icon: <BrainCircuit size={20} /> },
    { label: 'Flashcards', path: '/flashcards', icon: <Layers size={20} /> },
    { label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const [xp, setXp] = React.useState(0);

  React.useEffect(() => { 
    recordSession(); 
    const updateStats = () => setXp(getStats().xp);
    updateStats();
    window.addEventListener('studyai_stats_updated', updateStats);
    return () => window.removeEventListener('studyai_stats_updated', updateStats);
  }, []);

  const level = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="glass-panel" style={{ width: 'var(--sidebar-width)', margin: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h1 className="text-gradient" style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>StudyAI</h1>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => `btn-secondary ${isActive ? 'active-nav' : ''}`}
              style={({ isActive }) => ({ 
                justifyContent: 'flex-start',
                backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-primary)',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none'
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        {/* GAMIFICATION MINI DASHBOARD */}
        <div style={{ marginTop: 'auto', marginBottom: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               <Trophy size={16} color="var(--warning)" /> Level {level}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{xp} XP</span>
          </div>
          <div style={{ width: '100%', height: 6, background: 'var(--bg-color)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: `${xpProgress}%`, height: '100%', background: 'var(--warning)', borderRadius: 99, transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: 2 }}>
             {100 - xpProgress} XP to Level {level + 1}!
          </div>
        </div>

        <div>
          <button onClick={toggleTheme} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '1rem 2rem 1rem 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '2rem', borderRadius: '16px' }} className="animate-fade-in glass-panel">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
