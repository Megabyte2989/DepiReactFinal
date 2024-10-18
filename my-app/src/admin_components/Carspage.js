import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteCar } from '../slices/carsSlice.js';
import '../styles/cars.css';
import CarEditForm from './CarEditForm.js'; // Import the new CarEditForm

const hiddenCarImage = '/media/hiddencar.png'
const Car = ({ car, onClick }) => {

    const { imageUrl = hiddenCarImage, carName, year, rentalRate, _id } = car;
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit form
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dw6zenhpu/image/upload'; // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
    const resolvedImageUrl = `${cloudinaryBaseUrl}/${imageUrl}`;


    const handleDelete = (e) => {
        e.stopPropagation()
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
                Swal.fire(
                    'Deleted!',
                    'Your car has been deleted.',
                    'success'
                );
            }
        });
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setIsEditing(true); // Show the edit form
    };

    const closeEditForm = () => {
        setIsEditing(false); // Close the edit form
    };

    const handleCarClick = (e) => {
        // Prevent navigation if the edit form is open
        if (!isEditing) {
            onClick(); // Call the onClick to navigate to car details only if not editing
        }
    };

    return (
        <div className="CarModel" onClick={handleCarClick}>
            <img className='CarImage' src={resolvedImageUrl} alt={carName} />
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
