import React from 'react';
import './BookingFormModal.css';

const BookingFormBmodal = ({ isOpen, handleCloseBmodal }) => {
  if (!isOpen) return null;
  const handleSubmit = e => {
    e.preventDefault();
    alert('Thank you! Your booking has been received.');
    handleCloseBmodal();
  };


  if (!isOpen) return null;

  return (
    <div className="Bmodal" id="booking-Bmodal">
      <div className="Bmodal-content">
        <span className="close" onClick={handleCloseBmodal}>&times;</span>
        <h2>Book Your Car</h2>
        <form id="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="pickup-date">Pickup Date:</label>
          <input type="date" id="pickup-date" name="pickup-date" required />

          <label htmlFor="pickup-time">Pickup Time:</label>
          <input type="time" id="pickup-time" name="pickup-time" required />

          <label htmlFor="dropoff-date">Drop-off Date:</label>
          <input type="date" id="dropoff-date" name="dropoff-date" required />

          <label htmlFor="dropoff-time">Drop-off Time:</label>
          <input type="time" id="dropoff-time" name="dropoff-time" required />

          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required placeholder="Enter pickup location" />

          <button className="btn book-now-btn" type="submit">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormBmodal;