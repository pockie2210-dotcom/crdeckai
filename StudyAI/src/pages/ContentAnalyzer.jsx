import React, { useState } from 'react';
import { Target, FileText, Globe, ArrowRight } from 'lucide-react';
import { analyzeText, analyzeWebLink, getApiKey } from '../utils/openai';
import { incrementTopics } from '../utils/stats';

const ContentAnalyzer = () => {
  const [inputType, setInputType] = useState('text');
  const [content, setContent] = useState('');
  const [length, setLength] = useState(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    if (!getApiKey()) { setError('⚠️ No API key set. Please go to Settings first.'); return; }
    setIsAnalyzing(true);
    setResults(null);
    setError('');
    
    try {
      let result;
      if (inputType === 'link') {
        result = await analyzeWebLink(content, length);
      } else {
        result = await analyzeText(content, length);
      }
      setResults(result);
      incrementTopics();
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem', overflowY: 'auto' }}>
      <div>
        <h2 className="text-gradient">AI Content Analyzer</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Extract summaries, key ideas, and facts instantly.</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => { setInputType('text'); setContent(''); setResults(null); setError(''); }} className={inputType === 'text' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1 }}><FileText size={18} /> Text Paste</button>
        <button onClick={() => { setInputType('link'); setContent(''); setResults(null); setError(''); }} className={inputType === 'link' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1 }}><Globe size={18} /> Web Link</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {inputType === 'text' ? (
          <textarea placeholder="Paste your large text or document content here..." value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical', fontSize: '1.05rem' }} />
        ) : (
          <input type="text" placeholder="Paste any article or website URL here (e.g. Wikipedia...)" value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1.05rem' }} />
        )}

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Analysis Detail: <strong style={{ color: 'var(--accent-primary)' }}>{length < 33 ? 'Short Summary' : length < 66 ? 'Medium Detail' : 'Full Deep Dive'}</strong></span>
          </div>
          <input type="range" min="0" max="100" value={length} onChange={(e) => setLength(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-primary)' }} />
        </div>

        {error && <div style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.08)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}

        <button onClick={handleAnalyze} disabled={isAnalyzing || !content.trim()} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
          {isAnalyzing ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              {inputType === 'link' ? 'Scraping & Analyzing Site...' : 'Analyzing Content...'}
            </span>
          ) : <>Analyze Content <ArrowRight size={18} /></>}
        </button>
      </div>

      {results && (
        <div className="animate-fade-in glass-panel" style={{ padding: '2rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}><Target size={20} /> Executive Summary</h3>
            <p style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>{results.summary}</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {results.keyPoints?.length > 0 && (
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Key Ideas</h3>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', lineHeight: '1.5' }}>
                  {results.keyPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              </div>
            )}
            {results.definitions?.length > 0 && (
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Important Definitions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {results.definitions.map((def, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <strong style={{ display: 'block', color: 'var(--accent-primary)', marginBottom: '0.35rem' }}>{def.term}</strong>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.4', display: 'block' }}>{def.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />
    </div>
  );
};

export default ContentAnalyzer;
