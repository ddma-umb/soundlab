

var DATA = {
  "modes": [
  {
    "name": "Ionian",
    "intervals": [0, 2, 2, 1, 2, 2, 2, 1]
  },
  {
    "name": "Dorian",
    "intervals": [0, 2, 1, 2, 2, 2, 1, 2]
  },{
    "name": "Phrygian",
    "intervals": [0, 1, 2, 2, 2, 1, 2, 2]
  },{
    "name": "Lydian",
    "intervals": [ 0, 2, 2, 2, 1, 2, 2, 1]
  },{
    "name": "Mixolydian",
    "intervals": [0, 2, 2, 1, 2, 2, 1, 2]
  },{
    "name": "Aeolian",
    "intervals":  [0, 2, 1, 2, 2, 1, 2, 2]
  },{
    "name": "Locrian",
    "intervals": [0, 1, 2, 2, 1, 2, 2, 2]
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

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C'];
function preload() {
  ibm = loadFont('../assets/IBMPlexMono-Regular.woff');
}

function setup() {
  createCanvas(windowWidth, 500);
  text(DATA.modes[3].name, 10,10);
  scale = buildScale(DATA.modes[3].intervals);
  drawPitchNodes(scale);
}

function playScale(scale, startingValue){
  let midiVal = startingValue;
  for(let i = 0; i < scale.length; i++){
    console.log('got here');
    if(scale[i] == 1){
      generateTone(midiVal+=i)

    }
    i++;
  }
}

function generateTone(midiVal) {
  toneFilter = new p5.LowPass();
  toneFilter.freq(700);
  toneOscillator = new p5.Oscillator();
  toneOscillator.setType('square');
  toneOscillator.disconnect();
  toneOscillator.connect(toneFilter);
  toneOscillator.freq(midiToFreq(midiVal));
  toneOscillator.amp(0.2);
  toneOscillator.start();
  toneo

  toneOscillator.stop();
}

function keyReleased() {
	if (key === ' '){
    playScale(scale, 60);
	}
}

function draw () {
}

function buildScale(mode){
  var keyStart = 0;
  var scale = new Array();
  var twelveToneScale = [0,0,0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < mode.length; i++){
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
      fill(44,0,80);
    }
    else{
      fill(200, 200,200);
    }
    let circleDist = i*(windowWidth/15);
    ellipse(50+circleDist,50,50,50);
    // console.log(at)
    fill(255,255,255);
    textFont("ibm");
    text(notes[i], 45+circleDist,55)
  }
}
