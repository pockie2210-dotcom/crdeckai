import React, { useState } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { chatWithAI, getApiKey } from '../utils/openai';

const StudyAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Study Assistant. What would you like to learn about today? I can help explain concepts or break down difficult topics.", sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = React.useRef(null);

  React.useEffect(() => {
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
      setMessages(prev => [...prev, { id: Date.now(), text: '⚠️ No API key set. Please go to Settings and enter your OpenAI API key.', sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      return;
    }

    const userMsg = { id: Date.now(), text: input, sender: 'user', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
      const text = await chatWithAI(apiMessages);
      setMessages(prev => [...prev, { id: Date.now() + 1, text, sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      speak(text);
    } catch (err) {
      const errorMsg = err.message === 'NO_KEY' ? '⚠️ No API key set. Please go to Settings first.' : `Error: ${err.message}`;
      setMessages(prev => [...prev, { id: Date.now() + 1, text: errorMsg, sender: 'bot', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      speak("I'm sorry, an error occurred. Please check your settings.");
    }
    setIsTyping(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 6rem)' }}>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="text-gradient">AI Study Tutor</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Get real-time answers and concept breakdowns</p>
        </div>
        <button 
          onClick={() => { setVoiceEnabled(!voiceEnabled); if(voiceEnabled) window.speechSynthesis.cancel(); }} 
          className="btn-secondary" 
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: voiceEnabled ? 'var(--accent-primary)' : 'var(--border-color)' }}
        >
          {voiceEnabled ? <Volume2 size={18} color="var(--accent-hover)" /> : <VolumeX size={18} />} 
          <span style={{ color: voiceEnabled ? 'var(--accent-hover)' : 'inherit' }}>{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {msg.sender === 'bot' && <div style={{ marginRight: '1rem', background: 'var(--bg-secondary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-color)' }}><Bot size={20} color="var(--accent-primary)" /></div>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)', color: msg.sender === 'user' ? 'white' : 'var(--text-primary)', padding: '1rem 1.5rem', borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0', border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none', lineHeight: '1.6', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
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
              {[0, 0.2, 0.4].map((delay, i) => <div key={i} style={{ width: '8px', height: '8px', background: 'var(--text-secondary)', borderRadius: '50%', animation: `fadeIn 1s infinite alternate`, animationDelay: `${delay}s` }}></div>)}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
        <button 
          onClick={toggleMic} 
          type="button"
          style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: isListening ? 'rgba(239, 68, 68, 0.15)' : 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '40px', height: '40px', transition: 'all 0.2s', boxShadow: isListening ? '0 0 15px rgba(239, 68, 68, 0.4)' : 'none' }}
        >
          {isListening ? <Mic size={20} color="var(--danger)" style={{ animation: 'pulse 1.5s infinite' }} /> : <MicOff size={20} color="var(--text-secondary)" />}
        </button>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isListening ? "Listening..." : "Ask me anything..."} style={{ flex: 1, padding: '1rem 1.5rem 1rem 4rem', borderRadius: '12px', border: `1px solid ${isListening ? 'var(--danger)' : 'var(--border-color)'}`, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', fontSize: '1rem', transition: 'border-color 0.2s' }} onFocus={(e) => { if (!isListening) e.target.style.borderColor = 'var(--accent-primary)'; }} onBlur={(e) => { if (!isListening) e.target.style.borderColor = 'var(--border-color)'; }} />
        <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem', borderRadius: '12px' }}><Send size={20} /></button>
      </form>
    </div>
  );
};

export default StudyAssistant;
