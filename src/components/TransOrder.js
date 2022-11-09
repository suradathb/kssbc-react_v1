
import React from "react";
import KSSBC from '../abis/KSSBonusToken.json';
import Web3 from 'web3';
import Axios from 'axios';
import SubMenu from "./SubMenu";
import Moment from "moment";




class TransOrder extends React.Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        // await this.usernameshow();
        await this.getUser();
        await this.getNameUser();
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
    async getUser() {
        Axios.get('http://localhost:5000/api/v1/productorders').then((response) => {
            // console.log(response.data);
            this.setState({ dbitemorder: response.data });
        });
    }
    async getNameUser() {
        Axios.get('http://localhost:5000/api/v1/users').then((response) => {
            console.log(response.data);
            this.setState({ dbuser: response.data });
        });
    }
    update = (id,point) => {
        // console.log(id,point);
        var types = "price";
        var admins = "admin";
        var points = point;
        Axios.put("http://localhost:5000/update", {type: types,admin: admins,point: point,id: id}).then((response) => {
            // console.log(id,point,types,admins);
            this.setState({
                dbitemorder : [
                    this.state.dbitemorder.map((val) => {
                        return val.id = id ? {
                            id: val.id,
                            order_no: val.order_no,
                            order_item: val.order_item,
                            volume: val.volume,
                            point_token: val.point_token,
                            type: types,
                            order_date: val.order_date,
                            username: val.username,
                            balance: val.balance,
                            admin_approve: admins,
                            point_token_broken: points,
                            approve_date: val.approve_date
                        } : val;
                    })
                ]
            });
            
        })
    }
    shoot = (id, point, username) => e => {
        console.log(id, point, username);

        const addressburn = '0x5e1A5eE30870982ddaa11a5740DbDd5CA0334335';
        var addressmap = '';
        const gatname = this.state.dbuser.map((address) => {
            if (address.username == username) {
                addressmap =  address.address;
                // console.log(addressmap);
            }
        });
     
        this.state.contract.methods
            .transfer(addressmap, point)
            .send({ from: this.state.account })
            .once("receipt", (receipt) => {
                console.log("ToSusess", addressmap, ":", point);
                this.update(id,point);
                // document.getElementById("contentCowCoin").innerHTML = "";
                window.location.reload();
        });
        // console.log(addCert);
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
            dbuser: [],
            dbitemorder: []

        }
    }
    
    render() {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1">TRANS ORDER</h1>
                        <div className="input-group mb-3 text-center">
                            <p>
                            ทำหน้าที่ในการ burn เข้ากระเป๋าสำหรับการ Burn Token  ทิ้งไป
                            </p>

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
                                    <th scope="col">Volume</th>
                                    <th scope="col">Point Token</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dbitemorder.map((val, key) => {
                                    if (val.type == "sell") {
                                        return (
                                            <>
                                                <tr>
                                                    {/* <th scope="row">{val.id}</th> */}
                                                    <td>{val.order_no}</td>
                                                    <td>{val.order_item}</td>
                                                    <td>{Moment(val.order_date).format("DD-MM-YYYY")}</td>
                                                    <td>{Intl.NumberFormat().format(val.volume)}</td>
                                                    <td>{Intl.NumberFormat().format(val.point_token)} KSSBC</td>
                                                    <td>
                                                        <input
                                                            type="submit"
                                                            value={`อนุมัติ ${val.order_no}`}
                                                            className="btn btn-success btn-lg px-3"
                                                            onClick={this.shoot(val.id, val.point_token, val.username)}
                                                        />
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    }
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

}

export default TransOrder;