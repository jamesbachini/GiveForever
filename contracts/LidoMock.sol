// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LidoMock is ERC20 {

    constructor() ERC20("Lido stETH", "stETH") {

    }

    function submit(address _referral) external payable returns (uint){ 
      _mint(msg.sender, msg.value + 2e16);
    }
        
} 