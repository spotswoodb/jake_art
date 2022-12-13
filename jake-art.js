let img;
let cnv;

function preload(){
  img = loadImage('assets/jake_ncaas.JPG');
}

//only run once
function setup() {
  cnv = createCanvas(img.width, img.height);
  let newCanvasX = (windowWidth - img.width)/20;
  let newCanvasY = (windowHeight - img.height)/20;
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
  
}