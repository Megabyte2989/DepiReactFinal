import React from 'react';
import './FloatingIcon.css';

const FloatingIcon = () => {
  return (
    <div class="floating-container">
    <div class="floating-button">+</div>
    <div class="element-container">
                <a href="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER" target="_blank">
                    <span class="float-element tooltip-left">
                        <i class="fab fa-whatsapp"></i> </span>
                </a>

                <a href="https://www.facebook.com/YOUR_FACEBOOK_PROFILE" target="_blank">
                    <span class="float-element tooltip-left">
                       <i class="fab fa-facebook"></i>
                    </span>
                </a>
            </div>
    </div>
  )
}
export default FloatingIcon;