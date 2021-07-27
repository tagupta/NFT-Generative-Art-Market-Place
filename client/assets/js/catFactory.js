
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.ear, #catFace, .mouth, #catLowerBody,#catLowerLowerBody,.foot,#catTail').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code){
    $('#tongue').css('background','#' + color);
    $('#mouthcode').html('code: '+code);
    $('#dnamouth').html(code);
}

function eyesColor(color,code){
    $('.eyes').css('background','#' + color);
    $('#eyescode').html('code: '+code);
    $('#dnaeyes').html(code);
}

function earColor(color,code){
    $('.innerEar,#bodyShadow,#innerTail,.nail').css('background','#' + color);
    $('#shadowcode').html('code: '+code);
    $('#dnaears').html(code);
}
//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes();
            eyeDesign();
            $('#eyeName').html('Basic');
            break;
        case 2:
            normalEyes(); //reset
            eyeDesign();
            $('#eyeName').html('Up');
            eyeType1();
            break;
        case 3:
            normalEyes(); //reset
            eyeDesign();
            $('#eyeName').html('Down');
            eyeType2();
            break;
        case 4:
            normalEyes();
            eyeDesign();
            $('#eyeName').html('Left');
            eyeType3();
            break;
        case 5:
            normalEyes();
            eyeDesign();
            $('#eyeName').html('Right');
            eyeType4();
            break;
        case 6:
            normalEyes();
            eyeDesign();
            $('#eyeName').html('Chill');
            eyeType5();
            break;
        default:
            normalEyes();
            $('#eyeName').html('Heart');
            eyeDesignNew();
            break;
    }
}

async function eyeDesignNew(){
    var className = await $('#eyeDecoration').attr('class');
    if(className == "smallPupils"){
        await $('div.pupils').find('div').removeClass('smallPupils');  
    }
    await $('div.pupils').find('div').addClass('heart');
    
}
async function eyeDesign(){
    var className = await $('#eyeDecoration').attr('class');
    if(className == "heart"){
        await $('div.pupils').find('div').removeClass('heart');
    }
    await $('div.pupils').find('div').addClass('smallPupils');
}
async function normalEyes() {
    await $('.pupils').css('border','none');
}
async function eyeType1() {
    await $('.pupils').css('border-bottom','10px solid blue');
}
async function eyeType2() {
    await $('.pupils').css('border-top','10px solid blue');
}
async function eyeType3() {
    await $('.pupils').css('border-right','10px solid blue');
}
async function eyeType4() {
    await $('.pupils').css('border-left','10px solid blue');
}
async function eyeType5() {
    await $('.pupils').css('border','3px solid blue');
}

//******************************************************************************************************

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break;
        case 2:
            $('#decorationName').html('Intermediate');
            decorStyle1();
            break;
        case 3:
            $('#decorationName').html('Advanced');
            decorStyle2();
            break;
        case 4:
            $('#decorationName').html('Orientation change');
            decorStyle3();
            break;
        case 5:
            $('#decorationName').html('Shape change');
            decorStyle4();
            break;
        case 6:
            $('#decorationName').html('Size change');
            decorStyle5();
            break;
        default:
            $('#decorationName').html('Black hair');
            decorStyle6();
    }
}
async function normaldecoration() {
      await $('.hair').css('display','none');
}
async function decorStyle1(){
    await $('.hair').css({'display':'block',
                          'box-shadow':'none',
                          'background-color':'white',
                          'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                          'width':'13px',
                          'transform': 'rotate(179deg)'});
    await $('.hair1').css({'height': '42px',
                          'left': '95px'});                     
                            
    await $('.hair2').css({'height': '30px',
                           'left': '80px',
                           'top': '1px'});                     
                        
    await $('.hair3').css({'height': '30px',
                           'left': '110px',
                           'top': '2px'}) ;                      
        
}
async function decorStyle2(){
    await $('.hair').css({'display':'block',
                          'box-shadow':'1px -8px 20px 9px gold',
                          'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                          'width':'13px',
                          'transform': 'rotate(179deg)'});
    await $('.hair1').css({'height': '42px',
                          'left': '95px'});                     
                            
    await $('.hair2').css({'height': '30px',
                           'left': '80px',
                           'top': '1px'});                     
                        
    await $('.hair3').css({'height': '30px',
                           'left': '110px',
                           'top': '2px'}) ;  
}
async function decorStyle3(){ //work for orientation 
    await $('.hair').css({'display':'block',
                          'background-color':'tomato',
                          'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                          'width':'13px',
                          'transform': 'rotate(179deg)'});

    await $('.hair1').css({'height':'39px',
                           'left':'91px',
                           'width':'21px'});

    await $('.hair2').css({'top':'-3px',
                           'transform':'rotate(48deg)',
                           'height':'30px',
                           'left':'80px'});
                    
    await $('.hair3').css({'height':'30px',
                           'left':'110px',
                           'top':'-2px',
                           'transform':'rotate(-48deg)'});
}
async function decorStyle4(){
    await $('.hair').css({'display':'block',
                          'background-color':'white',
                          'border-radius':'0% 0% 50% 50%',
                          'transform':'rotate(360deg)',
                          'box-shadow':'none',
                          'width':'13px'});

    await $('.hair1').css({'height': '42px',
                           'left': '95p '});                      
                        
    await $('.hair2').css({'height': '30px',
                           'left': '78px',
                           'top': '1px'});                  
                            
    await $('.hair3').css({'height': '30px',
                           'left': '104px',
                           'top': '0px'});
                                                   
}
async function decorStyle5(){
    await $('.hair').css({'display':'block',
                          'background-color':'tomato',
                          'border-radius':'0% 0% 50% 50%',
                          'transform':'rotate(360deg)',
                          'width':'5px'});

    await $('.hair1').css({'height': '42px',
                          'left': '95p '});                      
                       
    await $('.hair2').css({'height': '30px',
                          'left': '80px',
                          'top': '1px'});                  
                           
    await $('.hair3').css({'height': '30px',
                          'left': '104px',
                          'top': '0px'});
}
async function decorStyle6(){
    await $('.hair').css({'display':'block',
                          'background-color':'black',
                          'border-radius':'0% 0% 50% 50%',
                          'transform':'rotate(360deg)',
                          'width':'5px'});

    await $('.hair1').css({'height': '42px',
                          'left': '95p '});                      
                       
    await $('.hair2').css({'height': '30px',
                          'left': '80px',
                          'top': '1px'});                  

    await $('.hair3').css({'height': '30px',
                          'left': '104px',
                          'top': '0px'});
}

function decorationMidColor(color,code){
    $('.mid').css('background','#' + color);
    $('#decorationMidName').html('code: '+code);
    $('#dnadecorationMid').html(code);
}
function decorationSideColor(color,code){
    $('.sides').css('background','#' + color);
    $('#decorationSideName').html('code: '+code);
    $('#dnadecorationSides').html(code);
}