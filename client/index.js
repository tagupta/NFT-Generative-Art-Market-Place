var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xbf73c0a69fa9B305eE43d514eD8148eE4226Fd62";
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
  console.log(kitty.genes + " " + id + " " + kitty.generation);
  appendCat(kitty.genes,id,kitty.generation)
}
