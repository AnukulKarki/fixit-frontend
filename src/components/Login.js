import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Login.css";
import swal from "sweetalert"

function Login(props) {
  document.title =  "Login";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    userCheck();
  }
  , []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let login = "http://127.0.1:8000/api/user/login/";

    let data = await fetch(login, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    setLoading(false);
    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role === "worker" || parsedData.role === "client") {
        navigate(`/${parsedData.role}homepage`);
      } 
      else if(parsedData.role === "admin"){
        navigate(`/adminclient`);
    }
    
      
    }
    else if(data.status === 403){
      swal("Please Verify Your Email","","info");
      navigate(`/code/${email}`);
  }else{
    swal("Invalid Credentials", "Please Enter Correct Email and Password", "error")
  }
  };

  return (
    <div style={{ height: "80vh" }}>
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="login-form">
          <h2>Login</h2>

          <div className="login-form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-form-field">
            <a href="/forgetpassword"  className="forgot-password" style={{cursor:"pointer"}}>
              Forget Password
            </a>
          </div>

          <button type="submit" className="login-button" onClick={handleSubmit}>
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="login-footer">
            <p>
              Does not have an account?{" "}
              <a href="/register" className="signup-link">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
