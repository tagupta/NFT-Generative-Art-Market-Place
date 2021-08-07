var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x6B258d5A0F0f805C70EFB410Ca9d4b070e1fbC31";

$(document).ready(()=>{
   window.ethereum.enable().then((accounts)=>{
       instance = new web3.eth.Contract(abi,contractAddress,{from: accounts[0]});
       user = accounts[0];
       console.log(instance);
       listenBirthEvent();
   })
    
   $('#newgen0Kitty').click(()=>{
       var dnaStr = getDna();
       dnaStr = dnaStr.toString();
       instance.methods.createKittyGen0(dnaStr).send({},function(error,txHash){
          if(error){
              console.log('Error occured');
              $('.notifyHead').html('Error Notification');
              $('.notifyBody').html('Transaction failed');
              $('.toast').toast('show');

          }
          else{
              $('.notifyHead').html('Success Notification');
              $('.notifyBody').html('Transaction has been sent');
              $('.toast').toast('show');
             
          }
       });

        // instance.methods.getKitty(0).call({}).then(function(result){
        //   console.log(result);
        // })  
   });

   
   
    






});