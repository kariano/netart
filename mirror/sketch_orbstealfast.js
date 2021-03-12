var myHex=15, num=1, frames=200;
var radius=170, myAlpha=0, theta=0;
var colour;
var shade;
var orbFramerate = frames;
var orbCounter = 0;
var orbX = 0;
var orbY = 0;

function setup() {
  createCanvas(1000, 1000);
  noStroke();
  colour = random(255);
  shade = random (100);
}

function draw() {
  background(20);
  orbCounter = orbCounter + 1;
  if (orbCounter > orbFramerate) {
     orbX= random(1,4);
     orbY= random(1,4);
     orbCounter = 0;
  }
  orb(orbX, orbY);
}
    
function orb( w, h){
  myAlpha = map(sin(theta),-1,1,10,255);
 
  fill(colour, myAlpha, shade, myAlpha);
  print(myAlpha);
  translate(width/w, height/h);
  for (let j=0; j<num; j++) {
    for (let i=0; i<myHex; i++) {
      push();
      rotate(TWO_PI/hex*i);
      var scal = map(j, 0, num-1, 1, 0.5);
      var x = radius * scal;
      ellipse(radius/2, 0, radius, radius);
      pop();
    }
  }
  theta+=TWO_PI/frames;
  //if (frameCount<=frames) saveFrame("image-###.gif");
}

function keyPressed() {
  save(random(2323)+".jpg");
}
