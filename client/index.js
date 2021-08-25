var web3 = new Web3(Web3.givenProvider);

var instance;
var marketInstance;
var user;
var contractAddress = "0x002B16dEFbF51d2B76489eCe5Ddc0F55fACfA5be";
var marketAddress = "0xF398863b60F5f334395E4d6ddD907ce7b9974db7";
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
        listenMarketTransactionEvent();
        
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
  getInventory();
}

async function getInventory(){
  var arrayId = await marketInstance.methods.getAllTokenOnSale().call();
  if(arrayId.length >=1){
    $('#buyKitty').removeClass('disabled');
  }
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

async function singleKitty(id,action){
  var kitty = await instance.methods.getKitty(id).call();
  if(action == "Buy"){
    var offerDetails = await marketInstance.methods.getOffer(id).call();
    var ethPrice =  Web3.utils.fromWei(offerDetails.price,"ether");
    displayCat(kitty.birthTime,kitty.generation,kitty.genes,id,action,ethPrice);
  }else{
    displayCat(kitty.birthTime,kitty.generation,kitty.genes,id,action,0);
  }
  
}

async function breedKitties(gen){
  if(isFirst == true) $('#catsDiv').html("");
  
  var arrayId = await instance.methods.getKittyIds(user).call();
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

async function createOffer(id){
 var price = $("#kittyPrice").val();
 var amount = web3.utils.toWei(price,"ether");
  await marketInstance.methods.setOffer(amount,id).send({},function(error,txHash){
    if (error) {
      console.log("Error occured while creating offer: "+error);
    } else {
      console.log("Success on offer creation: "+txHash);
    }
  });

}

async function removeOffer(id){
  await marketInstance.methods.removeOffer(id).send({},function(error,txHash){
    if (error) {
      console.log("Error while removing offer: "+error);
    } else {
      console.log("Success on offer removal"+ txHash);
    }
  });
}

async function buyingKitty(id,price){
  var newPrice = price.toString();
  var amount = web3.utils.toWei(newPrice,"ether");
  console.log('amount' + amount);
  await marketInstance.methods.buyKitty(id).send({value: amount},function(error,txHash){
    if (error) {
      console.log("Error while buying kitties: "+error);
    } else {
      console.log("Success on kitty purchase: "+txHash);
    }
  });
}