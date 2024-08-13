import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Login.css";
import swal from "sweetalert"

export default function Passwordchange() {
    const {token} = useParams();
    console.log(token)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const changePassword = async (e) => {
        
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("password", password);
        formData.append("token",token);

    
        let data = await fetch("http://127.0.1:8000/api/user/forgetpassword/", {
          credentials: "include",
          method: "POST",
          body: formData,
        });
        const parsedData = await data.json();
    
        if (data.status === 200) {
          swal("Password Updated", "", "success")
          navigate('/login');
          
        } else if (data.status === 400) {
            swal(parsedData.msg, "", "error")
        }
      };
  return (
    <div style={{ height: "80vh" }}>
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="login-form">
          <h2>Change Password</h2>

          <div className="login-form-field">
            <label htmlFor="username">Password</label>
            <input
              type="password"
              id="username"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-form-field">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {password.length > 0 && confirmPassword.length > 0 && confirmPassword !== password  ?(
            <>
            <button type="submit" className="login-button"  disabled>
            Change Password
            </button> 
        <p style={{color:'red'}}>Password do not match</p>
        </>
        ):(

          

          <button type="submit" className="login-button" onClick={changePassword}>
            Change Password
          </button>
          )}

          <div className="login-footer">
            <p>
              Go to ?{" "}
              <a href="/login" className="signup-link">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
