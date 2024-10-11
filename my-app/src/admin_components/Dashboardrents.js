// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';



const LatestRents = () => {

    const { maintenanceRecords } = useSelector((state) => state.maintenance);
    const { rents, loading: loadingRents, error: errorRents } = useSelector((state) => state.rents)


    if (loadingRents) {

        return <div className="SquareBox TableLatestRents">
            <h2>Latest Rents</h2>
            <h2>Loading Data...</h2>
        </div>

    }

    if (errorRents) {
        return <div className="SquareBox TableLatestRents">
            <h2>Latest Rents</h2>
            <h2>Couldn't Get Rent data "{errorRents}"</h2>

        </div>
    }

    return (
        <>
            <div className='DashboardAllFlex'>
                <div className="SquareBox TableLatestRents">
                    <h2>Latest Rents</h2>
                    <table className='TableSquare'>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Car</th>
                                <th>Car model</th>
                                <th>Total Price</th>
                                <th>remaining</th>
                                <th>Return Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rents.map((rent) => (
                                <tr key={rent._id}> {/* Use a unique identifier */}
                                    <td>{rent.customerName}</td>
                                    <td>{rent.carId?.carName}</td>
                                    <td>{rent.carId?.model || 'N/A'}</td> {/* Access the car model using populate */}
                                    <td>${rent.totalPrice.toFixed(2)}</td>
                                    <td>${rent.remaining.toFixed(2)}</td>
                                    <td>{new Date(rent.returnDate).toLocaleDateString()}</td>
                                    <td>{rent.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="SquareBox TableLatestRents">
                    <h2>Latest Maintenance</h2>
                    <table className='TableSquare'>
                        <thead>
                            <tr>
                                <th>Car Name</th>
                                <th>Date of Maintenance</th>
                                <th>Description</th>
                                <th>Workshop Name</th>
                                <th>Total Cost</th>
                                <th>remaining</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceRecords.map((maintain) => (
                                <tr key={maintain._id}> {/* Use a unique identifier */}
                                    <td>{maintain.carId.carName}</td>
                                    <td>{maintain.dateOfMaintenance}</td>
                                    <td>{maintain.description}</td> {/* Access the car model using populate */}
                                    <td>${maintain.workshopName}</td>
                                    <td>${maintain.totalCost}</td>
                                    <td>{maintain.remaining}</td>
                                    <td>{maintain.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LatestRents;