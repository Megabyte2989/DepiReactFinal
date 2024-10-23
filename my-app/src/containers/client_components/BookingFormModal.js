import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addOrder } from '../../slices/ordersSlice'; // Import the addOrder thunk
import './BookingFormModal.css';

const BookingFormBmodal = ({ isOpen, handleCloseBmodal }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState(''); // State for customer name
  const [orderDetails, setOrderDetails] = useState(''); // State for order details
  const [phoneNumber, setPhoneNumber] = useState(''); // Change state for phone number

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !orderDetails || !phoneNumber) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = {
      customerName,
      orderDetails,
      phoneNumber, // Include phone number in form data
      pickupDate: e.target['pickup-date'].value,
      pickupTime: e.target['pickup-time'].value,
      dropoffDate: e.target['dropoff-date'].value,
      dropoffTime: e.target['dropoff-time'].value,
      location: e.target['location'].value,
    };

    // Proceed with dispatch
    try {
      const action = await dispatch(addOrder(formData));
      if (addOrder.fulfilled.match(action)) {
        // Success handling
      }
    } catch (error) {
      // Error handling
    }
  };


  return (
    <div className="Bmodal" id="booking-Bmodal">
      <div className="Bmodal-content">
        <span className="closebtn" onClick={handleCloseBmodal}>&times;</span>
        <h2>Book Your Car</h2>
        {error && <p className="error-message">{error}</p>}
        <form id="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="customer-name">Customer Name:</label>
          <input
            type="text"
            id="customer-name"
            name="customer-name"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)} // Update state on input change
          />

          <label htmlFor="order-details">Order Details:</label>
          <textarea
            id="order-details"
            name="order-details"
            required
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)} // Update state on input change
            placeholder="Enter order details here"
          />

          <label htmlFor="phone-number">Phone Number:</label> {/* Change label for phone number */}
          <input
            type="tel" // Changed input type to 'tel' for better UX on mobile
            id="phone-number"
            name="phone-number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update state on input change
            placeholder="Enter your phone number"
          />

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
