import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../slices/ordersSlice';
import './BookingFormModal.css';

const BookingFormBmodal = ({ isOpen, handleCloseBmodal }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !orderDetails || !phoneNumber) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = {
      customerName, // Matches backend expectation
      orderDetails,  // Matches backend expectation
      phoneNumber,   // Matches backend expectation
      pickupDate: e.target['pickup-date'].value, // Matches backend expectation
      pickupTime: e.target['pickup-time'].value, // Matches backend expectation
      dropoffDate: e.target['dropoff-date'].value, // Matches backend expectation
      dropoffTime: e.target['dropoff-time'].value, // Matches backend expectation
      location: e.target['location'].value, // Matches backend expectation
    };

    // Proceed with dispatch
    try {
      const action = await dispatch(addOrder(formData));
      if (addOrder.fulfilled.match(action)) {
        // Success handling
      }
    } catch (error) {
      setError("Failed to create order: " + error.message); // Display error message
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
            name="customerName" // Updated to match backend
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label htmlFor="order-details">Order Details:</label>
          <textarea
            id="order-details"
            name="orderDetails" // Updated to match backend
            required
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
            placeholder="Enter order details here"
          />

          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="tel"
            id="phone-number"
            name="phoneNumber" // Updated to match backend
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />

          <label htmlFor="pickup-date">Pickup Date:</label>
          <input type="date" id="pickup-date" name="pickupDate" required /> {/* Updated to match backend */}

          <label htmlFor="pickup-time">Pickup Time:</label>
          <input type="time" id="pickup-time" name="pickupTime" required /> {/* Updated to match backend */}

          <label htmlFor="dropoff-date">Drop-off Date:</label>
          <input type="date" id="dropoff-date" name="dropoffDate" required /> {/* Updated to match backend */}

          <label htmlFor="dropoff-time">Drop-off Time:</label>
          <input type="time" id="dropoff-time" name="dropoffTime" required /> {/* Updated to match backend */}

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location" // Updated to match backend
            required
            placeholder="Enter pickup location"
          />

          <button className="btn book-now-btn" type="submit">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormBmodal;
