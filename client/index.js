var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x2f805b4AC34a13e47F1B3Fbd783868b518196954";
var loggedIn = false;
var contractOwner;
function start(){
    if(loggedIn){
        return true;
    }
    window.ethereum.enable().then((accounts)=>{
        loggedIn = true;
        instance = new web3.eth.Contract(abi,contractAddress,{from: accounts[0]});
        user = accounts[0];
        console.log(instance);
        location.reload();
    });
}
$(document).ready(()=>{
    window.ethereum.enable().then((accounts)=>{
        instance = new web3.eth.Contract(abi,contractAddress,{from: accounts[0]});
        user = accounts[0];
        instance.methods.owner().call().then(test => {
          contractOwner = test;
        });
        listenBirthEvent();
        
    });
    web3.eth.getAccounts((err, accounts) => {
        instance = new web3.eth.Contract(abi,contractAddress,{from: accounts[0]});
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
  var arrayId = await instance.methods.getKittyIds(contractOwner).call();
  for(var i = 0 ; i < arrayId.length ; i++){
    appendKitty(arrayId[i]);
  }
}

async function appendKitty(id) {
  var kitty = await instance.methods.getKitty(id).call();
  appendCat(kitty.genes,id,kitty.generation)
}

async function breedKitties(gen){
  var arrayId = await instance.methods.getKittyIds(contractOwner).call();
  for(var i = 0 ; i < arrayId.length ; i++){
    appendBreed(arrayId[i],gen);
  }
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
