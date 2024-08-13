import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/SubmitProposal.css";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewProposal() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getJob();
  }, []);


  const cancelRequest = async (id) => {
    let data = await fetch(
      `http://127.0.1:8000/api/worker/proposal/reject/${id}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if (data.status === 200) {
      swal("Proposal Rejected","","success");
      getJob();
    }

  };

  const [appliedWorkers, setAppliedWorkers] = useState([]);

  const getAppliedWorkers = async () => {
    let workerdata = await fetch(
      `http://127.0.1:8000/api/worker/proposal/list/${jobId}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await workerdata.json();
    console.log(parsedData);
    setAppliedWorkers(parsedData);
  };

  useEffect(() => {
    getAppliedWorkers();
  }, []);

  const accept = async (id) => {
    setLoading(true);
    let data = await fetch(
      `http://127.0.1:8000/api/worker/proposal/hire/${id}/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if (data.status === 200) {
      setLoading(false);
      swal("Worker Hired","","success");
      navigate(`/clienthomepage`);
    }
  };



  return (
    <div>
      
      <Navbar link1="/clienthomepage" link1name="Home" link2="/clientjobpage" link2name="Jobs" link3name="Message" />

      <div className="sp-container">
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
              <span> Rs. {jobDetail.budget} </span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span> {jobDetail.location} </span>
            </div>
          </div>
        </div>

        <div className="sp-bottom">
          <div className="bottomleft">
            <div className="bottomimage" style={{width:'100%', height:'500px'}}>
              <img src={jobDetail.image} alt="project" />
            </div>

            <div className="proposal-details">
              <h2>Proposals</h2>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th colspan="2">Action</th>
                  </tr>
                </thead>
                {appliedWorkers && appliedWorkers.length > 0
                  ? appliedWorkers.map((worker) => {
                      return (
                        <tbody>
                          <tr>
                            <td className="workerClick" onClick={() => {navigate(`/owp/${worker.worker.id}`)}} style={{ cursor:"pointer"}}>{worker.worker.firstname} {worker.worker.lastname}</td>
                            <td>{worker.description}</td>
                            <td>{worker.price}</td>
                            <td>
                              <button
                                className="green"
                                onClick={() => accept(worker.id)}
                              >
                                {loading ? 
                                  <CircularProgress color="success" style={{width:'25px', height:'25px'}}/>
                                  : "Accept"}
                                
                              </button>
                              <button className="red" onClick={() => {cancelRequest(worker.id)}}>Reject</button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  : appliedWorkers.length === 0
                  ? "No proposals yet"
                  : appliedWorkers.status !== "applied"
                  ? "Already Hired"
                  : ""}
              </table>
            </div>
          </div>

          <div className="bottomright">
            <div className="bottomrightimage">
              {/* <img src="https://via.placeholder.com/200x500" alt="user" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
