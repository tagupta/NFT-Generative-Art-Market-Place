# Ethereum Dapp Crypto Kitties

Building the Crypto Kitty clone.

## About
This is a project I built while studying how to program a decentralized application (dApp) for the Ethereum blockchain at Ivan on Tech Academy. It's my own version of the popular CryptoKitties game on Ethereum, which allows users to buy, collect, breed and sell virtual kitties living on the blockchain.

Each kitty in the dApp is an ERC721 non-fungible token (NFT) - a unique digital item controlled solely by the owner of the NFT. Users of the dApp can design and create kitty NFTs, combine two kitties to breed a new kitty which randomly inherits traits from its parents, and they can buy or sell these NFTs on a non-custodial marketplace using cryptocurrency (ETH).

This dApp was built using:
* HTML 5
* Java script
* Bootstrap 5
* Solidity 0.8
* OpenZeppelin
* Truffle
* Ganache
* Web3.js
* MetaMask

## Access DApp on Testnet
1. Make sure you have [Metamask](https://metamask.io/) installed to interact with web 3.0 content in the browser.
2. In MetaMask, switch the blockchain network from ```Ethereum Mainnet``` to ```Ropsten Test Network```.
3. Get some testnet ETH from an Ethereum Ropsten faucet like [this one](https://faucet.dimensions.network/).
4. After cloning the app in Visual Studio, run the python server by using command  ```python -m http.server 8000```.
5. Access the dApp in the browser [here](http://localhost:8000/index.html).
6. Now you're ready to use the dApp running on the Ethereum **Ropsten testnet**!

## Usage
**K-FACTORY**
*****

**BREEDING**
https://user-images.githubusercontent.com/45707143/135216615-6dc59d90-87df-4dcd-9164-5930d38b5a28.mp4
*****

**SELLING**
https://user-images.githubusercontent.com/45707143/135216981-61f00795-f92e-4ec1-bd5b-b7b2affcdbd1.mp4
*****

**BUYING**
https://user-images.githubusercontent.com/45707143/135217127-2985c38b-2b52-4434-8c1f-cc4a31db1d7d.mp4
*****

## Set up Local Development Environment
**Install Project and [Truffle](https://www.trufflesuite.com/truffle)**

```
cd crypto-kitties
npm install
```
```
npm install truffle -g
```
**Set up Ganache**
1. Download [Ganache](https://www.trufflesuite.com/ganache) to set up a local Ethereum blockchain.
2. Start Ganache and create a new Ethereum workspace using the mnemonic phrase ```mnemonicDev``` found in truffle-config.js.
3. Deploy the smart contracts of the project on Ganache using Truffle. Do so by runnning:
``` 
truffle migrate --network ganache --reset

```
4. The console will output the address of newly deployed contracts. In index.js replace the values of **contractAddress** and **marketPlace Address** accordingly.

**Set up MetaMask**
1. Install [MetaMask](https://metamask.io/) to interact with the dApp in the browser.
2. Add your Ganache network as a custom RPC network to MetaMask and connect to it. The RPC URL is shown in Ganache. For the Chain ID use ```1337``` or what MetaMask suggests.
3. Import two Ethereum accounts from Ganache to MetaMask by their private keys. The balances of these accounts should now be visible in MetaMask.

**Set up FrontEnd**
1. Start a localhost server for the frontend of the dApp:
```
cd client
python3 -m http.server 8000
```
2. Access the dApp in the browser http://localhost:8000/

## Enjoy
Now you can use the dapp locally and use it for further development.
