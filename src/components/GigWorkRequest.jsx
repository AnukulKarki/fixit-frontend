import React from "react";
import Navbar from "./Navbar";
import "../styles/Gig.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "./Footer";
export default function GigWorkRequest() {
  const navigate = useNavigate()

  const [gigProposal, setgigProposal] = useState([]);
  const gigProposalWork = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/hire/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){
      setgigProposal(parsedData);
    }else{

    }
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
    gigProposalWork();
    userCheck();
  }, []);


  const requestCancel = async (proposalId) => {
    let data = await fetch(`http://127.0.1:8000/api/hire/proposal/reject/${proposalId}/`, {
      method: "POST",
      credentials: "include",
    });
    if (data.status === 200) {
      swal("Request Rejected", "You have rejected the request", "success");
      gigProposalWork();
      
    }
  };
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

  return (
    <div>
      
      <Navbar link1="workerhomepage" link1name="Home" link2="workerjobpage" link2name="Jobs" link3name="Message" link4name="Request" link4="/gigworkrequest" />

      <div className="home-container">
        <div className="content">
          <div className="content-left">
            <h1>Job Request</h1>
            {gigProposal && 
            gigProposal.map((item, index) => (
            <div className="home-card" key={item}>
              <div className="title">
                <div className="name">
                  <span className="name-title">{item.worktitle}</span>
                </div>
              </div>

              <div className="description">
                <p>{item.workdescription}</p>
              </div>

              <div className="info">
                <div className="category">
                  <span> {item.category.name} </span>
                </div>
              </div>

              <div className="footer">
                <div className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span> {item.location}</span>
                </div>

                <div className="btn">
                  <button className="red" onClick={() => requestCancel(item.id)}>Cancel</button>
                  <button className="green" onClick={()=>{navigate(`/workdetailview/${item.id}`)}}>View</button>
                </div>
              </div>
            </div>
            ))}
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
      <Footer />
    </div>
  );
}
