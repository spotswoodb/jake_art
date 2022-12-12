let img;
let cnv;
let song;
let fft;

function preload(){
    img = loadImage('assets/jake_ncaas.jpg');
    song = loadSound('assets/Ima Boss.mp3'); 
    // amp = new p5.Amplitude();
    // song.play();
    // amp.setInput(song);
    // soundAmplitude = amp.getLevel(); 
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

    song.play()

    fft = new p5.FFT()
}

function draw() {
    // background(0);
    let spectrum = fft.analyze();
    let freq = spectrum[100];
    image(img, 0, 0, freq * 10, freq * 10);  


}

// // Chrome 70 will require user gestures to enable web audio api
// // Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}