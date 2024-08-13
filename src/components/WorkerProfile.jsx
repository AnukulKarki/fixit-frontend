import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/WorkerProfile.css";
import Tick from "../assets/tick.png";


import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
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

export default function WorkerProfile() {
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);

  const [proposalEditOpen, setProposalEditOpen] = useState(false);
  const handleProposalEditOpen = () => setProposalEditOpen(true);

  const handleClose = () => {
    setEditOpen(false);
    setProposalEditOpen(false);
  };
  const [openPass, setOpenPass] = useState(false);
  const handleOpenPass = () => setOpenPass(true);
  const handleClosePass = () => setOpenPass(false);
  

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [profileimage, setProfileimage] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

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

  const deleteProposal = async (proposalId) => {
    let data = await fetch(`http://127.0.1:8000/api/worker/proposal/delete/${proposalId}`, {
      method: "GET",
      credentials: "include",
    });
    if (data.status === 200) {
      swal("Proposal Deleted", "", "success");
      pendingProposalWork();
    } else {
      swal("Proposal Not Deleted", "", "error");
    }
  };

  const changepassword = async () => {
    let formData = new FormData();
    formData.append("password", currentpassword);
    formData.append("newpassword", newpassword);

    let data = await fetch('http://127.0.0.1:8000/api/user/change-password/', {
      method: "POST",
      credentials: "include",
      body: formData,
      
    });
    if (data.status === 200) {
      swal("Password Changed", "Your password has been changed", "success");
      handleClosePass();
      let data = await fetch("http://127.0.1:8000/api/user/logout/", {
      method: "GET",
      credentials: "include",
      });
      if(data.status === 200){navigate("/login");}
    } else if(data.status === 406) {
      swal("Invalid Password", "", "error");
      handleClosePass();
    }
    else{
      swal("Password Not Changed", "Your password has not been changed", "error");
      handleClosePass();
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
    console.log(parsedData);
    setprofileDetails(parsedData);
    setFirstname(parsedData.firstname);
    setLastname(parsedData.lastname);
    setAge(parsedData.age);
    setCity(parsedData.city);
    setDistrict(parsedData.district);
    setStreetaddress(parsedData.street_name);
  };

  useEffect(() => {
    profile();
  }, []);

  const navigate = useNavigate();

  const [currentProject, setCurrentProject] = useState([]);
  const currentWork = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/work/current-work/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setCurrentProject(parsedData);}
    
  };

  useEffect(() => {
    currentWork();
  }, []);

  const [pendingProposal, setpendingProposal] = useState([]);
  const pendingProposalWork = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/worker/proposal/pending/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    if(data.status === 200){setpendingProposal(parsedData);}
    
  };

  useEffect(() => {
    pendingProposalWork();
  }, []);

  const [pastProposal, setpastProposal] = useState([]);
  const pastProposalWork = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/worker/proposal/past/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setpastProposal(parsedData);}
    
  };

  useEffect(() => {
    pastProposalWork();
  }, []);

  const [pastWork, setPastWork] = useState([]);
  const pastWorkWork = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/work/past-work/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setPastWork(parsedData);}
  };

  useEffect(() => {
    pastWorkWork();
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
  const [gigcurrentWorks, setgigcurrentWorks] = useState([]);
  const gigCurrent = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/hire/current-work/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    if(data.status === 200){setgigcurrentWorks(parsedData);}
    
  };

  const [gigcurrentWorksa, setgigcurrentWorksa] = useState([]);
  const gigpastWorka = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/hire/past-work/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setgigcurrentWorksa(parsedData);}
    
  };
  useEffect(() => {badge();
    gigCurrent();
    gigpastWorka();
  }, []);

  const editUser = async () => {
    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("age", age);
    formData.append("city", city);
    formData.append("district", district);
    formData.append("street_name", streetaddress);
    formData.append("image", profileimage);

    let data = await fetch("http://127.0.0.1:8000/api/user/profile/edit/", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      swal("Profile Updated", "Your profile has been updated", "success");
      profile();
      handleClose();
    }
    else{
      swal("Profile Not Updated", "Your profile has not been updated", "error");
    }
  };

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
                {profileDetails.firstname} {profileDetails.lastname} {profileDetails.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null}
              </h2>
            </div>

            <div className="wp-work">
              <p>Painter</p>
            </div>

            <div className="wp-contact">
              <p>Contact: {profileDetails.phone}</p>
            </div>

            <div className="wp-rating">
              <p>Rating: {profileDetails.rating}</p>
            </div>
            <br/>
            <p style={{cursor:"pointer"}} onClick={handleOpenPass}>Change Password</p>
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
              <button onClick={handleEditOpen}>Edit User</button>
            </div>
            <Dialog
            open={editOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              {profileDetails && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="First Name"
                    
                    type="text"
                    fullWidth
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Last Name"
                    value={lastname}
                    type="text"
                    fullWidth
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="location"
                    label="email"
                    value={profileDetails.email}
                    type="text"
                    fullWidth
                    disabled
                  />
                  
                  
                  <TextField
                    margin="dense"
                    id="latitude"
                    label="phone"
                    type="text"
                    fullWidth
                    value={profileDetails.phone}
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="longitude"
                    label="age"
                    type="text"
                    value={age}
                    fullWidth
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="address"
                    label="citizenship"
                    type="text"
                    value={profileDetails.citizenship_no}
                    fullWidth
                    disabled
                  />
                  <TextField
                    margin="dense"
                    id="noOfRoom"
                    label="City"
                    value={city}
                    type="text"
                    fullWidth
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="rating"
                    label="District"
                    type="text"
                    value={district}
                    fullWidth
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="owner"
                    label="Street Address"
                    type="text"
                    value={streetaddress}
                    
                    fullWidth
                    onChange={(e) => setStreetaddress(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="owner"
                    type="file"
                    fullWidth
                    onChange={(e) => setProfileimage(e.target.files[0])}
                  />
                </>
              )}
            
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button  color="primary" onClick={editUser}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

            <Dialog
            open={openPass}
            onClose={handleClosePass}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
             
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Current Password"
                    type="text"
                    fullWidth
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="New Password "
                    type="text"
                    fullWidth
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  
                  
                  
                  
                </>
            
            
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePass} color="primary">
                Cancel
              </Button>
              <Button  color="primary" onClick={changepassword}>
                Change
              </Button>
            </DialogActions>
          </Dialog>

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

          <div className="wpr-middle">
            <h2>Pending Project</h2>
            <div className="wp-pending">
              {currentProject &&
                currentProject.map((item, index) => (
                  <div className="wp-pending-card" key={item}>
                    <div className="name">
                      <h3>{item.job.title}</h3>
                      <p>{item.job.category.name}</p>
                    </div>
                    <div className="status">{item.status.toUpperCase()}</div>

                  </div>
                  
                ))}
                {gigcurrentWorks &&
                gigcurrentWorks.map((item, index) => (
                  <div className="wp-pending-card" key={item}>
                    <div className="name">
                      <h3>{item.worktitle}</h3>
                      <p>{item.category.name}</p>
                    </div>
                    <div className="status">{item.status.toUpperCase()}</div>

                  </div>
                  
                ))}
            </div>

            <div className="wpr-bottom">
              <div className="wpr-bottom-top">
                <h2>Pending Proposal</h2>
                <button onClick={()=>{navigate('/workerhomepage')}}>
                  <i class="fa-regular fa-plus"></i>
                  &nbsp;Apply for work
                </button>
              </div>

              <div className="wp-proposal">
                <table>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                  {pendingProposal &&
                    pendingProposal.map((item, index) => (
                      <tr key={item}>
                        <td>{item.id}</td>
                        <td>{item.job.title}</td>
                        <td>{item.job.category.name}</td>
                        <td>
                          <button className="delete">
                            <i class="fa-solid fa-trash" onClick={()=>{deleteProposal(item.id)}}></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </table>
              </div>
            </div>

            <Modal
              open={proposalEditOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                Here goes your content
              </Box>
            </Modal>

            <div className="wpr-bottom-end">
              <div className="wpr-bottom-end-left">
                <h2>Past proposal</h2>

                <div className="wp-past-proposal" >
                  {pastProposal &&
                    pastProposal.map((item, index) => (
                      <div className="wp-past-proposal-card" key={item}>
                        <div className="details">
                          <h3>{item.job.title}</h3>
                          <div className="extra">
                            <p>{item.job.category.name}</p>
                            <p>{item.job.category.location}</p>
                          </div>
                        </div>

                        {item.status === "rejected" ? (
                          <div className="status">Rejected</div>
                        ) : (
                          <div className="status">Accepted</div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="wpr-bottom-end-right">
                <h2>Past project</h2>
                <div className="wp-past-project" >
                  {pastWork &&
                    pastWork.map((item, index) => (
                      <div className="wp-past-project-card" key={item}>
                        <div className="details">
                          <h3>{item.job.title}</h3>
                          <div className="extra">
                            <p>{item.job.category.name}</p>
                            <p>{item.job.location}</p>
                          </div>
                        </div>
                        <div className="status">{item.status}</div>
                      </div>
                      
                    ))}
                    {gigcurrentWorksa &&
                    gigcurrentWorksa.map((item, index) => (
                      <div className="wp-past-project-card" key={item}>
                        <div className="details">
                          <h3>{item.worktitle}</h3>
                          <div className="extra">
                            <p>{item.category.name}</p>
                            <p>{item.location}</p>
                          </div>
                        </div>
                        <div className="status">{item.status}</div>
                      </div>
                      
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <Footer/>
    </div>
  );
}
