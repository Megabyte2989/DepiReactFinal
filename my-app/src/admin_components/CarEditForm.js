import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCar } from '../slices/carsSlice.js'; // Import the action to update a car
import '../styles/editForm.css'; // Import the CSS styles for the form

const CarEditForm = ({ car, onClose }) => {
    // Initialize state to hold form data based on the car details
    // Provide default value if undefined
    const [formData, setFormData] = useState({
        carName: car.carName || '',
        model: car.model || '',
        brand: car.brand || '',
        year: car.year || '',
        rentalRate: car.rentalRate || '',
        ownerName: car.ownerName || '',
        kilosRightNow: car.kilosRightNow || '',
        lastOilChangeDate: car.lastOilChangeDate || '',
    });

    const dispatch = useDispatch(); // Get the dispatch function from Redux

    // Handle changes in the input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Get the input's name and value
        setFormData((prevData) => ({
            // if you wanna do any changes then you need to copy the whole
            // and change in it you can't change it without new one it must be pure
            ...prevData, // Keep previous data
            [name]: value, // Update the specific field with new value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default sendingg
        dispatch(updateCar({ id: car._id, ...formData })); // Dispatch action to update the car
        onClose(); // Close after submition
    };

    // Effect to prevent body scrolling when the modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Hide scrollbar
        return () => {
            document.body.style.overflow = 'unset'; // Restore scrollbar on cleanup
        };
    }, []);

    return (
        <div className="backdrop" onClick={onClose}> {/* Backdrop to close the form */}
            <div className="editForm" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside the form */}
                <form onSubmit={handleSubmit}> {/* Form element */}
                    <h2 className='EditCarH2'>{car.carName}</h2> {/* Display the car name as a heading */}
                    <input
                        type="text"
                        name="carName"
                        value={formData.carName}
                        onChange={handleInputChange}
                        placeholder="Car Name"
                        required
                    />
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="Model"
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Brand"
                        required
                    />
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        placeholder="Year"
                        required
                    />
                    <input
                        type="number"
                        name="rentalRate"
                        value={formData.rentalRate}
                        onChange={handleInputChange}
                        placeholder="Rental Rate"
                        required
                    />
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Owner Name"
                        required
                    />
                    <input
                        type="number"
                        name="kilosRightNow"
                        value={formData.kilosRightNow}
                        onChange={handleInputChange}
                        placeholder="Kilos Right Now"
                        required
                    />
                    <input
                        type="date"
                        name="lastOilChangeDate"
                        value={formData.lastOilChangeDate}
                        onChange={handleInputChange}
                        required
                    />
                    <button className='submitFormAddButton' type="submit">Update Car</button> {/* Submit button */}
                </form>
            </div>
        </div>
    );
};

export default CarEditForm; // Export the component for use in other parts of the application
