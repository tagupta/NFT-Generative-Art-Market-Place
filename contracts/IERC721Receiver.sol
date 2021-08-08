// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22 <=0.9.0;

interface IERC721Receiver{
    function onERC721Received(address operator,address from, uint tokenId, bytes memory data) external returns(bytes4);
}