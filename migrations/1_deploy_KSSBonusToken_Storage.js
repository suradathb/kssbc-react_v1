const KSSBonusToken = artifacts.require("KSSBonusToken");

module.exports = function (deployer) {
  account = "0xa21c02f06D9464ef504245A40442001E209d165D";
  deployer.deploy(KSSBonusToken,account);
};