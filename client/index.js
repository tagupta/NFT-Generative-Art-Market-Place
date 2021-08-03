var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xd7ff0A95481Fe172bb8b925BCaA688f253bDfb4f";

$(document).ready(()=>{
   window.ethereum.enable().then((accounts)=>{
       instance = new web3.eth.Contract(abi,contractAddress,{from: accounts[0]});
       user = accounts[0];
       console.log(instance);
       listenBirthEvent();
   })
    
   $('#newgen0Kitty').click(()=>{
       var dnaStr = getDna();
       instance.methods.createKittyGen0(dnaStr).send({},function(error,txHash){
          if(error){
              console.log('Error occured');
              $('.notifyHead').html('Error Notification');
              $('.notifyBody').html('Transaction failed');
              $('.toast').toast('show');

          }
          else{
              console.log('Txn: ' + txHash);
              $('.notifyHead').html('Success Notification');
              $('.notifyBody').html('Transaction has been sent');
              $('.toast').toast('show');
             
          }
       });
       
       
   });

   
   
    






});