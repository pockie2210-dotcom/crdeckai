import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Key, X } from 'lucide-react';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudyAssistant from './pages/StudyAssistant';
import ContentAnalyzer from './pages/ContentAnalyzer';
import Assessments from './pages/Assessments';
import AIChecker from './pages/AIChecker';
import Flashcards from './pages/Flashcards';
import MemoryTest from './pages/MemoryTest';
import FocusZone from './pages/FocusZone';
import Settings from './pages/Settings';

import { getApiKey } from './utils/openai';
import './index.css';

function APIKeyBanner({ onDismiss }) {
  return (
    <div style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <Key size={20} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, lineHeight: '1.5' }}>
        <strong>No API Key set.</strong> StudyAI needs your OpenAI API key to work.{' '}
        <a href="/settings" style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'underline' }}>Go to Settings →</a>
      </span>
      <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={18} /></button>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [showBanner, setShowBanner] = useState(!getApiKey());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <BrowserRouter>
      <Layout theme={theme} toggleTheme={toggleTheme}>
        {showBanner && <APIKeyBanner onDismiss={() => setShowBanner(false)} />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<StudyAssistant />} />
          <Route path="/analyzer" element={<ContentAnalyzer />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/checker" element={<AIChecker />} />
          <Route path="/focus" element={<FocusZone />} />
          <Route path="/memory" element={<MemoryTest />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/settings" element={<Settings onKeySaved={() => setShowBanner(false)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
