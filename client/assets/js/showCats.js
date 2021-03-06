function appendCat(dna, id, gen) {
   var params = new URLSearchParams(window.location.search);
   if(params.has('action') && params.get('action') == "sell"){
      catBreedBox(id, gen, dna);
      $(`#${id}`).attr('onclick', 'selectSellKitty("' + id + '")');
      $(`#${id}`).hover(
         function() {
           $( this ).css("background-image","linear-gradient(to right,  #84FFFF, #F2BCF8 , #FFEB3B)");
         }, function() {
           $( this ).css("background-image","");
         }
       );
   }
   else if(params.has('action') && params.get('action') == "buy"){
      catBreedBox(id, gen, dna);
      $(`#${id}`).attr('onclick', 'selectBuyKitty("' + id + '")');
      $(`#${id}`).hover(
         function() {
           $( this ).css("background-image","linear-gradient(to right,  #84FFFF, #F2BCF8 , #FFEB3B)");
         }, function() {
           $( this ).css("background-image","");
         }
       );
   }
   else{
      catBox(id, gen, dna);
   }
   styleCat(formatDNA(dna),id);
}

function displayCat(birthTime,gen,dna,id,action,price){
   renderCatBody(birthTime,gen,dna,id,action,price);
   styleCat(formatDNA(dna),id);
}
function selectSellKitty(id){
   window.location.href = `catDetails.html?action=sell&id=${id}`; 
}

function selectBuyKitty(id){
   window.location.href = `catDetails.html?action=buy&id=${id}`;
}

function breedingCats(dna,id,gen,gender){
   catBreedBox(id, gen, dna);
   styleCat(formatDNA(dna),id);
   $(`#${id}`).attr('onclick', 'selectBreed("' + dna + '","' + id + '","' + gen + '","' + gender + '")');
}

function selectBreed(dna,id,gen,gender){
  var body = catBody();

  $(`#${gender}`).html(body);
  styleCat(formatDNA(dna),gender);

  $(`#${gender}Cattributes`).css('visibility','visible');
  $(`#${gender}GEN`).html(gen);
  $(`#${gender}DNA`).html(dna);
  $(`#${gender}ID`).html(id);

  $('#catModal').modal('hide'); 
  
  readyToBreed();
}

function readyToBreed(){
   var dadId = $('#sireID').html();
   var mumID = $('#dameID').html();

   if(dadId != "" && mumID != ""){
      $('#breedingStart').removeClass('disabled');
      $('#breedingStart').attr('onclick', 'breed("' + dadId + '","' + mumID + '")');
      return true;
   }
   return false;
}

function catBox(id, gen, dna) {
   let catDiv =
      `<div class="col-lg-3 catBoxxx m-222 light-b-shadow col-xs-12 col-md-4 col-sm-6" id="${id}">
            ${catDetails(id,gen,dna)}
            ${catBody()}
       </div>`
    $('#catsDiv').append(catDiv);
}

function catBreedBox(id, gen, dna) {
   let catDiv =
      `<div class="col-lg-3 catBoxModal m-222 light-b-shadow col-xs-12 col-md-4 col-sm-6" id="${id}">
            ${catBody()}
            ${breedCattributes(id,gen,dna)}
       </div>`
    $('#catsDiv').append(catDiv);
}
function timeConverter(UNIX_timestamp){
   var a = new Date(UNIX_timestamp * 1000);
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var year = a.getFullYear();
   var month = months[a.getMonth()];
   var date = a.getDate();
   var hour = a.getHours();
   var min = a.getMinutes();
   var sec = a.getSeconds();
   var time = date +  month +  year + "_" + hour + ':' + min + ':' + sec ;
   return time;
 }
function renderCatBody(birthTime,gen,dna,id,action,price){
   var time = timeConverter(birthTime);
   let catDiv =
      `<div class="col-lg-4 catBox m-2 light-b-shadow" id="${id}">
            ${catBody()}
       </div>
       <div class="col-lg-6 cattributes m-2 light-b-shadow">
    <form>
        <div class="form-row">
          <label for="dnaOutput" class="col-lg-4"><b>DNA :</b></label>
          <input type="text" class="form-control col-lg-7" id="dnaOutput" value=${dna} readonly>
        </div>
        <div class="form-row">
            <label for="birthTimeOutput" class="col-lg-4"><b>BIRTH TIME :</b></label>
            <input type="text" class="form-control col-lg-7" id="birthTimeOutput" value=${time} readonly>
        </div>
        <div class="form-row">
            <label for="genOutput" class="col-lg-4"><b>GENERATION :</b></label>
            <input type="text" class="form-control col-lg-7" id="genOutput" value=${gen} readonly>
        </div>
        <div class="form-row">
            <label for="IdOutput" class="col-lg-4"><b>ID :</b></label>
            <input type="text" class="form-control col-lg-7" id="IdOutput" value=${id} readonly>
        </div>
        ${marketMainDiv(action,id,price)}
    </form>
    
 </div>`;
    $('#catsDiv').append(catDiv);
}

