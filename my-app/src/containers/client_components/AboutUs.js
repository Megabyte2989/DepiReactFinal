import React from "react";
import "./AboutUs.css";
import "./styles.css";

const AboutUs = () => {
  return (
    <section className="about-us-section" id="about-us-section">
      <div className="about-us-container">
        <div className="about-title">
          <h2>About Us</h2>
          <div className="underline"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to <strong>Ramy Rental</strong>, your number one choice
              for car rentals.
            </p>
            <p>
              Our goal is to make the car rental process smooth and hassle-free
              with competitive pricing.
            </p>
          </div>
          <div className="about-image">
            <img src="/Images/about-us-image.png" alt="Our Team" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
