import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, BrainCircuit, RefreshCcw, CheckCircle2, XCircle, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { callAI, getApiKey } from '../utils/openai';
import { incrementGuides } from '../utils/stats';

// ── AI Call ──────────────────────────────────────────────────────────────────
async function generateGuideQuestions(subject, year, count) {
  const key = getApiKey();
  if (!key) throw new Error('NO_KEY');

  const systemPrompt = `You are an expert exam setter. Generate EXACTLY ${count} curriculum-aligned questions for Year ${year} students studying ${subject}.
Format as JSON: { "questions": [ { "q": "...", "a": "..." } ] }. 
The answer must be detailed and clearly explain the reasoning step-by-step.`;

  const resultText = await callAI(
    [{ role: 'user', content: `Generate ${count} questions for Year ${year} ${subject}.` }],
    'json_object',
    systemPrompt
  );

  const parsed = JSON.parse(resultText);
  return parsed.questions || [];
}

// ── Popular subjects ──────────────────────────────────────────────────────────
const SUBJECTS = [
  'Algebra', 'Geometry', 'Calculus', 'Statistics',
  'Biology', 'Chemistry', 'Physics', 'Earth Science',
  'World History', 'Geography', 'Economics', 'Psychology',
  'English Literature', 'Creative Writing', 'Grammar',
  'Computer Science', 'Environmental Science', 'Health',
];

const YEARS = Array.from({ length: 10 }, (_, i) => i + 3); // Year 3–12
const COUNTS = [5, 10, 15, 20, 30];

// ── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ q, idx, total }) => {
  const [open, setOpen] = useState(false);
  const [marked, setMarked] = useState(null); // 'yes' | 'no' | null

  return (
    <div style={{
      borderRadius: 14, border: `1px solid ${marked === 'yes' ? 'var(--success)' : marked === 'no' ? 'var(--danger)' : 'var(--border-color)'}`,
      background: marked === 'yes' ? 'rgba(16,185,129,0.04)' : marked === 'no' ? 'rgba(239,68,68,0.04)' : 'var(--bg-secondary)',
      transition: 'all 0.25s',
      overflow: 'hidden',
    }}>
      {/* Question header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', padding: '1.25rem 1.5rem',
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <span style={{
            minWidth: 28, height: 28, borderRadius: '50%', background: 'var(--accent-primary)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, marginTop: 1,
          }}>{idx + 1}</span>
          <span style={{ fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-primary)', fontWeight: 500 }}>{q.q}</span>
        </div>
        <ChevronDown size={20} color="var(--text-secondary)" style={{ flexShrink: 0, marginTop: 4, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
      </button>

      {/* Answer reveal */}
      {open && (
        <div className="animate-fade-in" style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', marginTop: '1rem' }}>
            Model Answer
          </p>
          <p style={{ lineHeight: 1.7, fontSize: '1rem', color: 'var(--text-primary)' }}>{q.a}</p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button
              onClick={() => setMarked('yes')}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: marked === 'yes' ? 'rgba(16,185,129,0.15)' : 'transparent',
                border: `1px solid ${marked === 'yes' ? 'var(--success)' : 'var(--border-color)'}`,
                color: marked === 'yes' ? 'var(--success)' : 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
            ><CheckCircle2 size={16} /> Got it</button>
            <button
              onClick={() => setMarked('no')}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: marked === 'no' ? 'rgba(239,68,68,0.12)' : 'transparent',
                border: `1px solid ${marked === 'no' ? 'var(--danger)' : 'var(--border-color)'}`,
                color: marked === 'no' ? 'var(--danger)' : 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
            ><XCircle size={16} /> Need practice</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const StudyGuide = () => {
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [year, setYear] = useState(10);
  const [count, setCount] = useState(10);
  const [step, setStep] = useState('setup'); // 'setup' | 'loading' | 'results'
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const finalSubject = subject === '__custom__' ? customSubject.trim() : subject;

  const handleGenerate = async () => {
    if (!finalSubject) { setError('Please select or type a subject.'); return; }
    if (!getApiKey()) { setError('⚠️ No API key set. Go to Settings first.'); return; }
    setError('');
    setStep('loading');
    try {
      const qs = await generateGuideQuestions(finalSubject, year, count);
      if (!qs.length) throw new Error('No questions returned. Try a different subject.');
      setQuestions(qs);
      incrementGuides();
      setStep('results');
    } catch (err) {
      setError(err.message);
      setStep('setup');
    }
  };

  const reset = () => { setStep('setup'); setQuestions([]); setError(''); };

  // ── Setup Screen ─────────────────────────────────
  if (step === 'setup') return (
    <div className="animate-fade-in" style={{ maxWidth: 720, margin: '0 auto' }}>


      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--danger)', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', color: 'var(--danger)', fontSize: '0.95rem' }}>
          {error}
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

        {/* Subject selector */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1rem' }}>
            📚 Subject
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {SUBJECTS.map(s => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                style={{
                  padding: '0.45rem 1rem', borderRadius: 99, cursor: 'pointer', fontFamily: 'inherit',
                  fontSize: '0.9rem', fontWeight: 500, border: `1px solid ${subject === s ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  background: subject === s ? 'rgba(99,102,241,0.15)' : 'var(--bg-secondary)',
                  color: subject === s ? 'var(--accent-primary)' : 'var(--text-primary)',
                  transition: 'all 0.15s',
                }}
              >{s}</button>
            ))}
            <button
              onClick={() => setSubject('__custom__')}
              style={{
                padding: '0.45rem 1rem', borderRadius: 99, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '0.9rem', fontWeight: 500, border: `1px solid ${subject === '__custom__' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                background: subject === '__custom__' ? 'rgba(99,102,241,0.15)' : 'var(--bg-secondary)',
                color: subject === '__custom__' ? 'var(--accent-primary)' : 'var(--text-primary)',
                transition: 'all 0.15s',
              }}
            >✏️ Other…</button>
          </div>
          {subject === '__custom__' && (
            <input
              autoFocus
              type="text"
              placeholder="Type your subject, e.g. Organic Chemistry, Trigonometry…"
              value={customSubject}
              onChange={e => setCustomSubject(e.target.value)}
              style={{
                width: '100%', padding: '0.875rem 1.25rem', borderRadius: 12,
                border: '1px solid var(--accent-primary)', background: 'var(--bg-secondary)',
                color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem', outline: 'none',
              }}
            />
          )}
        </div>

        {/* Year selector */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1rem' }}>
            🎓 Year Level — <span style={{ color: 'var(--accent-primary)' }}>Year {year}</span>
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {YEARS.map(y => (
              <button
                key={y}
                onClick={() => setYear(y)}
                style={{
                  width: 52, height: 52, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                  fontWeight: 600, fontSize: '0.95rem', border: `1px solid ${year === y ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  background: year === y ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: year === y ? 'white' : 'var(--text-primary)', transition: 'all 0.15s',
                }}
              >{y}</button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', fontSize: '1rem' }}>
            ❓ Number of Questions — <span style={{ color: 'var(--accent-primary)' }}>{count}</span>
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {COUNTS.map(c => (
              <button
                key={c}
                onClick={() => setCount(c)}
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: 99, cursor: 'pointer', fontFamily: 'inherit',
                  fontWeight: 600, border: `1px solid ${count === c ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  background: count === c ? 'rgba(99,102,241,0.15)' : 'var(--bg-secondary)',
                  color: count === c ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'all 0.15s',
                }}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          disabled={!finalSubject}
          className="btn-primary"
          style={{ padding: '1rem 2rem', fontSize: '1.1rem', opacity: finalSubject ? 1 : 0.5, alignSelf: 'flex-start' }}
        >
          <Sparkles size={20} />
          Generate {count} Year {year} {finalSubject || 'Subject'} Questions
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  // ── Loading Screen ────────────────────────────────
  if (step === 'loading') return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1.5rem' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', animation: 'spin 0.8s linear infinite' }} />
      <h3 style={{ color: 'var(--text-secondary)' }}>
        Generating {count} Year {year} <strong style={{ color: 'var(--text-primary)' }}>{finalSubject}</strong> questions…
      </h3>
    </div>
  );

  // ── Results Screen ────────────────────────────────
  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <div>
          <h2 className="text-gradient">Year {year} — {finalSubject}</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.95rem' }}>
            {questions.length} questions · Click any question to reveal the model answer
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={reset} className="btn-secondary" style={{ fontSize: '0.9rem' }}>
            <RotateCcw size={16} /> New Guide
          </button>
        </div>
      </div>

      {/* Progress summary */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: questions.length, color: 'var(--accent-primary)' },
          { label: 'Year Level', value: `Year ${year}`, color: 'var(--warning)' },
          { label: 'Subject', value: finalSubject, color: '#a855f7' },
        ].map(stat => (
          <div key={stat.label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '0.75rem 1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: stat.color, fontWeight: 700 }}>{stat.value}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '2rem' }}>
        {questions.map((q, idx) => (
          <QuestionCard key={idx} q={q} idx={idx} total={questions.length} />
        ))}
      </div>
    </div>
  );
};

export default StudyGuide;
