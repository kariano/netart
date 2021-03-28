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

function setup() {
    //console.log("In setup");
    getIPAddress();

    createCanvas(400, 400);
}

function draw() {
    if (myIPAddress) {
        text("My IP address is " + myIPAddress, 20, 60);
    }
    text("This is some text", 40, 80);
    //background(220);
}
