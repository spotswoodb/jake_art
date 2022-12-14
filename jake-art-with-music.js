var fft;
var audio;
var img;

function preload(){
    img = loadImage('assets/jake-fifth-prototype-with-first-code-final.png');
    fft = new p5.FFT()
    audio = loadSound('assets/Ima Boss.mp3');
}

//only run once
function setup() {
    audio.play();
    createCanvas(800, 600);
    let p = displayDensity();
    pixelDensity(p);
    img.loadPixels();
    image(img, 0, 0, width, height);
    // updatePixels();
}

function draw() {
    var spectrum = fft.analyze();

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          // Get the frequency at the current pixel's x-coordinate
          var index = (x + y * width) * 4;

          var freq = spectrum[x];

          pixels[index] = freq;
          pixels[index + 1] = 0;
          pixels[index + 2] = 0;
          pixels[index + 3] = 255;

        }
      }

      img.updatePixels();
    }


// // Chrome 70 will require user gestures to enable web audio api
// // Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}


// for(var i = 0; i < img.pixels.length; i += 4){
//     img.pixels[i] = spectrum[i];
//     img.pixels[i + 1] = spectrum[i + 1];
//     img.pixels[i + 2] = spectrum[i + 2];
// }


// background(img);
// fft.analyze();
// var spectrum = fft.getEnergy("bass");

// for(var y = 0; y < img.height; y++) {
//     for(var x = 0; x < img.width; x++) {
//         var pixelIndex = (y * img.width + x) * 4;
//         img.pixels[pixelIndex] += spectrum;
//         img.pixels[pixelIndex + 1] += spectrum;
//         img.pixels[pixelIndex + 2] += spectrum;
//     }
// }

// image(img, 0, 0);  