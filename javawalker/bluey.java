
ArrayList<PVector> points = new ArrayList<PVector>();
//ArrayList<PVector> points;
float x0, y0, x, y, angle;
final float step = 3;
final float minDist = step / 2;
final float maxDist = 25;

int savedTime;
int totalTime = 5000;

 
float increment = 0.02;

void setup() {
  //size(1920, 1080);
  size(800, 600);
   strokeWeight(4);
  smooth();
  points = new ArrayList<PVector>();
  x0 = random(width);
  y0 = 0;
  angle = random(TWO_PI);
   
 loadPixels();

  float xoff = 0.0; // Start xoff at 0
  float detail = map(mouseX, 0, width, 0.5, 0.6);
  noiseDetail(8, detail);
  
  // For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
  for (int x = 0; x < width; x++) {
    xoff += increment;   // Increment xoff 
    float yoff = 0.0;   // For every xoff, start yoff at 0
    for (int y = 0; y < height; y++) {
      yoff += increment; // Increment yoff
      
      // Calculate noise and scale by 255
      //float bright = noise(xoff, yoff) * 255;

      // Try using this line instead
      float bright = random(200,255);
      
      // Set each pixel onscreen to a grayscale value
      pixels[x+y*width] = color(bright);
    }
  }
  
  updatePixels();
 
   savedTime = millis();

}


void draw() {
  

  

  x = (width + x0 + step * cos(angle)) % width;
  y = (height + y0 + step * sin(angle)) % height;
  PVector pt = new PVector(x, y);

  for (PVector p : points) {
    if (pt.dist(p) < minDist) { 
      pt = points.size() > 1080 ? points.get(int(random(1080))) : new PVector(random(width), 0);
      break;
    }
  }
      float r = random(0,50);
      float g = random(0,200);
      float b = random(100,256);
stroke(r, g, b);

  for (PVector p : points) {
    if (pt.dist(p) < maxDist) { 
      line(p.x, p.y, pt.x, pt.y);
    }
  }
  points.add(0, pt);
  x0 = pt.x;
  y0 = pt.y;
  angle += random(-0.2, 0.2);
 two(); 
}
void two(){
  stroke(100, 1);
x = (width + x0 + step * cos(angle)) % width;
  y = (height + y0 + step * sin(angle)) % height;
  PVector pt = new PVector(x+8, y+8);
  for (PVector p : points) {
    if (pt.dist(p) < minDist) { 
      pt = points.size() > 1080 ? points.get(int(random(1080))) : new PVector(random(width), 0);
      break;
    }
  }
for (PVector p : points) {
    if (pt.dist(p) < maxDist) { 
      line(p.x+20, p.y+20, pt.x+20, pt.y+20);
    }
  }
 
  // Calculate how much time has passed
  int passedTime = millis() - savedTime;
  // Has five seconds passed?
  if (passedTime > totalTime) {
   fancyReset();
    //println("5 seconds have passed!");
    //background(random(255)); // Color a new background
    savedTime = millis(); // Save the current time to restart the timer!
  }
 
}

void keyPressed(){
  fancyReset();
}

void fancyReset(){
{ loadPixels();

  float xoff = 0.0; // Start xoff at 0
  float detail = map(mouseX, 0, width, 0.1, 0.6);
  noiseDetail(8, detail);
  
  // For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
  for (int x = 0; x < width; x++) {
    xoff += increment;   // Increment xoff 
    float yoff = 0.0;   // For every xoff, start yoff at 0
    for (int y = 0; y < height; y++) {
      yoff += increment; // Increment yoff
     
      // Calculate noise and scale by 255
      //float bright = noise(xoff, yoff) * 255;

      // Try using this line instead
      float bright = random(200,255);
      
      // Set each pixel onscreen to a grayscale value
      pixels[x+y*width] = color(bright);
    }
  }
  
  updatePixels();}
  
  setup();
}
