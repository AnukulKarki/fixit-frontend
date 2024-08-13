import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Tick from "../assets/tick.png";
import CircularProgress from '@mui/material/CircularProgress';




export default function WorkDetailview() {
  
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [workdetail, setWorkdetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const workdetailView = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/hire/detail/${id}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setWorkdetail(parsedData);
  };
  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/user-check/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200 && parsedData.role === "worker") {
      
    } else  {
      let data = await fetch("http://127.0.1:8000/api/user/logout/", {
      method: "GET",
      credentials: "include",
      });
      if(data.status === 200){navigate("/login");}
        
    } 
  };

  useEffect(() => {
    userCheck();
    workdetailView();
  },{});

  const requestCancel = async () => {
    let data = await fetch(`http://127.0.1:8000/api/hire/proposal/reject/${id}/`, {
      method: "POST",
      credentials: "include",
    });
    if (data.status === 200) {
      swal("Request Rejected", "You have rejected the request", "success");
      navigate('/workerhomepage')
      
    }
  };

  const requestAccept = async () => {
    setLoading(true);
    let data = await fetch(`http://127.0.1:8000/api/hire/proposal/accept/${id}/`, {
      method: "POST",
      credentials: "include",
    });
    if (data.status === 200) {
      setLoading(false);
      swal("Request Accepted", "Your request has been accepted", "success");
      navigate('/workerhomepage')
      
    }
  };


  return (
    <div>
      <Navbar />

    {workdetail &&
    workdetail.map((item, index) => (
      <div className="sp-container" key={item}>
        <h1>Work Request</h1>

        <br />
        
        <h3>Client</h3>

        <div className="home-info-card">
          <div className="details">
            <p className="username" style={{cursor:"pointer"}} onClick={() => {navigate(`/ocp/${item.user.id}`)}}>{item.user.firstname} {item.user.lastname} {item.user.isKycVerified ? (<img src={Tick} alt="" srcset=""/>):null} </p> 
            <p className="rating">{item.user.rating}</p>
          </div>

          <div className="card-image">
            <img src={item.user.profileImg} alt="profile" style={{width:'50px', height:'50px', borderRadius:'50%'}}/>
          </div>
        </div>

        <div className="sp-top">
          <div className="topleft">
            <div className="title">
              <div className="name">
                <span>{item.worktitle}</span>
              </div>
            </div>

            <div className="description">
              <p>
                {item.workdescription}
              </p>
            </div>

            <div className="bottomimage"  style={{width:'100%', height:'500px'}}>
              <img src={item.image} alt="project" />
            </div>

            <div className="formbutton">
              <button className="cancel" onClick={() => requestCancel(item.id)}>Reject</button>
              <button className="submit" onClick={() => requestAccept(item.id)}>{loading ? 
                  <CircularProgress color="success" style={{width:'20px', height:'20px'}}/>
                : "Accept"}</button>
            </div>
          </div>

          <div className="topright">
            <div className="date">
              <i className="fas fa-calendar-alt"></i>
              <span>{item.requestdate}</span>
            </div>
            <div className="category">
              <i className="fas fa-tools"></i>
              <span>{item.category.name}</span>
            </div>
            {/* <div className="budget">
              <i className="fas fa-money-bill-wave"></i>
              <span> Data </span>
            </div> */}
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span> {item.location} </span>
            </div>
          </div>
        </div>
      </div>
    ))}
      
    </div>
  );
}
