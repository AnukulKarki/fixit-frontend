import React from "react";
import "../styles/Footer.css";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer>
      <div className="c1">
        <p>About Us</p>
        <br />
        <p>
        Welcome to Fixit, your go-to platform for connecting with skilled handyman workers. 
        Our mission is to make finding and hiring reliable handymen quick and easy. 
        Whether you need repairs, maintenance, or renovations, our professionals are here to help. 
        Experience quality craftsmanship at your fingertips with Fixit.
        </p>
      </div>

      <div className="c2">
        <p>Contact Us</p>
        <br />
        <p>Phone: +91 1234567890</p>
        <p>Kamalpokhari, Katmandu</p>
        <p>fixit@gmail.com</p>
      </div>

      <div className="c3">
        <p>Quick Links</p>
        <br />
        <a href="/">Help</a>
        <a href="/">FAQ</a>
        <a href="/">Report</a>
        <a href="/">Terms & Conditions</a>
      </div>

      <div className="c4">
        <img src={Logo} alt="" />
      </div>
    </footer>
  );
}
