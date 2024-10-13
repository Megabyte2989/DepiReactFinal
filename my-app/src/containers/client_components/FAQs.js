import React, { useState } from 'react';
import './FAQs.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    { question: "How do I make a reservation?", answer: "You can make a reservation online or by phone." },
    { question: "What do I need to bring with me?", answer: "A valid driver's license, proof of insurance, and a credit card." },
    { question: "How much is the fuel charge?", answer: "You are responsible for refueling the car before return." },
    { question: "What is your cancellation policy?", answer: "Our cancellation policy varies based on the booking type." }
  ];

  return (
    <section className="fre">
      <h1>Frequently Asked Questions</h1>
      <div className="faqs-container">
        {faqData.map((faq, index) => (
          <div key={index} className={`faq ${activeIndex === index ? 'active' : ''}`}>
            <h3 className="faq-title" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </h3>
            <p className="faq-text">{faq.answer}</p>
            <button className="faq-toggle" onClick={() => toggleFAQ(index)}>
              <i className={`fas ${activeIndex === index ? 'fas fa-times' : 'fas fa-chevron-down'}`}></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
  
};

export default FAQs;
