function appendCat(dna, id, gen) {
   catBox(id, gen, dna);
   styleCat(formatDNA(dna),id);
}
// col-lg-4 pointer fit-content
function catBox(id, gen, dna) {
   let catDiv =
      `<div class="col-lg-3 catBoxxx m-222 light-b-shadow col-xs-12 col-md-4 col-sm-6" id="${id}">
            ${catDetails(id,gen,dna)}
            ${catBody()}
       </div>`
    $('#catsDiv').append(catDiv);
}
function catDetails(id,gen,dna){
   var catDetails = 
   ` <div class="dropdown" style="padding-bottom: 50px;">
         <img src="assets/img/detail_new.png" class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
