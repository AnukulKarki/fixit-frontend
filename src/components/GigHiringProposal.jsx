import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Gig.css";
import { useParams } from "react-router-dom";
import Map from "./Map";
import swal from "sweetalert";
import Tick from "../assets/tick.png";
import Footer from "./Footer";

export default function GigHiringProposal() {
  const [position, setPosition] = useState("");

  const onPositionChange = (position) => {
    setPosition(position);
  };
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
  const navigate = useNavigate();
  const { workerId } = useParams();

  const [workerDetails, setWorkerDetails] = useState([]);

  const [jobTitle, setjobTitle] = useState("");
  const [workDescription, setworkDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const fileInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("workdescription", workDescription);
    formData.append("worktitle", jobTitle);
    formData.append("location", location);
    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    formData.append("image", image);
    formData.append("category", categoryId);

    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/proposal/${workerId}/`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    let parsedData = await data.json();
    console.log(formData);

    console.log(parsedData);

    if (data.status === 201) {
      swal("Request Sent", "Your request has been sent", "success");
      setjobTitle("");
      setworkDescription("");
      setLocation("");
      setImage("");
      setCategoryId("");
      setPosition("");
      navigate("/clienthomepage");

      fileInput.current.value = "";
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const worker = async () => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/user/user-profile/${workerId}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    setWorkerDetails(parsedData);
  };

  useEffect(() => {
    worker();
    userCheck();
  }, []);

  const [categoryData, setCategoryData] = useState("");

  const categoryList = async () => {
    let cdata = await fetch("http://127.0.0.1:8000/api/category/list/");
    let cpData = await cdata.json();
    setCategoryData(cpData);
  };

  useEffect(() => {
    categoryList();
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
      {workerDetails.map((item, index) => (
        <div className="gighp-container" key={index}>
          <div className="workerdetails">
            <h3>Worker Details</h3>

            <div className="details">
              <img src={item.profileImg} alt="Worker" />

              <p>
                {item.firstname} {item.lastname} {item.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null}
              </p>

              <p>{item.category.name}</p>

              <p>Rating: {item.rating}</p>
            </div>
          </div>

          <h1 className="jobreq-title">Request {item.firstname} </h1>
          <div className="jobreq-container">
            <form className="jobreq-form">
              <div className="jobreq-row-l">
                <div className="jobreq-column jobreq-column-l">
                  <label>Job Title</label>
                  <input
                    type="text"
                    placeholder="Enter Job Title"
                    value={jobTitle}
                    onChange={(e) => setjobTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="jobreq-row">
                <div className="jobreq-column">
                  <label htmlFor="selectcategory">Select Category</label>

                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categoryData &&
                      categoryData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="jobreq-column">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="jobreq-row">
                <div className="jobreq-column">
                  <label>Image</label>
                  <input
                    type="file"
                    ref={fileInput}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="jobreq-row-l">
                <div className="jobreq-column jobreq-column-l">
                  <label>Job Description</label>
                  <textarea
                    placeholder="Enter Job Description"
                    value={workDescription}
                    onChange={(e) => setworkDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="jobreq-row-l">
                <div className="jobreq-column jobreq-column-l">
                  <label>Choose Location in Map</label>
                  <input type="text" value={position} disabled />
                  <Map onPositionChange={onPositionChange} />
                </div>
              </div>

              <div className="jobreq-row-right">
                <button
                  onClick={() => {
                    navigate("/gigdisplay");
                  }}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit}>Request</button>
              </div>
            </form>
          </div>
        </div>
      ))}
      <Footer/>
    </div>
  );
}
