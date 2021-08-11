var colors = Object.values(allColors());

function headColorBuild(code,id){
    var color = colors[code];
    $(`#${id}`).find('.ear,.catFace, .mouth, #catLowerBody,#catLowerLowerBody,.foot,#catTail').css('background', '#' + color);
}

function mouthColorBuild(code,id){
    var color = colors[code];
    $(`#${id}`).find('#tongue').css('background','#' + color);
}

function eyesColorBuild(code,id){
    var color = colors[code];
    $(`#${id}`).find('.eyes').css('background','#' + color);
}

function earColorBuild(code,id){
    var color = colors[code];
    $(`#${id}`).find('.innerEar,#bodyShadow,#innerTail,.nail').css('background','#' + color);
}

function eyeVariationBuild(code,id){
    switch (code) {
        case 1:
            normalEyes(id);
            eyeDesign(id);
            $(`#${id}`).find('#eyeName_cat').html('Basic eyes');
            break;
        case 2:
            normalEyes(id); //reset
            eyeDesign(id);
            $(`#${id}`).find('#eyeName_cat').html('Up eyes');
            eyeType1(id);
            break;
        case 3:
            normalEyes(id); //reset
            eyeDesign(id);
            $(`#${id}`).find('#eyeName_cat').html('Down eyes');
            eyeType2(id);
            break;
        case 4:
            normalEyes(id);
            eyeDesign(id);
            $(`#${id}`).find('#eyeName_cat').html('Left eyes');
            eyeType3(id);
            break;
        case 5:
            normalEyes(id);
            eyeDesign(id);
            $(`#${id}`).find('#eyeName_cat').html('Right eyes');
            eyeType4(id);
            break;
        case 6:
            normalEyes(id);
            eyeDesign(id);
            $(`#${id}`).find('#eyeName_cat').html('Chill eyes');
            eyeType5(id);
            break;
        default:
            normalEyes(id);
            $(`#${id}`).find('#eyeName_cat').html('Lovely eyes');
            eyeDesignNew(id);
    }
}

async function normalEyes(id) {
    await $(`#${id}`).find('.pupils').css('border','none');
}
function eyeDesign(id){
    $(`#${id}`).find('div.pupils').find('div').removeClass('heart');
    $(`#${id}`).find('div.pupils').find('div').addClass('smallPupils');
}
function eyeDesignNew(id){
    $(`#${id}`).find('div.pupils').find('div').removeClass('smallPupils');  
    $(`#${id}`).find('div.pupils').find('div').addClass('heart');
}
async function eyeType1(id) {
    await $(`#${id}`).find('.pupils').css('border-bottom','10px solid blue');
}
async function eyeType2(id) {
    await $(`#${id}`).find('.pupils').css('border-top','10px solid blue');
}
async function eyeType3(id) {
    await $(`#${id}`).find('.pupils').css('border-right','10px solid blue');
}
async function eyeType4(id) {
    await $(`#${id}`).find('.pupils').css('border-left','10px solid blue');
}
async function eyeType5(id) {
    await $(`#${id}`).find('.pupils').css('border','3px solid blue');
}

function decorationVariationBuild(code,id){
    switch (code) {
        case 1:
            $(`#${id}`).find('#decorationName_cat').html('No decor')
            normaldecoration(id)
            break;
        case 2:
            $(`#${id}`).find('#decorationName_cat').html('Basic head');
            decorStyle1(id);
            break;
        case 3:
            $(`#${id}`).find('#decorationName_cat').html('Glowing head');
            decorStyle2(id);
            break;
        case 4:
            $(`#${id}`).find('#decorationName_cat').html('Tribal head');
            decorStyle3(id);
            break;
        case 5:
            $(`#${id}`).find('#decorationName_cat').html('Static head');
            decorStyle4(id);
            break;
        case 6:
            $(`#${id}`).find('#decorationName_cat').html('Flowery head');
            decorStyle5(id);
            break;
        default:
            $(`#${id}`).find('#decorationName_cat').html('Propeller');
            decorStyle6(id);
    }
}

