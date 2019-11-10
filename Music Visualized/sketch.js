let fft;
var song;
var imageLocation;
var volumeSliderText,volumeSlider, sel, customizationText;
var sizeSlider, sizeSliderText;
var redSensitivity, greenSensitivity, blueSensitivity,
    redSensitivityText, greenSensitivityText, blueSensitivityText;
var minimumSize, minSizeText, maximumSize, maxSizeText, circlesPerFrame,
    circlesPerFrameText;
var none;
var img, originalImg;
var canvas;
var canvasBottomY, canvasTopY;
var canvasRightX;

function preload(){
  //song = loadSound("Crooked_Straight.mp3", loadedSong);
  song = loadSound("songs/classical/vivaldi_summer.mp3",loadedSong);
  //song = loadSound("songs/electronic/InYourMemory(1).mp3",loadedSong);

  //imageLocation = "images/this_morning_by_yuumei_d5872qm.jpg";
  imageLocation = "images/original_starrynight.jpg";

  originalImg = loadImage(imageLocation);
  img = loadImage(imageLocation);

  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
  //text("words",0,0);

}

function setup() {
  //Set frame rate to 10 for more stable video
  frameRate(9);
  //Set canvas to a size, similar to its original size to prevent distortion
  canvas = createCanvas(710 , 400);
  canvas.style('position','absolute');
  canvasBottomY = height + 170;
  canvasTopY = 170;
  canvasRightX = width + 20;

  //Initial Background
  clearScreen();

  //Fourier transform object
  fft = new p5.FFT();
  //Get fourier transform on song
  fft.setInput(song);
  //use slider. Note we can also add buttons
  volumeSliderText = createElement('p',"Volume");
  volumeSliderText.position(0, canvasBottomY + 20)
  volumeSlider = createSlider(0,1,0.5, 0.01);
  volumeSlider.position(0, canvasBottomY+50);



}

function loadedSong(){
  //this function is called when the song is loaded
  song.play();

  loadUI();

}

function loadUI(){
  //textAlign(CENTER);
  //background(200);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Base Image');
  sel.option('Image Switch');
  sel.option('Greyscale Beat');
  sel.option('Inverted and Circle Beat');
  sel.option('Shifting points');
  sel.option('Growing Rectangles');
  sel.option('Cool and Warm Tones');
  sel.option('Sensitive Monotone');
  sel.option('Sensitive RGB');
  sel.option('Sensitive Contrast');
  sel.option('Painting Pointalism');
  sel.changed(mySelectEvent);
  sel.position(10, 150);


}

function mySelectEvent(){
  clearScreen();
  deleteFilterUI();
  updateFilterUi();
}

function deleteFilterUI(){
  //Remove growing rect and shifting points
try{
  sizeSlider.remove();
  sizeSliderText.remove();
}catch(e){
  print("Did not remove");
}
//Remove sensitive rgb
try{
  redSensitivity.remove();
  redSensitivityText.remove();
  greenSensitivity.remove();
  greenSensitivityText.remove();
  blueSensitivity.remove();
  blueSensitivityText.remove();
}catch(e){
  print("Did not remove");
}
//Remove painting Pointalism
try{
  minimumSize.remove();
  minSizeText.remove();
  maximumSize.remove();
  maxSizeText.remove();
  circlesPerFrame.remove();
  circlesPerFrameText.remove();
}catch(e){
  print("Did not remove");
}
//Remove no customization
try{
  none.remove();

  }catch(e){
  print("Did not remove");
}
//Remove customizationText title
try{
  customizationText.remove();

  }catch(e){
  print("Did not remove");
}
}

