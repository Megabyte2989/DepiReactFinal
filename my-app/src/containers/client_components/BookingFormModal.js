import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../slices/ordersSlice'; // Adjust the import based on your file structure
import './BookingFormModal.css';

const BookingFormBmodal = ({ isOpen, handleCloseBmodal }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [idPhoto, setIdPhoto] = useState(null); // State for ID photo
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      customerName,
      orderDetails,
      pickupDate,
      dropoffDate,
      location: e.target['location'].value,
      idNumber: e.target['id-number'].value, // Assuming you add this input
      idPhoto, // Add the ID photo file to the formData
    };

    try {
      await dispatch(addOrder(formData)).unwrap(); // Dispatch the addOrder action
      alert('Thank you! Your booking has been received. We expect you to hear from us in 24 hours.');
      handleCloseBmodal();
    } catch (error) {
      setError(error.message);
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
            placeholder='Enter your Name'
            type="text"
            id="customer-name"
            name="customer-name"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label htmlFor="order-details">Order Details:</label>
          <textarea
            id="order-details"
            className='orderdet'
            name="order-details"
            required
            value={orderDetails}
            onChange={(e) => setOrderDetails(e.target.value)}
            placeholder="Enter order details here"
          />

          <label htmlFor="pickup-date">Pickup Date:</label>
          <input
            type="date"
            id="pickup-date"
            name="pickup-date"
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />

          <label htmlFor="dropoff-date">Dropoff Date:</label>
          <input
            type="date"
            id="dropoff-date"
            name="dropoff-date"
            required
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
          />

          <label htmlFor="id-number">ID Number:</label>
          <input
            type="text"
            id="id-number"
            name="id-number"
            required
            placeholder="Enter your ID number"
          />

          <label htmlFor="id-photo">ID Photo:</label>
          <input
            type="file"
            id="id-photo"
            name="idPhoto"
            placeholder='Id Photo'
            required
            onChange={(e) => setIdPhoto(e.target.files[0])} // Update state with the file
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
