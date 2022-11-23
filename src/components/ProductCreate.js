import React from "react";
import Axios from "axios";
import { Link, location } from "react-router-dom";

class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbproduct: [],
      buffer: null,
      result: "No result",
      fileimage: "",
      codeNo: "",
      item_no: "",
      item_name: "",
      des: "",
      price: 0,
      errorMessage: "",
      articleId: null,
      imageFile: "",
    };
    this.captureFile = this.captureFile.bind(this);
  }

  componentWillMount() {
    this.getProduct();
  }
  getProduct() {
    Axios.get("http://localhost:5000/api/v1/products").then((response) => {
      // console.log(response.data)
      if (response.data) {
        var codenum = "PID0001";
        this.setState({ codeNo: codenum });
      }
      response.data.map((code, key) => {
        const splitdata = code.item_no;
        const number = splitdata.split("PID");
        // number.map((num)=>{
        //     const cusnumber = num.split("0");
        //     var codename = parseInt(cusnumber,10);
        //     console.log(codename);

        // })
        let result = number.map((i) => Number(i));
        var codename = Math.max(result[1]) + 1;
        var codenum = "PID000" + codename;
        this.setState({ codeNo: codenum });

        // console.log(code.item_no);
      });
      // this.setState({ db_users: [...this.state.db_users, response.data] });
      this.setState({ dbproduct: response.data });
    });
  }
  createTask() {
    const article = {
      item_no: this.state.codeNo,
      item_name: this.state.item_name,
      description: this.state.des,
      price: this.state.price,
    };
    Axios({
      // Endpoint to send files
      url: "http://localhost:5000/api/v1/products",
      method: "POST",
      headers: {
        // Add any auth token here
        authorization: "your token comes here",
      },
      // Attaching the form data
      data: article,
    })
      // Handle the response from backend here
      .then((res) => {
        window.location.href = "/product";
      })
      // Catch errors if any
      .catch((err) => {});
  }
  captureFile(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("myFile", file, file.name);
    console.log(file, file.name, file.webkitRelativePath);
    const data = {
      file_image: event.target.files[0].name,
    };

    // Axios({

    //     // Endpoint to send files
    //     url: "http://localhost:5000/api/v1/imagefile",
    //     method: "POST",
    //     headers: {
    //         // Add any auth token here
    //         authorization: "your token comes here",
    //     },
    //     // Attaching the form data
    //     data: data,
    // })
    //     // Handle the response from backend here
    //     .then((res) => { /*window.location.href = "/addproduct";*/ })
    //     // Catch errors if any
    //     .catch((err) => { });
    // this.setState({fileimage:URL.createObjectURL(event.target.files[0])})
    // this.upimage(URL.createObjectURL(event.target.files[0]));
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onloadend = () => {
    //     this.setState({ buffer: Buffer(reader.result) });
    //     console.log('buffer', Buffer(reader.result))
    // };
  }

  render() {
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
                this.createTask(this.state);
              }}
            >
              <div className="row">
                <div className="form-group col-md-9 mb-3">
                  <div className="form-group">
                    <img src={this.state.fileimage} />
                    <div className="custom-file">
                      <input
                        type="file"
                        onChange={this.handleFileInputChange}
                      />
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
                    value={this.state.codeNo}
                    onChange={(e) => {
                      this.setState({ item_no: this.state.codeNo });
                    }}
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
                    value={this.state.item_name}
                    onChange={(e) => {
                      this.setState({ item_name: e.target.value });
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
                    value={this.state.des}
                    onChange={(e) => {
                      this.setState({ des: e.target.value });
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
                    value={this.state.price}
                    onChange={(e) => {
                      this.setState({ price: e.target.value });
                    }}
                    placeholder="Price"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col text-end mt-2">
                  <Link class="btn btn-light btn-lg px-3" to="/product">
                    ยกเลิก
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="submit"
                    value="บันทึก"
                    class="btn btn-success btn-lg px-3"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ProductCreate;