function updateFilterUi(){
  customizationText = createElement('h3','Customization:');
  customizationText.position(canvasRightX,canvasTopY-20);
  switch(sel.value()){
    case 'Image Switch':
    noCustomization();
      break;
    case 'Greyscale Beat':
    noCustomization();

      break;
      case 'Inverted and Circle Beat' :
      noCustomization();

      break;
      case 'Shifting points':
      sizeSliderText = createElement('p', 'Adjust point size');
      sizeSliderText.position(canvasRightX,canvasTopY + 20);
      sizeSlider = createSlider(5,50,20, 1);
      sizeSlider.position(canvasRightX,canvasTopY + 50);

      break;
      case 'Growing Rectangles':
      sizeSliderText = createElement('p', 'Adjust rectangle size');
      sizeSliderText.position(canvasRightX,canvasTopY + 20);
      sizeSlider = createSlider(5,50,20, 1);
      sizeSlider.position(canvasRightX,canvasTopY + 50);

      break;
      case 'Cool and Warm Tones':
      noCustomization();

      break;
      case 'Sensitive Monotone':
      redSensitivityText = createElement('p', 'Adjust red sensitivity:');
      redSensitivityText.position(canvasRightX,canvasTopY + 20);

      redSensitivity = createSlider(1,255,1, 5);
      redSensitivity.position(canvasRightX,canvasTopY + 50 );

      greenSensitivityText = createElement('p', 'Adjust green sensitivity:');
      //greenSensitivityText.style('position','relative');
      greenSensitivityText.position(canvasRightX,canvasTopY + 20 + 50 );
      greenSensitivity = createSlider(1,255,1, 5);
      greenSensitivity.position(canvasRightX,canvasTopY + 50*2 );

      blueSensitivityText = createElement('p', 'Adjust blue sensitivity:');
      blueSensitivityText.position(canvasRightX,canvasTopY + 20+(50*2));
      blueSensitivity = createSlider(1,255,50, 5);
      blueSensitivity.position(canvasRightX,canvasTopY + (50*3) );

      break;
      case 'Sensitive RGB':
      redSensitivityText = createElement('p', 'Adjust red insensitivity:');
      redSensitivityText.position(canvasRightX,canvasTopY + 20 );

      redSensitivity = createSlider(1,255,5, 1);
      redSensitivity.position(canvasRightX,canvasTopY + 50 );

      greenSensitivityText = createElement('p', 'Adjust green insensitivity:');
      //greenSensitivityText.style('position','relative');
      greenSensitivityText.position(canvasRightX,canvasTopY + 20 + 50 );
      greenSensitivity = createSlider(1,255,255, 1);
      greenSensitivity.position(canvasRightX,canvasTopY + 50*2 );

      blueSensitivityText = createElement('p', 'Adjust blue insensitivity:');
      blueSensitivityText.position(canvasRightX,canvasTopY + 20+(50*2) );
      blueSensitivity = createSlider(1,255,255, 1);
      blueSensitivity.position(canvasRightX,canvasTopY + (50*3) );

      break;
      case 'Sensitive Contrast':
      redSensitivityText = createElement('p', 'Adjust red insensitivity:');
      redSensitivityText.position(canvasRightX,canvasTopY + 20 );

      redSensitivity = createSlider(1.75,25,2, 0.25);
      redSensitivity.position(canvasRightX,canvasTopY + 50 );

      greenSensitivityText = createElement('p', 'Adjust green insensitivity:');
      //greenSensitivityText.style('position','relative');
      greenSensitivityText.position(canvasRightX,canvasTopY + 20 + 50 );
      greenSensitivity = createSlider(1.75,25,3.5, 0.25);
      greenSensitivity.position(canvasRightX,canvasTopY + 50*2 );

      blueSensitivityText = createElement('p', 'Adjust blue insensitivity:');
      blueSensitivityText.position(canvasRightX,canvasTopY + 20+(50*2) );
      blueSensitivity = createSlider(1.75,25,25, 0.25);
      blueSensitivity.position(canvasRightX,canvasTopY + (50*3) );
      break;
      case 'Painting Pointalism':
      minSizeText = createElement('p', 'Adjust minimum circle size:');
      minSizeText.position(canvasRightX,canvasTopY + 20 );

      minimumSize = createSlider(1,100,4, 1);
      minimumSize.position(canvasRightX,canvasTopY + 50 );

      maxSizeText= createElement('p', 'Adjust maximum circle size:');
      //greenSensitivityText.style('position','relative');
      maxSizeText.position(canvasRightX,canvasTopY + 20 + 50 );
      maximumSize = createSlider(1,101,40, 1);
      maximumSize.position(canvasRightX,canvasTopY + 50*2 );

      circlesPerFrameText= createElement('p', 'Adjust circles per frame:');
      circlesPerFrameText.position(canvasRightX,canvasTopY + 20+(50*2) );
      circlesPerFrame= createSlider(1,50,10, 1);
      circlesPerFrame.position(canvasRightX,canvasTopY + (50*3) );

      break;
    default:
    noCustomization();

    }
}

