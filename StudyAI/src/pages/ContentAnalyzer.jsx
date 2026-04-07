import React, { useState } from 'react';
import { Target, FileText, Globe, ArrowRight, CheckCircle } from 'lucide-react';
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

        <button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !content.trim()} 
          className={`btn-primary ${isAnalyzing ? 'shimmer-bg' : ''}`} 
          style={{ width: '100%', padding: '1rem', position: 'relative', overflow: 'hidden' }}
        >
          {isAnalyzing ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
              <div style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              {inputType === 'link' ? 'Deep Scraping & Analyzing Site...' : 'Intelligent AI Analysis...'}
            </span>
          ) : <>Analyze Content <ArrowRight size={18} /></>}
        </button>
      </div>

      {results && (
        <div className="animate-slide-up" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--accent-primary)', fontSize: '1.25rem' }}><Target size={22} /> Executive Summary</h3>
            <p style={{ lineHeight: '1.7', fontSize: '1.1rem', opacity: 0.9 }}>{results.summary}</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {results.keyPoints?.length > 0 && (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={18} /> Major Key Insights</h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: '1.6' }}>
                  {results.keyPoints.map((pt, i) => <li key={i} style={{ paddingLeft: '0.5rem' }}>{pt}</li>)}
                </ul>
              </div>
            )}
            
            {results.definitions?.length > 0 && (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={18} /> Core Definitions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {results.definitions.map((def, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }} className="hover-lift">
                      <strong style={{ display: 'block', color: 'var(--accent-primary)', marginBottom: '0.4rem', fontSize: '1rem' }}>{def.term}</strong>
                      <span style={{ fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.85 }}>{def.definition}</span>
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
