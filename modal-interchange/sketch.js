

var ionian = [0, 2, 2, 1, 2, 2, 2];
var lydian = [0, 2, 2, 1, 2, 2, 2];

var notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
function preload() {
  ibm = loadFont('../assets/IBMPlexMono-Regular.woff');
}

function setup() {
  createCanvas(windowWidth, 500);
  
  // background(200);
  
  // generateTone(60);

  // buildScale(lydian);
  var scale = buildScale(lydian);
  drawPitchNodes(scale, 60);
  // playScale();

  // var container = createDiv('');
  // container.position(0, 0);
}

function playScale(scale, startingValue){
  let midiVal = startingValue;
  for(let i = 0; i < scale.length; i++){
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
  toneOscillator.amp(0.1);
}

function keyReleased() {
	if (key === ' '){
		toneOscillator.start();
	}
}

function draw () {
}

function buildScale(mode){
  var keyStart = 0;
  var scale = new Array();
  var twelveToneScale = [0,0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < mode.length; i++){
    twelveToneScale[keyStart+=lydian[i]] = 1;
  }
  return twelveToneScale;
}

function drawPitchNodes(scaleOfMode){  
  console.log("drawing pitch nodes...");
  noStroke();
  var currentNoteVal = 0;
  for(let i = 0; i < 12; i++){
 
    if(scaleOfMode[i] == 1){
      fill(243, 140, 46);
    }
    else{
      fill(44,0,80);
    }
    let circleDist = i*(windowWidth/15);
    ellipse(50+circleDist,50,50,50);

    fill(255,255,255);
    textFont("ibm");
    text(notes[i], 45+circleDist,55)
  }
}
