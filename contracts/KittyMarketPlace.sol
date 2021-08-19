// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22 <=0.9.0;
import './IKittyMarketPlace.sol';
import './Ownable.sol';
import './kittyContract.sol';

contract KittyMarketPlace is IKittyMarketPlace,Ownable{
    KittyContract private _kittyContract;
    struct Offer{
        address payable seller;
        uint price;
        uint tokenId;
        uint index;
        bool active;
    }
    Offer[] offers;
    mapping(uint => Offer)tokenIdtoOffer;

    constructor(address _kittyAddress){
        setKittyContract(_kittyAddress);
    }

    function setKittyContract(address _kittyContractAddress) public override onlyOwner{
       _kittyContract = KittyContract(_kittyContractAddress);
    }

    function getOffer(uint256 _tokenId) external view override returns ( address seller, 
                                                                uint256 price, 
                                                                uint256 index, 
                                                                uint256 tokenId, 
                                                                bool active){
        require(isActive(_tokenId), 'No active offer for this tokenId');
        Offer storage offer = tokenIdtoOffer[_tokenId];
        seller = offer.seller;
        price = offer.price;
        index = offer.index;
        tokenId = offer.tokenId;
        active = offer.active;
    }
    
    function getAllTokenOnSale() external view override returns(uint256[] memory listOfOffers){
        uint offersLength = offers.length;
        if(offersLength == 0){
           listOfOffers = new uint256[](0); 
        }
        else{
          uint[] memory result = new uint[](offersLength); //[0,0]
          for(uint i = 0 ; i < offersLength ; i++){
            if(offers[i].active){
              result[i] = offers[i].tokenId;
            }
         }
         return result;
        } 
    }

    function setOffer(uint256 _price, uint256 _tokenId) external override{
       require(_ownKitty(msg.sender, _tokenId),'Only owners can create an offer');
       require(!isActive(_tokenId),'One offer already exists');
       require(_kittyContract.isApprovedForAll(msg.sender, address(this)),'Market place contract is not an operator');
       _setOffer(_price,_tokenId);
    }
    
    function _setOffer(uint256 _price, uint256 _tokenId) internal {
       offers.push(Offer(payable(msg.sender),_price,_tokenId,offers.length,true));
       tokenIdtoOffer[_tokenId] = offers[offers.length-1];
       
       emit MarketTransaction("Create offer",msg.sender,_tokenId);
    }

    function removeOffer(uint256 _tokenId) external override{
       require(tokenIdtoOffer[_tokenId].seller == msg.sender,'Only sellers can remove an offer');
       _removeOffer(_tokenId);
    }

    function _removeOffer(uint256 _tokenId) internal{
        offers[tokenIdtoOffer[_tokenId].index].active = false;
        delete tokenIdtoOffer[_tokenId];

        emit MarketTransaction("Remove offer",msg.sender,_tokenId);
    }

    function buyKitty(uint256 _tokenId) external override payable{
        Offer memory offer = tokenIdtoOffer[_tokenId];
        require(isActive(_tokenId),'This kitty is not available for sell');
        require(msg.value == offer.price,'Please send correct amount');
        
        //Delete the kitty from the mapping before paying out
        delete tokenIdtoOffer[_tokenId];
        offers[offer.index].active = false;
        
        if(offer.price > 0){
            offer.seller.transfer(offer.price);
        }

        _kittyContract.transferFrom(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy",msg.sender,_tokenId);
    }

     function _ownKitty(address claimant,uint _tokenId) internal view returns(bool){
        return (_kittyContract.ownerOf(_tokenId) == claimant);
    }

    function isActive(uint _tokenId) internal view returns(bool){
        return tokenIdtoOffer[_tokenId].active;
    }

}