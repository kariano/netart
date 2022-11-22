
let cols;
let minRadius, maxRadius, radiusStep;
let noiseScale = 0.010;
let circleNum;
let egg = 1;
let fry = 2;
let pan = 3;
let r;
let g;
let b;
let a;
let fa = 1;
let sa = 100;
var usecolour = false;


//// IP address business
//

// This is set when getIP() is called as a callback in getIPAddress.
// As this is setup asynchronously, you'll have to test that it has a value
// before using it.  See draw()
let myIPAddress;

function getIP(json) {
  
  console.log("My public IP address is: " + json.ip);
  myIPAddress = json.ip;
}

function getIPAddress() {
  //console.log("In getIPAddress");

  let url = 'https://api.ipify.org?format=jsonp';
  httpGet(url, 'jsonp', false, getIP, onErrorFetch);
}

function onErrorFetch() {
  text("There was an error fetching the data.", 20, 60);
}

//
//// end of IP address business

//// Geolocation business
//

let myLatitude;
let myLongitude;

function gotLocation(position) {
  // This shows all the stuff that you might get.
  // You'd have to test they have useful values before using though, cuz
  // you don't always get all the info.
  print("lat: " + position.latitude);
  print("long: " + position.longitude);
  print("accuracy: " + position.accuracy)
  print("altitude: " + position.altitude)
  print("altitude accuracy: " + position.altitudeAccuracy)
  print("heading: " + position.heading)
  print("speed: " + position.speed)

  myLatitude = position.latitude;
  myLongitude = position.longitude;
}

//
//// end of IP address business

function setup() {
  //console.log("In setup");

  getIPAddress();
  getCurrentPosition(gotLocation);

  //createCanvas(400, 400);

  // Kiera's stuff
  createCanvas(windowWidth, windowHeight);
  minRadius = min(windowWidth, windowHeight) * 0.1;
  maxRadius = min(windowWidth, windowHeight) * 0.4;

//r = random(0,255);
//g = random(0,255);
//b = random(0,255);
//a = random(0,255);
  
print(minRadius);
  print(maxRadius);
  //egg = random(1, 12);
  //fry = random(2, 6);
  //pan = random(3, 30);


}

function draw() {

  if (myIPAddress) {
    //     text("My IP address is " + myIPAddress, 20, 60);

    ipParts = split(myIPAddress, '.');
    ip0 = ipParts[0];
    ip1 = ipParts[1];
    ip2 = ipParts[2];
    ip3 = ipParts[3];
    circleNum = map(ip0, 0, 255, 8, 24)
    fry = map(ip1, 0, 255, 2, 6)
    r = map (ip2, 0, 255, 1, 254);
    a = map (ip2, 0, 255, 1, 50);
    g = map (ip3, 0, 255, 1, 254);
    b = map (ip3, 0, 255, 1, 254);
  }
  if (myIPAddress) {
    text("My IP address is " + myIPAddress, 20, 60);
  }
  if (myLatitude) {
    text("My latitude is " + myLatitude, 20, 80);
    pan = (map(myLatitude-floor(myLatitude), 0, 1, 3, 30))
  }
  if (myLongitude) {
    text("My longitude is " + myLongitude, 20, 100);
    egg = (map(myLongitude-floor(myLongitude), 0, 1, 1, 12))
  }
  // text("This is some text", 20, 120);
  //background(220);
  // }
  // ------------------------------------------------

radiusStep = (maxRadius - minRadius)/circleNum;
  background(250);

//print(circleNum)
//r = random(0,255);
 // g = random(0,255);
 // b = random(0,255);
 // a = random(0,255);
  
if(mouseY >= windowHeight/2) {
  usecolour = false
} else {usecolour = true}
  
if(!usecolour && fa > 0) {
  fa = fa - 1
  sa = map(fa, 0, a, 255, a)
} else if (usecolour && fa < a){
  fa = fa + 1
  sa = map(fa, 0, a, 255, a)
}
  

  //noStroke();
  translate(width / 2, height / 2);
  let ci = 0;
  for (let radius = maxRadius; radius > minRadius; radius -= radiusStep) {
    // This translate moves the center around a little bit.
    // Play with the constants to see how.  e.g a 0.01 to 0.08
    translate(minRadius * 0.01 * cos(frameCount / pan), minRadius * 0.01 * sin(frameCount / pan));
    //blendMode(BLEND);
    //blendMode(MULTIPLY);
    fill(r,g,b,fa);
    stroke(r,g,b,sa);
    beginShape();
    let thetaStep = TWO_PI / Math.floor(TWO_PI / map(40, 0, TWO_PI * radius, 0, TWO_PI));
    for (let theta = 0; theta < TWO_PI + thetaStep * 3; theta += thetaStep) {
      let x = radius * cos(theta);
      let y = radius * sin(theta);
      let nv = noise((x + frameCount / 10) * noiseScale, (y + frameCount * fry) * noiseScale);
      // play with radiusStep factor!  9 is fun
      // if you reduce the radius factor I think you'll get more overlap
      let r = (nv - 0.5) * radiusStep * egg + radius * 0.9;
      curveVertex(r * cos(theta), r * sin(theta));
    }
    endShape();
    ci++
  }
}

function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
function mousePressed() {
//  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
 // }
}

