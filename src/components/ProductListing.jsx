import React from "react";
import "../styles/WorkerJobPage.css";
import Navbar from "./Navbar";
import searchicon from "../assets/search.png";
import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import { formGroupClasses } from "@mui/material";
import Footer from "./Footer";

export default function ProductListing() {


  const [productBrand, setproductBrand] = useState([]);
  const Brand = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/admin/brand/list/",
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    setproductBrand(parsedData);
  };

  useEffect(() => {
    Brand();
  }, []);

  const [itemBrand, setItemBrand] = useState([]);
  const BrandItem = async (brandId) => {
    let data = await fetch(
      `http://127.0.0.1:8000/api/admin/brand/brand-item/list/${brandId}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    let parsedData = await data.json();
    console.log(parsedData);
    setItemBrand(parsedData);
  };




  return (
    <div>
      <Navbar link1="clienthomepage" link1name="Home" link2="clientjobpage" link2name="Jobs" link3name="Message" />

      <div className="job-container">
        <div className="left">
          <h2>Brands</h2>
          {productBrand &&
            productBrand.map((brand) => {
              return (
                <div className="job-box" onClick={() => BrandItem(brand.id)}>
                  <h3>{brand.title}</h3>
                </div>
              );
            })}
          
        </div>

        <div className="right">
          <div className="navbar-right right6">
            {/* <form action="">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Products"
                className="navbar-search"
              />
              <button type="submit" className="navbar-icon">
                <img src={searchicon} alt="Search" />
              </button>
            </form> */}
          </div>

          <div className="right7">
            <h3>Product List</h3>

            <table>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
              {itemBrand && 
              itemBrand.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>1 Psc.</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="Avatar"
                      />
                    </td>
                  </tr>
                );
              })}
              
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
