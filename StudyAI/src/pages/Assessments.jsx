import React, { useState } from 'react';
import { Target, BookOpenCheck } from 'lucide-react';
import QuizGenerator from './QuizGenerator';
import StudyGuide from './StudyGuide';

const Assessments = () => {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'guide'

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <h2 className="text-gradient">Smart Assessments</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Evaluate your knowledge with dynamic quizzes or generate detailed exam guides.</p>
      </div>

      <div className="glass-panel" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', padding: '0.5rem', background: 'rgba(0,0,0,0.05)' }}>
        <button
          onClick={() => setActiveTab('quiz')}
          className={activeTab === 'quiz' ? 'btn-primary' : 'btn-secondary'}
          style={{ flex: 1, padding: '0.875rem', border: 'none', boxShadow: activeTab === 'quiz' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none' }}
        >
          <Target size={20} /> Interactive Quiz
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={activeTab === 'guide' ? 'btn-primary' : 'btn-secondary'}
          style={{ flex: 1, padding: '0.875rem', border: 'none', boxShadow: activeTab === 'guide' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none' }}
        >
          <BookOpenCheck size={20} /> Exam Study Guide
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }} className="animate-slide-up">
        {activeTab === 'quiz' ? <QuizGenerator /> : <StudyGuide />}
      </div>
    </div>
  );
};

export default Assessments;
