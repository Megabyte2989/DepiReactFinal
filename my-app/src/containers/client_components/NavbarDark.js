import Cookies from "js-cookie"; // Assuming you use cookies for authentication
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal.js"; // Import the modal component
import "./NavbarDark.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const hamburgerRef = useRef(null);
  const menuListRef = useRef(null);
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is logged in by looking for an auth token
  useEffect(() => {
    const token = Cookies.get("authToken");
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, []);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove the auth token
    setIsLoggedIn(false); // Update the login status
    navigate("/login", { replace: true }); // Redirect to the login page
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="logoHome">
          <img src='/Images/black-logo.png' alt="Logo" />
        </div>
        {/* Hamburger Menu for Mobile */}
        <div className="hamburger-menu" ref={hamburgerRef} onClick={handleHamburgerClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="menu">
          <ul ref={menuListRef} className={isMenuOpen ? 'active' : ''}>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <a href="#contact-us" className="contactUsBtn" onClick={handleModalToggle}>
                Contact us
              </a>
            </li>
            {isLoggedIn ? (
              // Show "Logout" if logged in
              <li>
                <a href="#logout" className="sign" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            ) : (
              // Show "Login" and "Register" if not logged in
              <>
                <li>
                  <Link to="/login" className="sign">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="sign">
                    Join Us
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {showModal && <Modal showModal={showModal} handleClose={handleModalToggle} />}
    </>
  );
};

export default Navbar;
