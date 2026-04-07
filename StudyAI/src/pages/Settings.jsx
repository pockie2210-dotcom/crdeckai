import React, { useState, useEffect } from 'react';
import { Key, CheckCircle, Trash2, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { getApiKey, saveApiKey, clearApiKey, detectProvider, getProviderLabel } from '../utils/openai';

const Settings = ({ onKeySaved }) => {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const existing = getApiKey();
    setHasKey(!!existing);
    if (existing) {
      setKey(existing.substring(0, 8) + '••••••••••••••••••••••••••••••');
      setProvider(detectProvider(existing));
    }
  }, []);

  const handleKeyChange = (e) => {
    const val = e.target.value;
    setKey(val);
    setProvider(detectProvider(val));
  };

  const handleSave = () => {
    if (!key.trim() || key.includes('•')) return;
    saveApiKey(key.trim());
    setHasKey(true);
    setProvider(detectProvider(key.trim()));
    setSaved(true);
    setKey(key.trim().substring(0, 8) + '••••••••••••••••••••••••••••••');
    setTimeout(() => setSaved(false), 3000);
    if (onKeySaved) onKeySaved();
  };

  const handleClear = () => {
    clearApiKey();
    setKey('');
    setHasKey(false);
    setProvider(null);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 className="text-gradient">API Key Settings</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          StudyAI uses your personal API key. Your key never leaves your browser.
        </p>
      </div>

      {/* Provider choice cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={22} color="var(--success)" />
            <strong style={{ fontSize: '1.1rem' }}>Groq — Free ✨</strong>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>14,400 requests/day free. No credit card needed. Ultra-fast responses (LLaMA 3).</p>
          <a href="https://console.groq.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ExternalLink size={13} /> Get free Groq key →
          </a>
        </div>
        <div style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Key size={22} color="var(--accent-primary)" />
            <strong style={{ fontSize: '1.1rem' }}>OpenAI — Paid</strong>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Pay-as-you-go. ~$5 credit lasts months. Powered by GPT-3.5.</p>
          <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ExternalLink size={13} /> Get OpenAI key →
          </a>
        </div>
      </div>

      {/* Security Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '1rem 1.25rem', borderRadius: '12px' }}>
        <ShieldCheck size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Your key is private.</strong> It's stored only in your browser's localStorage and never uploaded to any server.
        </span>
      </div>

      {/* Key Input */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Key size={20} color="var(--accent-primary)" />
          <h3>Paste Your API Key</h3>
          {hasKey && provider && (
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', padding: '0.3rem 0.75rem', borderRadius: '999px', background: provider === 'groq' ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)', color: provider === 'groq' ? 'var(--success)' : 'var(--accent-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={13} /> {getProviderLabel(getApiKey())} Active
            </span>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="sk-... (OpenAI)  or  gsk_... (Groq)"
            value={key}
            onChange={handleKeyChange}
            onFocus={(e) => { if (hasKey) { setKey(''); setHasKey(false); setProvider(null); } e.target.style.borderColor = 'var(--accent-primary)'; }}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
          />
          {provider && !key.includes('•') && (
            <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.75rem', fontWeight: 600, color: provider === 'groq' ? 'var(--success)' : provider === 'openai' ? 'var(--accent-primary)' : 'var(--danger)' }}>
              {provider === 'groq' ? '✓ Groq' : provider === 'openai' ? '✓ OpenAI' : '✗ Unknown'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleSave} disabled={!key.trim() || key.includes('•')} className="btn-primary" style={{ flex: 1, padding: '0.875rem' }}>
            {saved ? <><CheckCircle size={18} /> Saved!</> : <><Key size={18} /> Save Key</>}
          </button>
          {hasKey && (
            <button onClick={handleClear} className="btn-secondary" style={{ padding: '0.875rem 1.5rem' }}>
              <Trash2 size={18} /> Remove
            </button>
          )}
        </div>
      </div>

      {/* Pricing info */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>💰 Estimated Cost per 1,000 Requests</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>• <strong style={{ color: 'var(--success)' }}>Groq (LLaMA 3):</strong> $0.00 — completely free up to 14,400/day</span>
          <span>• <strong style={{ color: 'var(--accent-primary)' }}>OpenAI (GPT-3.5):</strong> ~$0.50 — extremely cheap per million tokens</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
