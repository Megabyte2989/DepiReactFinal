import React from 'react';
import './GalleryHero.css';
const GalleryHero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Book Your Dream Car Now!!</h1>
      </div>
      <video autoPlay loop muted playsInline>
        <source src="/Images/car.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default GalleryHero;