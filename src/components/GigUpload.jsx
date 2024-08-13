import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/GigUpload.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import swal from "sweetalert";

function Gigupload() {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  
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
  const postGig = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", jobTitle);
    formData.append("description", jobDescription);
    formData.append("category", category);
    formData.append("image", image);


    console.log(formData);

    let data = await fetch("http://127.0.1:8000/api/worker/gig/post/", {
      credentials: "include",
      method: "POST",
      body: formData,
    });

    if (data.status === 201) {
      swal("Gig Posted","","success");
      setJobTitle("");
      setCategory("");
      setJobDescription("");
      setImage("");
      navigate("/gig")
    } else {
      swal("Something went wrong! Please try again.","","error");
      console.log(data);
    }
  };

  const [categoryData, setCategoryData] = useState("");

  const categoryList = async () => {
    let cdata = await fetch("http://localhost:8000/api/category/list/");
    let cpData = await cdata.json();
    setCategoryData(cpData);
  };

  useEffect(() => {
    categoryList();
    userCheck();
  }, []);



  return (
    <>
    <Navbar link1="workerhomepage" link1name="Home" link2="workerjobpage" link2name="Jobs" link3name="Message" link4name="Request" link4="/gigworkrequest" />

      <h1 className="gigupload-title">Gig Upload</h1>

      <div className="gigupload-container">
        <form className="gigupload-form">
          <div className="gigupload-row-l">
            <div className="gigupload-column gigupload-column-l">
              <label>Job Title</label>
              <input type="text" placeholder="Enter Job Title" value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="gigupload-row">
            <div className="gigupload-column">
              <label>Category</label>
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

            <div className="gigupload-column">
              <label>Image</label>
              <input type="file" 
              onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="gigupload-row-l">
            <div className="gigupload-column gigupload-column-l">
              <label>Job Description</label>
              <textarea
                type="text"
                placeholder="Enter Job Description"
                rows="5"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="gigupload-row-right">
            <button className="redCancel" onClick={() => {navigate('/workerhomepage')}}>Cancel</button>
            <button className="greenPost" onClick={postGig}>Post</button>
          </div>
        </form>
      </div>
        <Footer />
    </>
  );
}

export default Gigupload;
