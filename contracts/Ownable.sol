// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22 <=0.9.0;

contract Ownable{
    address public owner;
    constructor(){
        owner = msg.sender;
    }
    
    modifier onlyOwner(){
        require(owner == msg.sender,'Accessible to owner only');
        _;
    }
}