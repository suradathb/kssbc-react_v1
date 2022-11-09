import React from 'react';
import Axios from 'axios';
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';
import SubMenu from './SubMenu';

class AddBonusPoint extends React.Component {
    async componentWillMount() {
        await this.getPoint();
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
    async getPoint() {
        Axios.get('http://localhost:5000/api/v1/transorder').then((response) => {
            // console.log(response.data);
            this.setState({ dbtrans: response.data });
        });
    }
    AddTokenBonus = (address, token) => e => {
        console.log(address,token);
        this.state.contract.methods
            .transfer(address, token)
            .send({ from: this.state.account })
            .once("receipt", (receipt) => {
                console.log("ToSusess", address, ":", token);
                // window.location.reload();
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            dbtrans: [],
            dbuser:[],
            account: "",
            contract: "",

        }

    }
    render() {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1">Add Bonus Token</h1>
                        <div className="input-group mb-3 text-center">
                            <p>
                                admin ที่ถือกระเป๋า token  หลักเท่านั้นจะมีสิทธิ์เข้าสู่หน้าสำหรับเพิ่ม Token  ให้สมาชิก Type = admin
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
                                    <th scope="col">Order Item</th>
                                    <th scope="col">Volume</th>
                                    <th scope="col">Point Token</th>
                                    <th scope="col">Approve Date</th>
                                    <th scope="col">User Name</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dbtrans.map((val, key) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    {val.username}
                                                </td>
                                                <td>
                                                    {val.order_item}
                                                </td>
                                                <td>
                                                    {val.volume}
                                                </td>
                                                <td>
                                                    {val.point_token}
                                                </td>
                                                <td>{val.approve_date}</td>
                                                <td>
                                                    {val.username}
                                                </td>
                                                <td>
                                                    <input
                                                        type="submit"
                                                        value="อนุมัติ Token"
                                                        className="btn btn-success btn-lg px-3"
                                                        onClick={this.AddTokenBonus(val.address, val.point_token)}
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                                {/* <tr>
                                    <td>suradath</td>
                                    <td>5000</td>
                                    <td>
                                        <div class="input-group mb-3">
                                            <input type="number" class="form-control" value={5} aria-label="Amount (to the nearest dollar)" />
                                        </div>
                                    </td>
                                    <td>
                                        Bay
                                    </td>
                                    <td>07/11/2022</td>
                                    <td>
                                        <input
                                            type="submit"
                                            value="อนุมัติ Token"
                                            className="btn btn-success btn-lg px-3"
                                        // onClick={this.shoot(this.user[2].address, name.pointtoken)}
                                        />
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default AddBonusPoint;