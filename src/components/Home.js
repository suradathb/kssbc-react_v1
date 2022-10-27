
import React, { Component } from "react";
import KSSBC from './../abis/KSSBonusToken.json';
import Web3 from 'web3';
import CurrencyInput  from 'react-currency-input-field';

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
            this.setState({balance:balance});
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            contract: "",
            balance:"",
            decimals:"",
            holders:"",
            
        }
    }
    render() {
        return (
            <>
                <div class="container-fluid bg-light py-5">
                    <div class="col-md-6 m-auto text-center">
                        <h1 class="h1">หลักทรัพย์กรุงศรี Bonus Token</h1>
                        <div class="input-group mb-3 text-center">
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="row py-5">
                        <form className="col-md-9 m-auto" method="post" role="form">
                            <div className="row">
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="inputname">Total Supply : <CurrencyInput  value={this.state.balance} /> KSSBC</label>
                                    {/* <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" /> */}
                                </div>
                                <div className="form-group col-md-6 mb-3">
                                    <label htmlFor="inputemail">Email</label>
                                    <input type="email" className="form-control mt-1" id="email" name="email" placeholder="Email" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputsubject">Subject</label>
                                <input type="text" className="form-control mt-1" id="subject" name="subject" placeholder="Subject" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputmessage">Message</label>
                                <textarea className="form-control mt-1" id="message" name="message" placeholder="Message" rows="8"></textarea>
                            </div>
                            <div className="row">
                                <div className="col text-end mt-2">
                                    <button type="submit" className="btn btn-success btn-lg px-3">Let’s Talk</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;