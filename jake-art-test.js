let img;
let cnv;
let song, analyzer;
let amp, soundAmplitude;

// function toggleSong() {
//   if(song.isPlaying()) {
//     song.pause();
//   } else {
//     song.play();
//   }
// }

function preload(){
  img = loadImage('assets/jake_ncaas.jpg');
  song = loadSound('assets/Ima Boss.mp3'); 
}

//only run once
function setup() {
  cnv = createCanvas(img.width, img.height);
  let newCanvasX = (windowWidth - img.width)/2;
  let newCanvasY = (windowHeight - img.height)/2;
  cnv.position(newCanvasX, newCanvasY);
  // access the pixel information of the image
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

  let amp = new p5.Amplitude();
  song.play();
  amp.setInput(song);
  let soundAmplitude = amp.getLevel();
  return soundAmplitude;
  
  // // Create analyzer
  // analyzer = new p5.Amplitude();

  // angleMode(DEGREES); // Change the mode to DEGREES
  // colorMode(HSB);
  // buttton = createButton('Toggle Play');
  // buttton.mousePressed(toggleSong);
  // song.play();  
  // fft = new p5.FFT(0.9, 128);
  // // space_between_lines = width / 128;
}

function draw() {

  // Listen for the sound amplitude and map it to a new x-position for the image
  background(0);
  let vol = map(soundAmplitude, 0, 1, 0, 255);
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    // Set the red, green, and blue values of the pixel to the volume
    img.pixels[i] = vol;
    img.pixels[i + 1] = vol;
    img.pixels[i + 2] = vol;
    img.pixels[i + 3] = 255;
  }
  img.updatePixels();
  image(img, 0, 0);

  // analyzer = new p5.Amplitude();
  // song.play()
  // let soundAmplitude = analyzer.getLevel();
  // imgX = map(soundAmplitude, 0, 1, 0, width);

  // animate the image according to the sound amplitude

  // // Map the volume to a value that can be used to manipulate the image
  // let mappedVolume = map(volume, 0, 1, 0, 100);

  // // Draw the image and manipulate it based on the volume
  // image(img, 0, 0, width, height);
  // tint(255, mappedVolume);

}

// // Chrome 70 will require user gestures to enable web audio api
// // Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}