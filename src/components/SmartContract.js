import React from "react";
import Axios from "axios";
import KSSBC from "../abis/KSSBonusToken.json";
import Web3 from "web3";
import { Link } from "react-router-dom";
import DialogTransfer from "./DialogTransfer";
import DialogBurn from "./DialogBurn";
import DialogApprove from "./DialogApprove";
import DialogTransferFrom from "./DialogTransferFrom";

class SmartContract extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
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
      const allowance = await kssBonus.methods
        .allowance("0xE935a4C890a1D1B8b1F9aFC83eA96b65792e2736", accounts[0])
        .call({ from: accounts[0] });
        console.log(kssBonus);
      const balance = await kssBonus.methods
        .totalSupply()
        .call({ from: accounts[0] });
      const symbol = await kssBonus.methods
        .symbol()
        .call({ from: accounts[0] });
      const name = await kssBonus.methods.name().call({ from: accounts[0] });
      const decimals = await kssBonus.methods
        .decimals()
        .call({ from: accounts[0] });
      this.setState({
        name: name,
        decimals: decimals,
        symbol: symbol,
        totalSupply: balance,
        allowance: allowance,
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: "",
      totalSupply: 0,
      allowance:0,
      symbol: "",
      name: "",
      decimals: "",
      fromaddress : "0xE935a4C890a1D1B8b1F9aFC83eA96b65792e2736",
    };
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
  render() {
    return (
      <>
        <div className="container-fluid bg-light py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1">Smart Contract ERC20</h1>
            <div className="input-group mb-3 text-center">
              <p></p>
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">No</th> */}
                  <th scope="col">No</th>
                  {/* <th scope="col">Method</th> */}
                  <th scope="col">Method</th>
                  <th scope="col">Remark</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>totalSupply()</td>
                  <td>จำนวนเหรียญ KSSBC ทั้งหมด</td>
                  <td>{this.state.totalSupply} Wei</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>symbol()</td>
                  <td>สัญลักษณ์โทเค้น สั้น</td>
                  <td>{this.state.symbol}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>name()</td>
                  <td>ชื่อเต็มโทเค้น</td>
                  <td>{this.state.name}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>decimals()</td>
                  <td>จำนวนทศนิยมที่ใช้ในการเป็นตัวแทนผู้ใช้</td>
                  <td>{this.state.decimals}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Transfer(address,amount)</td>
                  <td>โอน Token ผู้ใช้ให้กับ address เป้าหมาย</td>
                  <td>
                    <DialogTransfer
                      state={{
                        contract: this.state.contract,
                        account: this.state.account,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Burn(amount)</td>
                  <td>
                    การสั่ง Burn Token ด้วย address ที่ใช้งานอยู่ ยอดการ burn
                    จะถูกลบทิ้ง
                  </td>
                  <td>
                    <DialogBurn
                      state={{
                        contract: this.state.contract,
                        account: this.state.account,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Approve(spender,amount)</td>
                  <td>สั่งจ่ายเช็ค Token ให้ address เป้าหมาย</td>
                  <td>
                    <DialogApprove
                      state={{
                        contract: this.state.contract,
                        account: this.state.account,
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>allowance(tokenOwner ,spender)</td>
                  <td>ใช้ตรวจสอบยอดเงินที่ approve() ไว้</td>
                  <td>
                    คุณมีเช็ครอรับ {this.state.allowance} KSSBC
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>TransferFrom(from,to,amount)</td>
                  <td>สั่งจ่ายเช็ค Token ให้ address เป้าหมาย</td>
                  <td>
                    <DialogTransferFrom
                      state = {{
                        contract: this.state.contract,
                        account: this.state.account,
                        from : this.state.fromaddress,
                        price : this.state.allowance,
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default SmartContract;
