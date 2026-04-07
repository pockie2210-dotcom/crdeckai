// Force Rebuild: 2026-04-07
import React, { useState, useEffect, useRef } from 'react';
import { chatWithAI, getApiKey, callAI } from '../utils/openai';
import { Plus, MessageSquare, Trash2, Bot, User, Mic, MicOff, Volume2, VolumeX, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const StudyAssistant = () => {
  const SESSIONS_KEY = 'studyai_chat_sessions';
  const ACTIVE_KEY = 'studyai_active_session_id';

  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { console.error("Session parse failed", e); }
    return [{ id: 'default', title: 'New Study Session', messages: [{ id: 1, text: "Hi! I'm your AI Study Assistant. What would you like to learn about today?", sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }], lastUpdated: Date.now() }];
  });

  const [activeId, setActiveId] = useState(() => localStorage.getItem(ACTIVE_KEY) || 'default');
  const activeSession = sessions.find(s => s.id === activeId) || sessions[0] || { messages: [] };
  const messages = activeSession.messages || [];

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const recognitionRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
      localStorage.setItem(ACTIVE_KEY, activeId);
    } catch (e) {
      console.error('Storage sync failed', e);
    }
  }, [sessions, activeId]);

  const createNewChat = () => {
    const id = Date.now().toString();
    const newSession = {
      id,
      title: 'New Study Session',
      messages: [{ id: 1, text: "Hi! I'm your AI Study Assistant. How can I help you study today?", sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }],
      lastUpdated: Date.now()
    };
    setSessions([newSession, ...sessions]);
    setActiveId(id);
  };

  const deleteSession = (e, id) => {
    e.stopPropagation();
    if (sessions.length <= 1) return alert("You must keep at least one chat.");
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (activeId === id) setActiveId(newSessions[0].id);
  };

  const autoRenameSession = async (messages) => {
    if (activeSession.title !== 'New Study Session' || messages.length < 2) return;
    try {
      const userText = messages.find(m => m.sender === 'user')?.text || "";
      const title = await callAI([{ role: 'user', content: `Summarize this study topic into a 3-word title: ${userText}` }], null, "You are a helpful assistant that names chat sessions concisely.");
      const updated = sessions.map(s => s.id === activeId ? { ...s, title: title.replace(/["']/g, '') } : s);
      setSessions(updated);
    } catch (e) { console.error('Naming failed', e); }
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let currentInput = '';
        for (let i = 0; i < event.results.length; i++) {
          currentInput += event.results[i][0].transcript;
        }
        setInput(currentInput);
      };
      
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleMic = (e) => {
    e.preventDefault();
    if (!recognitionRef.current) return alert("Your browser doesn't support Voice Dictation.");
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInput(''); // clear input before dictating
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!getApiKey()) {
      const botMsg = { id: Date.now(), text: '⚠️ No API key set. Please go to Settings.', sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      const updatedMessages = [...messages, botMsg];
      setSessions(sessions.map(s => s.id === activeId ? { ...s, messages: updatedMessages, lastUpdated: Date.now() } : s));
      return;
    }

    const userMsg = { id: Date.now(), text: input, sender: 'user', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    let currentMessages = [...messages, userMsg];
    
    // Update local state immediately for snappy UI
    setSessions(sessions.map(s => s.id === activeId ? { ...s, messages: currentMessages, lastUpdated: Date.now() } : s));
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = currentMessages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
      const text = await chatWithAI(apiMessages);
      const botMsg = { id: Date.now() + 1, text, sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      const finalMessages = [...currentMessages, botMsg];
      
      setSessions(sessions.map(s => s.id === activeId ? { ...s, messages: finalMessages, lastUpdated: Date.now() } : s));
      speak(text);
      if (currentMessages.length === 2) autoRenameSession(finalMessages);
    } catch (err) {
      const errorMsg = `Error: ${err.message}`;
      setSessions(sessions.map(s => s.id === activeId ? { ...s, messages: [...currentMessages, { id: Date.now() + 1, text: errorMsg, sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }], lastUpdated: Date.now() } : s));
    }
    setIsTyping(false);
  };

  return (
    <div style={{ display: 'flex', height: '100%', gap: '1.5rem', overflow: 'hidden' }}>
      
      {/* HISTORY SIDEBAR */}
      <div className="glass-panel animate-fade-in" style={{ 
        width: isSidebarOpen ? '320px' : '0px', 
        opacity: isSidebarOpen ? 1 : 0,
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isSidebarOpen ? '1.5rem' : '0px',
        borderRight: isSidebarOpen ? '1px solid var(--border-color)' : 'none'
      }}>
        <button onClick={createNewChat} className="btn-primary" style={{ width: '100%', marginBottom: '1.5rem', gap: '0.75rem', padding: '0.875rem' }}>
          <Plus size={20} /> New Study Chat
        </button>
        
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>History</span>
          {sessions.map(s => (
            <div 
              key={s.id} 
              onClick={() => setActiveId(s.id)}
              className={s.id === activeId ? 'active-nav' : 'hover-lift'}
              style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: s.id === activeId ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: s.id === activeId ? 'white' : 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
            >
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                 <MessageSquare size={16} style={{ flexShrink: 0 }} />
                 <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>{s.title}</span>
               </div>
               <button 
                 onClick={(e) => deleteSession(e, s.id)}
                 style={{ background: 'none', border: 'none', color: s.id === activeId ? 'white' : 'var(--danger)', opacity: 0.6, cursor: 'pointer', padding: '4px' }}
               >
                 <Trash2 size={14} />
               </button>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        
        {/* Toggle Sidebar Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ position: 'absolute', left: '-2.25rem', top: '50%', transform: 'translateY(-50%)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, cursor: 'pointer', color: 'var(--text-secondary)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="text-gradient" style={{ fontSize: '1.75rem' }}>AI Study Tutor</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Session: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeSession.title}</span></p>
          </div>
          <button 
            onClick={() => { setVoiceEnabled(!voiceEnabled); if(voiceEnabled) window.speechSynthesis.cancel(); }} 
            className="btn-secondary" 
            style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: voiceEnabled ? 'var(--accent-primary)' : 'var(--border-color)' }}
          >
            {voiceEnabled ? <Volume2 size={18} color="var(--accent-hover)" /> : <VolumeX size={18} />} 
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }} className="custom-scrollbar">
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              {msg.sender === 'bot' && <div style={{ marginRight: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-color)' }}><Bot size={20} color="var(--accent-primary)" /></div>}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: msg.sender === 'user' ? 'white' : 'var(--text-primary)', padding: '1rem 1.5rem', borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0', border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none', lineHeight: '1.6', fontSize: '1.05rem', whiteSpace: 'pre-wrap', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{msg.timestamp}</span>
              </div>
              {msg.sender === 'user' && <div style={{ marginLeft: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-color)' }}><User size={20} color="var(--text-secondary)" /></div>}
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div style={{ marginRight: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-color)' }}><Bot size={20} color="var(--accent-primary)" /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: '16px 16px 16px 0', border: '1px solid var(--border-color)' }}>
                <div className="shimmer-bg" style={{ width: '40px', height: '10px', borderRadius: '4px' }} />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
          <button 
            onClick={toggleMic} 
            type="button"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: isListening ? 'rgba(239, 68, 68, 0.15)' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '40px', height: '40px', transition: 'all 0.2s', zIndex: 2 }}
          >
            {isListening ? <Mic size={20} color="var(--danger)" /> : <MicOff size={20} color="var(--text-secondary)" />}
          </button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isListening ? "Listening..." : "Ask me anything..."} style={{ flex: 1, padding: '1.25rem 1.5rem 1.25rem 4rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', fontSize: '1.05rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }} />
          <button type="submit" className="btn-primary" style={{ padding: '0 2rem', borderRadius: '12px' }}><Send size={22} /></button>
        </form>
      </div>
    </div>
  );
};

export default StudyAssistant;
