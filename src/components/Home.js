import React from "react";
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';
import Axios from 'axios';
import Moment from "moment";

class Home extends React.Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        await this.getTransOrder();
        await this.getuserAccount();
        await this.getProduct();
        await this.getuserBurn();
    }
    async loadWeb3() {
        if (window.web3) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({
                method: "eth_requestAccounts",
            })
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
            const balance = await kssBonus.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
            this.setState({ balance: balance });
        }
    }
    async getProduct() {
        Axios.get('http://localhost:5000/api/v1/products').then((response) => {
            // console.log(response.data);
            this.setState({ product: response.data });
        });
    }
    async getuserAccount() {
        Axios.get('http://localhost:5000/api/v1/users').then((response) => {
            response.data.map((account, key) => {
                if (account.address === this.state.account) {
                    // console.log(account.username);
                    this.setState({ useraccount: account.username });
                }
            })

        });
    }
    async getuserBurn() {
        Axios.get('http://localhost:5000/api/v1/users/3').then((response) => {
            response.data.map((brun)=>{
                // console.log(brun.address);
                this.setState({ userburn: brun.address });
            })
            
        });
    }

    async getTransOrder() {
        Axios.get('http://localhost:5000/api/v1/productorders').then((response) => {
            if (response.data) {
                var codenum = "PID0001";
                this.setState({ codeNo: codenum });
            }
            response.data.map((code, key) => {
                const splitdata = code.order_no;
                const number = splitdata.split("PID");
                let result = number.map(i => Number(i));
                var codename = Math.max(result[1]) + 1;
                var codenum = "PID000" + codename;
                this.setState({ codeNo: codenum });

                // console.log(code.item_no);
            });
        });
    }
    useradditem = (name, price) => e => {
        const addressburn = this.state.userburn;
        if (this.state.balance <= price) {
            alert("ยอด Token ไม่เพียงพอในการแลกรับของขวัญ");
        } else {
            this.state.contract.methods
                .transfer(addressburn, price)
                .send({ from: this.state.account })
                .once("receipt", (receipt) => {
                    console.log("ToSusess", addressburn, ":", price);
                    this.createProductOrder(name,price);
                });
        }
    }
    createProductOrder(name,price){
        // const addressburn = this.state.userburn.map((name) => name.address);
        const username = this.state.useraccount;
        const data = {
            order_no: this.state.codeNo,
            order_item: name,
            point_token: price,
            type: "sell",
            order_date: new Date,
            username: username,
            balance: this.state.balance
        }
        Axios({

            // Endpoint to send files
            url: "http://localhost:5000/api/v1/productorders",
            method: "POST",
            headers: {
                // Add any auth token here
                authorization: "your token comes here",
            },
            // Attaching the form data
            data: data,
        })
            // Handle the response from backend here
            .then((res) => { window.location.href = "/"; })
            // Catch errors if any
            .catch((err) => { });
    }
    currencyFormat(num) {
        return Intl.NumberFormat().format(num);
    }
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            contract: "",
            balance: "",
            decimals: "",
            holders: "",
            codeNo: "",
            userburn: "",
            count: 0,
            item: [],
            product: [],
            useraccount: ""

        }
    }
    render() {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1"> Krungsri Securities Bonus Token</h1>
                        <div className="input-group mb-3 text-center">
                            <p>
                                {this.state.item}
                            </p>

                        </div>
                    </div>
                </div>
                {/* <!-- Start Content --> */}
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-3">
                            <h1 className="h2 pb-4">Categories <i className="fas fa-cart-plus"></i>
                                {this.state.count}</h1>
                            <ul className="list-unstyled templatemo-accordion">
                                <li className="pb-3">
                                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="">
                                        Gender
                                        <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                                    </a>
                                    <ul className="collapse show list-unstyled pl-3">
                                        <li><a className="text-decoration-none" href="">Men</a></li>
                                        <li><a className="text-decoration-none" href="">Women</a></li>
                                    </ul>
                                </li>
                                <li className="pb-3">
                                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                                        Sale
                                        <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                                    </a>
                                    <ul id="collapseTwo" className="collapse list-unstyled pl-3">
                                        <li><a className="text-decoration-none" href="#">Sport</a></li>
                                        <li><a className="text-decoration-none" href="#">Luxury</a></li>
                                    </ul>
                                </li>
                                <li className="pb-3">
                                    <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                                        Product
                                        <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                                    </a>
                                    <ul id="collapseThree" className="collapse list-unstyled pl-3">
                                        <li><a className="text-decoration-none" href="#">Bag</a></li>
                                        <li><a className="text-decoration-none" href="#">Sweather</a></li>
                                        <li><a className="text-decoration-none" href="#">Sunglass</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-inline shop-top-menu pb-3 pt-1">
                                        <li className="list-inline-item">
                                            <a className="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a className="h3 text-dark text-decoration-none" href="#">Women's</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6 pb-4">
                                    <div className="d-flex">
                                        <select className="form-control">
                                            <option>Featured</option>
                                            <option>A to Z</option>
                                            <option>Item</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {this.state.product.map((val, key) => {
                                    return (
                                        <>
                                            <div className="col-md-4">
                                                <div className="card mb-4 product-wap rounded-0">
                                                    <div className="card rounded-0">
                                                        <img className="card-img rounded-0 img-fluid" src={`assets/images/Item_0${key}.jpg`} />
                                                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                            <ul className="list-unstyled">
                                                                {/* <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li> */}
                                                                {/* <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li> */}
                                                                {/* <li><button className="btn btn-success text-white mt-2" onClick={this.useradditem(this.state.count + 1, val.item_no,val.price)} href="shop-single.html"><i className="fas fa-cart-plus"></i></button></li> */}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <a href="shop-single.html" className="h3 text-decoration-none">{val.item_name}</a>
                                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                            <li>{val.description}</li>
                                                            <li className="pt-2">
                                                                <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                                <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                                <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                                <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                                <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                            </li>
                                                        </ul>
                                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                                            <li>
                                                                <i className="text-warning fa fa-star"></i>
                                                                <i className="text-warning fa fa-star"></i>
                                                                <i className="text-warning fa fa-star"></i>
                                                                <i className="text-muted fa fa-star"></i>
                                                                <i className="text-muted fa fa-star"></i>
                                                            </li>
                                                        </ul>
                                                        <p className="text-center mb-0">KSSBC {this.currencyFormat(val.price)} <button className="btn btn-success text-white mt-2" onClick={this.useradditem(val.item_name, val.price)} href="shop-single.html"><i className="fas fa-cart-plus"></i></button></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                            <div div="row">
                                <ul className="pagination pagination-lg justify-content-end">
                                    <li className="page-item disabled">
                                        <a className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0" href="#" tabIndex="-1">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" href="#">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" href="#">3</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <!-- End Content --> */}
            </>
        );
    }
}

export default Home;