import React from "react";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
import searchicon from "../assets/search.png";
import notificationicon from "../assets/notification.png";
import profileicon from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

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

function Navbar(props) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {setEditOpen(true); }
  const handleClose = () => setEditOpen(false);


  const handlelogout = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/logout/", {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      navigate("/");
    }
  };

  const [currentRole, setCurrentRole] = useState([]);
  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/user-check/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      setCurrentRole(parsedData.role);
    } else {
      data.status === 401 && navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">
            {currentRole === "worker" ? (
              <a href="/workerhomepage">
                <img src={logo} alt="Logo" />
              </a>
            ) : (
              <a href="/clienthomepage">
                <img src={logo} alt="Logo" />
              </a>
            
            )}
            
          </div>

          {currentRole === "worker" ? (
              <a href="/workerhomepage" className="navbar-link">
              Home
            </a>
            ) : (
              <a href="/clienthomepage" className="navbar-link">
              Home
          </a>
            
            )}


          {currentRole === "worker" ? (
              <a href="/workerjobpage" className="navbar-link">
              Job
            </a>
            ) : (
              <a href="/clientjobpage" className="navbar-link">
              Job
          </a>
            
            )}

            {currentRole === "worker" ? (
              <a href="/workerjobarchive" className="navbar-link">
              Archive Job
            </a>
            ) : (
              <a href="/clientjobpagearchive" className="navbar-link">
              Archive Job
          </a>
            
            )}
            <a href="/productlisting" className="navbar-link">
            Product
          </a>

          {currentRole === "worker" ? (
              <a href="/gigworkrequest" className="navbar-link">
              Request
            </a>
            ) : null}

          <a href='/message' className="navbar-link">
            Message
          </a>

          <a href={props.link6} className="navbar-link">
            {props.link6name}
          </a>
          
        </div>

        <div className="navbar-right">
          {/* <form action="">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Worker"
              className="navbar-search"
            />
            <button type="submit" className="navbar-icon">
              <img src={searchicon} alt="Search" />
            </button>
          </form> */}

          {/* <div className="notification">
            <a href="/notification" className="navbar-icon">
              <img src={notificationicon} alt="" srcset="" />
            </a>
          </div> */}

          <div className="profile">
            {currentRole === "worker" ? (
              <a href="/workerprofile" className="navbar-icon">
                <img src={profileicon} alt="" srcset="" />
              </a>
            ) : (
              <a href="/profile" className="navbar-icon">
                <img src={profileicon} alt="" srcset="" />
              </a>
            )}
            
          </div>

          <div className="logout">
            <i className="fas fa-sign-out" onClick={handleEditOpen}></i>
          </div>
        </div>
      </div>
      <Modal
              open={editOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>

              <Typography id="transition-modal-title" variant="h6" component="h2">
              Logout
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Do you want to Logout?
              
            </Typography>
            <br/>
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handlelogout} >Yes</Button>
            </div>
              </Box>
            </Modal>
    </>
  );
}

export default Navbar;
