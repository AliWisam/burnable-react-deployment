// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract KickStarterBurnable is ERC20, ERC20Burnable {
    constructor(string memory _name, string memory _symbol,uint256 _supply, address payable _service) ERC20(_name, _symbol) payable{
	    _service.transfer(msg.value);
        _mint(msg.sender, _supply * 10 ** decimals());
        
    }
}