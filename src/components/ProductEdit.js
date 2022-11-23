import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import ProductItem from "./ProductItem";

function ProductEdit() {
  let location = useLocation();
  const [itemId, setItemId] = useState(location.state.id);
  const [itemNo, setItemNo] = useState(location.state.code);
  const [itemName, setItemName] = useState(location.state.name);
  const [itemDes, setItemDes] = useState(location.state.des);
  const [itemPrice, setItemPrice] = useState(location.state.price);
  const [itemRate, setItemRate] = useState(location.state.rate);

  function updateProduct() {
    const data = {
      item_no: itemNo,
      item_name: itemName,
      description: itemDes,
      price: itemPrice,
      rateing: itemRate,
    };
    Axios({
      // Endpoint to send files
      url: `http://localhost:5000/api/v1/products/${itemId}`,
      method: "PUT",
      headers: {
        // Add any auth token here
        authorization: "your token comes here",
      },
      // Attaching the form data
      data: data,
    })
      // Handle the response from backend here
      .then((res) => {
        window.location.href = "/product";
      })
      // Catch errors if any
      .catch((err) => {});
  }
  function currencyFormat(num) {
    return Intl.NumberFormat().format(num);
  }
  return (
    <>
      <div className="container-fluid bg-light py-5">
        <div className="col-md-6 m-auto text-center">
          <h1 className="h1">Create Product item</h1>
          <div className="input-group mb-3">
            <p></p>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row py-5">
          <form
            className="col-md-9 m-auto"
            role="form"
            // onSubmit={() => alert(JSON.stringify(this.state))}
            onSubmit={(event) => {
              event.preventDefault();
              // console.log(this.state)
              // this.createTask(this.state);
              updateProduct();
            }}
          >
            <div className="row">
              <div className="form-group col-md-9 mb-3">
                <div className="form-group">
                  <div className="custom-file">
                    {/* <input type="file" onChange={this.captureFile} /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="inputname">Item Code</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="cow_sax"
                  name="item_no"
                  value={itemNo}
                  // onChange={(e) => {
                  //     this.setState({ item_no: this.state.codeNo });
                  // }}
                  placeholder="Code Item"
                  disabled
                />
              </div>
              <div className="form-group col-md-8 mb-3">
                <label htmlFor="inputname">Item Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="cow_sax"
                  name="item_name"
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                  placeholder="Item name"
                />
              </div>
              <div className="form-group col-md-12 mb-3">
                <label htmlFor="inputname">Description</label>
                <textarea
                  className="form-control mt-1"
                  id="message"
                  name="description"
                  placeholder="Message"
                  rows="8"
                  value={itemDes}
                  onChange={(e) => {
                    setItemDes(e.target.value);
                  }}
                />
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="inputname">Price</label>
                <input
                  type="number"
                  className="form-control mt-1"
                  id="cow_sax"
                  name="item_no"
                  value={itemPrice}
                  onChange={(e) => {
                    setItemPrice(e.target.value);
                  }}
                  placeholder="Price"
                />
              </div>
              <div className="form-group col-md-4 mb-3">
                <label htmlFor="inputname">Rateting</label>
                <input
                  type="number"
                  className="form-control mt-1"
                  id="cow_sax"
                  name="item_no"
                  value={itemRate}
                  onChange={(e) => {
                    setItemRate(e.target.value);
                  }}
                  placeholder="Rateting"
                />
              </div>
            </div>
            <div className="row">
              <div className="col text-end mt-2">
                <Link className="btn btn-light btn-lg px-3" to="/product">
                  ยกเลิก
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="submit"
                  value="บันทึก"
                  className="btn btn-success btn-lg px-3"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