async function normaldecoration(id) {
    await $(`#${id}`).find('.hair').css('display','none');
}
async function decorStyle1(id){
  await $(`#${id}`).find('.hair').css({'display':'block',
                                        'box-shadow':'none',
                                        'background-color':'white',
                                        'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                                        'width':'13px',
                                        'transform': 'rotate(179deg)'});
  await $(`#${id}`).find('.hair1').css({'height': '42px',
                                        'left': '95px'});                     
                          
  await $(`#${id}`).find('.hair2').css({'height': '30px',
                                        'left': '80px',
                                        'top': '1px'});                     
                      
  await $(`#${id}`).find('.hair3').css({'height': '30px',
                                        'left': '110px',
                                        'top': '2px'}) ;                      
      
}
async function decorStyle2(id){
  await $(`#${id}`).find('.hair').css({'display':'block',
                                        'box-shadow':'1px -8px 20px 9px gold',
                                        'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                                        'width':'13px',
                                        'transform': 'rotate(179deg)'});
  await $(`#${id}`).find('.hair1').css({'height': '42px',
                                        'left': '95px'});                     
                          
  await $(`#${id}`).find('.hair2').css({'height': '30px',
                                        'left': '80px',
                                        'top': '1px'});                     
                      
  await $(`#${id}`).find('.hair3').css({'height': '30px',
                                        'left': '110px',
                                        'top': '2px'}) ;  
}
async function decorStyle3(id){ 
  await $(`#${id}`).find('.hair').css({'display':'block',
                                        'background-color':'tomato',
                                        'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                                        'width':'13px',
                                        'transform': 'rotate(179deg)',
                                        'box-shadow':'1px -8px 20px 9px gold'});

  await $(`#${id}`).find('.hair1').css({'height':'39px',
                                        'left':'91px',
                                        'width':'21px'});

  await $(`#${id}`).find('.hair2').css({'top':'-3px',
                                        'transform':'rotate(48deg)',
                                        'height':'30px',
                                        'left':'80px'});
                  
  await $(`#${id}`).find('.hair3').css({'height':'30px',
                                        'left':'110px',
                                        'top':'-2px',
                                        'transform':'rotate(-48deg)'});
}
async function decorStyle4(id){
  await $(`#${id}`).find('.hair').css({'display':'block',
                                        'background-color':'white',
                                        'border-radius':'0% 0% 50% 50%',
                                        'transform':'rotate(360deg)',
                                        'box-shadow':'none',
                                        'width':'13px'});

  await $(`#${id}`).find('.hair1').css({'height': '42px',
                                        'left': '95px'});                      
                      
  await $(`#${id}`).find('.hair2').css({'height': '30px',
                                        'left': '82px',
                                        'top': '1px'});                  
                          
  await $(`#${id}`).find('.hair3').css({'height': '30px',
                                        'left': '108px',
                                        'top': '0px'});
                                                 
}
async function decorStyle5(id){
  await $(`#${id}`).find('.hair').css({'display':'block',
                                        'background-color':'tomato',
                                        'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                                        'width':'13px',
                                        'transform': 'rotate(179deg)'});

  await $(`#${id}`).find('.hair1').css({'height':'39px',
                                        'left':'93px',
                                        'width':'21px'});

  await $(`#${id}`).find('.hair2').css({'top':'12px',
                                        'transform':'rotate(-45deg)',
                                        'height':'30px',
                                        'left':'86px'});
                  
  await $(`#${id}`).find('.hair3').css({'height':'30px',
                                        'left':'107px',
                                        'top':'12px',
                                        'transform':'rotate(45deg)'});
}
async function decorStyle6(id){
  await $(`#${id}`).find('.hair').css({'display':'block',
                                        'background-color':'tomato',
                                        'border-radius': '50% 50% 50% 50% / 60% 60% 40% 40%',
                                        'width':'13px',
                                        'transform': 'rotate(179deg)'});

  await $(`#${id}`).find('.hair1').css({'height':'35px',
                                        'left':'93px'});

  await $(`#${id}`).find('.hair2').css({'top':'19px',
                                        'transform':'rotate(-116deg)',
                                        'height':'30px',
                                        'left':'86px'});
                  
  await $(`#${id}`).find('.hair3').css({'height':'30px',
                                        'left':'100px',
                                        'top':'19px',
                                        'transform':'rotate(116deg)'});
}

