
 function listenBirthEvent(){
    instance.events.Birth().on('data',function(event){
        console.log(JSON.stringify(event, null, "    "));
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
              },2000);
          }
          

    }).on('error',function(error, receipt){
        console.log(error);
        
    })
}
