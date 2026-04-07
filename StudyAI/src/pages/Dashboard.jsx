// Force Rebuild: 2026-04-07 V2
import { BookOpen, Target, Clock, Zap, Layers, BookMarked, BrainCircuit, Timer, Trophy, X, Search, MessageSquare, FileText, CheckCircle } from 'lucide-react';
import { getStats } from '../utils/stats';

const TROPHY_CATEGORIES = [
  { 
    id: 'quiz', title: 'Quiz Master', icon: <Target size={32} />, 
    tiers: [
      { level: 'I', label: 'Bronze', req: 3, color: '#cd7f32' },
      { level: 'II', label: 'Silver', req: 10, color: '#c0c0c0' },
      { level: 'III', label: 'Gold', req: 25, color: '#ffd700' }
    ],
    getStat: s => s.quizzes
  },
  { 
    id: 'focus', title: 'Focus Ninja', icon: <Timer size={32} />, 
    tiers: [
      { level: 'I', label: 'Bronze', req: 5, color: '#cd7f32' },
      { level: 'II', label: 'Silver', req: 15, color: '#c0c0c0' },
      { level: 'III', label: 'Gold', req: 50, color: '#ffd700' }
    ],
    getStat: s => s.focus
  },
  { 
    id: 'topics', title: 'Concept Crusher', icon: <Search size={32} />, 
    tiers: [
      { level: 'I', label: 'Bronze', req: 5, color: '#cd7f32' },
      { level: 'II', label: 'Silver', req: 20, color: '#c0c0c0' },
      { level: 'III', label: 'Gold', req: 100, color: '#ffd700' }
    ],
    getStat: s => s.topics
  },
  { 
    id: 'streak', title: 'Daily Warrior', icon: <Zap size={32} />, 
    tiers: [
      { level: 'I', label: 'Bronze', req: 3, color: '#cd7f32' },
      { level: 'II', label: 'Silver', req: 7, color: '#c0c0c0' },
      { level: 'III', label: 'Gold', req: 30, color: '#ffd700' }
    ],
    getStat: s => s.streak
  },
  { 
    id: 'memory', title: 'Memory Maestro', icon: <BrainCircuit size={32} />, 
    tiers: [
      { level: 'I', label: 'Bronze', req: 3, color: '#cd7f32' },
      { level: 'II', label: 'Silver', req: 10, color: '#c0c0c0' },
      { level: 'III', label: 'Gold', req: 25, color: '#ffd700' }
    ],
    getStat: s => s.memory
  }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ flex: 1, minWidth: '350px' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Welcome, Scholar!</h2>
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--accent-primary)' }}>LEVEL {Math.floor(stats.xp / 100) + 1}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stats.xp} Total XP</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: 'var(--border-color)', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: `${stats.xp % 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #a855f7)', borderRadius: '99px', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{100 - (stats.xp % 100)} XP needed to reach Level {Math.floor(stats.xp / 100) + 2}</p>
          </div>
        </div>
        <button onClick={() => setShowTrophies(true)} className="btn-secondary" style={{ padding: '1rem 2rem', borderColor: 'var(--warning)', color: 'var(--warning)', background: 'rgba(245, 158, 11, 0.05)', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.15)', fontSize: '1.1rem' }}>
          <Trophy size={24} /> Trophy Room
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {TROPHY_CATEGORIES.map(cat => (
                <div key={cat.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2.5rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {cat.icon} {cat.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {cat.tiers.map(tier => {
                      const current = cat.getStat(stats);
                      const unlocked = current >= tier.req;
                      const progress = Math.min(100, (current / tier.req) * 100);
                      
                      return (
                        <div key={tier.level} style={{ 
                          background: unlocked ? 'var(--bg-secondary)' : 'rgba(0,0,0,0.1)', 
                          border: `1px solid ${unlocked ? tier.color : 'var(--border-color)'}`,
                          borderRadius: 16, padding: '1.5rem', textAlign: 'center', 
                          opacity: unlocked ? 1 : 0.6, filter: unlocked ? 'none' : 'grayscale(0.8)',
                          boxShadow: unlocked ? `0 8px 32px ${tier.color}20` : 'none',
                          position: 'relative', overflow: 'hidden'
                        }}>
                          <div style={{ color: unlocked ? tier.color : 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                            <Trophy size={32} />
                          </div>
                          <h4 style={{ marginBottom: '0.25rem', color: unlocked ? tier.color : 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 800 }}>{cat.title} {tier.level}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 600 }}>{tier.label} Tier</p>
                          
                          <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: unlocked ? tier.color : 'var(--text-secondary)', borderRadius: '99px' }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{current} / {tier.req} achieved</span>
                          
                          {unlocked && (
                             <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--success)' }}>
                               <CheckCircle size={16} />
                             </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
