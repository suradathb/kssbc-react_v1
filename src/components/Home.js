
import React from "react";
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';
import Header from "./Header";

class Home extends React.Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
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
            // window.alert(
            //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
            // );
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
    shoot = (num, item) => e => {
        console.log(item);
        this.setState({
            item: [...this.state.item, item]
        });
        this.setState({ count: num });
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
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_01.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><button className="btn btn-success text-white mt-2" onClick={this.shoot(this.state.count + 1, "กล้อง")} href="shop-single.html"><i className="fas fa-cart-plus"></i></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Nikon</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>ภาพคมชัดทุกรายละเอียด</li>
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
                                            <p className="text-center mb-0">KSSBC 250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_02.webp" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><button className="btn btn-success text-white mt-2" onClick={this.shoot(this.state.count + 1, "ไก่")}><i className="fas fa-cart-plus"></i></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_03.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_04.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_05.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_06.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_07.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_08.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 product-wap rounded-0">
                                        <div className="card rounded-0">
                                            <img className="card-img rounded-0 img-fluid" src="assets/images/Item_09.jpg" />
                                            <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul className="list-unstyled">
                                                    <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li>
                                                    <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <a href="shop-single.html" className="h3 text-decoration-none">Oupidatat non</a>
                                            <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
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
                                            <p className="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
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