// @ts-nocheck
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LatestRents = () => {
    const [rents, setRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rents');
                console.log(response.data)
                setRents(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRents();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="SquareBox TableLatestRents">
            <h2>Latest Rents</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Car</th>
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
                            <td>{rent.carId}</td>
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
    );
};

export default LatestRents;