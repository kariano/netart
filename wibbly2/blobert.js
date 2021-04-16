let t = 0;
let step = 0.01;
let n;
let size = 50;
let radiusDist = [];
let blab = [];
let rr;
let g;
let b;
let a;
let jay = 5
let kay = 3
let tee = 0.01
var usecolour = false;
let fa = 1
let sa = 255

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
  getIPAddress();
  getCurrentPosition(gotLocation);
  createCanvas(windowWidth, windowHeight);
  // stroke(1, 0, 0, 0.4);
  //noFill()
  // for (let i = 0; i < 10; i++){
  //    blob[i] = new blob(4);
  //  }
  blendMode(MULTIPLY);
  blendMode(BLEND);
  //r = random(0,255);
  //g = random(0,255);
  // b = random(0,255);
  // a = random(10,30);
  n = floor((2 * PI) / step) + 3;

  radiusDist.length = n;
  //radiusDist.fill(size);
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
    jay = map(ip1, 0, 255, 5, 20)
    rr = map(ip2, 0, 255, 1, 254);
    a = map(ip2, 0, 255, 1, 50);
    g = map(ip3, 0, 255, 1, 254);
    b = map(ip3, 0, 255, 1, 254);
  }
  if (myIPAddress) {
    text("My IP address is " + myIPAddress, 20, 60);
  }
  if (myLatitude) {
    text("My latitude is " + myLatitude, 20, 80);
    kay = (map(myLatitude - floor(myLatitude), 0, 1, 0.01, 3))
  }
  if (myLongitude) {
    text("My longitude is " + myLongitude, 20, 100);
    tee = (map(myLongitude - floor(myLongitude), 0, 1, 0.005, 0.01))
  }
  // text("This is some text", 20, 120);
  //background(220);
  // }
  // ------------------------------------------------

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
  
  background(255);
  fill(rr, g, b, fa);
  //noStroke();
  stroke(rr, g, b, sa + 60)
  for (let j = 1; j <= jay; j++) {

    radiusDist.fill(size + 6 * j);
    let k = kay + (j * 0.2)

    t += tee;
    blob(radiusDist, width / 2, height / 2, k, t);
    //t += 0.007;

  }

  // t += tee;
}

// Creates and draws a blob
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
    r1 = cos(theta - PI / 2);
    r2 = sin(theta - PI / 5)
    let r = size[i] + noise(k * r1, k * r2, t) * (2) * size[i];
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();

}
