import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { useState } from "react";

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

export default function Sidebar() {

  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {setEditOpen(true); }
  const handleClose = () => setEditOpen(false);

  const navigate = useNavigate();

  const handlelogout = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/logout/", {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      navigate("/");
    }
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-brand">
          <img src={Logo} alt="" srcset="" width={"100px"} />
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/adminworker" activeClassName="active-link">
                <span>Worker</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminclient" activeClassName="active-link">
                <span>Client</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/blacklist" activeClassName="active-link">
                <span>Banned User</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admincategory" activeClassName="active-link">
                <span>Category</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/adminproduct" activeClassName="active-link">
                <span>Product</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="logout">
            <i className="fas fa-sign-out" onClick={handleEditOpen}> Log Out</i>
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
    </div>

    
  );
}
