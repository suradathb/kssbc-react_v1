import React from 'react';
import { Link } from "react-router-dom";
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';

class Header extends React.Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.usernameshow();
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
      const balance = await KssBonus.methods.balanceOf(accounts[0]).call({ from: accounts[0] });


      // symbol();
      const symbol = await KssBonus.methods.symbol().call();
      this.setState({ symbol: symbol });
      const sumbalaceETH = web3.utils.fromWei(balance, "ether");
      const sumbalace = balance;
      this.setState({ balance: sumbalace, balanceETH: sumbalaceETH });
      // Decimal
      const decimal = await KssBonus.methods.decimals().call();
      this.setState({ decimals: decimal });
    }
  }
  currencyFormat(num) {
    return Intl.NumberFormat().format(num);
  }

  async usernameshow() {
    const user = [
      { id: 1, username: "admin", password: "password@1", address: "0xE935a4C890a1D1B8b1F9aFC83eA96b65792e2736", hashkey: "e2024b93133398322d3e02b09108668571983a6b79e91f68b35a9e261c58f3a5", type: "A" },
      { id: 2, username: "user1", password: "password@1", address: "0xEDB04B6aBae9eb8f486767a4D6A433bB28288598", hashkey: "968ba4a0e1d01c637d9d8dd7958373bc3562d2215813f607779b07fbcddd8dd2", type: "A" },
      { id: 3, username: "user2", password: "password@1", address: "0xEf5847A1dCA3908499065B11d236e1dB3a0f89aE", hashkey: "7112160e33d7de0353fe3c5989aeafbe41e6d0fe1cef2c9209c9670d5cfa6505", type: "A" },
    ]
    const test = user.filter(obj => {
      if (obj.address === this.state.accounts) {
        try {
          this.setState({ acname: obj.username });
        } catch (e) {
          alert(e);
        }
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      accounts: "",
      contract: "",
      balance: 0,
      balanceETH: 0,
      symbol: "",
      decimals: 0,
      acname: "",

    }
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
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/list">
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/abount">
                      FAQ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Abount
                    </Link>
                  </li>
                  {/* <li className="nav-item">ผู้ใช้ : {this.state.acname} </li> */}
                </ul>
              </div>
              <div className="navbar align-self-center d-flex">
                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  
                  <li className="nav-item"> {this.state.symbol} : {this.currencyFormat(this.state.balance)} wei</li>
                  {/* <li className="nav-item"> To ETH :{this.currencyFormat(this.state.balanceETH)}</li> */}
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

