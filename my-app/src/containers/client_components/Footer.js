import { IonIcon } from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoLinkedin,
  logoTwitter,
} from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./FloatingIcon.css";
import "./Footer.css";

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
      {/* Waves */}
      <div className="waves">
        <div className="wave" id="wave1" />
        <div className="wave" id="wave2" />
        <div className="wave" id="wave3" />
        <div className="wave" id="wave4" />
      </div>
      {/* Social Media Links */}
      <ul className="social-icon">
        <li className="social-icon__item">
          <Link className="social-icon__link" to="#">
            <IonIcon icon={logoFacebook} />
          </Link>
        </li>
        <li className="social-icon__item">
          <Link className="social-icon__link" to="#">
            <IonIcon icon={logoTwitter} />
          </Link>
        </li>
        <li className="social-icon__item">
          <Link className="social-icon__link" to="#">
            <IonIcon icon={logoLinkedin} />
          </Link>
        </li>
        <li className="social-icon__item">
          <Link className="social-icon__link" to="#">
            <IonIcon icon={logoInstagram} />
          </Link>
        </li>
      </ul>
      {/* Links Menu */}
      <ul className="menu">
        <li className="menu__item">
          <Link className="menu__link" to="#hero-section">
            Home
          </Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="#about-us-section">
            About-us
          </Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/gallery">
            gallery
          </Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/quiz">
            quiz
          </Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link contactUsBtn" to="#contact-us">
            Contact-us
          </Link>
        </li>
      </ul>
      {/* Copyright */}
      <p>©2024 Ramy Rent | All Rights Reserved</p>
    </footer>

  );
};
export default Footer;
