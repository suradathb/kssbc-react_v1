const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
    account = "0xE935a4C890a1D1B8b1F9aFC83eA96b65792e2736";
    initialSupply = 0;
    tokenname = "New Token Security Token Offering";
    tokensymbol = "STOKSS";
    deployer.deploy(MyToken,account,initialSupply,tokenname,tokensymbol);
};