function marketMainDiv(action,id,price){
if(action == "Sell"){
  var actionDiv = 
   `<div class="form-row" style="position: absolute;bottom: 38px;">
         <div class="col-lg-3">
            <button type="button" class="btn btn-success sellKitty" onclick=createOffer(${id})>Sell</button>
         </div>
         <div class="col-lg-5 input-group">
               <input type="text" class="form-control" id="kittyPrice">
               <div class="input-group-append">
                  <span class="input-group-text">Ether</span>
               </div>
         </div>
         <div class="col-lg-4">
               <button type="button" class="btn btn-danger disabled cancelOffer" onclick=removeOffer(${id})>Cancel Offer</button>
         </div>
   </div>`;
   return actionDiv;
}
else if(action == "Buy"){
   var amt = price.toString();
  var actionDiv = 
     `<div class="form-row" style="position: absolute;bottom: 38px;">   
         <div class="col-lg-3" style="width:180px">
             <label for="buy"><b>BUY AT :</b></label>
         </div>    
     
         <div class="col-lg-5 input-group" style="width: 128px;">
               <span class="input-group-text">${amt}</span>
               <div class="input-group-append">
                  <span class="input-group-text">Ether</span>
               </div>
         </div>
         <div class="col-lg-4">
               <button type="button" class="btn btn-success buyKitty" onclick=buyingKitty(${id},${amt})>Buy</button>
         </div>
         
      </div>`;
  return actionDiv;
}

}
function renderingcatDetails(birthTime,gen,dna,id){
   var catDetails = 
   `<div class="col-lg-7 cattributes m-2 light-b-shadow">
      <span><h4><b>DNA: </b>${dna}</h4></span> 
      <span><h4><b>BIRTH TIME: </b>${birthTime}</h4></span> 
      <span><h4><b>GENERATION: </b>${gen}</h4></span>
      <span><h4><b>ID : </b>${id}</h4></span> 
    </div>`;
    $('#catsDiv').append(catDetails);
}
function catDetails(id,gen,dna){
   var catDetails = 
   ` <div class="dropdown" style="padding-bottom: 50px;">
         <img src="assets/img/detail.png" class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <div class="dropdown-menu" aria-labelledby="dropdownMenu">
         <div class="catInfo">
            <h3>KITTY DETAILS</h3>
            <div>
               <span><h4><b>GEN: </b>${gen}</h4></span>
               <span><h4><b>DNA: </b>${dna}</h4></span> 
               <span><h4><b>ID : </b>${id}</h4></span> 
            </div>
            <br>
            <h3>CATTRIBUTES</h3>
            <div>
               <span id="decorationName_cat"></span><br>
               <span id="eyeName_cat"></span><br> 
               <span id="animationName_cat"></span> 
            </div>
         </div>
         </div>
     </div>`;
     return catDetails;
}

function breedCattributes(id,gen,dna){
   var cattributes = 
   `<div id="breedingCattributes">
         <span><h4><b>GEN : </b>${gen}</h4></span>
         <span><h4><b>DNA : </b>${dna}</h4></span>
         <span><h4><b>ID : </b>${id}</h4></span> 
   </div>`;

   return cattributes;
}
function catBody() {
   let catBody =
      `<div id="catBody">
         <div id="catEars">
            <div class="ear leftEar">
               <div class="innerEar innerLeftEar"></div>
            </div>
            <div class="ear rightEar">
               <div class="innerEar innerRightEar"></div>
            </div>
         </div>
       <div id="catHead" class="catFace">
         <div class="catHair">
            <div id="h_1" class="hair hair1 mid"></div>
            <div id="h_2" class="hair hair2 sides"></div>
            <div id="h_3" class="hair hair3 sides"></div>
         </div>
         <div id="catEyes">
            <div class="eyes">
                  <div class="pupils "> 
                     <div id="eyeDecoration" class=""></div>
                  </div>
            </div>
            <div class="eyes">
                  <div class="pupils ">
                     <div id="eyeDecoration" class=""></div>
                  </div>
            </div>
         </div>
         <div id="tongue" class=""></div> 
         <div id="catMouth">
            <div class="mouth"></div>
            <div class="mouth"></div>
         </div>
         <div id="nose"></div>
         <div class="catWhisker">
            <div class="whisker1"></div>
            <div class="whisker2"></div>
            <div class="whisker3"></div>
            <div class="whisker4"></div>
            <div class="whisker5"></div>
            <div class="whisker6"></div>
         </div>
      </div>
         <div id="catLowerBody" class="">
         </div>
      
         <div id="catLowerLowerBody" class="">
         <div id="bodyShadow" class=""></div>
         </div>
      
            <div class="foot foot1">
                  <div class="nail"></div>
            </div>
            <div class="foot foot2">
            <div class="nail"></div>
            </div>
            <div class="foot foot3">
            <div class="nail"></div>
            </div>
            <div class="foot foot4">
            <div class="nail"></div>
            </div>
         <div id="catTail" class="">
            <div id="innerTail"></div>
         </div>
      </div>`;
   return catBody;
}

function formatDNA(catDNA) {
   var formattedkitty = {
      "headcolor": parseInt(catDNA.slice(0, 2)),
      "mouthColor": parseInt(catDNA.slice(2, 4)),
      "eyesColor": parseInt(catDNA.slice(4, 6)),
      "earsColor": parseInt(catDNA.slice(6, 8)),
      //Cattributes
      "eyesShape": parseInt(catDNA.slice(8, 9)),
      "decorationPattern": parseInt(catDNA.slice(9, 10)),
      "decorationMidcolor": parseInt(catDNA.slice(10, 12)),
      "decorationSidescolor": parseInt(catDNA.slice(12, 14)),
      "animation": parseInt(catDNA.slice(14, 15)),
      "lastNum": 1
   }
   return formattedkitty;
}

function styleCat(dna,id){
   headColorBuild(dna.headcolor,id);
   mouthColorBuild(dna.mouthColor,id);
   eyesColorBuild(dna.eyesColor,id);
   earColorBuild(dna.earsColor,id);
   eyeVariationBuild(dna.eyesShape,id);
   decorationVariationBuild(dna.decorationPattern,id);
   decorationMidColorBuild(dna.decorationMidcolor,id);
   decorationSideColorBuild(dna.decorationSidescolor,id);
   animationVariationBuild(dna.animation,id);
}
