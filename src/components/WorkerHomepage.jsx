import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/Homepage.css";
import Banner from "../assets/homedesign.jpg";
import { useNavigate } from "react-router-dom";
import Tick from "../assets/tick.png";
import Footer from "./Footer";


export default function WorkerHomepage(props) {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("");
  console.log("filter", filterCategory)
  const [minprice , setMinPrice] = useState("");
  const [maxprice , setMaxPrice] = useState("");
  console.log("min", minprice)
  console.log("max", maxprice)

  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/662742271ec1082f04e5be9d/1hs4lkqs3';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();

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

  const [availableJobs, setAvailableJobs] = useState([]);
  
  const PostedJobs = async () => {
    let formData = new FormData();
    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Append the data to formData after they have been set
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);

            // Make the fetch request inside the geolocation callback
            let data = await fetch("http://127.0.0.1:8000/api/job/distance", {
                method: "POST",
                credentials: "include",
                body: formData
                
            });

            let parsedData = await data.json();
            if (data.status !== 403) {
                setAvailableJobs(parsedData);
            }
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
};

  const filterJob = async () => {
    let formData = new FormData();
    formData.append("category", filterCategory);
    formData.append("minprice", minprice);
    formData.append("maxprice", maxprice);
    let data = await fetch(`http://127.0.1:8000/api/job/filter/${filterCategory}/${minprice}/${maxprice}/`, {
      method: "GET",
      credentials: "include",
      
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setAvailableJobs(parsedData);
  };

  useEffect(() => {
    PostedJobs();
  }, []);

  const handleConnect = (jobId) => {
    navigate(`/submitproposal/${jobId}`);
  };

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
  const [categoryData, setCategoryData] = useState([]);

  const categoryList = async () => {
    let cdata = await fetch("http://localhost:8000/api/category/list/");
    let cpData = await cdata.json();
    setCategoryData(cpData);
  };

  useEffect(() => {
    categoryList();
  }, []);
 
//pagination
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(2);

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = availableJobs.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  
};

  return (
    <div>
      <Navbar link1="workerhomepage" link1name="Home" link2="workerjobpage" link2name="Jobs" link3name="Message" link4name="Request" link4="/gigworkrequest" />

      <div className="home-container">
        <div className="home-head">
          <div className="home-left">
            <div className="banner-worker">
              <img src={Banner} alt="" />
            </div>
          </div>

          <div className="home-right">
            <div className="home-info-card">
              <div className="details">
                
                <p className="username">{profileDetails.firstname} {profileDetails.lastname}  {profileDetails.isKycVerified ? (<img src={Tick} alt="" srcset="" />):null}</p>
                <p className="category">{profileDetails.category && profileDetails.category.name}</p>
                <p className="rating">Rating: {profileDetails.rating}</p>

                <a href="/workerprofile">View your profile</a>
              </div>

              <div className="card-image">
                <img src={profileDetails.profileImg} alt="" />
              </div>
            </div>

            <div className="category-div">
              <div className="category-1">
                <p>Category</p>
                <select name="category" id="category"  
                
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option  default>Select Category</option>
                {categoryData &&  categoryData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                </select>
              </div>

              <div className="category-2">
                <p>Budget</p>

                <div className="budget-row">
                  <input type="text" placeholder="Min"
                  value={minprice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  />
                  to
                  <input type="text" placeholder="Max"
                  value={maxprice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="category-filter">
                <button  style={{cursor:"pointer"}} onClick={filterJob}>Filter</button>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content-left">
            {availableJobs &&
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

                      <button onClick={() => handleConnect(job.id)}>Connect</button>
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
          disabled={indexOfLastPost >= availableJobs.length}
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
      <Footer />
    </div>
  );
}
