import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Error.css'

export default function Errorcomp() {
    return (
        <div className='ErrorContainer'>
            <h1>Error 404 page not found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link className='ErrorBackLink' to='/'>Go back to the Dashboard</Link>
        </div>

    )
}
