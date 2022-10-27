// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../contracts/KSSBonusToken.sol";
// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract KSSBonusTokenTest {

  function testWriteValue() public {
    KSSBonusToken kSSBonusToken = KSSBonusToken(DeployedAddresses.KSSBonusToken());

    Assert.equal(kSSBonusToken.TotalSupply(), 0, "Contract should have 0 stored");
    Assert.equal(kSSBonusToken.decimals(), 1, "Contract should have 1 stored");
    Assert.equal(kSSBonusToken.name(), 2, "Contract should have 2 stored");
    Assert.equal(kSSBonusToken.symbol(), 3, "Contract should have 3 stored");
  }
}
