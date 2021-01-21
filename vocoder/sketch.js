/*var mic;
var toneOscillator;

function setup(){
    toneOscillator = initializeOsc();
    mic = new p5.AudioIn();
    mic.start();
    generateTone(1000);
}

function draw(){
  text('got here');
  var vol = mic.getLevel();
  vol = int(map(vol, 0, 1, 0, 12));
  let midiVal = vol+60;
  generateTone(midiVal);
  console.log(midiVal);

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
  
*/
  let osc, playing, freq, amp;
  let mic;

function setup() {
  let cnv = createCanvas(100, 100);
  mic = new p5.AudioIn();  
  
  let fft = new p5.FFT();
  fft.setInput(mic);
  
  mic.start();
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {
  
  let inputLevel = mic.getLevel();

  freq = constrain(map(inputLevel, 0, .3, 100, 500), 100, 500);
  amp = constrain(map(inputLevel, 0, .3, 0, 1), 0, 1);

  amp = .2;
  // fft.analyze(16);
  
  // text('start vocoder', 20, 20);

  osc.freq(freq);
  osc.amp(amp);
  
  osc.start();
}

function playOscillator() {

  osc.start();
  playing = true;
}
