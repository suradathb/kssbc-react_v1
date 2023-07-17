// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public isKYCVerified;
    mapping(address => bool) public isAMLVerified;
    event Burn(address indexed burner, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    constructor(
        address _owner,
        uint256 initialSupply,
        string memory tokenName,
        string memory tokenSymbol
    ) {
        owner = _owner;
        totalSupply = initialSupply;
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
        decimals = 18;
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can mint new tokens");
        require(amount > 0, "Invalid value.");
        require(to != address(0));

        totalSupply += amount;
        balanceOf[to] += amount;

        emit Transfer(address(0), to, amount);
    }

    function transfer(address recipient, uint256 amount) public {
        require(isKYCVerified[msg.sender], "Sender must be KYC verified.");
        require(isAMLVerified[msg.sender], "Sender must be AML verified.");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        require(recipient != address(0),"Recipient address cannot be 0x0");
        // IERC20(address(this)).transfer(recipient, amount);
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        require(spender != address(0));
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public {
        require(sender != address(0));
        require(recipient != address(0));
        require(isKYCVerified[msg.sender], "Sender must be KYC verified.");
        require(isAMLVerified[msg.sender], "Sender must be AML verified.");
        require(amount > 0);
        require(
            allowance[sender][msg.sender] >= amount,
            "Not enough allowance."
        );
        require(
            balanceOf[recipient] + amount >= balanceOf[recipient],
            "Overflow."
        );

        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function burn(address burner, uint256 amount) public {
        require(balanceOf[burner] >= amount);
        balanceOf[burner] -= amount;
        totalSupply -= amount;
        emit Burn(burner, amount);
    }

    // Only the owner can verify a user's KYC status
    function verifyKYC(address _user) public {
        require(msg.sender == owner, "Only the owner can verify KYC status.");
        isKYCVerified[_user] = true;
    }

    // Only the owner can verify a user's AML status
    function verifyAML(address _user) public {
        require(msg.sender == owner, "Only the owner can verify AML status.");
        isAMLVerified[_user] = true;
    }
}
