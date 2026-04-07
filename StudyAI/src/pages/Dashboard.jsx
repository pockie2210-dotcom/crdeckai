import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Clock, Zap, Layers, BookMarked, BrainCircuit, Timer, Trophy, X, Search, MessageSquare, FileText } from 'lucide-react';
import { getStats } from '../utils/stats';

const BADGES = [
  { id: 'first_topic', title: 'Curious Mind', icon: <Search size={32} />, requirement: s => s.topics >= 1, desc: 'Analyze your first content' },
  { id: 'quiz_master', title: 'Quiz Master', icon: <Target size={32} />, requirement: s => s.quizzes >= 5, desc: 'Complete 5 quizzes' },
  { id: 'zen', title: 'Zen State', icon: <Timer size={32} />, requirement: s => s.focus >= 5, desc: 'Finish 5 Focus Sessions' },
  { id: 'streak_3', title: 'Consistency', icon: <Zap size={32} />, requirement: s => s.streak >= 3, desc: 'Hit a 3-day Streak' },
  { id: 'architect', title: 'Architect', icon: <Layers size={32} />, requirement: s => s.decks >= 3, desc: 'Build 3 Flashcard decks' }
];

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 200px' }}>
    <div style={{ 
      background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.1) 100%)`, 
      width: '48px', 
      height: '48px', 
      borderRadius: '12px', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      boxShadow: `0 8px 16px -4px ${color}40`
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit' }}>{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ topics: 0, quizzes: 0, hours: '0', streak: 0, decks: 0, guides: 0, memory: 0, focus: 0, xp: 0 });
  const [showTrophies, setShowTrophies] = useState(false);
  const [srsCount, setSrsCount] = useState(0);

  useEffect(() => {
    setStats(getStats());
    setSrsCount(JSON.parse(localStorage.getItem('studyai_srs_deck') || '[]').length);
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome back, Student!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Here's an overview of your recent study activities.</p>
        </div>
        <button onClick={() => setShowTrophies(true)} className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderColor: 'var(--warning)', color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.05)', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)' }}>
          <Trophy size={20} /> View Trophy Room
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <StatCard title="Topics Studied" value={stats.topics} icon={<BookOpen size={24} />} color="var(--accent-primary)" />
        <StatCard title="Quizzes Taken" value={stats.quizzes} icon={<Target size={24} />} color="var(--success)" />
        <StatCard title="Hours Learned" value={stats.hours} icon={<Clock size={24} />} color="var(--warning)" />
        <StatCard title="Current Streak" value={`${stats.streak} Days`} icon={<Zap size={24} />} color="var(--danger)" />
        <StatCard title="Decks Created" value={stats.decks} icon={<Layers size={24} />} color="#a855f7" />
        <StatCard title="Study Guides" value={stats.guides} icon={<BookMarked size={24} />} color="#14b8a6" />
        <StatCard title="Memory Tests" value={stats.memory} icon={<BrainCircuit size={24} />} color="#ec4899" />
        <StatCard title="Focus Sessions" value={stats.focus} icon={<Timer size={24} />} color="#f59e0b" />
      </div>

      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        Quick Actions 
        {srsCount > 0 && <span style={{ background: 'var(--danger)', color: 'white', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 99 }}>{srsCount} Flashcards Due</span>}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
         <button onClick={() => navigate('/flashcards')} className={srsCount > 0 ? "btn-primary" : "btn-secondary"} style={{ padding: '1.25rem', fontSize: '1rem', background: srsCount > 0 ? 'var(--danger)' : undefined, borderColor: srsCount > 0 ? 'var(--danger)' : undefined }} title={srsCount > 0 ? 'You have cards due for review!' : 'Create new flashcards'}><Layers size={20} /> {srsCount > 0 ? 'Review Due Cards' : 'Make Flashcards'}</button>
         <button onClick={() => navigate('/chat')} className="btn-primary" style={{ padding: '1.25rem', fontSize: '1rem' }}><MessageSquare size={20} /> Talk to AI Tutor</button>
         <button onClick={() => navigate('/focus')} className="btn-secondary" style={{ padding: '1.25rem', fontSize: '1rem', borderColor: '#f59e0b', color: '#f59e0b' }}><Timer size={20} /> Enter Focus Zone</button>
         <button onClick={() => navigate('/analyzer')} className="btn-secondary" style={{ padding: '1.25rem', fontSize: '1rem' }}><Search size={20} /> Analyze Content</button>
         <button onClick={() => navigate('/memory')} className="btn-secondary" style={{ padding: '1.25rem', fontSize: '1rem', borderColor: '#ec4899', color: '#ec4899' }}><BrainCircuit size={20} /> Memory Test</button>
         <button onClick={() => navigate('/assessments')} className="btn-secondary" style={{ padding: '1.25rem', fontSize: '1rem' }}><FileText size={20} /> Take Assessment</button>
      </div>

      {showTrophies && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '90%', maxWidth: 800, padding: '3rem 2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', alignItems: 'center' }}>
              <div>
                <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '2.5rem' }}><Trophy size={40} color="var(--warning)" /> Trophy Room</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Complete study milestones to unlock these permanent badges.</p>
              </div>
              <button onClick={() => setShowTrophies(false)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}><X size={24} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {BADGES.map(b => {
                const unlocked = b.requirement(stats);
                return (
                  <div key={b.id} style={{ 
                    background: unlocked ? 'var(--bg-secondary)' : 'rgba(0,0,0,0.1)', 
                    border: `1px solid ${unlocked ? 'var(--warning)' : 'var(--border-color)'}`,
                    borderRadius: 16, padding: '1.5rem', textAlign: 'center', 
                    opacity: unlocked ? 1 : 0.5, filter: unlocked ? 'none' : 'grayscale(1)',
                    boxShadow: unlocked ? '0 8px 32px rgba(245, 158, 11, 0.15)' : 'none'
                  }}>
                    <div style={{ color: unlocked ? 'var(--warning)' : 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
                    <h4 style={{ marginBottom: '0.5rem', color: unlocked ? 'var(--warning)' : 'var(--text-secondary)', fontSize: '1.1rem' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
