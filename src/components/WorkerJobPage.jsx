import React from "react";
import { useState, useEffect } from "react";
import "../styles/WorkerJobPage.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


import "leaflet-routing-machine";
import NotFound from "./NotFound";
import Footer from "./Footer";


export default function WorkerJobPage() {
  const [deviceLocation, setDeviceLocation] = useState(null);


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


  const [currentWorks, setcurrentWorks] = useState([]);
  const currentWork = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/work/current-work/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){setcurrentWorks(parsedData);}
    
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

  useEffect(() => {
    userCheck();
    gigCurrent();
    currentWork();
    // if(currentWorks.length > 0){
    //   workDetailView(currentWorks[0].id);
    // }else if(gigcurrentWorks.length > 0){
    //   workDetailViewGig(gigcurrentWorks[0].id);
    // }

    
  }, []);

  




  


  

  
  

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
      {currentWorks.length === 0 && gigcurrentWorks.length === 0 ? (<NotFound message="No Current Jobs"/>) :null}
      <div className="job-container">
        <div className="left">
          <h2> {currentWorks.length === 0 && gigcurrentWorks.length === 0 ? null:("Current Jobs")} </h2>

          {currentWorks &&
            currentWorks.map((item, index) => (
              <div
                className="job-box"
                key={item}
                onClick={() => {navigate(`/currentjobdetail/${item.id}`)}}
              >
                <h3>{item.job.title}</h3>
                <p>{item.job.user.firstname}</p>
              </div>
            ))}

            {gigcurrentWorks &&
              gigcurrentWorks.map((item, index) => (
              <div
                className="job-box"
                key={item}
                onClick={() => {navigate(`/currentjobgigdetail/${item.id}`)}}
                
              >
                <h3>{item.worktitle}</h3>
                <p style={{fontWeight:"normal"}} >{item.user.firstname} {item.user.lastname}</p>
              </div>
            ))}
        </div>
        <div id="map"></div>
      </div>
      <Footer />
    </div>
  );
}
