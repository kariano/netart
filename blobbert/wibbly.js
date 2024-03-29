
let t = 0;
let step = 0.01;
let n;
let size = 50;
let radiusDist = [];
let blab = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  stroke(1, 0, 0, 0.4);
  noFill()

  n = floor((2 * PI) / step) + 3;
 
  radiusDist.length = n;
  
}

function draw() {
  background(0);
 
  for (let j = 1; j <= 15; j++) {
   
     radiusDist.fill(size + 6*j);
     let k = 0.7 + (j * 0.2)

     blob(radiusDist, width/2, height/2, k, t);
 
  }

  t += 0.007;
}

// size is the distribution of the radius (before noise) for each angle
// (xCenter, yCenter) is the position of the center of the blob
// k is the tightness of the blob (0 = perfect circle)
// t is the time
function blob(size, xCenter, yCenter, k, t) {
  beginShape();
  for (let i = 0; i < n; i++) {
    let theta = i * step;
    let r1, r2;
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
    let r = size[i] + noise(k * r1, k * r2, t) * (2) * size[i];
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
 
}
function mousePressed() {
  //if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
//  }
}
