import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/normalize.css';
import '../styles/sidebar.css';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="MainContent">
            <Sidebar />
            <Outlet />
        </div>
    );
}