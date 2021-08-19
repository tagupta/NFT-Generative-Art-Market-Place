const Kitty = artifacts.require("KittyContract");
const MarketPlace = artifacts.require("KittyMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(MarketPlace,Kitty.address);
};
