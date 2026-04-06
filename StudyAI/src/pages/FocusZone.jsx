import React, { useState, useEffect, useRef } from 'react';
import { Timer, CheckCircle2, Play, CircleDashed, Flame } from 'lucide-react';
import { getApiKey, callAI } from '../utils/openai';
import { incrementFocus } from '../utils/stats';

const FocusZone = () => {
  const [step, setStep] = useState('setup'); // setup | loading | active | complete
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState(25); // minutes
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState('');
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [isActive, setIsActive] = useState(false);
  const totalSeconds = duration * 60;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = async () => {
    if (!goal.trim()) { setError('Please enter a goal for this session.'); return; }
    const key = getApiKey();
    if (!key) { setError('⚠️ No API key set. Go to Settings first.'); return; }

    setError('');
    setStep('loading');

    try {
      const systemPrompt = `You are a strict, highly effective study coach. The user wants to study "${goal}" for ${duration} minutes.
Break this broad goal down into EXACTLY 3 or 4 specific, actionable, bite-sized tasks they can realistically complete in this timeframe. 
Do not be vague. E.g., instead of "Study chapter 4", write "Read and summarize pages 42-45".

You MUST respond strictly with a JSON object in this format:
{
  "tasks": ["Task 1", "Task 2", "Task 3"]
}`;

      const resultText = await callAI(
        [{ role: 'user', content: 'What specific micro-tasks should I do right now?' }],
        'json_object',
        systemPrompt
      );

      const parsed = JSON.parse(resultText);
      if (!parsed.tasks || !Array.isArray(parsed.tasks)) throw new Error('Invalid AI task breakdown.');

      setTasks(parsed.tasks);
      setCompletedTasks([]);
      setTimeLeft(duration * 60);
      setStep('active');
      setIsActive(true);
    } catch (err) {
      setError(err.message || 'Failed to generate study tasks.');
      setStep('setup');
    }
  };

  const toggleTask = (idx) => {
    setCompletedTasks(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleComplete = () => {
    setIsActive(false);
    incrementFocus();
    setStep('complete');
  };

  // ── Render Helpers ────────────────────────────────────────────────────────
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return m + ':' + s;
  };

  const progress = totalSeconds === 0 ? 0 : ((totalSeconds - timeLeft) / totalSeconds) * 100;
  // SVG Circle calculations
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // ── Setup Screen ──────────────────────────────────────────────────────────
  if (step === 'setup') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#f59e0b' }}>
            <Timer size={32} />
          </div>
          <h2 className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #f59e0b, #ef4444)', fontSize: '2.5rem', marginBottom: '1rem' }}>AI Focus Zone</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Tell the AI what you need to study. It will break your goal down into actionable micro-tasks and run a Pomodoro timer to keep you on track.
          </p>
        </div>

        {error && <div style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: 12, border: '1px solid var(--danger)' }}>{error}</div>}

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            What is your main goal for this session?
          </label>
          <input
            autoFocus
            type="text"
            placeholder="e.g., Memorize the parts of an animal cell..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: 12, border: '1px solid #f59e0b', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1.05rem', outline: 'none', marginBottom: '1.5rem' }}
          />

          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            Session Duration
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[15, 25, 50].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                style={{
                  padding: '1rem', borderRadius: 12, fontSize: '1.1rem', fontWeight: 600,
                  border: '2px solid ' + (duration === d ? '#f59e0b' : 'var(--border-color)'),
                  background: duration === d ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-secondary)',
                  color: duration === d ? '#f59e0b' : 'var(--text-primary)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {d} Min
              </button>
            ))}
          </div>

          <button 
            onClick={handleStart} 
            disabled={!goal.trim()}
            className="btn-primary" 
            style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', opacity: goal.trim() ? 1 : 0.5 }}
          >
            <Play size={20} /> Enter Focus Zone
          </button>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1.5rem' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: '#f59e0b', animation: 'spin 0.8s linear infinite' }} />
        <h3 style={{ color: 'var(--text-secondary)' }}>The Coach is planning your session...</h3>
      </div>
    );
  }

  // ── Active Timer & Complete Screen ────────────────────────────────────────
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 1000, margin: '0 auto', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame color="#f59e0b" fill={isActive ? "#f59e0b" : "none"} /> Focus: <span style={{ color: '#f59e0b' }}>{goal}</span>
          </h2>
        </div>
        <button onClick={() => { setIsActive(false); setStep('setup'); }} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Exit Session</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.5fr)', gap: '2rem', flex: 1 }}>
        
        {/* Timer Panel */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', position: 'relative' }}>
          
          <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle cx="140" cy="140" r={radius} fill="transparent" stroke="var(--bg-primary)" strokeWidth="12" />
              <circle 
                cx="140" cy="140" r={radius} 
                fill="transparent" 
                stroke="url(#timerGradient)" 
                strokeWidth="12" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ textAlign: 'center', zIndex: 1 }}>
              <div style={{ fontSize: '4.5rem', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '-2px', color: 'var(--text-primary)', lineHeight: 1 }}>
                {step === 'complete' ? '00:00' : formatTime(timeLeft)}
              </div>
              <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {step === 'complete' ? 'Finished' : (isActive ? 'Focusing' : 'Paused')}
              </div>
            </div>
          </div>

          {step === 'active' && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
              <button 
                onClick={() => setIsActive(!isActive)}
                className="btn-primary" 
                style={{ width: 140, background: isActive ? 'var(--bg-secondary)' : '#f59e0b', color: isActive ? 'var(--text-primary)' : '#fff', border: isActive ? '1px solid var(--border-color)' : 'none' }}>
                {isActive ? 'Pause' : 'Resume'}
              </button>
              <button onClick={handleComplete} className="btn-secondary" style={{ width: 140 }}>Finish Early</button>
            </div>
          )}
        </div>

        {/* Action Plan Panel */}
        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
            <CircleDashed size={24} color="#f59e0b" /> AI Action Plan
          </h3>

          {step === 'complete' ? (
            <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem', color: 'var(--success)' }}>
              <CheckCircle2 size={64} />
              <h2 style={{ fontSize: '2rem', margin: 0 }}>Session Complete!</h2>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>You successfully stayed focused and crushed your goals. Stats updated!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {tasks.map((task, idx) => {
                const isChecked = completedTasks.includes(idx);
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleTask(idx)}
                    style={{ 
                      padding: '1.25rem', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
                      background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-secondary)',
                      border: '1px solid ' + (isChecked ? 'var(--success)' : 'var(--border-color)'),
                      display: 'flex', gap: '1rem', alignItems: 'center'
                    }}
                  >
                    <div style={{ 
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid ' + (isChecked ? 'var(--success)' : 'var(--text-secondary)'),
                      background: isChecked ? 'var(--success)' : 'transparent',
                      color: '#fff'
                    }}>
                      {isChecked && <CheckCircle2 size={16} />}
                    </div>
                    <span style={{ fontSize: '1.1rem', color: isChecked ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: isChecked ? 'line-through' : 'none', lineHeight: 1.5 }}>
                      {task}
                    </span>
                  </div>
                );
              })}

              {completedTasks.length === tasks.length && tasks.length > 0 && (
                 <div className="animate-fade-in" style={{ marginTop: 'auto', padding: '1rem', textAlign: 'center', color: 'var(--success)', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12 }}>
                   Amazing job! You completed all scheduled micro-tasks. You can finish early or use the rest of the time to review.
                 </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusZone;
