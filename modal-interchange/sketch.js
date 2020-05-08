

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

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C'];

function preload() {
  ibm = loadFont('../assets/IBMPlexMono-Regular.woff');
}

function setup() {
  createCanvas(windowWidth, 700);
  toneOscillator = initializeOsc();

}



/**
 * 
 */
function playScale(scale, startingValue){
  var midiVal = startingValue;
  var i = 0;

  var intID = setInterval(function() {
      generateTone(midiVal);
      console.log(midiVal);
      midiVal+=DATA.modes[scale].intervals[i];
      toneOscillator.start();;
      if(i < 8){
        i++;
      }
      else { 
        clearInterval(intID);
        toneOscillator.stop();
      }
   }, 200); 

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
  console.log(freq);
  toneOscillator.freq(freq);
  // setTimeout(generateTone, 1000);
}

function draw () {
  
}

function buildScale(mode){
  var keyStart = 0;
  var scale = new Array();
  var twelveToneScale = [0,0,0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < mode.length; i++){
    twelveToneScale[0] = 1;
    twelveToneScale[keyStart+=mode[i]] = 1;
  }
  return twelveToneScale;
}

function drawPitchNodes(scaleOfMode){  
  console.log("drawing pitch nodes...");
  noStroke();
  var currentNoteVal = 0;
  for(let i = 0; i < 13; i++){
 
    if(scaleOfMode[i] == 1){
      fill(13, 15, 57);
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
    clear();
    var mode = DATA.modes[key-1];
    fill(0,0,0);
    textSize(18);
    textFont("ibm");
    let textData = mode.degree + " " + mode.name + (mode.common_name ? (" (" + mode.common_name + ")") : ""); 
    text(textData, 10, 120);
    playScale(key-1, 60);
    drawPitchNodes(buildScale(mode.intervals));
  }
}
