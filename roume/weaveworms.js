
var mic;
var vol;
let xoff = 0.01;
let yoff = 0.01;
let loud;
let objs = [];
let objsNum = 6;
const noiseScale = 0.01;
let savedTime;
let totalTime = 50;
let R;
let n;
let maxR;
let t = 0;
let nt = 0;
let nR = 0;
let nTheta = 100;
let every = 25;
let cutoff = 50;
const palette = [
  "#365951",
  "#222d4f",
  "#807d79",
  "#5a8f8a",
  "#4e704d",
  "#4a2f7a",
  "#017d77",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //noStroke();
  stroke(color(255, 255, 255, 100));

 maxR = max(width, height) * 0.45;
 print(canvas)
 
  // Create an Audio input
  mic = new p5.AudioIn()
  //have start() before getLevel()
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start(noop, onError);
 
  noiseSeed(99);

  background("#4d4d4d");
  let R = map(noise(nt * 0.001, nR), 0, 1, 0, maxR);
  let t = map(noise(nt * 0.001, nTheta), 0, 1, -360, 360);
  let x = R * cos(t) + width / 2;
  let y = R * sin(t) + height / 2;
  objs.push(new Obj(x, y));
}

function mousePressed() {
  //if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
 // }
}

function draw() {
  
 /// savedTime = millis();
   // Calculate how much time has passed
//  let passedTime = millis() - savedTime;
  // Has five seconds passed?
 /// if (passedTime > totalTime) {
  // fancyReset();
    //println("5 seconds have passed!");
    //background(random(255)); // Color a new background
  //  savedTime = millis(); // Save the current time to restart the timer!
 // }
  
  // The parameter controls how much the volume level is smoothed.
  let vol = mic.getLevel(10);
 
  let flip = 50
  if (vol > 0) {
    flip = 1.0 / vol
    print("vol: ", vol, " flip: ", flip)
  }
  //let locx = map(flip, 0, 200, 1, width, true);
  locx = random(width);
  let locy = map(flip, 0, 40, 1, height, true);


  //vol = vol*60
  //print("vol: ", vol)
  //let loc = map(vol, 0, 0.5, 1, 100, canvas);
  //xoff = xoff + 0.01;
  //let n = noise(xoff) * width;
  //let locx = map(vol, 0, 1, 1, 100, canvas);
  //let xoff = noise(locx)*random(width);
  //let xoff = locx;
  //let locy = map(vol, 0, 1, 1, 100, canvas);
  //let yoff = noise(locy)*random(height);
  //let yoff = locy;
  //print("locx: ", locx, " locy: ", locy)
  let blink = frameCount % every
  if (blink == 0  &&  flip < cutoff) {
    objs.push(new Obj(locx, locy));
  }

  if (mouseIsPressed) {
    objs.push(new Obj(mouseX, mouseY));
  }

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();

    objs[i].display();
  }

  for (let j = objs.length - 1; j >= 0; j--) {
    if (objs[j].isFinished()) {
      objs.splice(j, 1);
    }
  }

  // t++;
  nt++;
}

class Obj {
  constructor(ox, oy) {
    this.init(ox, oy);
  }

  init(ox, oy) {
    this.vel = createVector(0, 0);
    this.pos = createVector(ox, oy);
    this.t = random(0, noiseScale);
    this.lifeMax = random(50, 100);
    this.life = this.lifeMax;
    this.step = random(0.1, 0.5);
    this.dMax = random(1) >= 5 ? 10 : 30;
    this.d = this.dMax;
    this.c = color(random(palette));
  }

  move() {
    let theta = map(
      noise(this.pos.x * noiseScale, this.pos.y * noiseScale, this.t),
      0,
      1,
      -360,
      360
    );
    this.vel.x = cos(theta);
    this.vel.y = sin(theta);
    this.pos.add(this.vel);
  }

  isFinished() {
    this.life -= this.step;
    this.d = map(this.life, 0, this.lifeMax, 0, this.dMax);
    if (this.life < 0) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    fill(this.c);

    circle(this.pos.x, this.pos.y, this.d);
  }
}

function func(t, num) {
  let a = 360 / num;
  let A = cos(a);
  let b = acos(cos(num * t));
  let B = cos(a - b / num);

  return A / B;
}

var noop = function(){}; // do nothing.

function onError() {
  print("there was an error")
}


//function fancyReset(){
// background(0,0,0);
 //loop();
 // setup();
//  background(0,0,0);
//   redraw();
  
//}
