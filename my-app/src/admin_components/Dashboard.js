// src/components/Dashboard.js
import React, { useEffect } from 'react';
// import '../styles/all.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../slices/carsSlice.js';
import { fetchMaintenance } from '../slices/maintainSlice.js';
import { fetchRents } from '../slices/rentsSlice.js';
import '../styles/dashboard.css';
import '../styles/normalize.css';
import DashboardCard from './Dashboardcard.js';
import DashboardComingsoon from './DashboardComingsoon.js';
import LatestRents from './Dashboardrents.js';


const Dashboard = () => {

    const dispatch = useDispatch();
    // Fetch cars and rents data when component mounts
    useEffect(() => {
        dispatch(fetchCars());
        dispatch(fetchRents());
        dispatch(fetchMaintenance())
    }, [dispatch]);

    const { cars } = useSelector((state) => state.cars);
    const { rents } = useSelector((state) => state.rents);
    const { maintenanceRecords } = useSelector((state) => state.maintenance);

    const totalIncome = rents ? rents.reduce((sum, rent) => sum + rent.paid, 0) : 0;
    const totalOutcomes = maintenanceRecords.reduce((sum, maiten) => {
        return sum + maiten.paid // Safely access paid
    }, 0);

    return (
        <div className="MainSection" id="MainSection">
            <div className="CounterContainer">
                <DashboardCard title='Rented Cars' icon='fas fa-car' value={cars.filter((car) => car.isAvailable === false).length} />
                <DashboardCard title='Total Income' icon='fas fa-money-bill-wave' value={`${totalIncome} EGP`} />
                <DashboardCard title='Total Outcomes' icon='fas fa-wallet' value={`${totalOutcomes} EGP`} />
                <DashboardCard title='Rents' icon='fas fa-user' value={rents.length} />
            </div>

            <div className="SquareContainer">

                <LatestRents />
                <DashboardComingsoon />

            </div>
        </div>
    );
};

export default Dashboard;
