let img;
let cnv;
let song, buttton, fft, space_between_lines;

function toggleSong() {
  if(song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload(){
  img = loadImage('assets/jake_ncaas.jpg');
  song = loadSound('assets/Ima Boss.mp3'); 
}

//only run once
function setup() {
  cnv = createCanvas (img.width, img.height);
  //print(ing.width,img.height)
  let newCanvasX = (windowWidth - img.width)/10;
  let newCanvasY = (windowHeight - img.height)/10;
  cnv.position(newCanvasX, newCanvasY);
  //access the pixel information of the image
  for(let col = 0; col< img.width; col+=2) {
    for(let row = 0; row<img.height; row+=2){
      let xPos = col;
      let yPos = row;
      let c = img.get(xPos,yPos);
      push();
      translate(xPos, yPos);
      rotate(radians(random(360)))
      noFill();
      stroke(color(c))
      strokeWeight(random(5));
      point(xPos, yPos);
      strokeWeight(random(3));
      curve(xPos, yPos, sin(xPos) * random(30), cos(xPos) * sin(xPos) * random(70),
           random(10), random(30), cos(yPos) * sin(yPos) * random(30), cos(xPos) * sin(xPos) * 100)
      pop();
    }
  }

  angleMode(DEGREES); // Change the mode to DEGREES
  colorMode(HSB);
  buttton = createButton('Toggle Play');
  buttton.mousePressed(toggleSong);
  song.play();  
  fft = new p5.FFT(0.9, 128);
  space_between_lines = width / 128;
}

function draw() {
  // background(0);
  
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    fill(i,255,255);
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    rect(i * space_between_lines, y, space_between_lines, height - y);
  }
}

// Chrome 70 will require user gestures to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}