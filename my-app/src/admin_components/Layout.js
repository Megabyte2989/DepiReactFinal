import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/normalize.css';
import '../styles/sidebar.css';
import Sidebar from './Sidebar';

// Main layour for all components 
// Outlet is like saving a place for any upcoming components
//This is where the child routes will render 
export default function Layout() {
    return (
        <div className="MainContent">
            <Sidebar />
            <Outlet />
        </div>
    );
}