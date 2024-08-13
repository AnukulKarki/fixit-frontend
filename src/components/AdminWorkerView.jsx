import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";


export default function AdminWorkerView() {

  const navigate = useNavigate();
    const {id} = useParams()

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

  const [profileDetails, setprofileDetails] = useState([]);
  
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [citizenshipPhoto, setCitizenshipPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [category, setCategory] = useState("");




  const profile = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/user/user-profile/${id}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setprofileDetails(parsedData);
    setFirstName(parsedData[0].firstname);

    setLastName(parsedData[0].lastname);
    setEmail(parsedData[0].email);
    setPhone(parsedData[0].phone);
    setAge(parsedData[0].age);
    setDistrict(parsedData[0].district);
    setCity(parsedData[0].city);
    setStreetName(parsedData[0].street_name);
    setCitizenshipPhoto(parsedData[0].image);
    setProfilePhoto(parsedData[0].profileImg);
    setCategory(parsedData[0].category.name);
  };
  const verifyUser = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/user/user-verify/${id}/`, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    if (data.status === 200) {
      swal("User Verified", "User has been verified", "success");
      navigate("/adminworker");
    }
  }
  const [reportDetails, setReportDetails] = useState([]);
  const reportData = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/hire/reportdata/${id}/`, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    setReportDetails(parsedData)
    
  }

  const editData = async () => {
    let formdata = new FormData();
    formdata.append("firstname", firstName);
    formdata.append("lastname", lastName);
    formdata.append("phone", phone);
    formdata.append("age", age);
    formdata.append("district", district);
    formdata.append("city", city);
    formdata.append("street_name", streetName);
    
    let data = await fetch(`http://127.0.0.1:8000/api/user/edit/${id}/`, {
      method: "POST",
      credentials: "include",
      body: formdata,
    });

    let parsedData = await data.json();
    setReportDetails(parsedData)

    if (data.status === 200) {
      swal("User Updated", "User has been updated", "success");
      navigate("/adminworker");
    }else{
      swal("User Updated", "User has not been updated", "error");
    }
    
  }

  useEffect(() => {
    profile();
    reportData();
  }, []);

  

  return (
    <div>
      <div className="admin-container">
        <div className="left">
          <Sidebar />
        </div>

        <div className="right">
          <div className="register-container">
            <div className="register-form">
              <h2>Worker Details</h2>

              <div className="group">
                <div className="form-field">
                  <label htmlFor="">First Name</label>
                  <input type="text" name="first_name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="">Last Name</label>
                  <input type="text" name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <div className="form-field">
                  <label htmlFor="">Email</label>
                  <input type="email" name="email" disabled 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                  />
                </div>

                <div className="form-field">
                  <label htmlFor="">Phone</label>
                  <input type="text" name="phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}

                  />
                </div>
              </div>

              <div className="group">
                <div className="form-field">
                  <label htmlFor="">Age</label>
                  <input type="number" name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)} 
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="">District</label>
                  <input type="text" name="district" 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <div className="form-field">
                  <label htmlFor="">City</label>
                  <input type="text" name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="">Street Name</label>
                  <input type="text" name="street_name"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <div className="form-field">
                  <label htmlFor="">Category</label>
                  <input type="text" name="category"  disabled
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <div className="form-field">
                  <label htmlFor="">Citizenship Photo</label>
                  <a
                    href={citizenshipPhoto}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={citizenshipPhoto}
                      alt=""
                      srcset=""
                      width="200px"
                    />
                  </a>
                </div>

                <div className="form-field">
                  <label htmlFor="">Profile Photo</label>
                  <a
                    href={profilePhoto}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={profilePhoto}
                      alt=""
                      srcset=""
                      width={"200px"}
                    />
                  </a>
                </div>
              </div>

              <div className="group">
                <button type="submit" className="grp-button blue" onClick={() => {verifyUser();}}>
                  Verify
                </button>
                <button type="submit" className="grp-button red" onClick={() => {navigate('/adminworker')}}>
                  Cancel
                </button>
                <button type="submit" className="grp-button green" onClick={editData}>
                  Update
                </button>
              </div>
            </div>
          </div>

          <div className="ad-center">
            <table>
              <tr>
                <th style={{ width: "5%" }}>SN</th>
                <th style={{ width: "15%" }}>Reported By</th>
                <th>Report</th>
              </tr>

             
                {reportDetails &&
                  reportDetails.map((item, index) => (
                    <tr key={item} style={{width:"100%"}}>
                      <td style={{width:'5%'}}>{index + 1}</td>
                      <td style={{width:'15%'}} >{item.reportuser.firstname}</td>
                      <td >{item.report}</td>
                    </tr>
                  ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
