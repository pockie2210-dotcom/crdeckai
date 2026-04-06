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

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`btn-${activeTab === 'quiz' ? 'primary' : 'secondary'}`}
          style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.1rem' }}
        >
          <Target size={24} /> Interactive Quiz
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`btn-${activeTab === 'guide' ? 'primary' : 'secondary'}`}
          style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.1rem' }}
        >
          <BookOpenCheck size={24} /> Exam Study Guide
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'quiz' ? <QuizGenerator /> : <StudyGuide />}
      </div>
    </div>
  );
};

export default Assessments;
