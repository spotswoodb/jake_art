let img;
let cnv;
let song;
let fft;

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
    pixelDensity(1);
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

    img.loadPixels();

    song.play();
    fft = new p5.FFT();
    fft.setInput(song);

}

function draw() {
    noFill();
    fft.analyze();
    var spectrum = fft.getEnergy("bass");

    for(var y = 0; y < img.height; y++) {
        for(var x = 0; x < img.width; x++) {
            var pixelIndex = (y * img.width + x) * 4;
            img.pixels[pixelIndex] += spectrum;
            img.pixels[pixelIndex + 1] += spectrum;
            img.pixels[pixelIndex + 2] += spectrum;
        }
    }

    img.updatePixels();

    image(img, 0, 0);  


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