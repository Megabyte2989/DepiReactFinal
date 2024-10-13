import React, { useEffect, useRef } from 'react';
import "./Navbar.css";

const Modal = ({ showModal, handleClose }) => {
  const mapRef = useRef(null);

  const initMap = () => {
    new window.google.maps.Map(mapRef.current, {
      center: { lat: 30.278864, lng: 31.745892 }, // Change to your desired coordinates
      zoom: 8,
    });
  };

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    if (showModal) {
      window.initMap = initMap; // Define initMap in global scope
      loadScript(`https://maps.gomaps.pro/maps/api/js?key=AlzaSyESUDB7PxR-DPLpRyFMkA9SW_mnEjb1OEZ&callback=initMap`);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div id="contactModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="lmodal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h3>Contact Us</h3>
        <p>Phone Numbers:</p>
        <ul className="numbers">
          <li>+1 (234) 567-8901</li>
          <li>+1 (234) 567-8902</li>
          <li>+1 (234) 567-8903</li>
        </ul>
        <p>
          Email:{" "}
          <a href="mailto:info@ramyrent.com" className="email">
            info@ramyrent.com
          </a>
        </p>
        <div id="map" ref={mapRef} style={{ blockSize: '400px', inlineSize: '100%' }}></div>
      </div>
    </div>
  );
};

export default Modal;
