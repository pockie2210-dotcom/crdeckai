import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { callAI } from '../utils/openai';
import { incrementQuizzes } from '../utils/stats';

const QuizGenerator = () => {
  const [difficulty, setDifficulty] = useState('Medium');
  const [topic, setTopic] = useState('');
  const [quizState, setQuizState] = useState('setup'); // setup, loading, taking, grading, results
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({}); // store AI feedback for short answers

  const handleStart = async () => {
    if (topic.trim().length < 5) {
      setError("Please enter a clear topic or paste some notes.");
      return;
    }
    
    setError('');
    setQuizState('loading');
    
    try {
      const prompt = `You are a strict, expert professor creating a ${difficulty}-level quiz covering: "${topic}".
Generate exactly 5 high-quality questions (a mix of 'mcq' and 'short').
- For 'mcq', provide a "question" string, an "options" array of exactly 4 strings, and a "correct" integer index (0-3).
- For 'short', provide a "question" string, and a "correctContext" string explaining the ideal conceptual answer briefly.
Return ONLY valid JSON in this exact structure: { "questions": [ { "type": "mcq" | "short", ... } ] }`;

      const resultText = await callAI([{ role: 'user', content: 'Generate the quiz.' }], 'json_object', prompt);
      const parsed = JSON.parse(resultText);
      
      if (!parsed.questions || parsed.questions.length === 0) throw new Error("AI returned invalid structure.");
      
      // Inject IDs
      const formattedQuestions = parsed.questions.map((q, idx) => ({ ...q, id: idx + 1 }));
      setQuestions(formattedQuestions);
      setAnswers({});
      setScore(0);
      setQuizState('taking');
    } catch (err) {
      setError(err.message || "Failed to generate quiz.");
      setQuizState('setup');
    }
  };

  const handleSubmit = async () => {
    setQuizState('grading');
    let newScore = 0;
    let aiFeedback = {};
    
    // Grade MCQs instantly
    questions.forEach(q => {
      if (q.type === 'mcq' && answers[q.id] === q.correct) newScore += 1;
    });

    const shortQs = questions.filter(q => q.type === 'short');
    if (shortQs.length > 0) {
      try {
        const payload = shortQs.map(q => ({
          id: q.id, 
          question: q.question, 
          idealConcept: q.correctContext, 
          studentAnswer: answers[q.id] || "No answer provided"
        }));
        
        const prompt = `You are a fair but strict grader. Evaluate the student answers.
Data: ${JSON.stringify(payload)}
Return ONLY valid JSON:
{
  "grades": [
    { "id": integer, "isCorrect": boolean, "feedback": "1 short sentence explaining why" }
  ]
}`;
        const resultText = await callAI([{ role: 'user', content: 'Grade exact match concepts.' }], 'json_object', prompt);
        const parsed = JSON.parse(resultText);
        
        if (parsed.grades) {
          parsed.grades.forEach(g => {
            if (g.isCorrect) newScore += 1;
            aiFeedback[g.id] = g;
          });
        }
      } catch (e) {
        console.error("Grading failed", e);
      }
    }

    setFeedback(aiFeedback);
    setScore(newScore);
    incrementQuizzes();
    setQuizState('results');
  };

  return (
    <div className="animate-fade-in" style={{height: '100%', overflowY: 'auto'}}>
      {quizState === 'setup' && (
        <div className="glass-panel" style={{ padding: '3rem 2rem', maxWidth: '640px', margin: '2rem auto', textAlign: 'center' }}>
          <Target size={56} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
          <h3 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Ready to test yourself?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>Enter a topic or paste your notes to generate a real-time, smart quiz.</p>
          
          {error && <div style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: 12, border: '1px solid var(--danger)', marginBottom: '1.5rem' }}>{error}</div>}

          <textarea 
            placeholder="E.g., World War 2 timeline..."
            value={topic}
            onChange={e => setTopic(e.target.value)}
            style={{ width: '100%', minHeight: 120, padding: '1rem 1.25rem', borderRadius: 12, border: '1px solid var(--accent-primary)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '1.05rem', outline: 'none', marginBottom: '1.5rem', resize: 'vertical' }}
          />

          <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>Select Difficulty:</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Easy', 'Medium', 'Hard'].map(level => (
                <button 
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={difficulty === level ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.5rem 1.5rem', minWidth: '100px' }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <button onClick={handleStart} disabled={!topic.trim()} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', opacity: topic.trim() ? 1 : 0.5 }}>Generate AI Quiz</button>
        </div>
      )}

      {quizState === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', gap: '1.5rem' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', animation: 'spin 0.8s linear infinite' }} />
          <h3 style={{ color: 'var(--text-secondary)' }}>Crafting tricky questions...</h3>
        </div>
      )}

      {quizState === 'grading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', gap: '1.5rem' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', animation: 'spin 0.8s linear infinite' }} />
          <h3 style={{ color: 'var(--text-secondary)' }}>The Professor is grading your answers...</h3>
        </div>
      )}

      {quizState === 'taking' && (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Difficulty: <span style={{ color: 'var(--accent-primary)' }}>{difficulty}</span></span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Questions: {questions.length}</span>
          </div>

          {questions.map((q, idx) => (
            <div key={q.id} className="glass-panel" style={{ padding: '2rem' }}>
              <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', lineHeight: '1.4' }}>{idx + 1}. {q.question}</h4>
              
              {q.type === 'mcq' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {q.options.map((opt, optIdx) => (
                    <button 
                      key={optIdx} 
                      onClick={() => setAnswers({...answers, [q.id]: optIdx})}
                      style={{ 
                        textAlign: 'left', padding: '1rem 1.5rem', borderRadius: '12px', 
                        border: `1px solid ${answers[q.id] === optIdx ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        background: answers[q.id] === optIdx ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)',
                        color: answers[q.id] === optIdx ? 'var(--accent-hover)' : 'var(--text-primary)', transition: 'all 0.2s', cursor: 'pointer',
                        fontSize: '1.05rem'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea 
                  value={answers[q.id] || ''}
                  onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                  placeholder="Type your detailed explanation here..."
                  style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: 'inherit', resize: 'vertical', fontSize: '1.05rem' }}
                />
              )}
            </div>
          ))}

          <button onClick={handleSubmit} className="btn-primary" style={{ alignSelf: 'flex-end', padding: '1rem 3rem', fontSize: '1.1rem' }}>Submit Answers</button>
        </div>
      )}

      {quizState === 'results' && (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
          <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Quiz Results</h3>
            <div style={{ 
              width: '140px', height: '140px', borderRadius: '50%', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `conic-gradient(var(--success) ${score/questions.length * 100}%, var(--bg-secondary) 0)`,
              border: '1px solid var(--border-color)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)'
            }}>
              <div style={{ width: '116px', height: '116px', borderRadius: '50%', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{score}/{questions.length}</span>
              </div>
            </div>
            
            <button onClick={() => setQuizState('setup')} className="btn-secondary" style={{ marginTop: '0.5rem', padding: '0.75rem 2rem' }}><RotateCcw size={18} /> Take Another Quiz</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1.5rem' }}>Review Answers</h3>
            {questions.map((q, idx) => {
              const aiData = feedback[q.id];
              const isCorrect = q.type === 'mcq' ? answers[q.id] === q.correct : (aiData ? aiData.isCorrect : false);
              
              return (
                <div key={q.id} style={{ padding: '1.5rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                    {isCorrect ? <CheckCircle2 color="var(--success)" size={24} /> : <XCircle color="var(--danger)" size={24} />}
                  </div>
                  <h4 style={{ marginBottom: '1.5rem', paddingRight: '2.5rem', fontSize: '1.1rem', lineHeight: '1.5' }}>{idx + 1}. {q.question}</h4>
                  
                  {q.type === 'mcq' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Your Answer:</p>
                        <strong style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)', fontSize: '1.05rem' }}>{answers[q.id] !== undefined ? q.options[answers[q.id]] : 'Skipped'}</strong>
                      </div>
                      {!isCorrect && <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Correct Answer:</p>
                        <strong style={{ color: 'var(--success)', fontSize: '1.05rem' }}>{q.options[q.correct]}</strong>
                      </div>}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Your Answer:</p>
                        <p style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>{answers[q.id] || 'Skipped'}</p>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Ideal Concept:</p>
                        <p style={{ lineHeight: '1.5' }}>{q.correctContext}</p>
                      </div>
                      {aiData && (
                        <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                           <p style={{ color: 'var(--accent-hover)', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}>AI Grader Feedback:</p>
                           <p style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>"{aiData.feedback}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
