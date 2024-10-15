import React from 'react';
import { Link } from 'react-router-dom';
import './FloatingIcon.css';

const FloatingIcon = () => {
  return (
    <div className="floating-container">
      <div className="floating-button">+</div>
      <div className="element-container">
        <Link to="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER">
          <span className="float-element tooltip-left">
            <i className="fab fa-whatsapp"></i> </span>
        </Link>

        <Link to="https://www.facebook.com/YOUR_FACEBOOK_PROFILE">
          <span className="float-element tooltip-left">
            <i className="fab fa-facebook"></i>
          </span>
        </Link>
      </div>
    </div>
  )
}
export default FloatingIcon;