import React, { useState, useEffect, useCallback } from 'react';
import { Layers, Sparkles, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { generateFlashcards, getApiKey } from '../utils/openai';
import { incrementDecks } from '../utils/stats';

// ─── Progress Ring ─────────────────────────────────────────────────────────────
const ProgressRing = ({ percent, size = 80, strokeWidth = 7 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-color)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="var(--success)" strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
};

// ─── Single Flip Card ──────────────────────────────────────────────────────────
const FlipCard = ({ card, isFlipped, onClick }) => (
  <div
    className="card-flip-container"
    onClick={onClick}
    style={{ height: '320px' }}
  >
    <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`} style={{ height: '100%' }}>
      {/* Front */}
      <div className="card-face card-front glass-panel" style={{ borderBottom: isFlipped ? 'none' : '2px solid var(--accent-primary)' }}>
        <span className="card-label">Question</span>
        <p className="card-text" style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>{card.front}</p>
        <span className="card-hint" style={{ bottom: '2rem' }}>Click or Press Space to Flip</span>
      </div>
      {/* Back */}
      <div className="card-face card-back glass-panel" style={{ borderBottom: isFlipped ? '2px solid var(--success)' : 'none' }}>
        <span className="card-label" style={{ color: 'var(--success)' }}>Answer</span>
        <p className="card-text" style={{ fontSize: '1.4rem', fontWeight: 400 }}>{card.back}</p>
        <span className="card-hint" style={{ bottom: '2rem' }}>Click or Press Space to Flip back</span>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Flashcards = () => {
  const [step, setStep] = useState('input');   // 'input' | 'loading' | 'study' | 'done'
  const [inputText, setInputText] = useState('');
  const [deck, setDeck] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [error, setError] = useState('');
  
  const SRS_KEY = 'studyai_srs_deck';
  const [srsDeck, setSrsDeck] = useState(() => JSON.parse(localStorage.getItem(SRS_KEY) || '[]'));

  const saveSRS = () => {
    const toSave = Array.from(unknown).map(idx => deck[idx]);
    const m = new Map();
    [...srsDeck, ...toSave].forEach(c => m.set(c.front, c));
    const newSrs = Array.from(m.values());
    localStorage.setItem(SRS_KEY, JSON.stringify(newSrs));
    setSrsDeck(newSrs);
  };

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (step !== 'study') return;
    if (e.code === 'Space') { e.preventDefault(); setIsFlipped(f => !f); }
    if (e.code === 'ArrowRight') handleNext();
    if (e.code === 'ArrowLeft') handlePrev();
  }, [step, currentIdx, deck.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleNext = () => {
    if (currentIdx < deck.length - 1) {
      setCurrentIdx(i => i + 1);
      setIsFlipped(false);
    } else {
      setStep('done');
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1);
      setIsFlipped(false);
    }
  };

  const markKnown = () => {
    setKnown(prev => new Set([...prev, currentIdx]));
    setUnknown(prev => { const s = new Set(prev); s.delete(currentIdx); return s; });
    handleNext();
  };

  const markUnknown = () => {
    setUnknown(prev => new Set([...prev, currentIdx]));
    setKnown(prev => { const s = new Set(prev); s.delete(currentIdx); return s; });
    handleNext();
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    if (!getApiKey()) {
      setError('⚠️ No API key set. Go to Settings and enter your Groq or OpenAI key first.');
      return;
    }
    setError('');
    setStep('loading');
    try {
      const cards = await generateFlashcards(inputText);
      if (!cards.length) throw new Error('No cards returned. Try adding more detail to your notes.');
      setDeck(cards);
      setCurrentIdx(0);
      setIsFlipped(false);
      setKnown(new Set());
      setUnknown(new Set());
      incrementDecks();
      setStep('study');
    } catch (err) {
      setError(err.message);
      setStep('input');
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setIsFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setStep('study');
  };

  const resetAll = () => {
    setStep('input');
    setInputText('');
    setDeck([]);
    setError('');
  };

  const masteryPct = deck.length ? Math.round((known.size / deck.length) * 100) : 0;

  // ── Input Screen ─────────────────────────────────
  if (step === 'input') return (
    <div className="animate-fade-in" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h2 className="text-gradient">Smart Flashcards</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Paste your notes and let AI build a perfect study deck in seconds.</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--danger)', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', color: 'var(--danger)', fontSize: '0.95rem' }}>
          {error}
        </div>
      )}

      {srsDeck.length > 0 && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}><RefreshCw size={18} /> Due for Review</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>You have {srsDeck.length} cards in your Spaced Repetition queue.</p>
          </div>
          <button onClick={() => { setDeck(srsDeck); setCurrentIdx(0); setIsFlipped(false); setKnown(new Set()); setUnknown(new Set()); localStorage.setItem(SRS_KEY, '[]'); setSrsDeck([]); setStep('study'); }} className="btn-primary" style={{ padding: '0.75rem 1.5rem', background: 'var(--warning)', color: '#000', borderColor: 'var(--warning)' }}>
            Review Queue Now
          </button>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.05rem' }}>
          Paste your study notes below:
        </label>
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="e.g. The mitochondria is the powerhouse of the cell... photosynthesis converts sunlight into glucose... Newton's 3 laws of motion..."
          rows={12}
          style={{
            width: '100%', padding: '1rem 1.25rem', borderRadius: 12,
            border: '1px solid var(--border-color)', background: 'var(--bg-secondary)',
            color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1rem',
            lineHeight: 1.7, resize: 'vertical', outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {inputText.length > 0 ? `${inputText.length} characters` : 'More text = better flashcards'}
          </span>
          <button
            onClick={handleGenerate}
            disabled={!inputText.trim()}
            className="btn-primary"
            style={{ padding: '0.875rem 2rem', fontSize: '1.05rem', opacity: inputText.trim() ? 1 : 0.5 }}
          >
            <Sparkles size={20} />
            Generate Flashcards
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { icon: '⚡', title: 'AI-Powered', desc: 'Extracts 8–12 key concepts automatically' },
          { icon: '🔄', title: '3D Flip Animation', desc: 'Click or press Space to reveal answers' },
          { icon: '🎯', title: 'Track Mastery', desc: 'Mark cards as Known or Still Learning' },
        ].map(tip => (
          <div key={tip.title} style={{ flex: 1, minWidth: 180, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{tip.icon}</div>
            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{tip.title}</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{tip.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Loading Screen ────────────────────────────────
  if (step === 'loading') return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1.5rem' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', animation: 'spin 0.8s linear infinite' }} />
      <h3 style={{ color: 'var(--text-secondary)' }}>AI is building your flashcard deck…</h3>
    </div>
  );

  // ── Done Screen ───────────────────────────────────
  if (step === 'done') return (
    <div className="animate-fade-in" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
        <h2 className="text-gradient">Deck Complete! 🎉</h2>
      </div>
      <div className="glass-panel" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <ProgressRing percent={masteryPct} size={120} strokeWidth={10} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>{masteryPct}%</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>mastered</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{known.size}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Known</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger)' }}>{unknown.size}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Still Learning</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{deck.length - known.size - unknown.size}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Skipped</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <button onClick={restart} className="btn-primary" style={{ padding: '0.875rem 2rem' }}>
            <RotateCcw size={18} /> Study Again
          </button>
          {unknown.size > 0 && (
             <button onClick={() => { saveSRS(); alert('Saved to spaced repetition deck!'); resetAll(); }} className="btn-secondary" style={{ padding: '0.875rem 2rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
               Save {unknown.size} to SRS Queue
             </button>
          )}
          <button onClick={resetAll} className="btn-secondary" style={{ padding: '0.875rem 2rem' }}>
            <RefreshCw size={18} /> New Deck
          </button>
        </div>
      </div>
    </div>
  );

  // ── Study Screen ──────────────────────────────────
  const card = deck[currentIdx];
  return (
    <div className="animate-fade-in" style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '1.75rem' }}>Smart Flashcards</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Space = flip · ← → = navigate
          </p>
        </div>
        {/* Mini progress ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Mastery</p>
            <p style={{ fontWeight: 700, color: 'var(--success)' }}>{masteryPct}%</p>
          </div>
          <div style={{ position: 'relative', width: 56, height: 56 }}>
            <ProgressRing percent={masteryPct} size={56} strokeWidth={5} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
              {known.size}/{deck.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: 'var(--border-color)', borderRadius: 99, height: 8, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, height: '100%', width: `${(known.size / deck.length) * 100}%`, background: 'var(--success)', zIndex: 3, transition: 'width 0.4s ease' }} />
        <div style={{ position: 'absolute', left: 0, height: '100%', width: `${((known.size + unknown.size) / deck.length) * 100}%`, background: 'var(--danger)', zIndex: 2, transition: 'width 0.4s ease', opacity: 0.5 }} />
        <div style={{ position: 'absolute', left: 0, height: '100%', width: `${((currentIdx + 1) / deck.length) * 100}%`, background: 'var(--accent-primary)', zIndex: 1, transition: 'width 0.3s ease', opacity: 0.3 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '-1rem' }}>
        <span style={{ fontWeight: 600 }}>Card {currentIdx + 1} of {deck.length}</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={14} /> {known.size} Known</span>
          <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><XCircle size={14} /> {unknown.size} Learning</span>
        </div>
      </div>

      {/* Flip card */}
      <FlipCard card={card} isFlipped={isFlipped} onClick={() => setIsFlipped(f => !f)} />

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={handlePrev} disabled={currentIdx === 0} className="btn-secondary" style={{ opacity: currentIdx === 0 ? 0.4 : 1 }}>
          <ChevronLeft size={20} /> Prev
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={markUnknown}
            className="btn-secondary"
            style={{
              borderColor: unknown.has(currentIdx) ? 'var(--danger)' : 'var(--border-color)',
              color: unknown.has(currentIdx) ? 'var(--danger)' : 'var(--text-primary)',
              padding: '0.875rem 1.5rem'
            }}
          >
            <XCircle size={20} /> Skip
          </button>
          <button
            onClick={markKnown}
            className="btn-primary"
            style={{
              background: 'var(--success)',
              borderColor: 'var(--success)',
              padding: '0.875rem 2rem'
            }}
          >
            <CheckCircle2 size={20} /> I Know This!
          </button>
        </div>

        <button onClick={handleNext} className="btn-secondary">
          {currentIdx === deck.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
        </button>
      </div>

      {/* Reset link */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={resetAll} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}>
          ← Start over with new notes
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
