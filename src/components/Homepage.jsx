import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/user-check/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      if (parsedData.role === "worker" || parsedData.role === "client") {
        navigate(`/${parsedData.role}homepage`);
      } 
      else{
        navigate(`/adminclient`);
    }
      
    }
  };
  useEffect(() => {userCheck();}, []);
  return (
    <div>
      <div className="nav">
        <div className="logoo">
          <div className="register-logo">
            <img src={logo} alt="Logo" />
          </div>

          <p className="btns">
            <a href="/login" className="head-btn">
              Login
            </a>
            <a href="/register" className="head-btn">
              Register
            </a>
          </p>
        </div>
      </div>

      <div className="home">
        <div className="home-top">
          <div className="home-left">
            <h1>Empower your projects with Fixit</h1>
            <p>
              Where expertise meets ambition, and innovation knows no bounds.
            </p>
            <a href="/register" className="btn">
              Get Started
            </a>
          </div>

          <div className="home-right">
            <img src={hero} alt="hero_image" />
          </div>
        </div>

        <div className="home-bottom">
            <h3>Trusted by</h3>
            <div className="icons">
                <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="facebook" />
                <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="instagram" />
                <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="twitter" />
                <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="linkedin" />
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
