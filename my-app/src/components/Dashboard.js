// src/components/Dashboard.js
import React from 'react';
// import '../styles/all.min.css';
import '../styles/dashboard.css';
import '../styles/normalize.css';
import DashboardCard from './Dashboardcard';
import LatestRents from './Dashboardrents';

const Dashboard = () => {
    return (
        <div className="MainSection" id="MainSection">
            <div className="CounterContainer">

                <DashboardCard title='Rented Cars' icon='fas fa-car' value="23" />
                <DashboardCard title='Total Income' icon='fas fa-money-bill-wave' value="3214$" />
                <DashboardCard title='Total Outcomes' icon='fas fa-wallet' value="233$" />
                <DashboardCard title='Rents' icon='fas fa-user' value="33" />
            </div>

            <div className="SquareContainer">
                <LatestRents />

                <div className="SquareBox TableNotif">
                    <h2>What's Coming Today</h2>
                    <p>Notifications or important updates...</p>
                    <ul>
                        <li className="notification-item">@ ewqewqewqewewq</li>
                        <li className="notification-item">4 weqwewewqewweqwe</li>
                        <li className="notification-item">4 ewqweaasdsadsad</li>
                        <li className="notification-item">45 eqwewqeqwewqqwew</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
