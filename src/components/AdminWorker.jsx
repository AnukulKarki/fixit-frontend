import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Admin.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function AdminWorker() {
  const navigate = useNavigate();

  const [worker, setWorker] = useState([]);
  const workerList = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/worker-list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){setWorker(parsedData);}
  };

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/user-check/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200 && parsedData.role === "admin") {
      
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

  useEffect(() => {
    workerList();
  }, []);

  const blackList = async (userId) => {
    let data = await fetch(
      `http://127.0.1:8000/api/admin/blacklist/add/${userId}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if (data.status === 200) {
      swal("User Blacklisted", "User has been Blacklisted", "success");
      workerList();
    } else if (data.status === 400) {
      swal("User Already Blacklisted", "User is already Blacklisted", "error");
    }
  };
  return (
    <div>
      <div className="admin-container">
        <div className="left">
          <Sidebar />
        </div>

        <div className="right">
          <div className="top">
            <p>Worker</p>
          </div>

          <div className="center">
            <table>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Verified</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Category</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>

              {worker &&
                worker.map((item, index) => (
                  <tr key={item}>
                    <td>{item.id}</td>
                    <td>{item.email} </td>
                    {item.isKycVerified === true ? (<td>Verified</td>) : (<td>Not Verified</td>)}
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.category.name}</td>
                    <td>
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={item.profileImg}
                        alt="Profile"
                      />
                    </td>
                    <td>
                      <button className="green" onClick={
                        () => navigate(`/adminworkerview/${item.id}`)
                      }>
                        View
                      </button>
                      <button
                        className="red"
                        onClick={() => blackList(item.id)}
                      >
                        Block
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
