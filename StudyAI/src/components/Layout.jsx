// Force Rebuild: 2026-04-07
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, LayoutDashboard, MessageSquare, Search, FileText, CheckCircle, Settings, Layers, BookMarked, BrainCircuit, Timer, Trophy } from 'lucide-react';
import { recordSession, getStats } from '../utils/stats';
import confetti from 'canvas-confetti';
import { playLevelUp } from '../utils/audio';

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

  const [xp, setXp] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(null);

  useEffect(() => { 
    recordSession(); 
    const updateStats = () => {
      const newStats = getStats();
      const oldLevel = Math.floor(xp / 100) + 1;
      const newLevel = Math.floor(newStats.xp / 100) + 1;
      
      if (newLevel > oldLevel && xp > 0) {
        setShowLevelUp(newLevel);
        playLevelUp();
        confetti({
          particleCount: 200, spread: 90, origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#ffffff']
        });
      }
      setXp(newStats.xp);
    };
    updateStats();

    // Inject styles only once on mount
    const styleId = 'studyai-layout-styles';
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .active-nav .active-marker { opacity: 1 !important; }
      `;
      document.head.appendChild(styleTag);
    }

    window.addEventListener('studyai_stats_updated', updateStats);
    return () => window.removeEventListener('studyai_stats_updated', updateStats);
  }, [xp]);

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
                borderColor: isActive ? 'var(--accent-primary)' : 'transparent',
                boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none',
                position: 'relative'
              })}
            >
              {item.icon}
              {item.label}
              <div style={{ 
                position: 'absolute', 
                left: '-1.5rem', 
                height: '100%', 
                width: '4px', 
                background: 'var(--accent-primary)', 
                borderRadius: '0 4px 4px 0',
                opacity: 0,
                transition: 'opacity 0.2s ease'
              }} className="active-marker" />
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
          <div style={{ width: '100%', height: 6, background: 'var(--bg-color)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: `${xpProgress}%`, height: '100%', background: 'var(--warning)', borderRadius: 99, transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', zIndex: 2 }} />
            <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.3 }} />
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
      <main style={{ flex: 1, padding: '1rem 2rem 1rem 0', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }} className="animate-slide-up">
          {children}
        </div>
      </main>

      {/* LEVEL UP MODAL */}
      {showLevelUp && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="glass-panel animate-scale-in" style={{ padding: '4rem', textAlign: 'center', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(99,102,241,0.1) 100%)', maxWidth: 500, width: '90%' }}>
            <div style={{ width: 100, height: 100, background: 'var(--warning)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}>
               <Trophy size={60} color="white" />
            </div>
            <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>LEVEL {showLevelUp}!</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Your brain is getting stronger. Keep up the amazing work!</p>
            <button onClick={() => setShowLevelUp(null)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Onward!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
