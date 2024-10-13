import React from 'react';
import './BookNowSection.css';

const BookNowSection = () => {
  return (
    <section className="book-now-section">
      <div className="book-now-container">
        <div className="book-now-image">
          <img src="/Images/auto.jpg" alt="Car Gallery" />
        </div>
        <div className="book-now-text">
          <h2>Explore Our Car Gallery</h2>
          <p>Browse our extensive collection of cars and find your dream ride.</p>
          <a href="/gallery" className="book-now-link-btn">Book Now</a>
        </div>
      </div>
    </section>
  );
};

export default BookNowSection;
