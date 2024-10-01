import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="SideBar">
            <div className="logo">Ramy Rent
                <div className="SideBarLogOut">
                    <i className="fas fa-sign-out-alt SideBarIcon"></i>

                    <div>Logout</div>
                </div>
            </div>
            <ul className="SideBarUl">
                <li className="SideBarLi active">
                    <i className="fas fa-clipboard-list SideBarIcon"></i>
                    <Link to='/'>Dashboard</Link>

                </li>
                <li className="SideBarLi">
                    <i className="fas fa-car SideBarIcon"></i>
                    <Link to='/cars'>Cars</Link>

                </li>
                <li className="SideBarLi">
                    <i className="fas fa-folder SideBarIcon"></i>
                    <Link to='/rents'>Rents</Link>

                </li>
                <li className="SideBarLi">
                    <i className="fas fa-tools SideBarIcon"></i>
                    <Link to='/maintain'>Maintain</Link>

                </li>
            </ul>

        </div>
    )
}
