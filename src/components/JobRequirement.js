import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import "../styles/JobRequirement.css";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import swal from "sweetalert";
import Footer from "./Footer";

function Jobrequirement() {
  const [position, setPosition] = useState("");

  const onPositionChange = (position) => {
    setPosition(position);
  };

  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [estBudget, setEstBudget] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [image, setImage] = useState("");
  const imageInput = useRef();
  const [categoryData, setCategoryData] = useState("");

  const categoryList = async () => {
    let cdata = await fetch("http://localhost:8000/api/category/list/");
    let cpData = await cdata.json();
    setCategoryData(cpData);
  };

  useEffect(() => {
    categoryList();
  }, []);

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

  const postJob = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", jobTitle);
    formData.append("description", jobDescription);
    formData.append("budget", estBudget);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("image", image);

    formData.append("latitude", position[0]);
    formData.append("longitude", position[1]);
    //Temp 
    formData.append("isFeatured", "True");

    console.log(formData);

    let data = await fetch("http://127.0.1:8000/api/job/post/", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (data.status === 201) {
      swal("Job Posted Successfully!", "", "success")
      navigate("/clienthomepage");
      setJobTitle("");
      setCategory("");
      setLocation("");
      setEstBudget("");
      setJobDescription("");
      setImage("");
      setPosition("");
      imageInput.current.value = "";
    } else if (data.status === 401) {
      fetch("http://127.0.1:8000/api/user/logout/", {
        method: "GET",
        credentials: "include",
      });
      navigate("/login");
    } else {
      swal("Something went wrong! Please try again.","","error");
      setJobTitle("");
      setCategory("");
      setLocation("");
      setEstBudget("");
      setJobDescription("");
      setImage("");
      setPosition("");
      imageInput.current.value = "";
    }
  };

  return (
    <>
      <Navbar link1="clienthomepage" link1name="Home" link2="clientjobpage" link2name="Jobs" link3name="Message" />

      <h1 className="jobreq-title">Post Job Requirement</h1>

      <div className="jobreq-container">
        <form className="jobreq-form">
          <div className="jobreq-row-l">
            <div className="jobreq-column jobreq-column-l">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="jobreq-row">
            <div className="jobreq-column">
              <label htmlFor="selectcategory">Select Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryData &&
                  categoryData.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
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
              <label>Est Budget (Rs./Project)</label>
              <input
                type="text"
                placeholder="Enter Estimated Budget"
                value={estBudget}
                onChange={(e) => setEstBudget(e.target.value)}
              />
            </div>

            <div className="jobreq-column">
              <label>Image</label>
              <input
                type="file"
                ref={imageInput}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="jobreq-row-l">
            <div className="jobreq-column jobreq-column-l">
              <label>Job Description</label>
              <textarea
                placeholder="Enter Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="jobreq-row-l">
            <div className="jobreq-column jobreq-column-l">
              <label>Choose Location in Map</label>
              <input type="text" value={position} disabled/>
              <Map onPositionChange={onPositionChange} />
            </div>
          </div>

          <div className="jobreq-row-right">
            <button onClick={() => {navigate('/clienthomepage')}}>Cancel</button>
            <button onClick={postJob}>Post</button>
          </div>
        </form>
      </div>
        <Footer />
    </>
  );
}

export default Jobrequirement;
