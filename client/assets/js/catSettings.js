
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 23,
    "mouthColor" : 31,
    "eyesColor" : 13,
    "earsColor" : 39,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 3,
    "decorationMidcolor" : 48,
    "decorationSidescolor" : 13,
    "animation" : 1,
    "lastNum" : 1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor);
    $('#bodycolor').val(dna.headcolor);

    mouthColor(colors[dna.mouthColor],dna.mouthColor);
    $('#tonguecolor').val(dna.mouthColor);

    eyesColor(colors[dna.eyesColor],dna.eyesColor);
    $('#outerEyeCode').val(dna.eyesColor);

    earColor(colors[dna.earsColor],dna.earsColor);
    $('#bodyShadowCode').val(dna.earsColor);

    eyeVariation(dna.eyesShape);
    $('#eyeshape').val(dna.eyesShape);

    decorationVariation(dna.decorationPattern);
    $('#decorationCode').val(dna.decorationPattern);

    decorationMidColor(colors[dna.decorationMidcolor],dna.decorationMidcolor);
    $('#decorationMidCode').val(dna.decorationMidcolor);

    decorationSideColor(colors[dna.decorationSidescolor],dna.decorationSidescolor);
    $('#decorationSideCode').val(dna.decorationSidescolor);
    
    animationVariation(dna.animation);
    $('#animationCode').val(dna.animation);
  }

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
});
$('#tonguecolor').change(() =>{
  var colorVal = $('#tonguecolor').val();
  mouthColor(colors[colorVal],colorVal);
});
$('#outerEyeCode').change(() =>{
  var colorVal = $('#outerEyeCode').val();
  eyesColor(colors[colorVal],colorVal);
});
$('#bodyShadowCode').change(()=>{
  var colorVal = $('#bodyShadowCode').val();
  earColor(colors[colorVal],colorVal);
});
$('#eyeshape').change(()=>{
  var value = parseInt($('#eyeshape').val());
  eyeVariation(value);
});
$('#decorationCode').change(()=>{
  var value = parseInt($('#decorationCode').val());
  decorationVariation(value);
});
$('#decorationMidCode').change(()=>{
  var colorVal = $('#decorationMidCode').val();
  decorationMidColor(colors[colorVal],colorVal);
});
$('#decorationSideCode').change(()=>{
  var colorVal = $('#decorationSideCode').val();
  decorationSideColor(colors[colorVal],colorVal);
});
$('#animationCode').change(()=>{
  var value = parseInt($('#animationCode').val());
  animationVariation(value);
});
