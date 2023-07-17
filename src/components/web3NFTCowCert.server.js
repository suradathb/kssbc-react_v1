import Web3 from "web3";
import NFTCowCert from "../abis/NFTCowCert.json";

class Web3NFTCowCertService {
  constructor() {
    this.web3 = null;
    this.state = {
      account: "",
      NFTCowCert: null,
      totalSupply: 0,
      symbol: "",
      name: "",
      decimals: "",
      owner:"",
      ownerCount:0,
      NFTCowCount:0,
      balanceOf:0,
      TaskMapOwner:""
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
      const networkData = NFTCowCert.networks[networkId];
      const abi = NFTCowCert.abi;
      const address = networkData.address;
      const nFTCowCert = new this.web3.eth.Contract(abi, address);
      this.state.NFTCowCert = nFTCowCert;
      // const TotalSupply = await nFTCowCert.methods.totalSupply().call({from:accounts[0]});
      // this.state.totalSupply = TotalSupply;
      const name = await nFTCowCert.methods.name().call({from:accounts[0]});
      this.state.name = name;
      const symbol = await nFTCowCert.methods.symbol().call({from:accounts[0]});
      this.state.symbol = symbol;
      const goevrcount = await nFTCowCert.methods.ownerCount().call({from:accounts[0]});
      this.state.ownerCount = goevrcount;
      const countcowcert = await nFTCowCert.methods.NFTCowCount().call({from:accounts[0]});
      this.state.NFTCowCount = countcowcert;
      const balanceOf = await nFTCowCert.methods.balanceOf(accounts[0]).call({from:accounts[0]});
      this.state.balanceOf = balanceOf;
      for(var i = 0;i <= goevrcount;i++){
        const taskMapOwner = await nFTCowCert.methods.TaskMapOwner(i).call({from:accounts[0]});
        this.state.TaskMapOwner = taskMapOwner;
      }
      
      // const owner = await myToken.methods.owner().call({from:accounts[0]});
      // this.state.owner = owner;
    }
  }
}

const web3NFTCowCertService = new Web3NFTCowCertService();
export default web3NFTCowCertService;
