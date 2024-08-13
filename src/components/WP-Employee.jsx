import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/WorkerProfile.css";
import "../styles/WP-Employee.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tick from "../assets/tick.png";
import Footer from "./Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WPEmployee() {
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);

  const handleClose = () => setEditOpen(false);

  const navigate = useNavigate();

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
  }, []);

  const [profileDetails, setprofileDetails] = useState([]);
  const profile = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/user/profile/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setprofileDetails(parsedData);}
    
  };

  const [details, setDetails] = useState([]);
  const detail = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/user/worker-data/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setDetails(parsedData);}
    
  };

  useEffect(() => {
    profile();
    detail();
  }, []);

  const [badgeView, setBadgeView] = useState([]);
  const badge = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/badge/view/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setBadgeView(parsedData);}
    
  };
  useEffect(() => {badge();}, []);

  return (
    <div>
      <Navbar
        link1="workerhomepage"
        link1name="Home"
        link2="workerjobpage"
        link2name="Jobs"
        link3name="Message"
        link4name="Request"
        link4="/gigworkrequest"
      />

      <div className="wp-container">
        <div className="wp-left">
          <div className="wp-image">
            <img
              src={profileDetails && profileDetails.profileImg}
              alt="Avatar"
            />
          </div>

          <div className="wp-info">
            <div className="wp-name">
              <h2>
                {profileDetails.firstname} {profileDetails.lastname}  {profileDetails.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null}
              </h2>
            </div>

            <div className="wp-work">
              <p>Web Developer</p>
            </div>

            <div className="wp-contact">
              <p>Contact: {profileDetails.phone}</p>
            </div>

            <div className="wp-rating">
              <p>Rating: {profileDetails.rating}</p>
            </div>
          </div>

          <div className="wp-badge">
            <h3>Badge: {badgeView.length}</h3>
            {badgeView &&
              badgeView.map((item, index) => (
              <p>{item.Badge.name}</p>
              ))}
          </div>
        </div>

        <div className="wp-right">
          <div className="wpr-top">
            <div className="wp-edit">
              {/* <button onClick={handleEditOpen}>Edit User</button> */}
            </div>

            <Modal
              open={editOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>Here goes your content</Box>
            </Modal>

            <div className="wp-nav">
              <ul>
                <li>
                  <a href="/workerprofile">Overview</a>
                </li>
                <li>
                  <a href="/employee">Employee</a>
                </li>
                <li>
                  <a href="/gig">Gig</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="wpr-content">
            <div className="wpr-content-card">
              <h2>Works Completed</h2>

              <div className="extra">
                <p>{details && details.workcompleted}</p>
                
              </div>
            </div>
            <div className="wpr-content-card">
              <h2>Amount Earned</h2>

              <div className="extra">
                <p>{details && details.amountEarned}</p>
                
              </div>
            </div>
            <div className="wpr-content-card">
              <h2>Proposal</h2>

              <div className="extra">
                <p>{details && details.proposal}</p>
                
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
