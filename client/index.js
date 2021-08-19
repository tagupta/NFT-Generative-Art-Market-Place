var web3 = new Web3(Web3.givenProvider);

var instance;
var marketInstance;
var user;
var contractAddress = "0xbD8F856CAb1Ea91D59B1C2A151e3aaf725c115Ed";
var marketAddress = "0xfC0FcD529506b3891c655F82e40Fc2FCbc0CCb31";
var loggedIn = false;
var contractOwner;
var isFirst = false;

function start(){
    if(loggedIn){
        return true;
    }
    window.ethereum.enable().then((accounts)=>{
        loggedIn = true;
        instance = new web3.eth.Contract(abi.kittyContract,contractAddress,{from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.kittyMarketPlace,marketAddress,{from: accounts[0]});
        user = accounts[0];
        location.reload();
    });
}
$(document).ready(()=>{
    window.ethereum.enable().then((accounts)=>{
        instance = new web3.eth.Contract(abi.kittyContract,contractAddress,{from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.kittyMarketPlace,marketAddress,{from: accounts[0]});
        console.log(instance);
        console.log(marketInstance);
        user = accounts[0];
        instance.methods.owner().call().then(test => {
          contractOwner = test;
        });
        listenBirthEvent();
        
    });
    web3.eth.getAccounts((err, accounts) => {
        instance = new web3.eth.Contract(abi.kittyContract,contractAddress,{from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.kittyMarketPlace,marketAddress,{from: accounts[0]});
        if (accounts.length == 0) {
          loggedIn = false;
        } else {
          loggedIn = true;
        }
        user = accounts[0];
        menu();
});

});

$("#newgen0Kitty").click( ()=>{
    var dnaStr = getDna();
    dnaStr = dnaStr.toString();
    instance.methods.createKittyGen0(dnaStr).send({},function(error,txHash){
    if (error) {
        console.log(error);
      } else {
        console.log(txHash);
      }

    });
});

 async function contractCatalog(){
  var arrayId = await instance.methods.getKittyIds(user).call();
  for(var i = 0 ; i < arrayId.length ; i++){
    if(arrayId[i] != 0){
      appendKitty(arrayId[i]);
    }
  }
}
async function contractMarket(){
  var isApproved = await instance.methods.isApprovedForAll(user,marketAddress).call();
  if(isApproved == true){
    getInventory();
  }
  else{
    $('#approveModal').modal('show');
  }
}

async function approveMarketPlace(){
  await instance.methods.setApprovalForAll(marketAddress,true).send({},function(error,txHash){
    if (error) {
      console.log("Error occured while approving Market Place "+ error);
    } else {
      console.log("Successfully approved Market Place"+ txHash);
    }
  });
}

async function getInventory(){
  var arrayId = await marketInstance.methods.getAllTokenOnSale().call();
  for(var i = 0 ; i < arrayId.length ; i++){
    if(arrayId[i] != 0){
      appendKitty(arrayId[i]);
    }
  }
}
async function appendKitty(id) {
  var kitty = await instance.methods.getKitty(id).call();
  appendCat(kitty.genes,id,kitty.generation)
}

async function singleKitty(id){
  var kitty = await instance.methods.getKitty(id).call();
  displayCat(kitty.birthTime,kitty.generation,kitty.genes,id);
}

async function breedKitties(gen){
  if(isFirst == true) $('#catsDiv').html("");
  
  var arrayId = await instance.methods.getKittyIds(contractOwner).call();
  for(var i = 0 ; i < arrayId.length ; i++){
    appendBreed(arrayId[i],gen);
  }
  isFirst = true;
}

async function appendBreed(id,gen){
  var kitty = await instance.methods.getKitty(id).call();
  breedingCats(kitty.genes,id,kitty.generation,gen)
}

async function breed(dadId,mumId){
  instance.methods.breed(dadId,mumId).send({},function(error,txHash){
    if (error) {
      console.log("Error occured while breeding "+ error);
    } else {
      console.log("Success on breeding "+ txHash);
    }

  });
};
