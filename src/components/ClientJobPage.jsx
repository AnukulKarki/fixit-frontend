import React from "react";
import { useState, useEffect } from "react";
import "../styles/WorkerJobPage.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import cash from   "../assets/Cash.png";
import khalti from  "../assets/Khalti.png";
import NotFound from "./NotFound";
import swal from "sweetalert";
import Footer from "./Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ClientJobPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openCash, setOpenCash] = useState(false);

  const handleOpenCash = () =>{ setOpenCash(true)
  setOpen(false)};
  const handleCloseCash = () => setOpenCash(false);

  const [openkhalti, setOpenkhalti] = useState(false);

  const handleOpenkhalti = () =>{ setOpenkhalti(true)
  setOpen(false)};
  const handleClosekhalti = () => setOpenkhalti(false);

  const [openkhaltigig, setOpenkhaltigig] = useState(false);

  const handleOpenkhaltigig = () =>{ setOpenkhaltigig(true)
    setgigOpen(false)};
  const handleClosekhaltigig = () => setOpenkhaltigig(false);




  const [gigopen, setgigOpen] = useState(false);
  const handleOpengig = () => setgigOpen(true);
  const handleClosegig = () => setgigOpen(false);

  const [openCashgig, setOpenCashgig] = useState(false);

  const handleOpenCashgig = () =>{ setOpenCashgig(true)
  setgigOpen(false)};
  const handleCloseCashgig = () => setOpenCashgig(false);
  

  const navigate = useNavigate();

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

  

  const [currentWorks, setcurrentWorks] = useState([]);
  const profile = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/work/client/current-work/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){setcurrentWorks(parsedData);}
    
  };


  const [gigcurrentWorks, setgigcurrentWorks] = useState([]);
  const gigCurrent = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/hire/current-work/client/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){setgigcurrentWorks(parsedData);}
  };

  useEffect(() => {
    userCheck();
    profile();
    gigCurrent();
  }, []);

  const [detailWork, setdetailWork] = useState([]);
  const workDetailView = async (jobId) => {
    let data = await fetch(`http://127.0.0.1:8000/api/work/work/${jobId}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    setdetailWorkGig([]);
    if(data.status === 200){setdetailWork(parsedData);}
    
  };

  // gig work detail

  const [detailWorkGig, setdetailWorkGig] = useState([]);
  const workDetailViewGig = async (jobId) => {
    let data = await fetch(`http://127.0.0.1:8000/api/hire/work/detail/${jobId}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    setdetailWork([]);
    if(data.status === 200){setdetailWorkGig(parsedData);}
  };



  const cancel = async (jobId) => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/work/worker/cancel-work/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    if (data.status === 200) {
      swal("Work Cancelled", "Work has been Cancelled", "success").then(() => {window.location.reload();});
    }
  };

  const cancelGig = async (jobId) => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/work/cancel/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    if (data.status === 200) {
      swal("Work Cancelled", "Work has been Cancelled", "success").then(() => {window.location.reload();});
      
    }
  };




  const [cashPay, setCashPay] = useState([false]);
  const cashPayFunction = async (jobId) => {

    let formData = new FormData();
    formData.append("amountPayed", cashPay);
    formData.append("paymethod", "cash");
    let data = await fetch(
      `http://127.0.0.1:8000/api/work/pay-work/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    if (data.status === 200) {
      handleCloseCash();
      swal("Amount Payed Successfully", "Amount has been Payed", "success").then(() => {window.location.reload();});
    }
  };

  const [cashPayGig, setCashPayGig] = useState([]);
  const cashPayGigFunction = async (jobId) => {

    let formData = new FormData();
    formData.append("payamount", cashPayGig);
    formData.append("paymethod", "cash");
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/work/pay/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    if (data.status === 200) {
      handleCloseCashgig();
      swal("Amount Payed Successfully", "Amount has been Payed", "success").then(() => {window.location.reload();});
  
    }
  };


  const [khaltiPay, setkhaltiPay] = useState([]);
  const khaltiPayFunction = async (jobId, type) => {
      
      let formData = new FormData();
      formData.append("amount", khaltiPay);
      formData.append("jobid", jobId);
      formData.append("jobtype", type);
      let data = await fetch(
        `http://127.0.0.1:8000/api/work/khalti`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      let parsedData = await data.json();
      if (data.status === 200) {
        window.location.href = parsedData.url;

        
      }
      else{
        alert("Amount Payed Failed");
      }
  }

  const [brandData, setBrandData] = useState([]);
  const brandDataList = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/admin/brand/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    parsedData = parsedData.slice(0, 3); 
    setBrandData(parsedData);
  };
  useEffect(() => {
    brandDataList();
  }, []);





  // const khaltiPay = async (jobId) => {

  //   let data = await fetch(
  //     `http://127.0.0.1:8000/api/hire/work/pay/${jobId}/`,
  //     {
  //       method: "POST",
  //       credentials: "include",
  //       body: formData,
  //     }
  //   );
  //   let parsedData = await data.json();
  //   if (data.status === 200) {
  //     alert("Amount Payed Successfully");
  //     window.location.reload();
  //   }
  // };

  const sendMessage = async (sendId) => {
    let formData = new FormData();
    formData.append("message", "Hello");
    let data = await fetch(
      `http://127.0.0.1:8000/api/message/send/${sendId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    if (data.status === 201) {
      navigate("/message");

      
    }
  };


  return (
    <div>
      <Navbar
        link1="clienthomepage"
        link1name="Home"
        link2="clientjobpage"
        link2name="Jobs"
        link3name="Message"
      />

        {currentWorks.length === 0 && gigcurrentWorks.length === 0 ? (<NotFound message="No Current Job"/>) :null}
        {currentWorks.length === 0 && gigcurrentWorks.length === 0 ? null:(<h2>Current Jobs</h2>)}
        <div className="job-container" >
        <div className="left">
          {currentWorks &&
            currentWorks.map((item, index) => (
              
              <div
                className="job-box"
                key={item}
                onClick={() => workDetailView(item.id)}
              >
                <h3>{item.job.title}</h3>
                <p style={{fontWeight:"normal"}} >{item.worker.firstname} {item.worker.lastname}</p>
              </div>
              
            ))}
            {/* gig current */}
            {gigcurrentWorks &&
            gigcurrentWorks.map((item, index) => (
              
              <div
                className="job-box"
                key={item}
                onClick={() => workDetailViewGig(item.id)}
              >
                <h3>{item.worktitle}</h3>
                <p style={{fontWeight:"normal"}} >{item.worker.firstname} {item.worker.lastname}</p>
              </div>
              
            ))}
            </div>

          {/* normal detail */}

        {detailWork &&
          detailWork.map((item, index) => (
            <div className="right" key={item} style={{height:'100vh', overflow:'scroll'}}>
              <div className="right1">
                <div className="left">
                  <h2>{item.job.title}</h2>
                  <div className="extra">
                    <p>
                      Client Name: {item.job.user.firstname}{" "}
                      {item.job.user.lastname}
                    </p>
                    <p>Price:Rs. {item.price}/Project</p>
                  </div>

                  <div className="extra">
                    <p>
                      Worker: {item.worker.firstname} {item.worker.lastname}
                    </p>
                    <p>Category: {item.job.category.name}</p>
                  </div>
                </div>
                <div className="right">
                  <p>{item.status.toUpperCase()}</p>
                </div>
              </div>

              <div className="right2">{item.job.description}</div>

              <div className="right3">
                <div className="image">
                  <img src={item.job.image} width={"700px"} alt="Profile" />
                </div>
              </div>

              <div className="right4">
                <p>Recommended Brands</p>

                <div className="extra">
                  {brandData &&
                    brandData.map((item) => (
                      <div className="gig-card">
                        <img src={item.image} alt="" />

                        <div className="gig-info">
                          <p className="title">{item.title}</p>

                          
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="right5">
                <button className="msg" onClick={() => {sendMessage(item.worker.id)}}>Message </button>

                {item.status === "completed" ? (
                  <button style={{height:'40px', width:'80px'}}  className="progress" onClick={handleOpen}>Pay</button>
                ) : (
                  <button style={{height:'40px', width:'80px'}}  disabled className="progress" >Pay</button>
                )}
                

                {item.status === "accept" ? (
                  <button style={{height:'40px'}} className="cancel" onClick={() => cancel(item.id)}>
                    Cancel
                  </button>
                ) : (
                  <button style={{height:'40px'}} disabled className="progress">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* gig work */}
          {detailWorkGig &&
          detailWorkGig.map((item, index) => (
            <div className="right" key={item} style={{height:'100vh', overflow:'scroll'}}>
              <div className="right1">
                <div className="left">
                  <h2>{item.worktitle}</h2>

                  <div className="extra">
                    <p>
                      Client Name: {item.user.firstname}{" "}
                      {item.user.lastname}
                    </p>
                    <p>Price: Null (Urgent Work)</p>
                  </div>

                  <div className="extra">
                    <p>
                      Worker: {item.worker.firstname} {item.worker.lastname}
                    </p>
                    <p>Category: {item.category.name}</p>
                  </div>
                </div>
                <div className="right">
                  <p>{item.status.toUpperCase()}</p>
                </div>
              </div>

              <div className="right2">{item.workdescription}</div>

              <div className="right3">
                <div className="image">
                  <img src={item.image} width={"700px"} alt="Profile" />
                </div>
              </div>

              <div className="right4">
                <p>Recommended Brands</p>

                <div className="extra">
                {brandData &&
                    brandData.map((item) => (
                      <div className="gig-card">
                        <img src={item.image} alt="" />

                        <div className="gig-info">
                          <p className="title">{item.title}</p>

                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="right5">
                <button className="msg" onClick={() => {sendMessage(item.worker.id)}}>Message</button>

                {item.status === "completed" ? (
                  <button style={{height:'40px', width:'80px'}}   className="progress" onClick={handleOpengig}>Pay</button>
                ) : (
                  <button disabled className="progress" style={{height:'40px', width:'80px'}}   >Pay</button>
                )}
                

                {item.status === "accept" ? (
                  <button className="cancel" style={{height:'40px'}} onClick={() => cancelGig(item.id)}>
                    Cancel
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="payMethod">
              <div className="payType">
                <img src={cash} width={"100px"} alt="cash"/>
                <br/>
                <button onClick={handleOpenCash}> Cash</button>
              </div>
              <div className="payType">
                <img src={khalti} width={"100px"} alt="khalti"/>
                <br/>
                <button onClick={handleOpenkhalti}>Khalti</button>
              </div>

            </div>
          </Box>
        </Modal>
        <Modal
          open={openCash}
          onClose={handleCloseCash}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <div className="cashPay">
              <p>Cash Paid</p>
              <input className="priceInput" type="number" placeholder="Enter Amount"
                value={cashPay}
                onChange={(e) => setCashPay(e.target.value)}
              />
              <br/>
              {detailWork &&
                detailWork.map((item, index) => (
              <button className="pay" key={item} onClick={()=>{cashPayFunction(item.id)}}>Pay</button>
          ))}
            </div>
          </Box>
        </Modal>









        <Modal
          open={openkhalti}
          onClose={handleClosekhalti}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <div className="cashPay">
              <p>Amount to Pay</p>
              <input className="priceInput" type="number" placeholder="Enter Amount"
                value={khaltiPay}
                onChange={(e) => setkhaltiPay(e.target.value)}
              />
              <br/>
              {detailWork &&
                detailWork.map((item, index) => (
              <button className="pay" key={item} onClick={()=>{khaltiPayFunction(item.id, "requirement")}}>Pay</button>
          ))}
            </div>
          </Box>
        </Modal>














          
          {/* gig */}
        <Modal
          open={gigopen}
          onClose={handleClosegig}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="payMethod">
              <div className="payType">
                <img src={cash} width={"100px"} alt="cash"/>
                <br/>
                <button onClick={handleOpenCashgig}> Cash</button>
              </div>
              <div className="payType">
                <img src={khalti} width={"100px"} alt="khalti"/>
                <br/>
                <button onClick={handleOpenkhaltigig}>Khalti</button>
              </div>

            </div>
          </Box>
        </Modal>
        <Modal
          open={openCashgig}
          onClose={handleCloseCashgig}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <div className="cashPay">
              <p>Amount</p>
              <input className="priceInput" type="number" placeholder="Enter Amount"
                value={cashPayGig}
                onChange={(e) => setCashPayGig(e.target.value)}
              />
              <br/>
              {detailWorkGig &&
                detailWorkGig.map((item, index) => (
              <button className="pay" key={item} onClick={()=>{cashPayGigFunction(item.id)}}>Pay</button>
          ))}
            </div>
          </Box>
        </Modal>

        <Modal
          open={openkhaltigig}
          onClose={handleClosekhaltigig}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <div className="cashPay">
              <p>Amount to Pay</p>
              <input className="priceInput" type="number" placeholder="Enter Amount"
                value={khaltiPay}
                onChange={(e) => setkhaltiPay(e.target.value)}
              />
              <br/>
              {detailWorkGig &&
                detailWorkGig.map((item, index) => (
              <button className="pay" key={item} onClick={()=>{khaltiPayFunction(item.id, "gig")}}>Pay</button>
          ))}
            </div>
          </Box>
        </Modal>


      </div>
      <Footer />
    </div>
  );
}
