import React from 'react';
import './QuizSection.css';

const QuizSection = () => {
  return (
    <section className="quiz-section">
      <div className="quiz-container">
        <div className="quiz-text">
          <h2>Find Your Ideal Car</h2>
          <p>Looking for the perfect car? Take our short quiz and get personalized recommendations.</p>
          <a href="/quiz" className="quiz-link-btn">Take the Quiz</a>
        </div>
        <div className="quiz-image">
          <img src="/Images/hiddencar.png" alt="Car" />
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
