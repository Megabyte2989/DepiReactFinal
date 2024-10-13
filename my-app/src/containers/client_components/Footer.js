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
          <a className="social-icon__link" href="#">
            <IonIcon icon={logoFacebook} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <IonIcon icon={logoTwitter} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <IonIcon icon={logoLinkedin} />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <IonIcon icon={logoInstagram} />
          </a>
        </li>
      </ul>
      {/* Links Menu */}
      <ul className="menu">
        <li className="menu__item">
          <a className="menu__link" href="#hero-section">
            Home
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#about-us-section">
            About-us
          </a>
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
          <a className="menu__link contactUsBtn" href="#contact-us">
            Contact-us
          </a>
        </li>
      </ul>
      {/* Copyright */}
      <p>©2024 Ramy Rent | All Rights Reserved</p>
    </footer>

  );
};
export default Footer;
