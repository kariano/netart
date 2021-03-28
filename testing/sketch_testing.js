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

function getIPAddress(){
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

function gotLocation(position){
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
    getCurrentPosition(gotLocation)

    createCanvas(400, 400);
}

function draw() {
    if (myIPAddress) {
        text("My IP address is " + myIPAddress, 20, 60);
    }
    if (myLatitude && myLongitude) {
        text("My latitude is " + myLatitude, 20, 80);
        text("My longitude is " + myLongitude, 20, 100);
    }
    text("This is some text", 20, 120);
    //background(220);
}
