import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-header">
        <button className="how-it-works-btn">HOW IT WORKS</button>
        <h1>Rent with following 3 working steps</h1>
      </div>
      <div className="steps">
        <div className="step">
          <img src="/Images/free-location-icon-2955-thumb.png" alt="Location Icon" />
          <h2>Choose location</h2>
          <p>Choose your best car at the best location</p>
        </div>
        <div className="step">
          <img src="/Images/date.png" alt="Pick-up Date Icon" />
          <h2>Pick-up date</h2>
          <p>Select your pick up date and time to book your car</p>
        </div>
        <div className="step">
          <img src="/Images/car-icon-blue.png" alt="Book Car Icon" />
          <h2>Book your car</h2>
          <p>Book your car and we will deliver it directly to you</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
