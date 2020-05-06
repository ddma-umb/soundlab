let mic, recorder, soundFile;

let state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {
  createCanvas(400, 400);
  fill(0);
 
  mic = new p5.AudioIn();
  mic.start();
  mic.connect();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);


  background(0,0,255);
  text('Tap a key to record.', 20, 20);
  soundFile = new p5.SoundFile();
}

function keyPressed() {

  if (state === 0 && mic.enabled) {

  background(255,0,0);
    recorder.record(soundFile);
    text('Recording.', 20, 20);
    state++;
  } else if (state === 1) {
    background(0,255,0);

    text('Looping.', 20, 20);
    recorder.stop(); 
 	soundFile.loop();
    // background(0, 255, 0);
    state++;
  }

}
