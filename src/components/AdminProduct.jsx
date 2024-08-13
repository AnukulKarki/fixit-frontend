import React from "react";
import Sidebar from "./Sidebar";
import "../styles/Admin.css";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useRef } from "react"; 
import { SignalCellularNull } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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

export default function AdminProduct() {
  const [editOpen, setEditOpen] = useState(false); // delete
  const handleEditOpen = (id) => {setEditOpen(true); setProductItemId(id)}
  const handleClose = () => setEditOpen(false);


  const [editItem, setEditItem ] = useState(false);
  const handleEditItemOpen = (item) => {setEditItem(true); 
    setBrandIdEdit(item.id);
    setBrandName(item.title);


    
  }

  const [deleteModal, setDeleteModal] = useState(false);
  const openDeleteModal = (id) => {setDeleteModal(true); setBrandIdEdit(id)}
  const closeDeleteModal = () => setDeleteModal(false);

  const handleEditItemClose = () => setEditItem(false)

  const navigate = useNavigate();
  const fileInput = useRef();
  const [productItemId, setProductItemId] = useState("");

  
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(SignalCellularNull);


  const [name, setName] = useState("");
  const [brandId, setbrandId] = useState("");
  const [price, setPrice] = useState("");
  const [itemImage, setitemImage] = useState(SignalCellularNull);

  const [brandIdEdit, setBrandIdEdit] = useState("");

  const [brandName, setBrandName] = useState("")
  const [brandImage, setBrandImage] = useState("")

  const handleEditBrand = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", brandName);
    formData.append("image", brandImage);

    let data = await fetch(`http://127.0.0.1:8000/api/admin/brand/edit/${brandIdEdit}/`, {
      credentials: "include",
      method: "POST",
      body: formData,
    });

    if (data.status === 200) {
      swal("Updated", "You have successfully updated Brand!", "success");
      setBrandName("");
      setBrandImage("");
      fileInput.current.value = "";
      brandDataList();
    }else{
      swal("Error", "Something went wrong! Please try again.", "error");
    }

    
  }

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
  


  const postBrand = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", brand);
    formData.append("image", image);


    console.log(formData);

    let data = await fetch("http://127.0.0.1:8000/api/admin/brand/post/", {
      credentials: "include",
      method: "POST",
      body: formData,
    });

    if (data.status === 201) {
      swal("Added", "You have successfully added Brand!", "success");
      brandDataList();
      setImage("");
      setBrand("");
      fileInput.current.value = "";
    } 
    else {
      swal("Cannot post Brand","","error");
      console.log(data);
    }
  };



  const itemPost = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", itemImage);
    formData.append("brand", brandId);


    console.log(formData);

    let data = await fetch("http://127.0.0.1:8000/api/admin/brand/item/post/", {
      credentials: "include",
      method: "POST",
      body: formData,
    });

    if (data.status === 201) {
      swal("Added", "You have successfully added!", "success");
      setName("");
      setPrice("");
      setbrandId("");
      fileInput.current.value = "";
      brandItemList();
    } 
    else {
      swal("Error", "Something went wrong! Please try again.", "error");
      console.log(data);
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
    setBrandData(parsedData);
  };

  const [brandItem, setbrandItem] = useState([]);

  const brandItemList = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/admin/brand/item/list/", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    console.log(parsedData);
    setbrandItem(parsedData);
  };
  const brandDelete = async () => {
    let data = await fetch(`http://127.0.0.1:8000/api/admin/brand/delete/${brandIdEdit}/`, {
      method: "GET",
      credentials: "include",
    });
    if (data.status === 200){
      swal("Deleted", "You have successfully deleted!", "success");
      brandDataList();
      brandItemList();
      closeDeleteModal();
    }
  };

  const handleDelete = async (itemId) => {
    let data = await fetch(`http://127.0.0.1:8000/api/admin/brand/brand-item/delete/${itemId}/`, {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200){
      swal("Deleted", "You have successfully deleted!", "success");
      brandItemList();
      handleClose();
    }
  };

  useEffect(() => {
    brandDataList();
    brandItemList();
  }, []);



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
                <input type="text" id="item" name="item" value={brand} 
                onChange={(e) => setBrand(e.target.value)}
                required
                />
              </div>

              <div className="col">
                <label for="brand-image">Image</label>
                <input type="file" id="brand-image" name="brand-image"
                ref={fileInput}
                onChange={(e) => setImage(e.target.files[0])}
                required
                />
              </div>
            </div>
            <br />
            <div className="row">
              <button onClick={postBrand}>Post</button>
            </div>
          </div>

          <br />
          <br />

          <div className="form">
            <h3>Product Item</h3>
            <div className="row">
              <div className="col">
                <label for="name">Name</label>
                <input type="text" id="name" name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col">
                <label for="price">Price</label>
                <input type="number" id="price" name="price" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label for="brand-image">Image</label>
                <input type="file" id="brand-image" name="brand-image" 
                ref={fileInput}
                onChange={(e) => setitemImage(e.target.files[0])}
                />
              </div>

              <div className="col">
              <label htmlFor="selectcategory">Select Brand</label>
                <select
                      id="category"
                      value={brandId}
                      onChange={(e) => setbrandId(e.target.value)}
                    >
                      {brandData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            <br />

            <div className="row">
              <button onClick={itemPost}>Post</button>
            </div>
          </div>

          <br />
          <br />

          <div className="center">
          Brand List
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
              {brandData && brandData.map((item, index) => (
                
              <tr key={item}>
                <td>{index+1}</td>
                <td>{item.title}</td>
                <td><img
                    src={item.image}
                    alt="placeholder"
                    width={"200px"}
                  />
                  </td>
                  <td>
                  <button className="red" onClick={() => {openDeleteModal(item.id)}} >Delete</button>
                  <button className="green" onClick={() => {handleEditItemOpen(item)}}>Edit</button>
                  </td>
                
              </tr>
              ))}

            <Modal
              open={deleteModal}
              onClose={closeDeleteModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>

              <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Do you want to delete the Product?
              
            </Typography>
            <br/>
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={closeDeleteModal}>No</Button>
            <Button onClick={brandDelete} >Yes</Button>
            </div>
              </Box>
            </Modal>
            </table>

            Product List
            <table>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
              {brandItem && brandItem.map((item, index) => (
                
              <tr key={item}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.brand.title}</td>
                <td>
                  <img
                    src={item.image}
                    alt="placeholder"
                    width={"200px"}
                  />
                </td>
                <td>

                  <button className="red" onClick={() =>{handleEditOpen(item.id)}}>Delete</button>
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
              Delete
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Do you want to delete the Product?
              
            </Typography>
            <br/>
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => {handleDelete(productItemId)}} >Yes</Button>
            </div>
              </Box>
            </Modal>

            

            <Dialog
            open={editItem}
            onClose={handleEditItemClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
            <DialogContent>
              
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Item"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    type="text"

                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="file"
                    label="Image"
                    type="file"
                    onChange={(e) => setBrandImage(e.target.files[0])}
                    fullWidth
                  />
                  
                </>
              
            
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditItemClose} color="primary">
                Cancel
              </Button>
              <Button  color="primary" onClick={handleEditBrand} >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
