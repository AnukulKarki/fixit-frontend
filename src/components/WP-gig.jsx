import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/WorkerProfile.css";
import "../styles/WP-gig.css";
import "../styles/GigDisplay.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import swal from "sweetalert";
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

export default function WPgig() {
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
    if(data.status === 200 ) {setprofileDetails(parsedData);}
    
  };

  useEffect(() => {
    profile();
  }, []);


  const [gigDetails, setgigDetails] = useState([]);
  const gig = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/worker/gig/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setgigDetails(parsedData);}
    
  };

  useEffect(() => {
    gig();
  }, []);



  const gigDelete = async (gigId) => {


    let data = await fetch(`http://127.0.1:8000/api/worker/gig/delete/${gigId}/`, {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      swal("Gig Deleted Successfully!", "", "success");
      gig();
    } else {
      swal("Failed to delete Gig!", "", "error");
    }
  };

 
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
//pagination
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(3);

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = gigDetails.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  window.scrollTo(0, 0);
};
  return (
    <div>
      <Navbar link1="workerhomepage" link1name="Home" link2="workerjobpage" link2name="Jobs" link3name="Message" />

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
              <h2>{profileDetails.firstname} {profileDetails.lastname}  {profileDetails.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null}</h2>
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
              <Box sx={style}>
                Here goes your content
              </Box>
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

          <div className="add" onClick={()=>{navigate('/gigupload')}}>
            <button>
              <i className="fas fa-add"></i>Add Gig
            </button>
          </div>

          <div className="wpr-content">
          {gigDetails.length === 0 ? ("No Gig Found"):null}

          {gigDetails &&
          currentPosts.map((item, index) => (
            <div className="gig-card" key={item}>
              <img src={item.image} alt="" />

              <div className="gig-info">
                <p className="title">{item.title}</p>

                <p>
                  {item.description}
                </p>

                <div className="gig-footer">
                  <p className="category">{item.category.name}</p>

                  <div className="extra">
                    {/* <button className="edit">
                      <i class="fa-regular fa-edit"></i>
                    </button> */}
                    <button className="delete"  onClick={() => gigDelete(item.id)}>
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}

            
            
          </div>
          <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPost >= gigDetails.length}
        >
          Next
        </button>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
