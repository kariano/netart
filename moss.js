var n;

var xValues;

var yValues;

var sValues;

var cValues;

let startTime;
var xc;
var yc;

var layers;
//var arr;
var nperl;

var xLayer;
var yLayer;
var framesPerLayer;

function setup() {
  initializeFields();
  createCanvas(1150, 604);
  background(0);
  colorMode(HSB, 360, 100, 100);

  xLayer = Create2DArray(layers);
  yLayer = Create2DArray(layers);
  for (var l = 0; l < layers; l++) {
    hmax = height - floor((l / layers) * height);

    for (var i = 0; i < nperl; i++) {
      xLayer[l][i] = random(width);

      yLayer[l][i] = random(hmax);

      sValues[i * l] = random(2, 20);
      cValues[i * l] = color(random(50, 100), random(90), random(90));
    }
  }
}

function draw() {
  // background(0);

  translate(0, height); //moves the origin to bottom left
  scale(1, -1); //flips the y values so y increases "up"

  if (frameCount % 5 == 0) {
    maxLayer = Math.max(Math.trunc(frameCount / framesPerLayer), layers - 1);
    //print("maxLayer is " + maxLayer);
    for (var l = 0; l < layers; l++) {
      if (l < maxLayer) {
        for (var i = 0; i < nperl; i++) {
          stroke(cValues[i * l]);
          point(xLayer[l][i], yLayer[l][i], sValues[l * i]);

          // noprotect

          fill(0);
          xLayer[l][i] = xLayer[l][i] + random(-3, 3);
          yLayer[l][i] = yLayer[l][i] + random(-3, 3);

          //yValues[i] = constrain(yValues[i] + random(-3, 3), -50, 550);

          // let elapsedTime = millis() - startTime;
          // if (elapsedTime > 2000) {
          // createCanvas(1150, 140);
          //}
          //if (elapsedTime > 4000) {
          // createCanvas(1150, 240);
          //}
        }
      }
    }
  }
}

function initializeFields() {
  n = 1000;
  layers = 100;
  //xValues = new Array(n);
  //yValues = new Array(n);
  sValues = new Array(n);
  cValues = new Array(n);
  nperl = ceil(n / layers);
  framesPerLayer = 100;
}
function mousePressed() {
  background(0);
}

function Create2DArray(rows) {
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}
