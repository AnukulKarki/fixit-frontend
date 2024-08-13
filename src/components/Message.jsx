import React from "react";
import Navbar from "./Navbar";
import searchicon from "../assets/search.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Message.css";
import Footer from "./Footer";

export default function Message() {

    const [userList, setuserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserImg, setSelectedUserImg] = useState(null);
    const divRef = useRef(null);


    function setUserId (id, name, lastname, image) {
        setSelectedUser(id); 
        setSelectedUserName(name+" "+lastname);
        setSelectedUserImg(image);
    }

  const messageProfile = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/message/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    setuserList(parsedData);
  };
  

  useEffect(() => {
    messageProfile();
  }, []);
  const [messageDetails, setMessageDetails] = useState([]);
  const messageDetail = async () => {
        let data = await fetch(`http://127.0.0.1:8000/api/message/detail/${selectedUser}/`, {
        method: "GET",
        credentials: "include",
    });
    let parsedData = await data.json();
    console.log("msg",parsedData);
    setMessageDetails(parsedData);
    
  }

  useEffect(() => {
    messageDetail();
  }, [selectedUser]);

  const [message, setMessage] = useState(null);
  const sendMessage = async () => {
    let formdata = new FormData();
    formdata.append("message", message);
    let data = await fetch(`http://127.0.0.1:8000/api/message/send/${selectedUser}/`, {
    method: "POST",
    credentials: "include",
    body: formdata,
    });
    messageDetail();

    }

     useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
    }, []);

  const [newmessageDetails, setnewMessageDetails] = useState([]);
  const newmessageDetail = async () => {
        let data = await fetch(`http://127.0.0.1:8000/api/message/detail/${selectedUser}/`, {
        method: "GET",
        credentials: "include",
    });
    let parsedData = await data.json();
    console.log("msg",parsedData);
    setnewMessageDetails(parsedData);
    
  }

  setTimeout(() => { 
    newmessageDetail();
        if(newmessageDetails.length > messageDetails.length){
            messageDetail();
        }
}, 2000);


  return (
    <div>
      <Navbar
        link1="clienthomepage"
        link1name="Home"
        link2="clientjobpage"
        link2name="Jobs"
        link3name="Message"
      />

      <div className="job-container">
        <div className="left-title">
          <h2>Message</h2>
          {userList.length === 0 && <h3>No user to chat</h3>}
            {userList &&
                userList.map((user) => {
                    return (
                    <div style={{cursor:"pointer"}} className="job-box-msg" onClick={() => {setUserId(user.id,user.firstname, user.lastname, user.profileImg )}}>
                        <img className="profile-img" src={user.profileImg} alt="profile"/>
                        <h3 style={{fontSize:"15px"}}>{user.firstname} {user.lastname}</h3>
                    </div>
                    );
                })
            }
          
          
        </div>
        

        <div className="right">

          

            {/* Message */}

            <div class="livechat">
              <div class="header">
                <div className="header-data">
                {selectedUserImg === null ?(<img className="profile-img" src="https://www.w3schools.com/howto/img_avatar.png" alt="profile"/>): (<img className="profile-img" src={selectedUserImg} alt="profile"/>)}
                {selectedUserName === null ?(<h4>Username</h4>): (<h4>{selectedUserName}</h4>)}
                
            
                </div>
                
              </div>

              <div class="content">
                <div class="chat" ref={divRef}>

                    {messageDetails &&
                        messageDetails.map((message) => {
                            return (
                                <div>
                                    {message.sender.id === selectedUser ? (
                                        <div class="message-operator">
                                            <p class="name">{message.sender.firstname}</p>
                                            <p class="msg">{message.message}</p>
                                        </div>
                                    ) : (
                                        <div class="message-user">
                                            <p class="name">{message.sender.firstname}</p>
                                            <p class="msg">{message.message}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    }
                </div>
                <div class="send-container">
                  <input className="msg-input" type="text" placeholder="Your Message.." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {message ? (<input className="msg-send" type="submit" onClick={sendMessage} value="Send" />):(<input className="msg-send" type="submit" onClick={sendMessage} value="Send" disabled/>)}
                  
                    
                </div>
              </div>
            </div>

            {/* Message */}
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
