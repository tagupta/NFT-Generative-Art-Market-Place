// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22 <=0.9.0;
import './IERC721.sol';
import './Ownable.sol';

contract KittyContract is IERC721,Ownable{
   string public constant _name = "TanuKitties";
   string public constant _symbol = "TKT";
   uint public constant CREATION_LIMIT_GEN0 = 20;

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
   mapping(uint => address)public tokenOwner; // tokenId => tokenowner
   mapping(uint => address) public kittyIndexToApproved;
   mapping(address => mapping(address => bool))private _operatorApprovals;
   uint gen0Counter;
   

   function getKitty(uint _tokenId) external view returns(uint genes,
                                                          uint birthTime,
                                                          uint mumId,
                                                          uint dadId,
                                                          uint generation){
      Kitty storage tempKitty = kitties[_tokenId];
      genes = tempKitty.genes;
      birthTime = tempKitty.birthTime;
      mumId = tempKitty.mumId;
      dadId = tempKitty.dadId;
      generation = tempKitty.generation;
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
        delete kittyIndexToApproved[tokenId]; //nice point
       }
       
       //to
       ownershipTokenCount[to] += 1;
       tokenOwner[tokenId] = to;

       emit Transfer(from,to,tokenId);
   }

   function approve(address _approved, uint256 _tokenId) external override{
      require(owns(msg.sender,_tokenId) || operates(msg.sender,_tokenId),'Someone else is tampering the approve');
      _approve(_approved,_tokenId);
      emit Approval(msg.sender, _approved, _tokenId);
   }

   function _approve(address _approved, uint _tokenId)private{
       kittyIndexToApproved[_tokenId] = _approved;
   }

   function setApprovalForAll(address _operator, bool _approved) external override{
      require(msg.sender != _operator,"You can't approve yourself");
      _setApprovalForAll(msg.sender,_operator,_approved);
      emit ApprovalForAll(msg.sender,_operator,_approved);
   }
   
   function _setApprovalForAll(address _owner,address _operator,bool _approved)private{
      _operatorApprovals[_owner][_operator] = _approved;
   }

   function getApproved(uint256 _tokenId) external view override returns (address){
       require(_tokenId < kitties.length,'Invalid token');
       return kittyIndexToApproved[_tokenId];
   }

   function isApprovedForAll(address _owner, address _operator) external view override returns (bool){
     return _operatorApprovals[_owner][_operator];
   }

   function transferFrom(address _from, address _to, uint256 _tokenId) external override{
      require(_tokenId < kitties.length,'Invalid token Id');
      require(_to != address(0),"Receiver address should not be address(0)");
      require(_from == tokenOwner[_tokenId],"Sender account doesn't belong to token owner");
      require(msg.sender == _from || operates(msg.sender,_tokenId) || operatesAll(_from,msg.sender),'Unauthorized tampering with transferFrom');
      
      _transfer(_from,_to,_tokenId);
   }


   function owns(address claimant, uint tokenID)internal view returns(bool){
      return (tokenOwner[tokenID] == claimant);
   }

   function operates(address _approved,uint _tokenId) internal view returns(bool){
      return kittyIndexToApproved[_tokenId] == _approved;
   }
   function operatesAll(address _owner, address _operator) internal view returns (bool){
     return _operatorApprovals[_owner][_operator];
   }


}