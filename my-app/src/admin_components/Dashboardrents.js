// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';

const LatestRents = () => {
    // Selecting rent and maintenance records from the Redux store
    const { maintenanceRecords } = useSelector((state) => state.maintenance);
    const { rents, loading: loadingRents, error: errorRents } = useSelector((state) => state.rents);

    // Display loading state while data is being fetched
    if (loadingRents) {
        return (
            <div className="SquareBox TableLatestRents">
                <h2>Latest Rents</h2>
                <h2>Loading Data...</h2>
            </div>
        );
    }

    // Display error message if fetching rent data failed
    if (errorRents) {
        return (
            <div className="SquareBox TableLatestRents">
                <h2>Latest Rents</h2>
                <h2>Couldn't get rent data: "{errorRents}"</h2>
            </div>
        );
    }

    return (
        <>
            <div className='DashboardAllFlex'>
                {/* Latest Rents Table */}
                <div className="SquareBox TableLatestRents">
                    <h2>Latest Rents</h2>
                    <table className='TableSquare'>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Car</th>
                                <th>Car Model</th>
                                <th>Total Price</th>
                                <th>Remaining</th>
                                <th>Return Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rents.map((rent) => (
                                <tr key={rent._id}> {/* Use a unique identifier for each row */}
                                    <td>{rent.customerName}</td>
                                    <td>{rent.carId?.carName}</td> {/* Safe access using optional chaining */}
                                    <td>{rent.carId?.model || 'N/A'}</td> {/* Default to 'N/A' if model is unavailable */}
                                    <td>${rent.totalPrice.toFixed(2)}</td> {/* Format price to 2 decimal places */}
                                    <td>${rent.remaining.toFixed(2)}</td> {/* Format remaining to 2 decimal places */}
                                    <td>{new Date(rent.returnDate).toLocaleDateString()}</td> {/* Format return date */}
                                    <td>{rent.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Latest Maintenance Table */}
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
                                <th>Remaining</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceRecords.map((maintain) => (
                                <tr key={maintain._id}> {/* Use a unique identifier for each row */}
                                    <td>{maintain.carId.carName}</td>
                                    <td>{new Date(maintain.dateOfMaintenance).toLocaleDateString()}</td> {/* Format date */}
                                    <td>{maintain.description}</td> {/* Maintenance description */}
                                    <td>{maintain.workshopName}</td> {/* Workshop name */}
                                    <td>${maintain.totalCost.toFixed(2)}</td> {/* Format total cost */}
                                    <td>${maintain.remaining.toFixed(2)}</td> {/* Format remaining cost */}
                                    <td>{maintain.notes}</td> {/* Additional notes */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LatestRents; // Exporting the LatestRents component
