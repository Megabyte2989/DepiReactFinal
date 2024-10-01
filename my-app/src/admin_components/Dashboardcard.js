import React from 'react';

export default function DashboardCard({ title, icon, value }) {
    return (
        <div className='card'>
            <div className='cardData'>
                <p>{title}</p>
                <i className={icon}></i>
            </div>
            <span>{value}</span>
        </div>
    );
}