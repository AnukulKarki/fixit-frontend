import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/Homepage.css";
import Banner from "../assets/homedesign.jpg";
import { useNavigate } from "react-router-dom";

import Tick from "../assets/tick.png";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';
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

export default function UserHomepage(props) {
  const [jobReqId,setJobReqId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {setOpen(true);
  setJobReqId(id)}
  console.log(jobReqId);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/user-check/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200 && parsedData.role === "client") {
      
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

  const post = () => {
    navigate("/jobrequirement");
  };

  const handleView = (jobId) => {
    navigate(`/viewproposal/${jobId}`);
  };

  const [displayPostedJobs, setDisplayPostedJobs] = useState([]);

  const PostedJobs = async () => {
    let data = await fetch("http://127.0.1:8000/api/job/user/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setDisplayPostedJobs(parsedData);
  };

  useEffect(() => {
    PostedJobs();
  }, []);


  const [profileDetails, setprofileDetails] = useState([]);
  const profile = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/user/profile/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setprofileDetails(parsedData);
  };

  useEffect(() => {
    profile();
  }, []);

  const [brandData, setBrandData] = useState([]);
  const brandDataList = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/admin/brand/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData); 
    setBrandData(parsedData); 
  };
  useEffect(() => {
    brandDataList();
  }, []);

  const handleDelete = async (jobId) => {
    let data = await fetch(`http://127.0.0.1:8000/api/job/delete/${jobId}/`, {
      method: "POST",
      credentials: "include",
    });
    handleClose();
    if (data.status === 200) {
      swal("Deleted", "You have successfully deleted!", "success");
      
    }
  };
 
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/662742271ec1082f04e5be9d/1hs4lkqs3';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

//pagination
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(2);

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = displayPostedJobs.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  
};
  return (
    <div>
      <Navbar link1="clienthomepage" link1name="Home" link2="clientjobpage" link2name="Jobs" link3name="Message" />

      <div className="home-container">
        <div className="home-head">
          <div className="home-left">
            <div className="banner" style={{height:'100%'}}>
              <img src={Banner} alt=""/>
            </div>
          </div>

          <div className="home-right">
            <div className="home-info-card">
              <div className="details">
                <p className="username">{profileDetails.firstname} {profileDetails.lastname} {profileDetails.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null} </p>
                <p className="category">Client</p>
                <p className="rating">Rating: {profileDetails.rating}</p>

                <a href="/profile">View your profile</a>
              </div>

              <div className="card-image">
                <img src={profileDetails.profileImg} alt="" />
              </div>
            </div>

            <div className="post-div">
              <div className="req-post">
                <div className="post">
                  <p>Post a job requirement</p>

                  <button style={{cursor:"pointer"}} onClick={post}>Post</button>
                </div>
              </div>

              <div className="req-post">
                <div className="post">
                  <p>Urgent Worker</p>

                  <button style={{cursor:"pointer"}} onClick={()=>{
                    navigate("/gigdisplay")
                  }}>Find</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content-left">
            {displayPostedJobs.length === 0 && <h1>No Jobs Posted Yet</h1> }
            {displayPostedJobs &&
              currentPosts.map((job) => {
                return (
                  <div className="home-card" key={job.id}>
                    <div className="title">
                      <div className="name">
                        <span className="name-title">{job.title}</span>
                        &nbsp; &nbsp;
                        <span className="budget">Rs. {job.budget}</span>
                      </div>
                    </div>

                    <div className="description">
                      <p>{job.description}</p>
                    </div>

                    <div className="info">
                      <div className="category">
                        <span> {job.category.name}</span>
                      </div>
                    </div>

                    <div className="footer">
                      <div className="location">
                        <i className="fas fa-map-marker-alt"></i>
                        <span> {job.location}</span>
                      </div>
                      <div>
                  
                      <button style={{margin:"5px"}} onClick={() => handleView(job.id)}>View</button>
                      {job.jobStatus === "inprogress" ?(
                      <button style={{background:"#FF5050", color:"white"}} onClick={() => {handleOpen(job.id)}} >Delete</button>):null}
                      </div>
                    </div>
                  </div>
                );
              })}
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
          disabled={indexOfLastPost >= displayPostedJobs.length}
        >
          Next
        </button>
      </div>
          </div>

          <div className="content-right">
            <div className="title">Recommended Brands</div>
            {brandData &&
              brandData.map((item) => {
                return (
                  <div className="brand" key={item.id}>
                    <p>{item.title}</p>
                    <img src={item.image} width={"100px"} height={"75px"} alt="" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
          <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Do you want to delete the Job?
              
            </Typography>
            <br/>
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => {handleDelete(jobReqId)}}>Yes</Button>
            </div>
              
          </Box>
        </Modal>
        <Footer />
    </div>
  );
}
