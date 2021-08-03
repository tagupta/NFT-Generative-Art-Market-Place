
function listenBirthEvent(){
    instance.events.Birth().on('data',function(event){
        console.log(event);
        var eventReturnVal = event.returnValues;
        $('.notifyHead2').html('Success Notification');
        $('.notifyBody2').html(`A token has been created successfully.</br>
                                                        TokenID: ${eventReturnVal.kittenId}</br> 
                                                        Owner: ${eventReturnVal.owner}</br>
                                                        DadID: ${eventReturnVal.dadId} </br>
                                                        MumID: ${eventReturnVal.mumId} </br>
                                                        Genes: ${eventReturnVal.genes} `);
        $('.toast').toast('show');
    }).on('error',function(error, receipt){
        console.log(error);
        $('.notifyHead2').html('Error Notification');
        $('.notifyBody2').html('Error occured while processing transaction.');
        $('.toast').toast('show');
        
    })
}
