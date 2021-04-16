let blob = [];
let r;
let g;
let b;
let a;
let jay1;
let jay2;
let jay3;
var usecolour = false;
let sa = 255
let fa = 1

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
  //r = random (0,255);
  //g = random (0,255);
  // b = random (0,255);
  //a = random (5,55);

}
// j< 5-20, drawliq(5-50, x,x,200-500)
function draw() {

  if (myIPAddress) {
    //     text("My IP address is " + myIPAddress, 20, 60);

    ipParts = split(myIPAddress, '.');
    ip0 = ipParts[0];
    ip1 = ipParts[1];
    ip2 = ipParts[2];
    ip3 = ipParts[3];
    circleNum = map(ip0, 0, 255, 8, 24)
    jay1 = map(ip1, 0, 255, 5, 20)
    r = map(ip2, 0, 255, 1, 254);
    a = map(ip2, 0, 255, 1, 50);
    g = map(ip3, 0, 255, 1, 254);
    b = map(ip3, 0, 255, 1, 254);
  }
  if (myIPAddress) {
    text("My IP address is " + myIPAddress, 20, 60);
  }
  if (myLatitude) {
    text("My latitude is " + myLatitude, 20, 80);
    jay2 = (map(myLatitude - floor(myLatitude), 0, 1, 5, 50))
  }
  if (myLongitude) {
    text("My longitude is " + myLongitude, 20, 100);
    jay3 = (map(myLongitude - floor(myLongitude), 0, 1, 200, 500))
  }
  // text("This is some text", 20, 120);
  //background(220);
  // }
  // ------------------------------------------------

  blendMode(BLEND);
  background(250);
  //noStroke();
  blendMode(MULTIPLY);
  
  translate(width / 2, height / 2);
  //noFill();
  //drawLiq(18,50,20,100);
  //fill(240,240,0);
  //drawLiq(15,60,25,120);
  //fill(240,0,240);
  //drawLiq(12,45,15,150);
  
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
  stroke(r, g, b, sa);
  for (j = 0; j < jay1; j++) {
    // translate(width/2,height/3+j);
    fill(r, g, b, fa);
    drawLiq(jay2, 45, 40, jay3);
    // print(width)
  }
  //step;
  n = floor((2 * PI));
  drawLiq.length = n;

}


function drawLiq(vNnum, nm, sm, fcm) {
  //push();
  rotate(frameCount / fcm - 10);
  let dr = TWO_PI / vNnum;
  beginShape();
  for (let i = 0; i < vNnum + 3; i++) {
    let ind = i % vNnum;
    let rad = dr * ind;
    let r = height * 0.1 + noise(frameCount / nm + ind) * height * 0.1 + sin(frameCount / sm + ind) * height / 3;
    curveVertex(cos(rad) * r, sin(rad) * r);
  }
  endShape();
  //pop();
}