function clearScreen(color = 0){
  background(0);
  img.resize(originalImg.width, originalImg.height);
}

function noCustomization(){
  none  = createElement('p', 'no customization');
  none.style('font-style', 'italic')
  none.position(canvasRightX,canvasTopY+20);

}


function draw() {
   //background(200);
  //Reset edited image back to original so edits do not compound
  resetImage();

  //Allow for frequency analysis
  let spectrum = fft.analyze();

  //Shape for fourier transform (not used in program, but looks cool)
  /*beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
  */
  //Uses the created slider to adjust volume of song
  song.setVolume(volumeSlider.value());

  //Getting amplitude
  let level = amplitude.getLevel();
  //level is between 0 and 1 so (to better see the changes) we map it to a higher range of 0 to 100
  var size = map(level, 0, 1, 0, 100);
  //Getting frequency
  var frequencyAtFrame = getLoudestFrequency();
  var mappedFrequency = map(frequencyAtFrame, 0, 100, 0, 10);
  var mappedGreyFrequency = map(frequencyAtFrame, 0, 1000, 0, 255);


  /* put whatever filters and logic for when the filters play into this area*/


  /* Example of using amplitude in logic for filters
  if(size > 2){
  blueGreenAdjustFilter();
  }else{
  redAdjustFilter();
  }*/

  /* Example using amplitude as parameter
  amplitudeApplyFilter(size*10);
  */

  /* Example using parameters to adjust each rgb, although it has default adjust values of zero; parameters are optional*/

  switch(sel.value()){
    case 'Image Switch':
      //pointalizeFilter(mappedFrequency,0,0,0,10);
      switchOnBeatFilter(0,0,0,0,size);
      image(img, 0, 0, width, height);
      break;
    case 'Greyscale Beat':
      adjustInvertedGreySquareFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = size, circleDiameter = 25);
      image(img, 0, 0, width, height);
      break;
      case 'Inverted and Circle Beat':
      colorInvertFilter();
      image(img, 0, 0, width, height);
      fill(mappedGreyFrequency,150);
      stroke(0);
      ellipse(width/2, height/2, size*10, size*10);
      break;
      case 'Shifting points':
      shiftingPointalizeFilter(0,0,0,0,size*2,sizeSlider.value());
      break;
      case 'Growing Rectangles':
      shrinkingRectFilter(0,0,0,0,size*2,sizeSlider.value()/*9*/);
      break;
      case 'Cool and Warm Tones':
      adjustCoolWarmFilter(0,0,0,0,size/2);
      image(img, 0, 0, width, height);
      break;
      case 'Sensitive Monotone':
      //blackAndWhiteSwitchOnBeatFilter(0,0,0,0,size,150);
      blackAndWhiteFilter(redSensitivity.value(),greenSensitivity.value(),blueSensitivity.value(),0,0,min(25*size, map(25*size, 200, 1250,200, 300)));
      image(img, 0, 0, width, height);
      break;
      case 'Sensitive RGB':
      let minSize = min(size, map(size, 8, 50,200, 255));
      divideRGBAFilter(1/(minSize/redSensitivity.value()),1/(minSize/greenSensitivity.value()),1/(minSize/blueSensitivity.value()),1);
      image(img, 0, 0, width, height);
      break;
      case 'Sensitive Contrast':
      contrastFilter(0,0,0,0,min(size, map(size, 4, 50,4, 10)), 2, redSensitivity.value(), greenSensitivity.value(), blueSensitivity.value());
      image(img, 0, 0, width, height);
      break;
      case 'Painting Pointalism':
      paintingPointalizeFilter(size, minimumSize.value(), maximumSize.value(), circlesPerFrame.value());
      break;
    default:
      image(img, 0, 0, width, height);
  }
  //adjustAllRGBAFilter(0,150,200);

  //pointalizeFilter(0,0,0,0,10);

  //Show edited image
  //image(img, 0, 0, width, height);

  //These are graphical representations of the frequency of the amplitude and frequency
  /*fill(50);
  rectMode(CENTER);
  //rectangle showing frequency
  rect(width/2, height/2, frequencyAtFrame,  frequencyAtFrame);
  fill(255);
  //ellipse showing amplitude (mapped to a higher range)
  ellipse(width/2, height/2, size*10, size*10);*/
}
function getLoudestFrequency() {
  //A function that (should according to the internet) get the frequency of the sound at that point.
    var nyquist = sampleRate() / 2; // 22050
    var spectrum = fft.analyze(); // array of amplitudes in bins
    var numberOfBins = spectrum.length;
    var maxAmp = 0;
    var largestBin;

    for (var i = 0; i < numberOfBins; i++) {
        var thisAmp = spectrum[i]; // amplitude of current bin
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            largestBin = i;
        }
    }

    var loudestFreq = largestBin * (nyquist / numberOfBins);
    return loudestFreq;
}

