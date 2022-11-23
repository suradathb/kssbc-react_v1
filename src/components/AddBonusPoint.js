import React from "react";
import Axios from "axios";
import KSSBC from "./../abis/KSSBonusToken.json";
import Web3 from "web3";
import SubMenu from "./SubMenu";
import { Link } from "react-router-dom";

class AddBonusPoint extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.getPoint();
    await this.getUser();
  }
  async loadWeb3() {
    if (window.web3) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    if (window.web3) {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      const networkId = await web3.eth.net.getId();
      const networkData = KSSBC.networks[networkId];

      const abi = KSSBC.abi;
      const address = networkData.address;
      const kssBonus = new web3.eth.Contract(abi, address);
      this.setState({ contract: kssBonus });
    }
  }
  async getPoint() {
    Axios.get("http://localhost:5000/api/v1/transorder").then((response) => {
      // console.log(response.data);
      this.setState({ dbtrans: response.data });
    });
  }
  async getUser() {
    Axios.get("http://localhost:5000/api/v1/users").then((response) => {
      // console.log(response.data);
      response.data.map((user, key) => {
        // console.log(user.address,this.state.account);
        if (user.address === this.state.account) {
          this.setState({ admin_approve: user.username });
        }
      });
      // if(user.address === this.state.account)
      this.setState({ dbuser: response.data });
    });
  }
  AddTokenBonus = (
    address,
    token,
    id,
    order_no,
    order_item,
    volume,
    username
  ) => (e) => {
    this.state.contract.methods
      .transfer(address, token)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log("ToSusess", address, ":", token);
        this.Approved(
          id,
          order_no,
          order_item,
          volume,
          token,
          username,
          address
        );
      });
  };
  Approved = (id, order_no, order_item, volume, token, username, address) => {
    const data = {
      order_no: order_no,
      order_item: order_item,
      volume: volume,
      point_token: token,
      username: username,
      admin_approve: this.state.admin_approve,
      approve_date: new Date(),
      address: address,
    };
    Axios({
      // Endpoint to send files
      url: `http://localhost:5000/api/v1/transorder/${id}`,
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
        window.location.href = "/addbonus";
      })
      // Catch errors if any
      .catch((err) => {});
  };
  constructor(props) {
    super(props);
    this.state = {
      dbtrans: [],
      dbuser: [],
      account: "",
      contract: "",
      admin_approve: "",
      approve_date: "",
    };
  }
  render() {
    return (
      <>
        <div className="container-fluid bg-light py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1">Add Bonus Token</h1>
            <div className="input-group mb-3 text-center">
              <p>
                admin ที่ถือกระเป๋า token
                หลักเท่านั้นจะมีสิทธิ์เข้าสู่หน้าสำหรับเพิ่ม Token ให้สมาชิก
                Type = admin
              </p>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <SubMenu />
            </div>
            <div className="col-md-2">
              <Link
                className="nav-link btn btn-success btn-lg px-3"
                to="/approveed"
              >
                Approved
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">No</th> */}
                  <th scope="col">Order No</th>
                  <th scope="col">Order Item</th>
                  <th scope="col">Volume</th>
                  <th scope="col">Point Token</th>
                  <th scope="col">Approve Date</th>
                  <th scope="col">User Name</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.dbtrans.map((val, key) => {
                  if (val.admin_approve) {
                  } else {
                    return (
                      <>
                        <tr>
                          <td>{val.order_no}</td>
                          <td>{val.order_item}</td>
                          <td>{val.volume}</td>
                          <td>{val.point_token}</td>
                          <td>{val.approve_date}</td>
                          <td>{val.username}</td>
                          <td>
                            <input
                              type="submit"
                              value="อนุมัติ Token"
                              className="btn btn-success btn-lg px-3"
                              onClick={this.AddTokenBonus(
                                val.address,
                                val.point_token,
                                val.id,
                                val.order_no,
                                val.order_item,
                                val.volume,
                                val.point_token,
                                val.username
                              )}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default AddBonusPoint;
