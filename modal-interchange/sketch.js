

var DATA = {
  "modes": [
  {
    "name": "Ionian",
    "common_name": "Major",
    "alt_name": "Tonic",
    "degree": "I",
    "intervals": [2, 2, 1, 2, 2, 2, 1]
  },
  {
    "name": "Dorian",
    "common_name": "Harmonic Minor",
    "alt_name": "Supertonic",
    "degree": "II",
    "intervals": [2, 1, 2, 2, 2, 1, 2]
  },{
    "name": "Phrygian",
    "common_name": "",
    "alt_name": "Mediant",
    "degree": "III",
    "intervals": [1, 2, 2, 2, 1, 2, 2]
  },{
    "name": "Lydian",
    "common_name": "",
    "alt_name": "Subdominant",
    "degree": "IV",
    "intervals": [2, 2, 2, 1, 2, 2, 1]
  },{
    "name": "Mixolydian",
    "common_name": "Dominant",
    "alt_name": "Dominant",
    "degree": "V",
    "intervals": [2, 2, 1, 2, 2, 1, 2]
  },{
    "name": "Aeolian",
    "common_name": "Natural Minor",
    "alt_name": "Submediant",
    "degree": "VI",
    "intervals":  [2, 1, 2, 2, 1, 2, 2]
  },{
    "name": "Locrian",
    "common_name": "",
    "alt_name": "Leading Tone",
    "degree": "VII",
    "intervals": [1, 2, 2, 1, 2, 2, 2]
  }]
};
/*
I W–W–H–W–W–W–H	C–D–E–F–G–A–B–C
II	W–H–W–W–W–H–W	D–E–F–G–A–B–C–D
III	H–W–W–W–H–W–W	E–F–G–A–B–C–D–E
IV	W–W–W–H–W–W–H	F–G–A–B–C–D–E–F
V	  W–W–H–W–W–H–W	G–A–B–C–D–E–F–
VI	W–H–W–W–H–W–W	A–B–C–D–E–F–G–A
VII	H–W–W–H–W–W–W	B–C–D–E–F–G–A–B
 */
var toneOscillator;
var notePlaying;
var selectedMode = 1;

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C'];

function preload() {
  ibm = loadFont('../assets/IBMPlexMono-Regular.woff');
}

function setup() {
  createCanvas(windowWidth, 700);
  toneOscillator = initializeOsc();
  text("select modes with keys 1-7, press SPACE to play", 300, 200);

}


function playScale(scale, startingValue){
  var midiVal = startingValue;
  var i = 0;  
  console.log(notePlaying);
  console.log('got here')
  var intID = setInterval(function() {
      let note = DATA.modes[scale].intervals;
      // console.log(DATA.modes[scale].name);

      if(i>0) 
        notePlaying+=note[i-1] 
      else 
        notePlaying = 0;
      generateTone(midiVal);
      midiVal+=note[i];  
      toneOscillator.start();;
      console.log(notePlaying);  console.log(midiVal-60);

      if(i < 8){
        i++;
      }
      else { 
        clearInterval(intID);
        toneOscillator.stop();
      }
   }, 400); 

}
function initializeOsc(){
  var toneFilter = new p5.LowPass();
  toneOscillator = new p5.Oscillator(); 
  toneFilter.freq(700);
  toneOscillator.setType('square');
  toneOscillator.disconnect();
  toneOscillator.connect(toneFilter);
  toneOscillator.amp(0.1);
  return toneOscillator;  
}
function generateTone(midiVal) {
  let freq = midiToFreq(midiVal);
  // console.log(freq);
  toneOscillator.freq(freq);
  // setTimeout(generateTone, 1000);
}

function draw () {
  drawPitchNodes(buildScale(DATA.modes[selectedMode-1]));
}

function buildScale(mode){
  var keyStart = 0;
  var twelveToneScale = [0,0,0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < mode.intervals.length; i++){
    twelveToneScale[0] = 1;
    twelveToneScale[keyStart+=mode.intervals[i]] = 1;
  }
  return twelveToneScale;
}

function drawPitchNodes(scaleOfMode){  
  // console.log("redrawing drawing pitch nodes...");
  textSize(18);
  textFont("ibm");
  noStroke();

  var mode = DATA.modes[selectedMode-1];
  fill(0,0,0);
  let textData = mode.degree + " " + mode.name + (mode.common_name ? (" (" + mode.common_name + ")") : ""); 
  text(textData, 10, 120);
  for(let i = 0; i < 13; i++){
    if(scaleOfMode[i] == 1){
      if(notePlaying == i){
        fill(255,0,0);
      } else {
        fill(13, 15, 57);
      }
    }
    else{
      fill(200, 200,200);
    }
    let circleDist = i*(windowWidth/15);
   
    ellipse(50+circleDist,50,50,50);
    // console.log(at)
    fill(255,255,255);
    textFont("ibm");
    text(notes[i], 40+circleDist,55)
  }
}

/* Creates a scale composed of @pitchNodes */

function keyTyped() {
  if(key > 0 && key <= 7){
    selectedMode = key;
    clear();
  }
  if(key == ' '){
    playScale(selectedMode-1, 60);
  }
}
