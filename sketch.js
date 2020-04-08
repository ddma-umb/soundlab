let mic, recorder, soundFile;

let state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {
  createCanvas(400, 400);
  background(200);
  fill(0);
 
  mic = new p5.AudioIn();
  mic.start();
  mic.connect();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);


  soundFile = new p5.SoundFile();
}

function keyPressed() {

  if (state === 0 && mic.enabled) {
    recorder.record(soundFile);
    text('Recording now! Click to stop.', 20, 20);
   	circle(30, 30, 20);
    state++;
  } else if (state === 1) {
    recorder.stop(); 
 	soundFile.loop();
    background(0, 255, 0);
    state++;
  }

}
