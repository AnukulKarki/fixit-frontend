import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Admin.css";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

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

export default function AdminCategory() {
  const navigate = useNavigate(); 
  const [categoryId, setCategoryId] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = (id) => {setEditOpen(true); setEditCategoryId(id)}
  const handleClose = () => setEditOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = (id) =>{setDeleteOpen(true); setCategoryId(id)} 
  const handleDeleteClose = () => setDeleteOpen(false);

  const [categoryData, setCategoryData] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const categoryList = async () => {
    let cdata = await fetch("http://localhost:8000/api/category/list/");
    let cpData = await cdata.json();
    setCategoryData(cpData);
  };

  useEffect(() => {
    categoryList();
  }, []);

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

  const categoryAddData = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", categoryName);

    let data = await fetch("http://localhost:8000/api/category/add/data/", {
      credentials: "include",
      method: "POST",

      body: formData,
    });

    let parsedData = await data.json();
    if (data.status === 201) {
      setCategoryName("");
      swal("Added", "You have successfully added!", "success");
      categoryList();
    } else {
      alert("Something Went Wrong");
      console.log(parsedData);
    }
  };

  const deleteCategory = async (categoryId) => {
    let data = await fetch(
      `http://localhost:8000/api/category/delete/${categoryId}/`,
      {
        credentials: "include",
        method: "GET",
      }
    );

    let parsedData = await data.json();
    if (data.status === 200) {
      setCategoryName("");
      handleDeleteClose();
      swal("Deleted", "You have successfully deleted!", "success");
      
      categoryList();
    } else {
      alert("Something Went Wrong");
      console.log(parsedData);
    }
  }; 
  const [updatedCategory, setUpdatedCategory] = useState("");
  const handleEditCategory = async (categoryId) => {
    let formData = new FormData();
    formData.append("name", updatedCategory);

    let data = await fetch(
      `http://127.0.0.1:8000/api/category/edit/${categoryId}/`,
      {
        credentials: "include",
        method: "POST",
        body: formData,
      }
    );

    let parsedData = await data.json();
    if (data.status === 200) {
      setCategoryName("");
      handleClose();
      swal("Updated", "You have successfully updated!", "success");
      categoryList();
    } else {
      alert("Something Went Wrong");
      console.log(parsedData);
    }
  };

  return (
    <div>
      <div className="admin-container">
        <div className="left">
          <Sidebar />
        </div>

        <div className="right">
          <div className="form">
            <h3>Product Brand</h3>
            <div className="row">
              <div className="col">
                <label for="brand">Item</label>
                <input
                  type="text"
                  id="item"
                  name="item"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="row" style={{ width: "150px" }}>
              <button onClick={categoryAddData}>Add</button>
            </div>
          </div>

          <div>
            <h3>Category List</h3>
          </div>

          <div className="center">
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
              {categoryData &&
                categoryData.map((item, index) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <button className="green" onClick={() => {handleEditOpen(item.id)}}>
                        Edit
                      </button>
                      <button
                        className="red"
                        onClick={() => handleDeleteOpen(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </table>

            <Modal
              open={editOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description" 
            >
              <Box sx={style}>

              <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Category
            </Typography>
            <br/>
            <TextField id="outlined-basic" label="Category" variant="outlined" 
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
            
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => {handleEditCategory(editCategoryId)}}>Yes</Button>
            </div>
              </Box>
            </Modal>
            

            <Modal
              open={deleteOpen}
              onClose={handleDeleteClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Do you want to delete the Job?
              
            </Typography>
            <br/>
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={handleDeleteClose}>No</Button>
            <Button onClick={() => {deleteCategory(categoryId)}}>Yes</Button>
            </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
