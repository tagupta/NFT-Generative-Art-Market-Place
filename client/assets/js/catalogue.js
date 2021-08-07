
function renderingCats(catId,catDNA){
   console.log("ID "+ catId);
   console.log("DNA "+ catDNA);
   var kittyFeatures = {
    "headcolor" : parseInt(catDNA.slice(0,2)),
    "mouthColor" : parseInt(catDNA.slice(2,4)),
    "eyesColor" : parseInt(catDNA.slice(4,6)),
    "earsColor" : parseInt(catDNA.slice(6,8)),
    //Cattributes
    "eyesShape" : parseInt(catDNA.slice(8,9)),
    "decorationPattern" : parseInt(catDNA.slice(9,10)),
    "decorationMidcolor" : parseInt(catDNA.slice(10,12)),
    "decorationSidescolor" : parseInt(catDNA.slice(12,14)),
    "animation" : parseInt(catDNA.slice(14,15)),
    "lastNum" : 1
   }
   renderCat(kittyFeatures);
}
