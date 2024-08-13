import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/SubmitProposal.css";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function SubmitProposal() {
  const { jobId } = useParams();
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

  const [jobDetail, setJobDetail] = useState({});

  const getJob = async () => {
    let data = await fetch(`http://127.0.1:8000/api/job/detail/${jobId}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setJobDetail(parsedData);
  };

  const [proposalCount, setproposalCount] = useState("");

  const count = async () => {
    let data = await fetch(`http://127.0.1:8000/api/job/count/${jobId}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setproposalCount(parsedData);
  };

  useEffect(() => {
    getJob();
    count();
  }, []);

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const submitproposal = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("price", price);
    formData.append("description", description);

    let data = await fetch(
      `http://127.0.1:8000/api/worker/proposal/apply/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    let parsedData = await data.json();

    console.log(parsedData);

    if (data.status === 201) {
      swal("Proposal submitted successfully","", "success");
      setPrice("");
      setDescription("");
      navigate('/workerhomepage');  
    } else if (data.status === 403) {
      swal("Already Submitted","", "info");
    } else {
      swal("Something went wrong","","error");
    }
  };

  return (
    <div>
      
      <Navbar link1="workerhomepage" link1name="Home" link2="workerjobpage" link2name="Jobs" link3name="Message" link4name="Request" link4="/gigworkrequest" />

      <div className="sp-container">
        <h1>Submit a proposal</h1>

        <div className="sp-top">
          <div className="topleft">
            {jobDetail.featured && (
              <div className="featured">
                <i className="fa fa-diamond"></i>
                <span>Featured</span>
              </div>
            )}

            <div className="title">
              <div className="name">
                <span>{jobDetail.title}</span>
              </div>
            </div>

            <div className="description">
              <p>{jobDetail.description}</p>
            </div>
          </div>

          <div className="topright">
            <div className="date">
              <i className="fas fa-calendar-alt"></i>
              <span>{jobDetail.created_at}</span>
            </div>
            <div className="category">
              <i className="fas fa-tools"></i>
              <span>{jobDetail.category && jobDetail.category.name}</span>
            </div>
            <div className="budget">
              <i className="fas fa-money-bill-wave"></i>
              <span>Rs. {jobDetail.budget} /Project</span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span> {jobDetail.location} </span>
            </div>
            <div className="proposal">
              <i className="fas fa-users"></i>
              <span> Proposal {proposalCount.number}</span>
            </div>
          </div>
        </div>

        <div className="sp-bottom">
          <div className="bottomleft">
            <div className="bottomimage" style={{width:'100%', height:'500px'}}>
              <img src={jobDetail.image} alt="project"  />
            </div>

            <form onSubmit={submitproposal}>
              <label htmlFor="">Your Price (Rs/Project)</label>
              <input
                type="text"
                placeholder="Enter your price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label htmlFor="">Description</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <div className="formbutton">
                <button className="cancel" onClick={() => navigate("/workerhomepage")}>Cancel</button>
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="bottomright">
            <div className="bottomrightimage">
              {/* <img src="https://via.placeholder.com/200x500" alt="user"  /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
