import React from 'react'
import logo from "../assets/logo.png";
import '../styles/Code.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import swal from 'sweetalert';

export default function Confirmcode() {
    const navigate = useNavigate();
    const {email} = useParams();
    console.log(email);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/api/user/user-check/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      if (parsedData.role === "worker" || parsedData.role === "client") {
        navigate(`/${parsedData.role}homepage`);
      } 
      else{
        navigate(`/adminclient`);
    }
      
    }
  };
  useEffect(() => {userCheck();}, []);

    const codeVerify = async (e) => {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("email", email);
        formData.append("code", code);
        console.log(formData);
    
        let data = await fetch("http://127.0.1:8000/api/user/code/verify/", {
          credentials: "include",
          method: "POST",
          body: formData,
        });
        const parsedData = await data.json();
    
        if (data.status === 200) {
          swal("code Verified", "", "success");
          navigate(`/passwordchange/${parsedData.token}`)
          
          
        } else if (data.status === 400) {
            alert(parsedData.msg);
        }
      };

      const codeResend = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("email", email);
    
    
        console.log(formData);
    
        let data = await fetch("http://127.0.1:8000/api/user/code/resend/", {
          credentials: "include",
          method: "POST",
          body: formData,
        });
        const parsedData = await data.json();
        setLoading(false);
    
        if (data.status === 200) {
          swal("Code Sent", "", "success")
          
        } else if (data.status === 400) {
            swal(parsedData.msg, "", "error")
        }
      };
  return (
    <div className='page'>
      <div className='container'>
        <div className='data'>
            <img className='logo-code' src={logo} width={'100px'} alt="Logo" />
            <p className='verify'>Verify Email</p>
            <p className='detail'>Please Provide the code that was sent to your Email.</p>
            <div className='fieldgroup'>
                <input className='codefield' type="text" placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                />
                <p className='resend' onClick={codeResend}>Resend Code</p>
            </div>
            <div>
                <button className='submitbutton'
                onClick={codeVerify}>
                  {loading ? 
                  <CircularProgress color="success" style={{width:'18px', height:'18px', padding:'0px'}}/>
                : "Verify"}
                </button>
            </div>
        </div>


      </div>
    </div>

  )
}
