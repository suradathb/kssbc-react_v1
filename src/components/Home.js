
import React, { Component } from "react";
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';
import Header from "./Header";

class Home extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    async loadWeb3() {
        if (window.web3) {
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
    shoot = (num,item) => e => {
        console.log(item);
       this.setState({
        item : [...this.state.item,item]
       });
       this.setState({count : num});
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
                <div class="container-fluid bg-light py-5">
                    <div class="col-md-6 m-auto text-center">
                        <h1 class="h1">หลักทรัพย์กรุงศรี Bonus Token</h1>
                        <div class="input-group mb-3 text-center">
                            <p>
                                {this.state.item}
                            </p>
                            
                        </div>
                    </div>
                </div>
                {/* <!-- Start Content --> */}
                <div class="container py-5">
                    <div class="row">

                        <div class="col-lg-3">
                            <h1 class="h2 pb-4">Categories <i class="fas fa-cart-plus"></i>
                                {this.state.count}</h1>
                            <ul class="list-unstyled templatemo-accordion">
                                <li class="pb-3">
                                    <a class="collapsed d-flex justify-content-between h3 text-decoration-none" href="">
                                        Gender
                                        <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                                    </a>
                                    <ul class="collapse show list-unstyled pl-3">
                                        <li><a class="text-decoration-none" href="">Men</a></li>
                                        <li><a class="text-decoration-none" href="">Women</a></li>
                                    </ul>
                                </li>
                                <li class="pb-3">
                                    <a class="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                                        Sale
                                        <i class="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                                    </a>
                                    <ul id="collapseTwo" class="collapse list-unstyled pl-3">
                                        <li><a class="text-decoration-none" href="#">Sport</a></li>
                                        <li><a class="text-decoration-none" href="#">Luxury</a></li>
                                    </ul>
                                </li>
                                <li class="pb-3">
                                    <a class="collapsed d-flex justify-content-between h3 text-decoration-none" href="#">
                                        Product
                                        <i class="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                                    </a>
                                    <ul id="collapseThree" class="collapse list-unstyled pl-3">
                                        <li><a class="text-decoration-none" href="#">Bag</a></li>
                                        <li><a class="text-decoration-none" href="#">Sweather</a></li>
                                        <li><a class="text-decoration-none" href="#">Sunglass</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div class="col-lg-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <ul class="list-inline shop-top-menu pb-3 pt-1">
                                        <li class="list-inline-item">
                                            <a class="h3 text-dark text-decoration-none mr-3" href="#">All</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="h3 text-dark text-decoration-none mr-3" href="#">Men's</a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="h3 text-dark text-decoration-none" href="#">Women's</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6 pb-4">
                                    <div class="d-flex">
                                        <select class="form-control">
                                            <option>Featured</option>
                                            <option>A to Z</option>
                                            <option>Item</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_01.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><button class="btn btn-success text-white mt-2" onClick={this.shoot(this.state.count + 1,"กล้อง")} href="shop-single.html"><i class="fas fa-cart-plus"></i></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Nikon</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>ภาพคมชัดทุกรายละเอียด</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">KSSBC 250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_02.webp" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><button class="btn btn-success text-white mt-2" onClick={this.shoot(this.state.count + 1,"ไก่")}><i class="fas fa-cart-plus"></i></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_03.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_04.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_05.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_06.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_07.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_08.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card mb-4 product-wap rounded-0">
                                        <div class="card rounded-0">
                                            <img class="card-img rounded-0 img-fluid" src="assets/images/Item_09.jpg" />
                                            <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                <ul class="list-unstyled">
                                                    <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                                    <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                            <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                <li>M/L/X/XL</li>
                                                <li class="pt-2">
                                                    <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                    <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                                </li>
                                            </ul>
                                            <ul class="list-unstyled d-flex justify-content-center mb-1">
                                                <li>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-warning fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                    <i class="text-muted fa fa-star"></i>
                                                </li>
                                            </ul>
                                            <p class="text-center mb-0">$250.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div div="row">
                                <ul class="pagination pagination-lg justify-content-end">
                                    <li class="page-item disabled">
                                        <a class="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0" href="#" tabindex="-1">1</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" href="#">2</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" href="#">3</a>
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