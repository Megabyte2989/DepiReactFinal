import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCar } from '../slices/carsSlice'; // Import the updateCar action
import '../styles/editForm.css';

const CarEditForm = ({ car, onClose }) => {
    const [formData, setFormData] = useState({
        carName: car.carName,
        model: car.model,
        brand: car.brand,
        year: car.year,
        rentalRate: car.rentalRate,
        ownerName: car.ownerName,
        kilosRightNow: car.kilosRightNow,
        lastOilChangeDate: car.lastOilChangeDate,
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the updateCar action with the updated car details
        dispatch(updateCar({ id: car._id, ...formData }));
        onClose(); // Close the form after submitting
    };

    useEffect(() => {
        // Prevent scrolling when the modal is open
        document.body.style.overflow = 'hidden';

        // Cleanup the effect
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="backdrop" onClick={onClose}>
            <div className="editForm" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2 className='EditCarH2'>{car.carName}</h2>
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
                        placeholder="Last Oil Change Date"
                        required
                    />
                    <button className='sumbitFormAddButton' type="submit">Update Car</button>
                </form>
            </div>
        </div>
    );
};

export default CarEditForm;
