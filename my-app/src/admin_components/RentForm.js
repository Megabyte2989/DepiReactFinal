import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRent } from '../slices/rentsSlice.js';
import '../styles/rents.css';

const RentForm = () => {
    // general states and dispatchers and hooks
    const [isOpen, setIsOpen] = useState(false);
    const { loading, error } = useSelector((state) => state.rents);
    const { cars } = useSelector((state) => state.cars); // Assuming cars are fetched and stored in state
    const dispatch = useDispatch();


    // declare the usestate with the object that will hold the form data
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        nationalId: '',
        carId: '',
        carPlate: '',
        carName: '',
        kilosBeforeRent: '',
        rentDate: '',
        returnDate: '',
        signedTrust: false,
        totalPrice: '',
        paid: '',
    });


    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        if (name === 'carId') {
            const selectedCar = cars.find((car) => car._id === value);

            if (selectedCar) {
                setFormData({
                    ...formData,
                    carId: value,                      // Set the car ID
                    carPlate: selectedCar.carPlate,    // Set the car plate
                    carName: selectedCar.carName       // Set the car name
                });
            }
        } else if (type === 'checkbox') {
            // Handle checkbox input
            setFormData({
                ...formData,
                [name]: checked  // Set checkbox to true or false
            });
        } else {
            // Handle other types of inputs (text, select, etc.)
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    const toggleForm = () => setIsOpen(!isOpen);
    const handleOverlayClick = () => setIsOpen(false);


    // submit handler that will prevent the sending part
    // then dipatch the new rent
    // and close the modal

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form data before dispatching
        if (!formData.customerName || !formData.phone || !formData.nationalId || !formData.carId) {
            alert("Please fill out all required fields");
            return;
        }
        dispatch(addRent(formData));
        setIsOpen(false)
    };



    return (
        <>
            {/* we have an overlay that will be apllied if we open the rent modal */}
            <div className="RentOpener" onClick={toggleForm}></div>
            <div className={`overlay${isOpen ? 'Show' : ''}`} onClick={handleOverlayClick}></div>
            <div className={isOpen ? "RentContainerShow" : "RentContainer"}>
                <div className="FormRent" id="RentFormContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="TwiceParent">
                            <div className="pair">
                                <label>Customer Name</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pair">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="TwiceParent">
                            <div className="pair">
                                <label>National ID</label>
                                <input
                                    type="text"
                                    name="nationalId"
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pair">
                                <label>Car</label>
                                {/* here we have options for the cars 
                                so the user can select from multiple without caring about typing
                                or remembering the car names */}
                                <select
                                    name="carId"
                                    value={formData.carId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a car</option>
                                    {cars && cars.map((car) => (
                                        <option key={car._id} value={car._id}>
                                            {car?.carName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="TwiceParent">
                            <div className="pair">
                                <label>Car Plate</label>
                                <input
                                    type="text"
                                    name="carPlate"
                                    value={formData.carPlate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pair">
                                <label>Car Name</label>
                                <input
                                    type="text"
                                    name="carName"
                                    value={formData.carName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="TwiceParent">
                            <div className="pair">
                                <label>Kilos Before Rent</label>
                                <input
                                    type="number"
                                    name="kilosBeforeRent"
                                    value={formData.kilosBeforeRent}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pair">
                                <label>Rent Date</label>
                                <input
                                    type="date"
                                    name="rentDate"
                                    value={formData.rentDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="TwiceParent">
                            <div className="pair">
                                <label>Return Date</label>
                                <input
                                    type="date"
                                    name="returnDate"
                                    value={formData.returnDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pair">
                                <label>Total Price</label>
                                <input
                                    type="number"
                                    name="totalPrice"
                                    value={formData.totalPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="TwiceParent">
                            <div className="pair">
                                <label>Paid</label>
                                <input
                                    type="number"
                                    name="paid"
                                    value={formData.paid}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pair">
                                <label>Signed Trust</label>
                                <input
                                    type="checkbox"
                                    name="signedTrust"
                                    checked={formData.signedTrust}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* if submit is going stop the loading and change the ui based */}
                        <button className="SubmitRent" type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default RentForm;
