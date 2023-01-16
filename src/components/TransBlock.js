import React from "react";
import Axios from "axios";
import KSSBC from "../abis/KSSBonusToken.json";
import Web3 from "web3";
import SubMenu from "./SubMenu";
import Moment from "moment";

class TransBlock extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.TransBlock();
    // await this.dateStamp();
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
  async TransBlock() {
    Axios.get(
      `https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=0x4ccF3E28D3BE90a506FCB9C7E8fB598D80134383&address=${this.state.account}&offset=30&sort=desc&apikey=YourApiKeyToken`
    ).then((response) => {
      //   console.log(response.data.result);
      this.setState({ dbtrans: response.data.result });
    });
  }

  CustString(name) {
    const chars = name.split("(");
    return chars[0];
  }

  CustHashString(name) {
    const chars = name.substring(0, 20);
    return chars + "...";
  }
  dateStamp(trdate) {
    var numdate = parseInt(trdate);
    // console.log(Moment(new Date(numdate * 1000)).format('DD/MM/YYYY hh:MM'));
    // var newformat = Moment(new Date(numdate * 1000)).format('DD/MM/YYYY');
    var newformat = Moment(new Date(numdate * 1000)).format("DD MMMM YYYY");
    return newformat;
  }

  showcontractaddress(address) {
    var linkname = `https://mumbai.polygonscan.com/token/0x4ccF3E28D3BE90a506FCB9C7E8fB598D80134383?a=${address}`;
    return linkname;
  }
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
            <h1 className="h1">Trans Block KSSBC</h1>
            <div className="input-group mb-3 text-center">
              <p></p>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <SubMenu />
            </div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">No</th> */}
                  <th scope="col">Txn Hash</th>
                  {/* <th scope="col">Method</th> */}
                  <th scope="col">Age</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.state.dbtrans.map((name, key) => {
                  //  console.log(datet);
                  if (
                    name.from === "0x0000000000000000000000000000000000000000"
                  ) {
                  } else {
                    return (
                      <>
                        <tr key={key}>
                          <td>
                            <a
                              href={`https://mumbai.polygonscan.com/tx/${name.hash}`}
                            >
                              {this.CustHashString(name.hash)}
                            </a>
                          </td>
                          <td>{this.dateStamp(name.timeStamp)}</td>
                          <td>
                            <a href={this.showcontractaddress(name.from)}>
                              {this.CustHashString(name.from)}
                            </a>
                          </td>
                          <td>
                            <a href={this.showcontractaddress(name.to)}>
                              {this.CustHashString(name.to)}
                            </a>
                          </td>
                          <td>
                            {name.value}
                            {name.tokenSymbol}
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

export default TransBlock;
