//make new pallete for bg, num of lines to noise, loud reset
var mic;
var vol;
let pallete = [
  "#447E64",
  "#202C5B",
  "#D3705F",
  "#CDC1B2",
  "#5AB56A",
  "#A8CA72",
  "#A591CA",
  "#563020",
  "#499264",
];

let bgpallete = ["#927149"];
//let mic;
let graphics;
let num = 10; //num of lines
let movers = [];
let offset;
let bg;
let g;

class Mover {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.noiseScaleX = 100;
    this.noiseScaleY = 100;
    this.noiseScaleZ = random(100, 200);
    this.vel = createVector(0, 0);
    this.life = this.life(); //random(1);
    this.count = int(random(1, 10));
    this.c = pallete[int(random(pallete.length))];
  }
  life() {
    let orig = random(1);
    let vol = mic.getLevel();
    let g = map(orig * (1.0 + vol * 500), 0, 100, 0.5, 20, true);
    print("vol: ", vol, " g: ", g);
    return g;
  }
  update() {
    // let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY, frameCount / this.noiseScaleZ);
    let n = noise(this.pos.x / this.noiseScaleX, this.pos.y / this.noiseScaleY);
    let angle = map(n, 0, 1, 0, 180); //angle
    this.vel = createVector(cos(angle), sin(angle));
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, offset, width - offset);
    this.pos.y = constrain(this.pos.y, offset, height - offset);
    this.life -= random(random(random(random()))) / 5;
    this.life = constrain(this.life, 0, 5); //constrain here ish
  }

  display() {
    //let vol = mic.getLevel();
    //let g = map(vol, 0, 1, 0, 10, height);
    //  if mic.getLevel = great than for num
    //strokeWeight(map(this.life, g, 0.5, 0, 5)); //weight
    strokeWeight(map(this.life, 0, 1, 0, 5)); // original
    stroke(this.c + "66");
    point(this.pos.x, this.pos.y);
  }
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  // Create an Audio input
  mic = new p5.AudioIn();
  //have start() before getLevel()
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  drawNoiseBackground(10000, graphics);
  let n = int(random(bgpallete.length));
  bg = bgpallete[n];
  pallete.splice(n, 1);

  offset = width / 10;
  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    movers.push(new Mover(x, y));
  }
  background(bg);
}

function mousePressed() {
  //if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
  let fs = fullscreen();
  fullscreen(!fs);
  // }
}

function draw() {
  // Create an Audio input
  // mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  // mic.start();

  for (let mover of movers) {
    mover.update();
    mover.display();
  }

  for (let i = movers.length - 1; i > 0; i--) {
    let mover = movers[i];
    if (mover.life == 0) {
      movers.splice(i, 1);
    }
  }
  for (let i = movers.length; i < num; i++) {
    let angle = random(360);
    let x = random(width);
    let y = random(height);
    movers.push(new Mover(x, y));
  }
}

//

function drawNoiseBackground(_n, _graphics) {
  // mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  //  mic.start();
  let vol = mic.getLevel();
  let g = map(vol, 0, 0.05, 0, 5, canvas);
  let c = color(0, 0, 0, 0.2);
  for (let i = 0; i < _n; i++) {
    let x = g * width;
    let y = g * height;
    let w = random(1, 3);
    let h = random(1, 3);
    // _graphics.noStroke();
    stroke(255);
    _graphics.fill(c);
    _graphics.ellipse(x, y, w, h);
  }
}
