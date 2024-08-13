import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import JobRequirement from "./components/JobRequirement";
import GigDisplay from "./components/GigDisplay";
import Profile from "./components/Profile";
import GigUpload from "./components/GigUpload";
import WorkerHomepage from "./components/WorkerHomepage";
import UserHomepage from "./components/UserHomepage";
import SubmitProposal from "./components/SubmitProposal";
import ViewProposal from "./components/ViewProposal";
import WorkerProfile from "./components/WorkerProfile";
import WPEmployee from "./components/WP-Employee";
import WPgig from "./components/WP-gig";
import WorkerJobPage from "./components/WorkerJobPage";
import ClientJobPage from "./components/ClientJobPage";
import ClientJobPageArchive from "./components/ClientJobPageArchive";
import ProductListing from "./components/ProductListing";
import GigHiringProposal from "./components/GigHiringProposal";
import WorkDetailview from "./components/WorkDetailview";
import GigWorkRequest from "./components/GigWorkRequest";
import AdminDashboard from "./components/AdminDashboard";
import AdminCategory from "./components/AdminCategory";
import AdminProduct from "./components/AdminProduct";
import AdminWorker from "./components/AdminWorker";
import Map from "./components/Map";
import Homepage from "./components/Homepage";
import OWP from "./components/OtherWorkerProfile";
import OCP from "./components/OtherClientProfile";
import ACV from "./components/AdminClientView";
import AWV from "./components/AdminWorkerView";
import Blacklist from "./components/Blacklist";
import Code from "./components/Code";
import WorkerJobPageArchive from "./components/WorkerJobPageArchive";
import CurrentJobWorkerDetail from "./components/CurrentJobWorkerDetail";
import CurrentJobWorkerGigDetail from "./components/CurrentJobWorkerGigDetail";
import Message from "./components/Message";
import Forgetpassword from "./components/Forgetpassword";
import Confirmcode from "./components/Confirmcode";
import Passwordchange from "./components/Passwordchange";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Remove this later */}
          <Route exact path="/list" element={<Home />}></Route>

          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="forgetpassword" element={<Forgetpassword />}></Route>
          <Route exact path="/adminclientview/:id" element={<ACV />}></Route>
          <Route exact path="/adminworkerview/:id" element={<AWV />}></Route>
          <Route exact path="/blacklist" element={<Blacklist />}></Route>
          <Route exact path="/map" element={<Map />}></Route>

          <Route exact path="/owp/:id" element={<OWP />}></Route>
          <Route exact path="/ocp/:id" element={<OCP />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/currentjobdetail/:id" element={<CurrentJobWorkerDetail />}></Route>
          <Route exact path="/currentjobgigdetail/:id" element={<CurrentJobWorkerGigDetail />}></Route>
          <Route exact path="/passwordchange/:token" element={<Passwordchange />}></Route>
          <Route exact path="/message" element={<Message/>}></Route>
          <Route
            exact
            path="/jobrequirement"
            element={<JobRequirement />}
          ></Route>
          <Route exact path="/gigdisplay" element={<GigDisplay />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/gigupload" element={<GigUpload />}></Route>
          <Route
            exact
            path="/workerhomepage"
            element={<WorkerHomepage />}
          ></Route>
          <Route
            exact
            path="/clienthomepage"
            element={<UserHomepage />}
          ></Route>
          <Route
            exact
            path="/submitproposal/:jobId"
            element={<SubmitProposal />}
          ></Route>
          <Route
            exact
            path="/viewproposal/:jobId/"
            element={<ViewProposal />}
          ></Route>
          <Route
            exact
            path="/workerprofile"
            element={<WorkerProfile />}
          ></Route>
          <Route exact path="/employee" element={<WPEmployee />}></Route>
          <Route exact path="/gig" element={<WPgig />}></Route>
          <Route
            exact
            path="/workerjobpage"
            element={<WorkerJobPage />}
          ></Route>
          <Route
            exact
            path="/clientjobpage"
            element={<ClientJobPage />}
          ></Route>
          <Route
            exact
            path="/productlisting"
            element={<ProductListing />}
          ></Route>
          <Route
            exact
            path="/gighiringproposal/:workerId"
            element={<GigHiringProposal />}
          ></Route>
          <Route
            exact
            path="/workdetailview/:id"
            element={<WorkDetailview />}
          ></Route>
          <Route
            exact
            path="/gigworkrequest"
            element={<GigWorkRequest />}
          ></Route>
          <Route
            exact
            path="/adminclient"
            element={<AdminDashboard />}
          ></Route>
          <Route
            exact
            path="/admincategory"
            element={<AdminCategory />}
          ></Route>
          <Route
            exact
            path="/adminproduct"
            element={<AdminProduct />}
          ></Route>
          <Route
            exact
            path="/adminworker"
            element={<AdminWorker />}
          ></Route>
          <Route
            exact
            path="/clientjobpagearchive"
            element={<ClientJobPageArchive />}
          ></Route>
          <Route
            exact
            path="/code/:email"
            element={<Code />}
            ></Route>
            <Route
            exact
            path="/confirmcode/:email"
            element={<Confirmcode />}
            ></Route>
            
            <Route
            exact
            path="/workerjobarchive"
            element={<WorkerJobPageArchive />}
            ></Route>
            <Route
            exact
            path="/*"
            element={<Homepage />}
            ></Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
