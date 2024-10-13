import { format } from 'date-fns'; // Importing format function for date formatting
import React from 'react';
import { useSelector } from 'react-redux';

// Function to format the date to a human-readable format
const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy'); // Format date to "Month day, year"
};

export default function DashboardComingsoon() {
    // Selecting car and rent data from the Redux store
    const { cars, loading: loadingCars, error: errorCars } = useSelector((state) => state.cars);
    const { rents, loading: loadingRents, error: errorRents } = useSelector((state) => state.rents);

    // Show a loading message while data is being fetched
    if (loadingCars || loadingRents) {
        return (
            <div className="SquareBox TableLatestRents">
                <h2>What's Coming Today</h2>
                <p>Notifications being loaded ...</p>
            </div>
        );
    }

    // Show an error message if fetching data failed
    if (errorCars || errorRents) {
        return (
            <div className="SquareBox TableLatestRents">
                <h2>What's Coming Today</h2>
                <p>Notifications failed to load</p>
            </div>
        );
    }

    // Calculate the date two months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2); // Adjusting to two months ago

    // Filter cars that need an oil change
    const carsNeedingOilChange = cars.filter((car) => {
        return new Date(car.lastOilChangeDate) < twoMonthsAgo; // Check if last oil change is older than two months
    });

    return (
        <div className="SquareBox TableNotif">
            <h2>Notifications and Important Updates</h2>
            <ul>
                {/* Filter and display rents that are due for return today */}
                {rents.filter((rent) => {
                    return new Date(rent.returnDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
                }).map((rent, index) => (
                    <li className='notification-item' key={index}>
                        {`Customer: ${rent.customerName} should return car ${rent.carId.carName} today.`}
                    </li>
                ))}

                {/* Display cars that need an oil change */}
                {carsNeedingOilChange.map((car, index) => (
                    <li className='notification-car' key={index}>
                        {`Car "${car.carName}" needs an oil change. Last change was on ${formatDate(car.lastOilChangeDate)}.`}
                    </li>
                ))}
            </ul>
        </div>
    );
}