function decorationMidColorBuild(code,id){
    var color = colors[code];
    $(`#${id}`).find('.mid').css('background','#' + color);
}

function decorationSideColorBuild(code,id){
    var color = colors[code];
    $(`#${id}`).find('.sides').css('background','#' + color);
}

function animationVariationBuild(code,id){
    switch (code) {
        case 1:
            resetAnimation(id);
            $(`#${id}`).find('#animationName_cat').html('Wiggling Head');
            animationStyle1(id);
            break;
        case 2:
            resetAnimation(id);
            $(`#${id}`).find('#animationName_cat').html('Vibrant Kitty');
            animationStyle2(id);
            break;
        case 3:
            resetAnimation(id);
            $(`#${id}`).find('#animationName_cat').html('Wiggling Tail');
            animationStyle3(id);
            break;
        case 4:
            resetAnimation(id);
            $(`#${id}`).find('#animationName_cat').html('Wiggling Pupils');
            animationStyle4(id);
            break;
        case 5 :
            resetAnimation(id);
            $(`#${id}`).find('#animationName_cat').html('Wiggling Tongue');
            animationStyle5(id);
            break;
        case 6:
            resetAnimation(id);
            $(`#${id}`).find('#animationName_cat').html('Rotating Propeller');
            animationStyle6(id);
            break;
        default:
            $(`#${id}`).find('#animationName_cat').html('No animation');
            resetAnimation(id);
    }
}

function resetAnimation(id){
    
    $(`#${id}`).find('#catHead').removeClass('movingFace');
    $(`#${id}`).find('#catEars').find('div.ear').removeClass('discoColor');
    $(`#${id}`).find('#bodyShadow').removeClass('discoColor');
    $(`#${id}`).find('#innerTail').removeClass('discoColor');
    $(`#${id}`).find('.nail').removeClass('discoColor')
    $(`#${id}`).find('#catTail').removeClass('movingTail');
    $(`#${id}`).find('div.pupils').find('div').removeClass('movingPupil');
    $(`#${id}`).find('#tongue').removeClass('movingTongue');
    $(`#${id}`).find('#h_1').removeClass('movingHair1');
    $(`#${id}`).find('#h_2').removeClass('movingHair2');
    $(`#${id}`).find('#h_3').removeClass('movingHair3');
}
async function checkForPupils(id){
    await $(`#${id}`).find('div.pupils').find('div').removeClass('heart');
    await $(`#${id}`).find('div.pupils').find('div').addClass('smallPupils');
}
async function animationStyle1(id){
    checkForPupils(id);
    await $(`#${id}`).find('#catHead').addClass('movingFace');
}
async function animationStyle2(id){
    checkForPupils(id);
    await $(`#${id}`).find('#catEars').find('div.ear').addClass('discoColor');
    await $(`#${id}`).find('#bodyShadow').addClass('discoColor');
    await $(`#${id}`).find('#innerTail').addClass('discoColor');
    await $(`#${id}`).find('.nail').addClass('discoColor');
}
async function animationStyle3(id){
    checkForPupils(id);
    await $(`#${id}`).find('#catTail').addClass('movingTail');
}
async function animationStyle4(id){
    checkForPupils(id);
    await $(`#${id}`).find('div.pupils').find('div').addClass('movingPupil');
}
async function animationStyle5(id){
    checkForPupils(id);
    await $(`#${id}`).find('#tongue').addClass('movingTongue');
}
async function animationStyle6(id){
    checkForPupils(id);
    decorStyle6(id);
    await $(`#${id}`).find('#h_1').addClass('movingHair1');
    await $(`#${id}`).find('#h_2').addClass('movingHair2');
    await $(`#${id}`).find('#h_3').addClass('movingHair3');
}