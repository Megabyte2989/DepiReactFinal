import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="SideBar">
            <div className="logo">Ramy Rent
                <div className="SideBarLogOut">
                    <i className="fa-solid fa-right-from-bracket SideBarIcon"></i>
                    <div>Logout</div>
                </div>
            </div>
            <ul className="SideBarUl">
                <li className="SideBarLi active">
                    <i className="fa-solid fa-border-all SideBarIcon"></i>
                    <Link to='/'>Dashboard</Link>

                </li>
                <li className="SideBarLi">
                    <i className="fa-solid fa-car SideBarIcon"></i>
                    <Link to='/cars'>Cars</Link>

                </li>
                <li className="SideBarLi">
                    <i className="fa-solid fa-id-card SideBarIcon"></i>
                    <Link to='/rents'>Rents</Link>

                </li>
                <li className="SideBarLi">
                    <i className="fa-solid fa-wrench SideBarIcon"></i>
                    <Link to='/maintain'>Maintain</Link>

                </li>
            </ul>

        </div>
    )
}
