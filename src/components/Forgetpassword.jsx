import React from 'react'
import logo from "../assets/logo.png";
import '../styles/Code.css';
import { Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import swal from 'sweetalert';

export default function Forgetpassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

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
          navigate(`/confirmcode/${email}`)
          
        } else if (data.status === 400) {
            swal(parsedData.msg, "", "error")
        }
      };
  return (
    <div className='page'>
      <div className='container'>

        <div className='data'>
            <img className='logo-code' src={logo} width={'100px'} alt="Logo" />
            <p className='verify'>Enter Email</p>
            <p className='detail'>Please enter the email address.</p>
            <br/>
            <div className='fieldgroup'>
                <input className='codefield' type="text" placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <button className='submitbutton' onClick={codeResend}>
                  {loading ? 
                  <CircularProgress color="success" style={{width:'18px', height:'18px', padding:'0px'}}/>
                : "Send Code"}
                </button>
            </div>
        </div>


      </div>
    </div>

  )
}
