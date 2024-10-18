import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, fetchCars } from '../slices/carsSlice.js';
import { fetchMaintenance } from '../slices/maintainSlice.js';
import { fetchRents } from '../slices/rentsSlice.js';

import '../styles/cars.css';
import Car from './Carspage.js';

export default function Carspage() {
    const [DetailsOpen, setDetailsOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [activeSection, setActiveSection] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const dispatch = useDispatch();


    const { cars, loading: carsLoading, error: carsError } = useSelector((state) => state.cars);
    const { rents, loading: rentsLoading, error: rentsError } = useSelector((state) => state.rents);
    const { maintenanceRecords } = useSelector((state) => state.maintenance);

    useEffect(() => {
        dispatch(fetchCars());
        dispatch(fetchRents());
        dispatch(fetchMaintenance())
    }, [dispatch]);


    useEffect(() => {
        if (selectedCar) {
            checkImage(selectedCar.imageUrl);
        }
    }, [selectedCar]);


    const cloudName = 'dw6zenhpu';

    const checkImage = (imageUrl) => {
        const img = new Image();
        img.src = `https://res.cloudinary.com/${cloudName}/image/upload/${imageUrl}`; // Use Cloudinary URL
        img.onload = () => {
            setBackgroundImage(`url("https://res.cloudinary.com/${cloudName}/image/upload/${imageUrl}")`);
        };
        img.onerror = () => {
            setBackgroundImage(`url("/media/stages/MainStageForNoCars.png")`);
        };
    };



    const handleViewDetails = (car) => {
        setSelectedCar(car);
        setDetailsOpen(true);
    };

    const handleBackToList = () => {
        setDetailsOpen(false);
        setSelectedCar(null);
        setActiveSection(null);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleToggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };


    const [newCar, setNewCar] = useState({
        carName: '',
        carPlate: '',
        model: '',
        brand: '',
        year: '',
        rentalRate: '',
        ownerName: '',
        kilosRightNow: '',
        lastOilChangeDate: '',
        imageUrl: null, // Image URL if you are handling image uploads
    });



    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageUrl') {
            setNewCar({
                ...newCar,
                [name]: files[0], // Store the file object
            });
        } else {
            setNewCar({
                ...newCar,
                [name]: value,
            });
        }
    };



    const handleAddCar = (e) => {
        e.preventDefault(); // Prevent page reload

        const formData = new FormData();

        // Append all car details including the image
        Object.keys(newCar).forEach((key) => {
            formData.append(key, newCar[key]);
        });

        // Dispatch the action to add the car
        dispatch(addCar(formData));

        // Optionally reset the form
        setNewCar({
            carName: '',
            carPlate: '',
            model: '',
            brand: '',
            year: '',
            rentalRate: '',
            ownerName: '',
            kilosRightNow: '',
            lastOilChangeDate: '',
            imageUrl: null,
        });
    };

    // Format date for better readability
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (carsLoading || rentsLoading) {
        return (
            <div className="loading-container">
                {/* Replace this div with a loading spinner or skeleton component */}
                <div className="loading-spinner"></div>
            </div>
        );
    } if (carsError) return <p>Failed to load cars: {carsError}</p>;

    return (
        <>
            {DetailsOpen && selectedCar ? (
                <div
                    className="StageHolder"
                    id="MainSection"
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '100vh',
                        width: '100%',
                    }}
                >
                    <div className="CarStage">
                        <button className="BacktoCarButton" onClick={handleBackToList}>
                            Back to Car List
                        </button>

                        <h2 className="headerCarsStage">{selectedCar.carName}</h2>
                        {activeSection && <div id="overlay" className="overlay"></div>}

                        <div className="expandedcontent">
                            {activeSection === 'LatestRents' && (
                                <table className='StageTable' id="StageTable">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Person</th>
                                            <th>nationalId</th>
                                            <th>Car</th>
                                            <th>Phone</th>
                                            <th>rentDate</th>
                                            <th>returnDate</th>
                                            <th>Total Price</th>
                                            <th>Paid</th>
                                            <th>Remaining</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rentsLoading ? (
                                            <tr>
                                                <td colSpan="9">Loading rents...</td>
                                            </tr>
                                        ) : rentsError ? (
                                            <tr>
                                                <td colSpan="9">Failed to load rents: {rentsError}</td>
                                            </tr>
                                        ) : rents.length > 0 ? (
                                            rents.filter(record => record.carPlate === selectedCar.carPlate)
                                                .map((rent) => (
                                                    < tr key={rent.id}>
                                                        <td>{rent.rentId}</td>
                                                        <td>{rent.customerName}</td>
                                                        <td>{rent.nationalId}</td>
                                                        <td>{rent.carId.carName}</td>
                                                        <td>{rent.phone}</td>
                                                        <td>{rent.rentDate}</td>
                                                        <td>{rent.returnDate}</td>
                                                        <td>{rent.totalPrice}</td>
                                                        <td>{rent.paid}</td>
                                                        <td>{rent.remaining}</td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9">No rent data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}

                            {activeSection === 'LatestNotifications' && (
                                <ul className='UlLatest'>
                                    {/* Filter rents for today's return date */}
                                    {rents.filter((rent) => {
                                        return new Date(rent.returnDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
                                    }).map((rent, index) => (
                                        <li className='notification-item' key={index}>
                                            {`Customer: ${rent.customerName} should return car ${rent.carPlate} today`}
                                        </li>
                                    ))}
                                    {/* Filter cars that need an oil change */}
                                    {cars.filter(car => car.needsOilChange).map((car, index) => (
                                        <li className='notification-car' key={index}>
                                            {`Car "${car.carName}" needs an oil change. Last change was on ${formatDate(car.lastOilChangeDate)}.`}
                                        </li>
                                    ))}

                                    {/* Check if both notifications lists are empty */}
                                    {(rents.filter((rent) => new Date(rent.returnDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]).length === 0 &&
                                        cars.filter(car => car.needsOilChange).length === 0) && (
                                            <li className='notification-empty'>No notifications for today.</li>
                                        )}
                                </ul>
                            )}

                            {activeSection === 'OtherInformation' && selectedCar ? (
                                maintenanceRecords && maintenanceRecords.length > 0 ? (
                                    maintenanceRecords
                                        .filter(record => record.carId.carName === selectedCar.carName)
                                        .map((record, index) => (
                                            <li key={index} className="maintenance-item">
                                                <p>{`Car: ${selectedCar.carName}`}</p>
                                                <p>{`Workshop Name: ${record.workshopName}`}</p>
                                                <p>{`Maintenance Description: ${record.description}`}</p>
                                                <p>{`Date: ${formatDate(record.dateOfMaintenance)}`}</p>
                                            </li>
                                        ))
                                ) : (
                                    <ul className='UlLatest'>
                                        <li className='notification-empty'>Nothing to be shown here</li>
                                    </ul>
                                )
                            ) : null}


                        </div>

                        <div className={`CarStageContent ${isMenuOpen ? 'open' : ''}`}>
                            <div className="OtherInformation">
                                <i
                                    id="StageProf1"
                                    className="fas fa-caret-square-down ArrowDownCarStage"
                                    onClick={() => handleToggleSection('OtherInformation')}
                                ></i>
                                <h3>Other Information</h3>
                            </div>
                            <div className="LatestNotifications">
                                <i
                                    id="StageProf2"
                                    className="fas fa-caret-square-down ArrowDownCarStage"
                                    onClick={() => handleToggleSection('LatestNotifications')}
                                ></i>
                                <h3>Latest Notifications</h3>
                            </div>
                            <div className="LatestRents">
                                <i
                                    id="StageProf3"
                                    className="fas fa-caret-square-down ArrowDownCarStage"
                                    onClick={() => handleToggleSection('LatestRents')}
                                ></i>
                                <h3>Latest Rents</h3>
                            </div>

                            <i className="fas fa-bars MainMenuOpener" onClick={toggleMenu}></i>
                        </div>
                    </div>
                </div >
            ) : (
                <div className="MainSectionCars" id="MainSection">
                    {cars.map((car) => (
                        <Car key={car.id} car={car} onClick={() => handleViewDetails(car)} />
                    ))}
                    <form onSubmit={handleAddCar} className="AddCarForm">
                        <h2>Add New Car</h2>
                        <input type="text" name="carName" placeholder="Car Name" value={newCar.carName} onChange={handleInputChange} required />
                        <input type="text" name="carPlate" placeholder="Car Plate" value={newCar.carPlate} onChange={handleInputChange} required />
                        <input type="text" name="model" placeholder="Model" value={newCar.model} onChange={handleInputChange} required />
                        <input type="text" name="brand" placeholder="Brand" value={newCar.brand} onChange={handleInputChange} required />
                        <input type="number" name="year" placeholder="Year" value={newCar.year} onChange={handleInputChange} required />
                        <input type="number" name="rentalRate" placeholder="Rental Rate" value={newCar.rentalRate} onChange={handleInputChange} required />
                        <input type="text" name="ownerName" placeholder="Owner Name" value={newCar.ownerName} onChange={handleInputChange} required />
                        <input type="number" name="kilosRightNow" placeholder="Kilos Right Now" value={newCar.kilosRightNow} onChange={handleInputChange} required />
                        <input type="date" name="lastOilChangeDate" value={newCar.lastOilChangeDate} onChange={handleInputChange} required />
                        <input type="file" name="imageUrl" onChange={handleInputChange} required /> {/* Add file input */}
                        <button type="submit">Add Car</button>
                    </form>

                </div>
            )
            }
        </>
    );
}
