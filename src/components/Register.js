import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';




function Register() {
  



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
  
  const [loading, setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [age, setAge] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [citizenshipPhoto, setCitizenshipPhoto] = useState(null);
  const fileInput = useRef();
  const [categoryData, setCategoryData] = useState("");
  console.log(userType)

  const categoryList = async () => {
    let cdata = await fetch("http://localhost:8000/api/category/list/");
    let cpData = await cdata.json();
    setCategoryData(cpData);
  };
  

  useEffect(() => {
    categoryList();
  }, []);

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("firstname", fname);
    formData.append("lastname", lname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone); 
    formData.append("age", age);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("street_name", street);
    formData.append("citizenship_no", citizenship);
    formData.append("category", category);
    formData.append("role", userType);
    formData.append("image", citizenshipPhoto);
    // yeha database ma image ko name kasto save garne vanera sochne
    formData.append("profileImg", profilePhoto);

    let data = await fetch("http://localhost:8000/api/user/register/", {
      method: "POST",
      body: formData,
    });
    

    let parsedData = await data.json();

    
    setLoading(false)

    if (data.status === 201) {
      navigate(`/code/${email}`)
      setFname("");
      setLname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setCitizenship("");
      setAge("");
      setDistrict("");
      setCity("");
      setStreet("");
      setCategory("");
      setUserType("client");
      setCitizenshipPhoto("");
      fileInput.current.value = "";
      setProfilePhoto("");
    } else {
      if (parsedData.email) {
        alert(parsedData.email);
        return;
      }
      if (parsedData.phone) {
        alert(parsedData.phone);
        return;
      }
      if (parsedData.password) {
        alert(parsedData.password);
        return;
      } else {
        alert("Something went wrong");
      }
    }
  };

  


  return (
    <>
      <div className="head">
        <div className="register-logo">
          <img src={logo} alt="Logo" />
        </div>
        

        <p>
          <a href="/login" className="head-btn">
            Login
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="register-container">
          <div className="register-form">
            <h2>Register</h2>

            <p>Role</p>
            <div className="group">
              <div className="form-field">
                <label htmlFor="user">Select Role</label>
                <select id="user" value={userType} onChange={handleUserType}>
                  <option value="client">Client</option>
                  <option value="worker">Worker</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="profile-photo">Profile Photo</label>
                <input
                  type="file"
                  id="profile-photo"
                  ref={fileInput}
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                />
              </div>
            </div>

            <p>Personal Information</p>

            <div className="group">
              <div className="form-field">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  id="fname"
                  value={fname}
                  required
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  id="lname"
                  value={lname}
                  required
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>

            <div className="group">
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <p>Additional Information</p>

            <div className="group">
              <div className="form-field">
                <label htmlFor="citizenship">Citizenship Number</label>
                <input
                  type="text"
                  id="citizenship"
                  required
                  value={citizenship}
                  onChange={(e) => setCitizenship(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div className="group">
              <div className="form-field">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="group">
              <div className="form-field">
                <label htmlFor="street">Street Name</label>
                <input
                  type="text"
                  id="street"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="citizenship-photo">Citizenship Photo</label>
                <input
                  type="file"
                  id="citizenship-photo"
                  ref={fileInput}
                  required
                  onChange={(e) => setCitizenshipPhoto(e.target.files[0])}
                />
              </div>
            </div>

            {userType === "worker" ? (
              <>
                <p>Worker Category</p>

                <div className="group">
                  <div className="form-field">
                    <label htmlFor="selectcategory">Select Category</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                    <option  default disabled>Select Category</option>
                      {categoryData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <p>Account Security</p>
            <div className="group">
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {password !== confirmPassword && confirmPassword.length > 0 ? (
                  <p style={{ color: "red" }}>Password does not match</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            {password !== confirmPassword && password.length > 0 ? (
              <button type="submit" className="register-button" disabled>
                Register
              </button>
            ) : (
              <button type="submit" className="register-button">
                {loading ? 
                  <CircularProgress color="success" style={{width:'25px', height:'25px'}}/>
                : "Register"}
              </button>
            )}

            <div className="register-footer">
              <p>
                Already have an account?{" "}
                <a href="/login" className="login-link">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
      
    </>
  );
}

export default Register;
