var mic;
var toneOscillator;

function setup(){
    toneOscillator = initializeOsc();
    mic = new p5.AudioIn();
    mic.start();
    generateTone(60);
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
  