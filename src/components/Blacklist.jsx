import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Blacklist() {

  const navigate = useNavigate();

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

  const [user, setUser] = useState([]);
  const bannedUserList = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/admin/blacklist/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){setUser(parsedData);}
    
  };

  useEffect(() => {
    bannedUserList();
  }, []);


  const removeBlacklist = async (userId) => {
    let data = await fetch(
      `http://127.0.1:8000/api/admin/blacklist/remove/${userId}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if (data.status === 200) {
      swal("User Un-Banned", "User has been Un-Banned", "success");
      bannedUserList();
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
            <p>Banned User</p>
          </div>

          <div className="center">
            <table>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>

              {user &&
                user.map((item, index) => (
                  <tr key={item}>
                    <td>{item.user.id}</td>
                    <td>{item.user.email} </td>
                    <td>{item.user.firstname}</td>
                    <td>{item.user.lastname}</td>
                    <td>{item.user.role}</td>
                    <td>
                      
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={item.user.profileImg}
                        alt="Profile"
                      />
                    </td>
                    {/* onClick={
                        () => navigate(`/adminworkerview/${item.id}`)
                      } */}
                    <td>
                      <button className="green" onClick={(() => removeBlacklist(item.user.id))}>
                        Un-Ban
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
