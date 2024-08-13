import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import searchicon from "../assets/search.png";
import "../styles/GigDisplay.css";

function Gigdisplay() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [gigDetails, setgigDetails] = useState([]);
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
  const gig = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/worker/gig/list-all/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if(data.status === 200){setgigDetails(parsedData);}
    
  };

  const gigSearch = async (search) => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/worker/gig/search/${search}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    setgigDetails(parsedData); 
  };

  useEffect(() => {
    gig();
    userCheck();
  }, []);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = gigDetails.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar
        link1="clienthomepage"
        link1name="Home"
        link2="clientjobpage"
        link2name="Jobs"
        link3name="Message"
      />

      <div className="gig-display" >
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            id="search"
            placeholder="Category"
          />
          
          
          {search.length > 0 ? (
            <button
              onClick={() => {
                gigSearch(search);
              }}
            >
              <img src={searchicon} alt="Search" />
            </button>
          ) : (
            <button style={{ cursor: "not-allowed" }}>
              <img src={searchicon} alt="Search" />
            </button>
          )}
        </div>
      </div>

      <div className="gig-container">
        {gigDetails &&
          currentPosts.map((item, index) => (
            <div key={index} className="gig-card">
              <img src={item.image} alt="" />

              <div className="gig-info">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/owp/${item.worker.id}`);
                  }}
                >
                  {item.worker.firstname} {item.worker.lastname}
                </p>

                <p className="title">{item.title}</p>

                <p>{item.description}</p>

                <div className="gig-footer">
                  <p>Rating: {item.worker.rating}</p>
                  <p>{item.category.name}</p>
                </div>
                <p
                  className="category"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/gighiringproposal/${item.worker.id}`);
                  }}
                >
                  Connect
                </p>
              </div>
            </div>
          ))}
      </div>
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
          disabled={indexOfLastPost >= gigDetails.length}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Gigdisplay;
