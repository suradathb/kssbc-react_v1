
import React from "react";
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';


class ListUser extends React.Component {
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
        // console.log(item, num);
        const addCert = this.state.contract.methods
            .transfer(num, item)
            .send({ from: this.state.account })
            .once("receipt", (receipt) => {
                console.log("ToSusess", num ,":",item);
                // document.getElementById("contentCowCoin").innerHTML = "";
                window.location.reload();
            });
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
            address:""

        }
    }
    PRODUCTS = [
        { id: 1, name: "สมชัย ใจตั่งมั่น", date: '10/10/2022', volume: 5000, pointtoken: '5' },
        { id: 2, name: "เสกสรร กันยายน", date: '10/10/2022', volume: 10000, pointtoken: '10' },
        { id: 3, name: "smart contract", date: '10/10/2022', volume: 100000, pointtoken: '100' },
        { id: 4, name: "สรรหา แต้มมาเติม", date: '10/10/2022', volume: 100000, pointtoken: '100' },
        { id: 5, name: "สาทร ยโสธร", date: '10/10/2022', volume: 200000, pointtoken: '200' },

    ];
    user = [
        { id: 1, username: "admin", password: "password@1", address: "0xE935a4C890a1D1B8b1F9aFC83eA96b65792e2736", hashkey: "e2024b93133398322d3e02b09108668571983a6b79e91f68b35a9e261c58f3a5", type: "A" },
        { id: 2, username: "user1", password: "password@1", address: "0xEDB04B6aBae9eb8f486767a4D6A433bB28288598", hashkey: "968ba4a0e1d01c637d9d8dd7958373bc3562d2215813f607779b07fbcddd8dd2", type: "A" },
        { id: 3, username: "user2", password: "password@1", address: "0xEf5847A1dCA3908499065B11d236e1dB3a0f89aE", hashkey: "7112160e33d7de0353fe3c5989aeafbe41e6d0fe1cef2c9209c9670d5cfa6505", type: "A" },
    ]
    usernameshow = async e => {
        const test = this.user.filter(obj => {
            if (obj.address == this.state.account) {
                this.setState({ 
                    acname: obj.username,
                    address: obj.address
                });
            }

        });
    }
    render() {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1">Create User Bonus Token</h1>
                        <div className="input-group mb-3 text-center">
                            <p>
                                {/* {this.state.acname} */}
                            </p>

                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Volume</th>
                                    <th scope="col">Point Token</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.PRODUCTS.map((name, key) =>
                                    <>
                                        <tr>
                                            <th scope="row">{name.id}</th>
                                            <td>{name.name}</td>
                                            <td>{name.date}</td>
                                            <td>{Intl.NumberFormat().format(name.volume)}</td>
                                            <td>{Intl.NumberFormat().format(name.pointtoken)} KSSBC</td>
                                            <td>
                                                <input
                                                    type="submit"
                                                    value="อนุมัติ Token"
                                                    class="btn btn-success btn-lg px-3"
                                                    onClick={this.shoot(this.user[2].address, name.pointtoken)}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

}

export default ListUser;