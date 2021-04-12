let minRadius, maxRadius, radiusStep;
let noiseScale = 0.010;
let circleNum = 10;
let egg;
let fry;
let pan;



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
  createCanvas(windowWidth/2, windowHeight/2);
  minRadius = min(width, height) * 0.1;
  maxRadius = max(width, height) * 0.4;
  radiusStep = (maxRadius - minRadius) / circleNum;

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
    egg = map(ip0, 0, 255, 1, 12)
    fry = map(ip1, 0, 255, 2, 6)
  }
  if (myIPAddress) {
    text("My IP address is " + myIPAddress, 20, 60);
  }
  if (myLatitude) {
    text("My latitude is " + myLatitude, 20, 80);
    pan = (map(myLatitude, -90, 90, 3, 30))
  }
  if (myLongitude) {
    text("My longitude is " + myLongitude, 20, 100);
    circleNum = (map(myLongitude, -180, 180, 8, 24))
  }
  // text("This is some text", 20, 120);
  //background(220);
  // }
  // ------------------------------------------------


  background(250);
  noFill();



  //noStroke();
  translate(width / 2, height / 2);
  let ci = 0;
  for (let radius = maxRadius; radius > minRadius; radius -= radiusStep) {
    // This translate moves the center around a little bit.
    // Play with the constants to see how.  e.g a 0.01 to 0.08
    translate(minRadius * 0.01 * cos(frameCount / pan), minRadius * 0.01 * sin(frameCount / pan));
    noFill();
    stroke(1);
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

let lapse = 0; // mouse timer
function mousePressed() {
  // prevents mouse press from registering twice
  if (millis() - lapse > 400) {
    save('me.jpg');
    lapse = millis();
  }
}
