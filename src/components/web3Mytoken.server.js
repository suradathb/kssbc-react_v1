import Web3 from "web3";
import MyToken from "../abis/MyToken.json";

class Web3MyTokenService {
  constructor() {
    this.web3 = null;
    this.state = {
      account: "",
      MyToken: null,
      totalSupply: 0,
      symbol: "",
      name: "",
      decimals: "",
      owner:""
    };
  }

  async loadWeb3() {
    if (window.web3) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.listenForAccountChanges();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    this.web3 = window.web3;
  }

  listenForAccountChanges() {
    window.ethereum.on('accountsChanged', (accounts) => {
      this.state.account = accounts[0];
      this.loadBlockchainData();
    });
  }

  async loadBlockchainData() {
    if (this.web3) {
      const accounts = await this.web3.eth.getAccounts();
      this.state.account = accounts[0];
      const networkId = await this.web3.eth.net.getId();
      const networkData = MyToken.networks[networkId];
      const abi = MyToken.abi;
      const address = networkData.address;
      const myToken = new this.web3.eth.Contract(abi, address);
      this.state.MyToken = myToken;
      const TotalSupply = await myToken.methods.totalSupply().call({from:accounts[0]});
      this.state.totalSupply = TotalSupply;
      const name = await myToken.methods.name().call({from:accounts[0]});
      this.state.name = name;
      const symbol = await myToken.methods.symbol().call({from:accounts[0]});
      this.state.symbol = symbol;
      const decimals = await myToken.methods.decimals().call({from:accounts[0]});
      this.state.decimals = decimals;
      const owner = await myToken.methods.owner().call({from:accounts[0]});
      this.state.owner = owner;
    }
  }
}

const web3MyTokenService = new Web3MyTokenService();
export default web3MyTokenService;
