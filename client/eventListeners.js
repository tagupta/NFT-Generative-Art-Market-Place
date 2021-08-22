
 function listenBirthEvent(){
    instance.events.Birth().on('data',function(event){
        var eventReturnVal = event.returnValues;
        $('.notifyHead2').html('A token has been created successfully.');
            $('.notifyBody2').html(`TokenID: ${eventReturnVal.kittenId}   
                                    Owner: ${eventReturnVal.owner}    
                                    DadID: ${eventReturnVal.dadId}    
                                    MumID: ${eventReturnVal.mumId}    
                                    Genes: ${eventReturnVal.genes} `);
            $('.toast').toast('show');
          $('.alertBox').css('display','flex');
          if($('#sireID').html() != undefined && $('#dameID').html() != undefined){
            setTimeout(() =>{
                window.location.href = 'catalogue.html'; 
              },3000);
          }
          

    }).on('error',function(error, receipt){
        console.log(error);
        
    })
}

function listenMarketTransactionEvent(){
    marketInstance.events.MarketTransaction().on('data',function(event){
        var txnType = event.returnValues.TxType;
        if(txnType == "Create offer"){
            $('.alert p').html("Please check Market Place to see the offer.");
            $('.alertBox').css('display','flex');
            $('.sellKitty').addClass('disabled');
            $('.cancelOffer').removeClass('disabled');
        }
        else if(txnType == "Remove offer"){
            $('.alert p').html("This offer has been removed successfully.");
            $('.alertBox').css('display','flex');
            $('.sellKitty').removeClass('disabled');
            $('.cancelOffer').addClass('disabled');
        }
        else if(txnType == "Buy"){
            $('.alert p').html("Please check the catalogue to see the new member.");
            $('.alertBox').css('display','flex');
            $('.buyKitty').addClass('disabled');
        }  

    }).on('error',function(error, receipt){
        console.log(error);
        
    })
}