function resetImage(){
  img.copy(originalImg, 0,0,originalImg.width, originalImg.width, 0,0,img.width,img.width);
}

function noEditFiltering(){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    img.pixels[index + 0] = img.pixels[index + 0]; //r value
    img.pixels[index + 1] = img.pixels[index + 1]; //g value
    img.pixels[index + 2] = img.pixels[index + 2]; //b value
    img.pixels[index + 3] = img.pixels[index + 3]; //a value
}
}

  img.updatePixels();
}
function redAdjustFilter(){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + 50; //r value
    let editedG = img.pixels[index + 1]; //g value
    let editedB= img.pixels[index + 2]; //b value
    let editedA = img.pixels[index + 3]; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}
function blueGreenAdjustFilter(){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] ; //r value
    let editedG = img.pixels[index + 1] + 100; //g value
    let editedB= img.pixels[index + 2] - 50; //b value
    let editedA = img.pixels[index + 3]; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}
function colorInvertFilter(){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] ; //r value
    let editedG = img.pixels[index + 1] + 100; //g value
    let editedB= img.pixels[index + 2] - 50; //b value
    let editedA = img.pixels[index + 3]; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedG;
    img.pixels[index + 1] = editedR;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}
function amplitudeApplyFilter(amplitudeNumber){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] ; //r value
    let editedG = img.pixels[index + 1] + amplitudeNumber; //g value
    let editedB= img.pixels[index + 2] - 50; //b value
    let editedA = img.pixels[index + 3]; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedG;
    img.pixels[index + 1] = editedR;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}

function addRGBAFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3] + aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}
function divideRGBAFilter(rAdj = 1, gAdj = 1, bAdj = 1, aAdj = 1){
if(rAdj == 0){
  rAdj = 1;
}
if(gAdj == 0){
  gAdj = 1;
}
if(bAdj == 0){
  bAdj = 1;
}
img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] / rAdj; //r value
    let editedG = img.pixels[index + 1] / gAdj; //g value
    let editedB= img.pixels[index + 2] / bAdj; //b value
    let editedA = img.pixels[index + 3] / aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}

function adjustDistanceFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let d = dist(img.width/2, img.height/2,x,y);
    let factor = map(d, 0,img.width/2,150,0);
    let editedR = img.pixels[index + 0] + factor+ rAdj; //r value
    let editedG = img.pixels[index + 1] + factor+ gAdj; //g value
    let editedB= img.pixels[index + 2] + factor+ bAdj; //b value
    let editedA = img.pixels[index + 3] + factor+ aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}

function switchOnBeatFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1){

if(!(amplitudeNumber > 5.2)){
img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    let index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3] + aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedG;
    img.pixels[index + 1] = editedR;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}}
}else{
img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    let index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3] + aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedB;
    img.pixels[index + 1] = editedR;
    img.pixels[index + 2] = editedG;
    img.pixels[index + 3] = editedA;
}
}
}

  img.updatePixels();
}

function blackAndWhiteSwitchOnBeatFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, darkSensitivity = 75){
let editedR,editedG,editedB,editedA;
if(!(amplitudeNumber > 5.2)){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    let index = (x+y*img.width)*4;
    if(((img.pixels[index + 0]+img.pixels[index + 1]+img.pixels[index + 2])/3)>darkSensitivity){
     editedR = 255 - rAdj; //r value
     editedG = 255 - gAdj; //g value
     editedB= 255 - bAdj; //b value
     editedA = img.pixels[index + 3] + aAdj; //a value
    }else{
     editedR = 0+ rAdj; //r value
     editedG = 0+ gAdj; //g value
     editedB= 0+ bAdj; //b value
     editedA = img.pixels[index + 3] + aAdj; //a value
    }
    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}}
}else{
img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    let index = (x+y*img.width)*4;
    if(((img.pixels[index + 0]+img.pixels[index + 1]+img.pixels[index + 2])/3)>darkSensitivity){

     editedR = 0+ rAdj; //r value
     editedG = 0+ gAdj; //g value
     editedB= 0+ bAdj; //b value
     editedA = img.pixels[index + 3] + aAdj; //a value
    }else{
     editedR = 255 - rAdj; //r value
     editedG = 255 - gAdj; //g value
     editedB= 255 - bAdj; //b value
     editedA = img.pixels[index + 3] + aAdj; //a value
    }
    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}}
}

  img.updatePixels();
}

function blackAndWhiteFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, darkSensitivity = 75){
let editedR,editedG,editedB,editedA;

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    let index = (x+y*img.width)*4;
    if(((img.pixels[index + 0]+img.pixels[index + 1]+img.pixels[index + 2])/3)>darkSensitivity){
     editedR = 255 - rAdj; //r value
     editedG = 255 - gAdj; //g value
     editedB= 255 - bAdj; //b value
     editedA = img.pixels[index + 3] + aAdj; //a value
    }else{
     editedR = 0+ rAdj; //r value
     editedG = 0+ gAdj; //g value
     editedB= 0+ bAdj; //b value
     editedA = img.pixels[index + 3] + aAdj; //a value
    }
    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}}


  img.updatePixels();
}




//Extra functions after commit Chris
function pointalizeFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, circleSize = 20){
background(0);
  //print("pointing dots");
img.loadPixels();
for (let x = 0; x < (img.width); x+=circleSize) {
  for (let y = 0; y < (img.height); y+=circleSize) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3] + aAdj; //a value

    fill(editedR,editedG,editedB);
    ellipse(x,y,circleSize, circleSize);

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = 255;
}
}

  img.updatePixels();
}
function shiftingPointalizeFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, circleSize = 20){
background(0);
stroke(0);
  //print("pointing dots");
img.resize(width,height);
img.loadPixels();
for (let x = 0; x < (img.width); x+=circleSize) {
  for (let y = 0; y < (img.height); y+=circleSize) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3] + aAdj; //a value

    fill(editedR,editedG,editedB);
    ellipse(x,y+random(-amplitudeNumber,amplitudeNumber),circleSize, circleSize);

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = 255;
}
}

  img.updatePixels();
}
function shrinkingRectFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, rectBaseSize = 20){
background(0);
  //print("pointing dots");
img.resize(width,height);
img.loadPixels();
for (let x = 0; x < (img.width); x+=rectBaseSize*2) {
  for (let y = 0; y < (img.height); y+=rectBaseSize*2) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0] + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3] + aAdj; //a value

    fill(editedR,editedG,editedB);
    rect(x,y,rectBaseSize+random(-amplitudeNumber,amplitudeNumber), rectBaseSize+random(-amplitudeNumber,amplitudeNumber));

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = 255;
}
}

  img.updatePixels();
}

