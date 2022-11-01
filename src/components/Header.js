import React from "react";
import { Link } from "react-router-dom";
import KSSBC from "./../abis/KSSBonusToken.json";
import Web3 from "web3";

class Header extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
    }
  }
  async loadBlockchainData() {
    if (window.web3) {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({ accounts: accounts[0] });
      const networkId = await web3.eth.net.getId();
      const networkData = KSSBC.networks[networkId];

      const abi = KSSBC.abi;
      const address = networkData.address;
      const KssBonus = new web3.eth.Contract(abi, address);
      this.setState({ contract: KssBonus });
      // balanceOf();
      const balance = await KssBonus.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });

      // symbol();
      const symbol = await KssBonus.methods.symbol().call();
      this.setState({ symbol: symbol });
      const sumbalace = web3.utils.fromWei(balance, "ether");
      this.setState({ balance: sumbalace });
      // Decimal
      const decimal = await KssBonus.methods.decimals().call();
      this.setState({ decimals: decimal });
    }
  }
  currencyFormat(num) {
    return Intl.NumberFormat().format(num);
  }

  constructor(props) {
    super(props);
    this.state = {
      accounts: "",
      contract: "",
      balance: 0,
      symbol: "",
      decimals: 0,
    };
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light shadow">
          <div className="container d-flex justify-content-between align-items-center">
            <a
              className="navbar-brand text-success logo h1 align-self-center"
              href="/"
            >
              <img
                className="logo-Header"
                src="./assets/images/Logo.png"
                alt=""
              />
            </a>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#templatemo_main_nav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
              id="templatemo_main_nav"
            >
              <div className="flex-fill">
                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      หน้าหลัก
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/two">
                      ค้นหา
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/abount">
                      เกี่ยวกับเรา
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      ติดต่อเรา
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="navbar align-self-center d-flex">
                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li className="nav-item">
                    {this.state.symbol} :{" "}
                    {this.currencyFormat(this.state.balance)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/* <!-- Close Header --> */}
      </>
    );
  }
}

export default Header;
