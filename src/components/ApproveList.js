import React from "react";
import KSSBC from "../abis/KSSBonusToken.json";
import Web3 from "web3";
import Axios from "axios";
import SubMenu from "./SubMenu";
import Moment from "moment";

class ApproveList extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    // await this.usernameshow();
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
      const balance = await kssBonus.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });
      this.setState({ balance: balance });
    }
  }
  async getUser() {
    Axios.get("http://localhost:5000/api/v1/productorders").then((response) => {
      // console.log(response.data);
      this.setState({ dbapprove: response.data });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: "",
      balance: "",
      decimals: "",
      holders: "",
      count: 0,
      item: [],
      acname: "",
      address: "",
      dbapprove: [],
    };
  }

  render() {
    return (
      <>
        <div className="container-fluid bg-light py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1">APPROVE LIST</h1>
            <div className="input-group mb-3 text-center">
              <p>{/* {this.state.acname} */}</p>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <SubMenu />
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">No</th> */}
                  <th scope="col">Order No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Point Token</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.dbapprove.map((val, key) => {
                  if (val.type == "price") {
                    return (
                      <>
                        <tr>
                          {/* <th scope="row">{val.id}</th> */}
                          <td>{val.order_no}</td>
                          <td>{val.order_item}</td>
                          <td>{Moment(val.order_date).format("DD-MM-YYYY")}</td>
                          <td>
                            {Intl.NumberFormat().format(val.point_token)} KSSBC
                          </td>
                          <td>
                            {/* <input
                                                            type="submit"
                                                            value="อนุมัติ Token"
                                                            className="btn btn-success btn-lg px-3"
                                                        // onClick={this.shoot(this.user[2].address, name.pointtoken)}
                                                        /> */}
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

export default ApproveList;
