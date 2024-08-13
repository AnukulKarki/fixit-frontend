import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/SubmitProposal.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import L from "leaflet";
import "leaflet-routing-machine";
import swal from "sweetalert";
import Footer from "./Footer";


export default function CurrentJobWorkerGigDetail() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [detailWorkGig, setdetailWorkGig] = useState([]);
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
  useEffect(() => {userCheck();}, []);
  const workDetailViewGig = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/work/detail/${id}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    let parsedData = await data.json();
    if(data.status === 200){setdetailWorkGig(parsedData);}
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDeviceLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        
        var mymap = L.map("map").setView(
          [position.coords.latitude, position.coords.longitude],
          13
        );

        
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mymap);
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(
          mymap
        );
        L.marker([parsedData[0].latitude, parsedData[0].longitude]).addTo(
          mymap
        );
        L.Routing.control({
          waypoints: [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(parsedData[0].latitude, parsedData[0].longitude),
          ],
        }).addTo(mymap);
        
      });
    }
  };

  const gigprogress = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/work/progress/${id}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    if (data.status === 200) {
      swal("Progress", `Work is ${parsedData.job} `, "success").then(function() {window.location.reload();});
      
    }
    console.log("parsed Length", parsedData.length);
  };
  const cancelGig = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/work/cancel/${id}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    if (data.status === 200) {
      swal("Cancelled", `Work is ${parsedData.job} `, "success").then(function() {
        window.location.reload();
      });
      
    }
  };

  useEffect(() => {
    workDetailViewGig();
  }, []);

  const sendMessage = async (sendId) => {
    let formData = new FormData();
    formData.append("message", "Hello");
    let data = await fetch(
      `http://127.0.0.1:8000/api/message/send/${sendId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    if (data.status === 201) {
      navigate("/message");

      
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

      <div className="sp-container">
        <h1>Current Job</h1>
        {detailWorkGig &&
          detailWorkGig.map((item, index) => (
            <div className="sp-top" key={item}>
              <div className="topleft">
                <div className="title">
                  <div className="name">
                    <span>{item.worktitle}</span>
                  </div>
                </div>

                <div
                  className="description"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Client: {item.user.firstname} {item.user.lastname}
                  </p>
                  <p>
                    Worker: {item.worker.firstname} {item.worker.lastname}
                  </p>
                  <p className="status">{item.status.toUpperCase()}</p>
                </div>

                <div className="description">
                  <p>{item.workdescription}</p>
                </div>
              </div>

              <div className="topright">
                <div className="date">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{item.acceptedate}</span>
                </div>
                <div className="category">
                  <i className="fas fa-tools"></i>
                  <span>{item.category.name}</span>
                </div>
                <div className="budget">
                  <i className="fas fa-money-bill-wave"></i>
                  <span> None (Urgent Work) </span>
                </div>
                <div className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span> {item.location} </span>
                </div>
                <div className="location">
                  <i className="fas fa-phone"></i>
                  <span>Phone: {item.user.phone} </span>
                </div>
              </div>
            </div>
          ))}
        <div className="sp-bottom">
          <div className="bottomleft">
            {detailWorkGig &&
              detailWorkGig.map((item, index) => (
                <div className="bottomimage" style={{height:"350px"}}>
                  <img
                    style={{ border: "1px solid black", width: "500px" }}
                    src={item.image}
                    alt="project"
                  />
                </div>
              ))}
            Map
            <div
              id="map"
              style={{
                height: "600px",
                width: "800px",
              }}
            ></div>
            <br/>
            {detailWorkGig &&
              detailWorkGig.map((item, index) => (
                <div className="buttons">
                  <button className="message" type="submit" onClick={() => sendMessage(item.user.id)}>
                    Message
                  </button>
                  {item.status === "accept" ? (
                    <button className="cancel" onClick={cancelGig}>
                      Cancel
                    </button>
                  ) : null}
                  {item.status === "completed" ? (
                    <button className="submit" disabled>
                      Progress
                    </button>
                  ) : (
                    <button className="submit" onClick={gigprogress}>
                      Progress
                    </button>
                  )}
                </div>
              ))}
          </div>

          <div className="bottomright">
            <div className="bottomrightimage">
              {/* <img src="https://via.placeholder.com/200x500" alt="user" /> */}
            </div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}
