import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteCar } from '../slices/carsSlice.js';
import '../styles/cars.css';
import CarEditForm from './CarEditForm.js';

const hiddenCarImage = '/media/hiddencar.png'; // Default fallback image

const Car = ({ car, onClick }) => {
    const { imageUrl = hiddenCarImage, carName, year, rentalRate, _id } = car;
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Base URL for Cloudinary images
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dw6zenhpu/image/upload/uploads';
    const cloudinaryImageUrl = `${cloudinaryBaseUrl}/${imageUrl}`;

    // Handler when the image successfully loads
    const handleImageLoad = () => {
        setIsLoading(false);
        setError(false);
    };

    // Handler when the image fails to load
    const handleImageError = () => {
        setIsLoading(false);
        setError(true);
    };

    // Delete car event handler
    const handleDelete = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCar(_id));
                Swal.fire('Deleted!', 'Your car has been deleted.', 'success');
            }
        });
    };

    // Edit car event handler
    const handleEdit = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    // Close the edit form
    const closeEditForm = () => {
        setIsEditing(false);
    };

    // Car click handler to navigate to details
    const handleCarClick = () => {
        if (!isEditing) {
            onClick();
        }
    };

    return (
        <div className="CarModel" onClick={handleCarClick}>
            {isLoading && <div className="image-loading">Loading...</div>}
            <img
                className="CarImage"
                src={!error ? imageUrl : cloudinaryImageUrl}
                alt={carName}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
            <div className="carData">
                <div className="TextData">
                    <h4 className="CarName">{carName}</h4>
                    <p className="Date">{year}</p>
                </div>
                <div className="PriceDetails">
                    <div className="price">
                        <p>EGP {rentalRate}</p>
                        <p>/Day</p>
                    </div>
                    <div className="ViewDetails" onClick={(e) => e.stopPropagation()}>
                        View Details
                    </div>
                </div>
                <div className="ActionButtons">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>X</button>
                </div>
            </div>
            {isEditing && (
                <div className="backdrop" onClick={closeEditForm}>
                    <CarEditForm car={car} onClose={closeEditForm} />
                </div>
            )}
        </div>
    );
};

export default Car;