function paintingPointalizeFilter( amplitudeNumber, smallPoint = 4, largePoint = 40, circlesPerFrame = 10){
  for(let i = 0; i<circlesPerFrame;i++){
  noStroke();
  let pointillize = map(amplitudeNumber, 0, 50, smallPoint, largePoint);
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let pix = img.get(x, y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
  }
}
function adjustGreySquareFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, circleDiameter = 25) {
 let circleX = img.width/2;
  let circleY =img.height/2;
 circleDiameter *= amplitudeNumber;

  img.loadPixels();


  for (let x = 0; x < (img.width); x++) {
    for (let y = 0; y < (img.height); y++) {
     if(x>circleX-circleDiameter && x<circleX+circleDiameter &&y>circleY-circleDiameter && y<circleY+circleDiameter){
      var index = (x + y * img.width) * 4;
      let grayScale = img.pixels[index + 0] * 0.299 + img.pixels[index + 1] * 0.587 + img.pixels[index + 2] * 0.114;

      let editedR = grayScale; //r value
      let editedG = grayScale; //g value
      let editedB = grayScale; //b value
      let editedA = img.pixels[index + 3] + aAdj; //a value

      //putting edited values into their pixel channels
      img.pixels[index + 0] = editedR;
      img.pixels[index + 1] = editedG;
      img.pixels[index + 2] = editedB;
      img.pixels[index + 3] = editedA;
    }
     // fill(grayScale,grayScale,grayScale);
     // ellipse(circleX, circleY, 50,50);

    }
  }
 /* let circleXPos = amplitudeNumber * 100;//random(0,img.width);
  let circleYPos = amplitudeNumber * 100;//random(0,img.height);
  ellipse(circleXPos,circleYPos,50,50)*/

  img.updatePixels();
}
function adjustInvertedGreySquareFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, circleDiameter = 25) {
 let circleX = img.width/2;
  let circleY =img.height/2;
 circleDiameter *= amplitudeNumber;

  img.loadPixels();


  for (let x = 0; x < (img.width); x++) {
    for (let y = 0; y < (img.height); y++) {
     if(!(x>circleX-circleDiameter && x<circleX+circleDiameter &&y>circleY-circleDiameter && y<circleY+circleDiameter)){
      var index = (x + y * img.width) * 4;
      let grayScale = img.pixels[index + 0] * 0.299 + img.pixels[index + 1] * 0.587 + img.pixels[index + 2] * 0.114;

      let editedR = grayScale; //r value
      let editedG = grayScale; //g value
      let editedB = grayScale; //b value
      let editedA = img.pixels[index + 3] + aAdj; //a value

      //putting edited values into their pixel channels
      img.pixels[index + 0] = editedR;
      img.pixels[index + 1] = editedG;
      img.pixels[index + 2] = editedB;
      img.pixels[index + 3] = editedA;
    }
     // fill(grayScale,grayScale,grayScale);
     // ellipse(circleX, circleY, 50,50);

    }
  }
 /* let circleXPos = amplitudeNumber * 100;//random(0,img.width);
  let circleYPos = amplitudeNumber * 100;//random(0,img.height);
  ellipse(circleXPos,circleYPos,50,50)*/

  img.updatePixels();
}
function adjustCoolWarmFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1){

img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    let editedR = img.pixels[index + 0]*amplitudeNumber + rAdj; //r value
    let editedG = img.pixels[index + 1] + gAdj; //g value
    let editedB= img.pixels[index + 2] + bAdj; //b value
    let editedA = img.pixels[index + 3]/(amplitudeNumber) + aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}
function contrastFilter(rAdj = 0, gAdj = 0, bAdj = 0, aAdj = 0, amplitudeNumber = 1, ampSensitivity = 2,
  redSensitivity = 1, greenSensitivity = 10, blueSensitivity = 100){
let amplitudeSensitivity = amplitudeNumber/ampSensitivity;
img.loadPixels();
for (let x = 0; x < (img.width); x++) {
  for (let y = 0; y < (img.height); y++) {
    var index = (x+y*img.width)*4;
    //lerp(img.pixels[index + 0], 255 - img.pixels[index + 0], amplitudeNumber/sensitivity) + rAdj; //r value
    let editedR = (  (255/(redSensitivity/amplitudeSensitivity)) - img.pixels[index + 0])  + rAdj; //r value
    let editedG = ( (255/(greenSensitivity/amplitudeSensitivity)) - img.pixels[index + 1] )+ gAdj; //g value
    let editedB= ( (255/(blueSensitivity/amplitudeSensitivity)) - img.pixels[index + 2])+ bAdj; //b value
    let editedA = img.pixels[index + 3]/(amplitudeNumber) + aAdj; //a value

    //putting edited values into their pixel channels
    img.pixels[index + 0] = editedR;
    img.pixels[index + 1] = editedG;
    img.pixels[index + 2] = editedB;
    img.pixels[index + 3] = editedA;
}
}

  img.updatePixels();
}
