import React from 'react';
import './HeroSection.css';
const HeroSection = () => {
  return (
    <main className="hero-section" id="hero-section">
      <div className="overlay-text">
        <h1>Luxurious<br /> Services</h1>
      </div>
      <div className="car-image">
        <img src='/Images/car.jpg' alt="Car" />
      </div>
    </main>
  );
};

export default HeroSection;
