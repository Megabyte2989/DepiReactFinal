
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from "../login&register/customHooks/useLogout ";



// Main side bar that will be used all over the Application
export default function Sidebar() {
    const logout = useLogout();
    const location = useLocation(); // Get the current location

    return (
        <div className="SideBar">
            <div className="logo">Ramy Rent
                <div onClick={logout} className="SideBarLogOut">
                    <i className="fas fa-sign-out-alt SideBarIcon"></i>
                    <div>Logout</div>
                </div>
            </div>

            {/* based on the location we are in now add the class 
            active which will add the green backgorund to the 
            selected section */}
            <ul className="SideBarUl">
                <li className={`SideBarLi ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <i className="fas fa-clipboard-list SideBarIcon"></i>
                    <Link to='/'>Dashboard</Link>
                </li>
                <li className={`SideBarLi ${location.pathname === '/dashboard/cars' ? 'active' : ''}`}>
                    <i className="fas fa-car SideBarIcon"></i>
                    <Link to='/dashboard/cars'>Cars</Link>
                </li>
                <li className={`SideBarLi ${location.pathname === '/dashboard/rents' ? 'active' : ''}`}>
                    <i className="fas fa-folder SideBarIcon"></i>
                    <Link to='/dashboard/rents'>Rents</Link>
                </li>
                <li className={`SideBarLi ${location.pathname === '/dashboard/maintenance' ? 'active' : ''}`}>
                    <i className="fas fa-tools SideBarIcon"></i>
                    <Link to='/dashboard/maintenance'>Maintain</Link>
                </li>
            </ul>
        </div>
    );

}
