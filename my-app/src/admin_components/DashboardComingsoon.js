import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy');
};

export default function DashboardComingsoon() {

    const { cars, loading: loadingCars, error: errorCars } = useSelector((state) => state.cars);
    const { rents, loading: loadingRents, error: errorRents } = useSelector((state) => state.rents);


    if (loadingCars || loadingRents) {
        return (
            <div className="SquareBox TableLatestRents">
                <h2>What's Coming Today</h2>
                <p>Notifications being loaded ...</p>
            </div>
        );
    }

    if (errorCars || errorRents) {
        return (
            <div className="SquareBox TableLatestRents">
                <h2>What's Coming Today</h2>
                <p>Notifications failed to load</p>
            </div>
        );
    }

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 1);

    const carsNeedingOilChange = cars.filter((car) => {
        return new Date(car.lastOilChangeDate) < twoMonthsAgo;
    });

    return (
        <div className="SquareBox TableNotif">
            <h2>Notifications and important updates..</h2>
            <ul>
                {rents.filter((rent) => {
                    return new Date(rent.returnDate).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
                }).map((rent, index) => (
                    <li className='notification-item' key={index}>{`Customer: ${rent.customerName} should return car ${rent.carId.carName} today`}</li>
                ))}

                {carsNeedingOilChange.map((car, index) => (
                    <li className='notification-car' key={index}>
                        {`Car "${car.carName}" needs an oil change. Last change was on ${formatDate(car.lastOilChangeDate)}.`}
                    </li>
                ))}
            </ul>
        </div>
    );
}
