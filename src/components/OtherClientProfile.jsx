import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/WorkerProfile.css";
import "../styles/WP-Employee.css";
import { useParams } from "react-router-dom";
import Tick from "../assets/tick.png";

export default function OCP() {
  const {id} = useParams();
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

  const [profileDetails, setprofileDetails] = useState([]);
  const profile = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/user/user-profile/${id}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setprofileDetails(parsedData);
  };

  const [otherDetails, setotherDetails] = useState([]);
  const otherDetail = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/user/client-detail/${id}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setotherDetails(parsedData);
  };

  const [pastWork, setPastWork] = useState([]);
  const pastWorkWork = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/work/client/past-work/${id}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setPastWork(parsedData);
  };

  const [pastWorkgig, setPastWorkgig] = useState([]);
  const pastWorkWorkgig = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/hire/past-work/client/${id}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setPastWorkgig(parsedData);
  };

  const [badgeView, setBadgeView] = useState([]);
  const badge = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/badge/view/${id}`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setBadgeView(parsedData);
  };

  useEffect(() => {badge();}, []);

  useEffect(() => {
    userCheck();
    profile();
    otherDetail();
    pastWorkWork();
    pastWorkWorkgig();
  }, []);

  return (
    <div>
      <Navbar
        link1="clienthomepage"
        link1name="Home"
        link2="clientjobpage"
        link2name="Jobs"
        link3name="Message"
        link4name="Request"
        link4="/gigworkrequest"
      />

      <div className="wp-container">
        {profileDetails &&
            profileDetails.map((item) => (
        <div className="wp-left">
        
          <div className="wp-image">
            <img
              src={item.profileImg}
              alt="Avatar"
            />
          </div>
          
              <div className="wp-info">
                <div className="wp-name">
                  <h2>{item.firstname} {item.lastname} {item.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null}</h2>
                </div>

                <div className="wp-work">
                  <p>{item.email}</p>
                </div>

                <div className="wp-contact">
                  <p>Contact: {item.phone}</p>
                </div>

                <div className="wp-rating">
                  <p>Rating: {item.rating}</p>
                </div>
              </div>
          

          <div className="wp-badge">
            <h3>Badge: {badgeView.length} </h3>
            {badgeView &&
              badgeView.map((item, index) => (
              <p>{item.Badge.name}</p>
              ))}
          </div>
        </div>
  ))}

        <div className="wp-right">
          <div className="wpr-top" >
            <div className="wpr-content">
              <div className="wpr-content-card">
                <h2>Works Completed</h2>

                <div className="extra">
                  <p>{otherDetails.workcompleted}</p>
                </div>
              </div>
              <div className="wpr-content-card">
                <h2>Amount Spent</h2>

                <div className="extra">
                  <p>Rs.{otherDetails.amountSpent}</p>
                </div>
              </div>
              <div className="wpr-content-card">
                <h2>Proposal Requested</h2>

                <div className="extra">
                  <p>{otherDetails.requestProposal}</p>
                </div>
              </div>
              
              
            </div>
          </div>

          <div className="wpr-bottom">
            <h3>Work Provided</h3>
            <table>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
              {pastWork && 
                
                  pastWork.map((item) => (
                
                <tr>
                  <td>{item.job.title}</td>
                  <td>{item.job.category.name}</td>
                  <td>{item.accepted_at}</td>
                </tr>
                  ))}

{pastWorkgig && 
                
                pastWorkgig.map((item) => (
              
              <tr>
                <td>{item.worktitle}</td>
                <td>{item.category.name}</td>
                <td>{item.acceptedate}</td>
              </tr>
                ))}
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
