import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import Swal from 'sweetalert2';
import { addOrder } from '../../slices/ordersSlice'; // Import the addOrder thunk
import './BookingFormModal.css';

const BookingFormBmodal = ({ isOpen, handleCloseBmodal }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState(''); // State for customer name
  const [orderDetails, setOrderDetails] = useState(''); // State for order details

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      customerName,
      orderDetails, // Add order details based on the input from the user
      pickupDate: e.target['pickup-date'].value,
      pickupTime: e.target['pickup-time'].value,
      dropoffDate: e.target['dropoff-date'].value,
      dropoffTime: e.target['dropoff-time'].value,
      location: e.target['location'].value,
    };

    try {
      // Dispatch the addOrder thunk
      const action = await dispatch(addOrder(formData)); // Dispatch the action

      if (addOrder.fulfilled.match(action)) { // Check if the action was fulfilled
        // Show success message using SweetAlert2
        await Swal.fire({
          icon: 'success',
          title: 'Thank you!',
          text: 'Your booking has been received. We expect you to hear from us in 24 hours.',
          confirmButtonText: 'OK',
        });
        handleCloseBmodal();
      }
    } catch (error) {
      // Show error message using SweetAlert2
      setError(error.message);
      await Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: error.message,
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="Bmodal" id="booking-Bmodal">
      <div className="Bmodal-content">
        <span className="close" onClick={handleCloseBmodal}>&times;</span>
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
