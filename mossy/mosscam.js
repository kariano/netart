var video;
var scaler = 10;
var preFrame;
var minMovedPixels = 1500;

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

  //createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(
  {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  video.size(width / scaler, height / scaler);
  video.hide();
  preFrame = createImage(video.width, video.height);

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
  if (frameCount % 60 == 0) {
    if (movement()) {
      background(0);
    }
  }

  translate(0, height); //moves the origin to bottom left
  scale(1, -1); //flips the y values so y increases "up"

  if (frameCount % 2 == 0) {
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

function movement() {
  video.loadPixels();
  preFrame.loadPixels();

  var moved = 0;

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4;
      let pr = preFrame.pixels[index + 0];
      let pg = preFrame.pixels[index + 1];
      let pb = preFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;

      var diff = dist(r, g, b, pr, pg, pb);
      //print('diff ' + diff)
      if (diff > 50) {
        moved++;
      }
      //      else {
      //      return true
      //  }
      //noStroke();
      //rect(x * scaler, y * scaler, scaler, scaler);
    }
  }

  preFrame.copy(
    video,
    0,
    0,
    video.width,
    video.height,
    0,
    0,
    video.width,
    video.height
  );

  return moved > minMovedPixels;
}
