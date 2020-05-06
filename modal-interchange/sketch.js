

var tones = [60, 62, 64, 66];


function setup() {
  createCanvas(800, 500);
  w=windowWidth;
  h=windowHeight;

  background(200);
    var container = createDiv('');
  container.position(200,200);


  toneFilter = new p5.LowPass();
  toneFilter.freq(700);

  toneOscillator = new p5.Oscillator();
  toneOscillator.setType('square');
  toneOscillator.disconnect();
  toneOscillator.connect(toneFilter);
  toneOscillator.freq(midiToFreq(60));
  toneOscillator.amp(0.1);
}

function keyReleased() {
	if (key === ' '){
		toneOscillator.start();
	}
}
function draw () {

}
