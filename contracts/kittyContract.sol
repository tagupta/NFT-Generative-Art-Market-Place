// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22 <=0.9.0;
import './IERC721.sol';
import './Ownable.sol';

contract KittyContract is IERC721,Ownable{
   string public constant _name = "TanuKitties";
   string public constant _symbol = "TKT";
   uint public constant CREATION_LIMIT_GEN0 = 10;

   event Birth(address owner, uint kittenId,uint mumId,uint dadId,uint genes);
  
   struct Kitty{
       uint256 genes;
       uint64 birthTime;
       uint32 mumId;
       uint32 dadId;
       uint16 generation;
   }
   Kitty[] kitties;

   mapping(address => uint)private ownershipTokenCount; //token owner => #tokens
   mapping(uint => address)private tokenOwner; // tokenId => tokenowner
   mapping(address => uint[])ownershipTokenList; // tokenOwner => list of tokenIds
   uint gen0Counter;
   

   function getKitty(uint _tokenId) external view returns(Kitty memory,address){
      return (kitties[_tokenId],tokenOwner[_tokenId]);
   }
   function createKittyGen0(uint _genes) public onlyOwner returns(uint){
     require(gen0Counter < CREATION_LIMIT_GEN0,'Gen0 creation limit exceeds');
     gen0Counter++;
     return _createKitty(0,0,_genes,0,owner); 
   }

   function _createKitty(uint _mumId,uint _dadId,uint _genes,uint _generation, address _owner) private returns(uint){
     Kitty memory newKitty = Kitty({genes :_genes,
                                    birthTime: uint64(block.timestamp),
                                    mumId: uint32(_mumId),
                                    dadId: uint32(_dadId),
                                    generation: uint16(_generation)});
     uint newID = kitties.length;
     kitties.push(newKitty);
     emit Birth(_owner,newID,_mumId,_dadId,_genes);
     _transfer(address(0),_owner,newID);

     return newID;
   }

   function balanceOf(address owner) external view override returns (uint256 balance){
       balance = ownershipTokenCount[owner];
   }
   
   function totalSupply() external view override returns (uint256 total){
      total = kitties.length;
   }

   function name() external pure override returns (string memory){
      return _name;
   }

   function symbol() external pure override returns (string memory tokenSymbol){
       tokenSymbol = _symbol;
   }

   function ownerOf(uint256 tokenId) external view override returns (address owner){
      require(tokenOwner[tokenId] != address(0),"Token with this ID doesn't exist");
      owner = tokenOwner[tokenId];
   }
   
   function transfer(address to, uint256 tokenId) external override{
      require(to != address(0),"Receiver can not be zero address");
      require(to != address(this),"You can't transfer token to this contract");
      require(owns(msg.sender,tokenId),"You're not the owner of this token");
      _transfer(msg.sender, to, tokenId);
   }

   function _transfer(address from, address to, uint tokenId) internal{
       //from
       if(from != address(0)){
        ownershipTokenCount[from] -= 1;
        uint[] storage fromTokens = ownershipTokenList[from];
        uint len = fromTokens.length;
        uint tokenToRemove = 0;
        for(uint i = 0 ; i < len ; i++){
            if(fromTokens[i] == tokenId){
                tokenToRemove = i;
                break;
            }
        }
        fromTokens[tokenToRemove] = fromTokens[len-1];
        fromTokens.pop();
       }
       
       //to
       ownershipTokenCount[to] += 1;
       tokenOwner[tokenId] = to;
       ownershipTokenList[to].push(tokenId);

       emit Transfer(from,to,tokenId);
   }

   function owns(address claimant, uint tokenID)internal view returns(bool){
      return (tokenOwner[tokenID] == claimant);
   }

}