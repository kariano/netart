let mic;
let vol;
let t = 0.0;
let vel = 0.1;
let pallete1 = ["#e9dbce", "#A8C6B0", "#9B785F", "#FC949B", "#587415", "#92CCBC"]
let pallete2 = ["#E4CBF6", "#457E9E", "#3B5D45", "#e2c290", "#6b2d5c", "#00B161"]
let num;
let palette_selected
let mover=[];
var mouseIsPressed;
let vfthreshold=0.1

class Mover {
  
	constructor(x,y) {
      //mic = new p5.AudioIn();
      //mic.start();
     
      //let vol = mic.getLevel();
     // let vol = micLevel;
   // let g = map(orig*(1.0+(vol*500)), 0, 100, 0.5, 20, true);
    //print("vol: ", vol)// " g: ", g)
 //   return g
      
		this.position = createVector(x,y);
		this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);
		//this.topspeed = random(0.5, 3);//var from 0.05 to 3
      	this.topspeed = 3
		this.h = random(height * 0.01, height * 0.1)
		this.w = this.h * 0.9;

		let pal1 = pallete1;
		let pal2 = pallete2;
		this.col1=color(random(pal1))
		this.col2=color(random(pal2));
		this.ran = random(20);
		this.col1.setAlpha(30)
		this.col2.setAlpha(random(40,90))
		this.tran = random(0.01,0.05);
	
	}

	update(vol) {
      
        let vf = map(vol, 0, 0.2, 0.2, 1, true)  // volume factor
      
        //print("vol: ", vol, "vf: ", vf)
      
	this.acceleration = p5.Vector.random2D();
        let acceleration = p5.Vector.mult(this.acceleration, vf)
        //print(acceleration.x, acceleration.y)
		this.velocity.add(acceleration);
		this.velocity.limit(this.topspeed);
		this.position.add(this.velocity);
	
	}

	display(vol) {
        //print("vol: ", vol)// " g: ", g)
		push();
		translate(this.position.x, this.position.y)
		let angle = this.velocity.heading();
		stroke(this.col1)
			let gradientFill = drawingContext.createLinearGradient(
			-this.w / 2,
			-this.h / 2,
			this.w / 2,
			this.h / 2
		);
		gradientFill.addColorStop(0, this.col1);
		gradientFill.addColorStop(1, this.col2);
		drawingContext.fillStyle = gradientFill;
		rect(0,0, this.w, this.h,this.w*0.8);
		pop();
		this.ran+=-this.tran;
	}

	checkEdges() {

		if (this.position.x > width) {
			this.position.x = this.w / 2;
		} else if (this.position.x < 0) {
			this.position.x = width - this.w / 2;
		}

		if (this.position.y > height) {
			this.position.y = this.h / 2;
		} else if (this.position.y < 0) {
			this.position.y = height - this.h / 2;
		}
	}
}

function noop() {
  print("start worked")
}

function onerror() {
  print("there was an error")
}


function setup() {
	createCanvas(displayWidth, displayHeight);
	pixelDensity(2)
	angleMode(DEGREES)
	background(51);
	rectMode(CENTER)
	num = random(100)
		for (let i = 0; i < 10; i++) {
		mover[i] = new Mover(random(width),random(height));
          
  // Create an Audio input
  mic = new p5.AudioIn()
  //have start() before getLevel()
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start(noop, onerror);
	}
}



function mousePressed() {
  //if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
 // }
}


function draw() {
  //if (mouseIsPressed === true){
 //   pop();
 // }else {push();}
	//noLoop();
  let vol = mic.getLevel();
  randomSeed(num)
	for (let i = 0; i < 10; i++) {
		mover[i].update(vol);
		mover[i].checkEdges();
		mover[i].display(vol);
	}

	push();
}

