import React, { Component } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Web3 from 'web3';


class Header extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts: accounts[0] });
    
  }
  constructor(props) {
    super(props);
    this.state = {
      accounts: "",
      contract:[]
    }
  }
  render() {
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light shadow">
          <div class="container d-flex justify-content-between align-items-center">
            <a
              class="navbar-brand text-success logo h1 align-self-center"
              href="/"
            >
              <img
                className="logo-Header"
                src="./assets/images/Logo.png"
                alt=""
              />
            </a>

            <button
              class="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#templatemo_main_nav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
              id="templatemo_main_nav"
            >
              <div class="flex-fill">
                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to="/">
                      หน้าหลัก
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/search">
                      ค้นหา
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/abount">
                      เกี่ยวกับเรา
                    </Link>
                  </li>
                  {/* <li class="nav-item">
                    <Link class="nav-link" to="/showcowcert">
                      CreateCowCert
                    </Link>
                  </li> */}
                  {/* <li class="nav-item">
                    <Link class="nav-link" to="/Alert">
                        TestAlert
                    </Link>
                  </li> */}
                  <li class="nav-item">
                    <Link class="nav-link" to="/contact">
                      ติดต่อเรา
                    </Link>
                  </li>

                </ul>
              </div>
              <div class="navbar align-self-center d-flex">
                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li class="nav-item">{this.state.accounts}</li>
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