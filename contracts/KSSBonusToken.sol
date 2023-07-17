// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

contract KSSBonusToken is ERC20PresetFixedSupply {
  constructor(address owner)
    ERC20PresetFixedSupply("KSS Bonus Token", "KSSBC", 30000000 * 10**18, owner)
  {}
}
