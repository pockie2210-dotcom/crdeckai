import React, { useState, useEffect, useMemo } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { getApiKey, callAI } from '../utils/openai';
import { incrementMemoryTest } from '../utils/stats';

// ── Utility to parse text with {blanks} ───────────────────────────────────────
function parseClozeText(text) {
  const parts = [];
  let currentString = "";
  let inBlank = false;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{' && !inBlank) {
      if (currentString) parts.push({ type: 'text', content: currentString });
      currentString = "";
      inBlank = true;
    } else if (text[i] === '}' && inBlank) {
      if (currentString) parts.push({ type: 'blank', content: currentString });
      currentString = "";
      inBlank = false;
    } else {
      currentString += text[i];
    }
  }
  if (currentString) parts.push({ type: 'text', content: currentString });
  return parts;
}

const MemoryTest = () => {
  const [step, setStep] = useState('setup'); // setup | loading | active | complete
  const [inputText, setInputText] = useState('');
  const [testText, setTestText] = useState('');
  const [error, setError] = useState('');
  
  // State for the interactive blanks
  // We'll store what the user has typed for each blank index
  const [answers, setAnswers] = useState({});

  const handleGenerate = async () => {
    if (inputText.length < 50) {
      setError('Please paste at least one full paragraph of notes to generate a test.');
      return;
    }
    const key = getApiKey();
    if (!key) {
      setError('⚠️ No API key set. Go to Settings first.');
      return;
    }

    setStep('loading');
    setError('');

    try {
      const systemPrompt = `You are a strict, precise educational tool. The user will provide their study notes. 
Your task is to create a "Fill in the Blanks" memory test.
You must return the EXACT same text the user provided, but identify 8 to 12 crucial key terms (vocabulary, names, dates, or core concepts) and wrap them in curly braces.
Example: The process by which plants make food is called {photosynthesis}.

RULES:
1. Do NOT summarize or change the user's wording. Use their exact text.
2. Only wrap the key terms in curly braces {like this}.
3. The term inside the braces must be exactly 1 to 3 words maximum.
4. You MUST respond with ONLY a valid JSON object in this format:
{
  "testText": "<the modified text>"
}`;

      const resultText = await callAI(
        [{ role: 'user', content: inputText }],
        'json_object',
        systemPrompt
      );

      const parsed = JSON.parse(resultText);
      if (!parsed.testText || !parsed.testText.includes('{')) {
        throw new Error('AI failed to generate blanks. Please try slightly longer or more factual notes.');
      }

      setTestText(parsed.testText);
      setAnswers({});
      setStep('active');
    } catch (err) {
      setError(err.message || 'Failed to generate test.');
      setStep('setup');
    }
  };

  // ── Render the parsed text with inputs ──────────────────────────────────────
  const parsedParts = useMemo(() => parseClozeText(testText), [testText]);
  const totalBlanks = parsedParts.filter(p => p.type === 'blank').length;
  
  // Calculate correct blanks
  let correctCount = 0;
  parsedParts.forEach((part, idx) => {
    if (part.type === 'blank') {
      const userAnswer = (answers[idx] || '').trim().toLowerCase();
      const correctAnswer = part.content.trim().toLowerCase();
      if (userAnswer === correctAnswer) correctCount++;
    }
  });

  const progressPct = totalBlanks === 0 ? 0 : Math.round((correctCount / totalBlanks) * 100);

  // Check completion
  useEffect(() => {
    if (step === 'active' && totalBlanks > 0 && correctCount === totalBlanks) {
      setTimeout(() => {
        incrementMemoryTest();
        setStep('complete');
      }, 800); // short delay to see the last green box
    }
  }, [correctCount, totalBlanks, step]);

  const reset = () => {
    setStep('setup');
    setTestText('');
    setAnswers({});
    setInputText('');
  };

  // ── UI Screens ──────────────────────────────────────────────────────────────
  if (step === 'setup') {
    return (
      <div className="animate-fade-in" style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#ec4899' }}>
            <BrainCircuit size={32} />
          </div>
          <h2 className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)', fontSize: '2.5rem', marginBottom: '1rem' }}>Memory Test Generator</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Paste your notes below. The AI will convert them into an active recall test by blanking out the key terms. You must fill them in from memory!
          </p>
        </div>

        {error && <div style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: 12, border: '1px solid var(--danger)' }}>{error}</div>}

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <textarea
            autoFocus
            placeholder="Paste your study notes, paragraphs, or facts here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: '100%', minHeight: 200, padding: '1.25rem', borderRadius: 12, border: '1px solid #ec4899', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1.05rem', outline: 'none', marginBottom: '1.5rem', resize: 'vertical' }}
          />
          <button 
            onClick={handleGenerate} 
            disabled={inputText.trim().length < 20}
            className="btn-primary" 
            style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', opacity: inputText.trim().length > 20 ? 1 : 0.5 }}
          >
            <Sparkles size={20} /> Generate Fill-in-the-Blanks Test
          </button>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1.5rem' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: '#ec4899', animation: 'spin 0.8s linear infinite' }} />
        <h3 style={{ color: 'var(--text-secondary)' }}>Analyzing notes and hiding key terms...</h3>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>Active Recall Test</h2>
        <button onClick={reset} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <RotateCcw size={16} /> New Test
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600, color: step === 'complete' ? 'var(--success)' : '#ec4899' }}>
          <span>Memory Mastery</span>
          <span>{progressPct}% ({correctCount}/{totalBlanks})</span>
        </div>
        <div style={{ width: '100%', height: 10, background: 'var(--bg-secondary)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: progressPct + '%', background: step === 'complete' ? 'var(--success)' : 'linear-gradient(to right, #8b5cf6, #ec4899)', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {step === 'complete' && (
        <div className="animate-fade-in" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 16, textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={32} color="var(--success)" />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--success)', margin: 0 }}>Flawless Memory!</h3>
          <p style={{ color: 'var(--text-primary)', margin: 0 }}>You successfully recalled all {totalBlanks} hidden terms.</p>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2.5rem', fontSize: '1.25rem', lineHeight: 2, color: 'var(--text-primary)' }}>
        {parsedParts.map((part, idx) => {
          if (part.type === 'text') {
            return <span key={idx} style={{ whiteSpace: 'pre-wrap' }}>{part.content}</span>;
          }

          const correctAnswer = part.content.trim().toLowerCase();
          const userAnswer = (answers[idx] || '').trim().toLowerCase();
          const isCorrect = userAnswer === correctAnswer;

          return (
            <input
              key={idx}
              type="text"
              disabled={isCorrect || step === 'complete'}
              value={answers[idx] || ''}
              onChange={(e) => setAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
              style={{
                width: Math.max(part.content.length * 14, 80),
                margin: '0 0.4rem',
                padding: '0.2rem 0.5rem',
                textAlign: 'center',
                fontFamily: 'inherit',
                fontSize: '1.15rem',
                fontWeight: 600,
                borderRadius: 8,
                outline: 'none',
                color: isCorrect ? '#fff' : 'var(--text-primary)',
                background: isCorrect ? 'var(--success)' : 'var(--bg-primary)',
                border: '2px solid ' + (isCorrect ? 'var(--success)' : '#ec4899'),
                boxShadow: isCorrect ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MemoryTest;
