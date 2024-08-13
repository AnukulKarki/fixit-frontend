import * as React from "react";
import { useState, useEffect } from "react";
import "../styles/WorkerJobPage.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import swal from "sweetalert";
import TextField from '@mui/material/TextField';
import NotFound from "./NotFound";
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

export default function ClientJobPageArchive() {

  const [report, setReport] = useState("");
  const [reportGig, setReportGig] = useState("");
  
  const [value, setValue] = React.useState(null);
  const [jobId, setJobId] = useState(null);
  const [gigJobId, setGigJobId] = useState(null);



  const reportFunc = async () => {
    let formData = new FormData();
    formData.append("report", report);
    let data = await fetch(
      `http://127.0.0.1:8000/api/work/report/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){
      swal("Reported", "Report Submitted Successfully", "success");
      setReport("");
      handleCloseCash();
    }
    else if(data.status === 406){
      swal("Report", "Report Already Submitted", "error");
      setReport("");
      handleCloseCash();
    }
    else{
      swal("Report", "Report Submission Failed", "error");
      setReport("");
      handleCloseCash();
    }
  };

  const reportFuncgig = async () => {
    let formData = new FormData();
    formData.append("report", report);
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/report/${gigJobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){
      swal("Reported", "Report Submitted Successfully", "success");
      setReport("");
      handleCloseCashgig();
    }
    else if(data.status === 406){
      swal("Report", "Report Already Submitted", "error");
      setReport("");
      handleCloseCashgig();
    }
    else{
      swal("Report", "Report Submission Failed", "error");
      setReport("");
      handleCloseCashgig();
    }
  };

  

  const rateGig = async () => {
    let formData = new FormData();
    formData.append("rate", value);
    let data = await fetch(
      `http://127.0.0.1:8000/api/hire/work/rating/${gigJobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){
      swal("Rating", "Rating Submitted Successfully", "success");
      handleClosegig();
    }
    else if(data.status === 406){
      swal("Rating", "Rating Already Submitted", "error");
      handleClosegig();
    }
    else{
      swal("Rating", "Rating Submission Failed", "error");
      handleClosegig();
    }
  };

  const rate = async () => {
    let formData = new FormData();
    formData.append("rate", value);
    let data = await fetch(
      `http://127.0.0.1:8000/api/work/rate/${jobId}/`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    if(data.status === 200){
      swal("Rating", "Rating Submitted Successfully", "success");
      handleClose();
    }
    else if(data.status === 406){
      swal("Rating", "Rating Already Submitted", "error");
      handleClose();
    }
    else{
      swal("Rating", "Rating Submission Failed", "error");
      handleClose();
    }
  };


  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {setOpen(true); setJobId(id)}
  const handleClose = () => setOpen(false);

  const [openCash, setOpenCash] = useState(false);

  const handleOpenCash = (id) =>{ setOpenCash(true)
    setJobId(id)};
  const handleCloseCash = () => setOpenCash(false);

  const [gigopen, setgigOpen] = useState(false);
  const handleOpengig = (id) => {setgigOpen(true); setGigJobId(id)}
  const handleClosegig = () => setgigOpen(false);

  const [openCashgig, setOpenCashgig] = useState(false);

  const handleOpenCashgig = (id) =>{ setOpenCashgig(true)
    setGigJobId(id)};
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
      "http://127.0.0.1:8000/api/work/client/past-work/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    setcurrentWorks(parsedData);
  };


  const [gigcurrentWorks, setgigcurrentWorks] = useState([]);
  const gigCurrent = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/hire/past-work/client/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    setgigcurrentWorks(parsedData);
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
    setdetailWork(parsedData);
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
    setdetailWorkGig(parsedData);
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
      alert(`Work is ${parsedData.job}`);
      window.location.reload();
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
      alert(`Work is ${parsedData.job}`);
      window.location.reload();
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
      alert("Amount Payed Successfully");
      window.location.reload();
    }
  };

  const [cashPayGig, setCashPayGig] = useState([false]);
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
      alert("Amount Payed Successfully");
      window.location.reload();
    }
  };


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

  return (
    <div> 
      <Navbar
        link1="clienthomepage"
        link1name="Home"
        link2="clientjobpage"
        link2name="Jobs"
        link3name="Message"
      />

        {currentWorks.length === 0 && gigcurrentWorks.length === 0 ? (<NotFound message="No Archived Jobs"/>) :null}
          <h2> {currentWorks.length === 0 && gigcurrentWorks.length === 0 ? null:("Archived Job")}</h2>
      <div className="job-container">
        <div className="left" >
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
            <div className="right" key={item} style={{height:'95vh', overflow:'scroll'}}>
              <div className="right1">
                <div className="left">
                  <h2>{item.job.title}</h2>

                  <div className="extra">
                    <p>
                      Client Name: {item.job.user.firstname}{" "}
                      {item.job.user.lastname}
                    </p>
                    <p>Price: Rs.{item.price} /Project</p>
                  </div>

                  <div className="extra">
                    <p>
                      Worker: {item.worker.firstname} {item.worker.lastname}
                    </p>
                    <p>Category: {item.job.category.name}</p>
                  </div>
                </div>
                <div className="right">
                  <p>{item.status === "payed" ? ("Paid"):(`${item.status.toUpperCase()}`)}</p>
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
              <button className="progress" onClick={() => {handleOpen(item.id)}}>Rate</button>
                <button className="cancel" onClick={() => {handleOpenCash(item.id)}}>Report</button>
              </div>
            </div>
          ))}

          {/* gig work */}
          {detailWorkGig &&
          detailWorkGig.map((item, index) => (
            <div className="right" key={item}>
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
                  <p>{item.status === "payed" ? ("Paid"):(`${item.status}`)}</p>
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
                <button className="progress" onClick={() => {handleOpengig(item.id)}}>Rate</button>
                <button className="cancel"  onClick={() => {handleOpenCashgig(item.id)}}>Report</button>

                
                

              </div>
            </div>
          ))}

          {/* Rate Normal Work */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Typography component="legend">Rate</Typography>
          <br/>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <br/>
            <Button  style={{marginLeft:"-15px"}} onClick={rate}>Rate</Button>
          </Box>
        </Modal>


        <Modal
          open={openCash}
          onClose={handleCloseCash}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
          <Typography id="transition-modal-title" variant="h6" component="h2">
              Report
            </Typography>
            <br/>
            <TextField id="outlined-basic" label="Report" variant="outlined" 
              value={report}
              onChange={(e) => setReport(e.target.value)}
            />
            <br/>
            <Button  style={{marginLeft:"-10px"}} onClick={reportFunc}>Report</Button>
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
          <Typography component="legend">Rate</Typography>
          <br/>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <br/>
            <Button  style={{marginLeft:"-15px"}} onClick={rateGig}>Rate</Button>
          </Box>
        </Modal>

        <Modal
          open={openCashgig}
          onClose={handleCloseCashgig}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
          <Typography id="transition-modal-title" variant="h6" component="h2">
              Report
            </Typography>
            <br/>
            <TextField id="outlined-basic" label="Report" variant="outlined" 
              value={report}
              onChange={(e) => setReport(e.target.value)}
            />
            <br/>
            <Button  style={{marginLeft:"-10px"}} onClick={reportFuncgig}>Report</Button>
           
          </Box>
        </Modal>


      </div>
      <Footer />
    </div>
  );
}