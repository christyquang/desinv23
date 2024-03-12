let scene = "food"; // Initial scene
let button;

// Beach variables
let birds = [];
let flightSpeedX = 2;
let flightSpeedY = 1;
let yoff = 0.0; // 2nd dimension of perlin noise

// Nature variables
let xPos;
let yPos;
let xSpeed;
let ySpeed;
let meteors = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background("rgb(217,248,248)");
	
	// Plate
  fill(255); // White color for the plate
  stroke(0); // Black outline for the plate
  strokeWeight(2); // Thickness of the outline
  ellipse(width/2, height/2, 600, 600);
  
  fill(200); // Light gray color
  noStroke(); 
  ellipse(width/2, height/2, 550, 550); // Inner circle 
	
	// Create a button
  button = createButton('move moody!');
  button.position(width / 2 - 50, height - 725);
  button.mousePressed(redrawFoodScene); // Add event listener for button click
	
	cloud(random(0,windowWidth), random(0,windowWidth))
	//dumpling(random(0,windowWidth), random(0,windowWidth))
	dumpling(500, 380)
	egg()
	watermelon()
	pancakes()
	bread()
	
	// Add text
  textSize(15); 
  fill(0); 
  textAlign(CENTER, CENTER); // Center align the text horizontally and vertically
	text("press the button to move the cloud to a random spot.", width / 2, 685);
	text("press the space bar to begin meditating.", width / 2, 705);

	if (scene === "beach") {
    drawBeach();
  } else {
    setupNature();
  }
}

function redrawFoodScene() {
  // Clear the canvas
  background("rgb(217,248,248)");

  // Redraw the food scene
	// Plate
  fill(255); // White color for the plate
  stroke(0); // Black outline for the plate
  strokeWeight(2); // Thickness of the outline
  ellipse(width/2, height/2, 600, 600);
  
  fill(200); // Light gray color
  noStroke(); 
  ellipse(width/2, height/2, 550, 550); // Inner circle 
	
  cloud(random(0,windowWidth), random(0,windowWidth))
  dumpling(500, 380)
  egg()
  watermelon()
  pancakes()
  bread()
	
	// Add text
  textSize(15); 
  fill(0); 
  textAlign(CENTER, CENTER); // Center align the text horizontally and vertically
	text("press the button to move the cloud to a random spot.", width / 2, 685);
	text("press the space bar to begin meditating.", width / 2, 705);
}

function draw() {
  if (scene === "food") {

  } else if (scene == "beach") {
    drawBeach();
  } else {
		drawNature();
	}
}

function drawBeach() {
  background(255); // Clear the canvas
  drawSunset();
  moveBirds(); 
  drawScene(); 
}

function setupNature() {
  // Nature setup code
  xPos = 350;
  yPos = 350;
  xSpeed = -5;
  ySpeed = 2;

  // Initialize meteors
  for (let i = 0; i < 5; i++) {
    meteors.push(new Meteor(random(width), random(-300, -100)));
  }
}

function drawNature() {
  background(0);
  // Draw sunset
  let col = map(mouseY, 0, windowHeight, 255, 0);
  background(0, col / 2, col);
  // Update and display meteors
  for (let i = 0; i < meteors.length; i++) {
    meteors[i].update();
    meteors[i].display();
  }
  // Update meteor shower
  xPos += xSpeed;
  yPos += ySpeed;
  // Wrap meteor shower around screen
  if (xPos < -100) {
    xPos = width + 100;
  }
  if (yPos > height + 100) {
    yPos = -100;
  }
  // Draw stars and trees
  drawStars();
  drawTrees();
  drawMtn();
	
  textSize(18); 
  fill(255); 
  textAlign(CENTER, CENTER); // Center align the text horizontally and vertically
  text("move the cursor to change the time of night to your current mood.", width / 2, 650);
	text("stare at the stars.", width / 2, 675);
	text("then, take a deep breath.", width / 2, 700);
}

function moveBirds() {
  for (let i = 0; i < birds.length; i++) {
    birds[i].fly();
    birds[i].display();
  }
}

function drawScene() {
  drawSand();
  textSize(18); 
  fill(0); 
  textAlign(CENTER, CENTER); // Center align the text horizontally and vertically
  text("move the cursor to change the time of day to your current mood.", width / 2, 625);
  text("stare at the waves. click your mouse to watch some birds fly.", width / 2, 650);
  text("then, take a deep breath.", width / 2, 675);
}

// ================ FOOD ================ //
function cloud(x, y) {
	fill("white")
	noStroke();
	circle(x, y, 90);
	circle(x + 50, y - 10, 110)
	circle(x + 100, y, 90)
	
	// face
	stroke('rgb(114,111,114)');
	strokeWeight(10);
	point(x+25, y-15);
	point(x+80, y-15);
	
	// mouth
	noFill();
	strokeWeight(5);
	curve(x, y-20, x+40, y+10, x+70, y+10, x+70, y-20);
	stroke(0);
	
	// blush
	fill("rgba(249,228,228,0.87)")
	noStroke();
	circle(x, y, 20);
	circle(x+105, y, 20);
}

function dumpling(x, y) {
	fill("white")
	noStroke();
	circle(x+42, y-10, 120);

	// eyes
	stroke('rgb(114,111,114)');
	strokeWeight(11);
	point(x+25, y-15);
	point(x+60, y-15);
	
	// mouth
	noFill();
	strokeWeight(5);
	curve(x+3, y-20, x+33, y+10, x+53, y+10, x+63, y-25);
	stroke(0);
	
	// blush
	fill("rgba(249,228,228,0.87)")
	noStroke();
	circle(x, y, 20);
	circle(x+85, y, 20);
	
	// top of dumpling
	// Top curvy triangle of the dumpling
  fill("white");
  beginShape();
  vertex(x + 10, y - 55); // Start point of the triangle
  bezierVertex(x + 20, y - 75, x + 80, y - 120, x + 85, y - 38); // First curve
  bezierVertex(x + 70, y - 65, x + 40, y - 65, x + 30, y - 35); // Second curve
  endShape(CLOSE);
	
	// Top folds of the dumpling
  fill("gray");
  drawFold(x + 10, y - 50, 30, 30); // top fold
	drawFold(x + 30, y - 50, 35, 35); // middle fold
	drawFold(x + 40, y - 45, 30, 20); // bottom fold
}

function drawFold(startX, startY, control1X, control1Y) {
  beginShape();
  vertex(startX, startY); // Start point of the fold
  bezierVertex(startX + control1X, startY - control1Y, startX + control1X + 10, startY - control1Y - 5, startX + control1X + 20, startY); // First curve
  bezierVertex(startX + control1X + 10, startY - control1Y - 3, startX + control1X, startY - control1Y - 8, startX, startY); // Second curve
  endShape(CLOSE);
}

function egg() {
	// egg white
  fill("white"); // Light orange
  stroke(0);
  strokeWeight(1); // Set the thickness of the outline
  beginShape();
  vertex(425, 250); // Start point
  bezierVertex(405, 200, 550, 200, 525, 250); // Curve
  bezierVertex(515, 260, 435, 260, 425, 250); // Curve
  endShape(CLOSE);

  // egg yolk
  fill("orange"); 
  noStroke();
  ellipse(475, 225, 50, 30);
}

function watermelon() {
  // Watermelon rind outline
  stroke(0); // Black outline
  strokeWeight(2); // Moderate thickness
  fill(34, 139, 34); // Dark green
  beginShape();
  vertex(350, 250); // Top point of the slice
  vertex(350, 270); // Bottom-left point
  vertex(250, 270); // Bottom-right point
  vertex(250, 250); // Bottom-right point
  endShape(CLOSE);

  // Watermelon slice outline
  fill(255, 102, 102); // Light red
  beginShape();
  vertex(300, 150); // Top point of the slice
  vertex(250, 250); // Bottom-left point
  vertex(350, 250); // Bottom-right point
  endShape(CLOSE);

  // Watermelon seeds outline
  fill(0);
  noStroke(); // No outline for seeds
  ellipse(285, 200, 5, 5); // Seed 1
  ellipse(315, 225, 5, 5); // Seed 2
  ellipse(290, 240, 5, 5); // Seed 3
  ellipse(310, 210, 5, 5); // Seed 4
}

function pancakes() {
  for (let i = 0; i < 6; i++) {
    let y1 = height / 2 + 20 + i * 20 + 50;
    let y2 = height / 2 + 40 + i * 20 + 50; 
    
    // Pancake outline
    fill(255, 204, 102); // Light orange
    beginShape();
    vertex(width / 2 - 60, y1); // Start point of the pancakes
    bezierVertex(width / 2 - 60, y2, width / 2 + 60, y2, width / 2 + 60, y1); // First curve
    bezierVertex(width / 2 + 60, y1 - 30, width / 2 - 60, y1 - 30, width / 2 - 60, y1); // Second curve
    endShape(CLOSE);
  }
  
  // Piece of butter
  fill(255); // White
  noStroke(); 
  ellipse(width / 2, height / 2 + 50, 30, 10); // Oval shape for butter
}

function bread() {
  // Bread loaf outline
  stroke(0); // Black outline
  strokeWeight(2); 
  noFill();
  ellipse(250, 370, 170, 70); // Main ellipse for the loaf

  // Bread loaf
  fill(240, 207, 107); // Light yellowish brown
  noStroke(); // No outline for the loaf
  ellipse(250, 370, 170, 70); // Main ellipse for the loaf

  // Bread indents
  fill("brown");
  drawFold(203, 370, 30, 30); 
  drawFold(233, 370, 30, 30); 
  drawFold(263, 370, 30, 30); 
}

// ================ BEACH ================ //
function drawSunset() {
  let r = map(mouseY, 0, windowHeight, 200, 255); // Adjust the red component for a pastel blue color
  let g = map(mouseY, 0, windowHeight, 220, 240); // Adjust the green component for a pastel blue color
  let b = map(mouseY, 0, windowHeight, 255, 255); // Adjust the blue component for a pastel blue color
  background(r, g, b);
}

function drawSand() {
  fill(194, 178, 128); // Sand color (light brown)
  noStroke(); // No outline
  
  // Draw the sand rectangle with a slightly curvy top
  let curveHeight = 90; // Height of the curve
  let curveWidth = 50; // Width of the curve
  let shiftDown = height - 100; // Amount to shift the sand shape down

  beginShape();
	vertex(0, height); // Start from the bottom-left corner
	//vertex(0, height * 0.75); // Move to the left side, three-quarters up the canvas
	bezierVertex(width * 0.2, height * 0.75 - curveHeight, width * 0.8, height * 0.75 - curveHeight, width, height * 0.75); // Curve to the right side, three-quarters up the canvas
	vertex(width, height); // End at the bottom-right corner
	endShape(CLOSE);
  
  // Draw the ocean
  fill("lightblue"); // Set fill color to light blue
  rect(0, height * 0.75, width, height); // Draw a rectangle for the ocean

  beginShape();

  let xoff = 0; // Option #1: 2D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to
    let y = map(noise(xoff, yoff), 0, 1, 500, 625);

    // Set the vertex
    vertex(x, y);

    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  vertex(width, height); // End at the bottom-right corner
  endShape(CLOSE);

  // Increment y dimension for noise
  yoff += 0.01;
	
  // Draw the sun
  fill(255, 100, 0, 100); 
  stroke(255, 165, 0, 50); // Set stroke color to sun orange
  strokeWeight(45); // Set stroke weight
  circle(width * 0.8, height * 0.2, 100); // Draw the sun
	
	// Palm tree trunk
	stroke("black")
	strokeWeight(0.8)
  fill(139, 69, 19); // Brown color for the trunk
  rect(width / 5 + 350, height * 0.42, 20, 200); // Trunk

  // Palm tree leaves
  fill(34, 139, 34); // Green color for the leaves
	drawLeaf(width / 5 + 140, 310, 130, 100);
	drawLeaf(width / 5 + 150, 320, 130, 100);
	drawLeaf(width / 5 + 160, 330, 130, 100);
	drawLeaf(width / 5 + 163, 320, 130, 100);
	drawLeaf(width / 5 + 160, 310, 130, 100);
	drawLeaf(width / 5 + 158, 300, 130, 100);
	 
}

function drawLeaf(startX, startY, control1X, control1Y) {
  beginShape();
  vertex(startX, startY); // Start point of the leaf
  bezierVertex(startX + control1X, startY - control1Y, startX + control1X + 40, startY - control1Y - 40, startX + control1X + 80, startY); // First curve
  bezierVertex(startX + control1X + 40, startY - control1Y - 20, startX + control1X, startY - control1Y - 60, startX, startY); // Second curve
  endShape(CLOSE);
}

// ================ NATURE ================ //
function drawStars() {
  // Draw stars and moon
  noStroke();
	fill("white")
	circle(620,122,80);
  fill(180,200,225);
  circle(10,20,5);
  circle(33,120,4);
  circle(250,122,3);
  circle(558,453,5);
  circle(777,77,5);
  circle(77,13,5);
  circle(613,13,6);
  circle(777,7,4);
  circle(333,33,3);
  circle(456,56,3);
  circle(567,111,4);
  circle(678,222,3);
  circle(612,333,3);
  circle(622,444,3);
  circle(818,501,3);
  circle(635,385,3);
  circle(275,419,4);
  circle(197,241,5);
  circle(486,386,3);
  circle(381,178,4);
  circle(888,378,3);
  circle(680,109,3);
  circle(400,298,4);
  circle(709,291,5);
  circle(171,285,3);
}

function drawTrees() {
  // Draw trees
  //tree stroke in the back
  stroke(122,144,89);
  strokeWeight(3);
  noFill();
  
  //branch in the back
  noStroke();
  fill(25,50,50);
  rect(343,557,5,40);
  
  fill(125,50,50);
  rect(754,540,5,48);
  
  fill(75,36,50);
  rect(370,538,5,37);
  
  fill(80,65,88);
  rect(408,540,5,48);
  
  //tree1
  noStroke();
  fill(65,88,35);
  circle(47,565,45);
  
  fill(35,75,15);
  circle(47,542,35);
  
  fill(0,85,15);
  circle(47,522,20);
  fill(95,50,50);
  rect(44,570,5,35);
	
	//tree2
  fill(0,125,111);
  triangle(78,500,60,550,100,532);
  
  fill(0,100,111);
  triangle(78,525,60,565,100,551);
  
  fill(0,95,25);
  triangle(80,550,57,585,130,577);
  fill(75,50,50);
  rect(80,570,5,35);
  
  //tree3
  fill(85,105,55);
  triangle(125,480,100,520,140,511);
  
  fill(88,132,128);
  square(103, 530, 38);
  
  fill(57,88,100);
  circle(125,528,38);
  
  fill(33,71,33);
  rect(95,557,55,27);
  fill(100,50,50);
  rect(120,570,5,35);  
  
  //tree4
  fill(65,88,35);
  circle(189,489,33);
  
  fill(65,50,50);
  rect(188,535,5,67);
  
  fill(71,117,77);
  triangle(192,500,173,550,234,532);
  
  fill(33,71,33);
  rect(161,545,53,27);
  
  //tree5
  fill(50,100,88);
  arc(420, 488, 40, 40, 0, PI + QUARTER_PI, CHORD);
  
  fill(0,57,15);
  square(394,498,48);
  
  fill(65,88,35);
  circle(421,551,34);
  
  fill(105,50,50);
  rect(418,555,5,55);
  
  //tree6
  fill(0,44,35);
  triangle(582,525,525,525,575,551);
  
  fill(13,57,36);
  triangle(582,500,530,500,563,530);
  
  fill(65,88,35);
  circle(550,489,33);
  
  fill(75,50,50);
  rect(550,550,5,35);
  fill(0,80,36);
  triangle(575,538,530,549,563,557);
  
  //tree13   
  fill(0,88,100);
  circle(513,528,38);
  
  fill(0,10,43);
  square(500, 530, 38);
  
  fill(55,50,50);
  rect(513,570,5,35);  
  fill(35,91,33);
  rect(492,557,55,27);
  
  fill(1,52,15);
  triangle(525,480,500,520,540,511);
  
  
  //tree7
  fill(0,75,57);
  ellipse(777, 507, 51, 30);
  
  fill(25,45,35);
  ellipse(777, 523, 45, 30);
  
  fill(75,50,50);
  rect(777,550,5,48);
  fill(0,62,35);
  ellipse(777, 547, 33, 50);
  
  //tree8
  fill(0,85,25)
  ellipse(613, 507, 51, 30);
  
  fill(13,57,36);
  triangle(618,507,610,550,650,565);
  
  fill(65,50,50);
  rect(613,538,5,48);
  fill(15,38,25);
  ellipse(605, 547, 33, 40);
  
  //tree9
  fill(15,97,10);
  square(321,472,37);
  
  fill(0,42,11)
  ellipse(327, 528, 51, 50);
  
  fill(13,57,36);
  triangle(300,458,370,445,325,500);
  
  fill(13,57,36);
  triangle(300,547,370,538,325,582);
  fill(65,50,50);
  rect(328,558,5,48);
  
  //tree10
  fill(0,74,88);
  square(250,447,28);
  
  fill(13,57,36);
  triangle(245,547,289,538,268,489);
  
  fill(0,42,11)
  ellipse(268,490, 27,45);
  fill(89,50,50);
  rect(262,538,5,48);
  
  //tree11
  fill(105,89,68);
  rect(483,550,5,48);
  fill(0,62,35);
  ellipse(483, 547, 48, 47);
  
  fill(25,45,35);
  ellipse(490, 523, 40, 30);
  
  fill(0,35,35);
  ellipse(487, 507, 23, 48);
  
  //tree12  
  fill(78,125,111);
  triangle(738,487,714,550,750,532);
  
  fill(75,68,50);
  rect(730,550,5,70);  
  fill(80,215,125);
  triangle(739,525,718,565,754,551);
    
  fill(22,65,25);
  triangle(750,531,725,585,762,577);
  
  //tree14
  fill(32,88,35);
  circle(865,489,50);
  
  fill(60,50,50);
  rect(875,535,5,67);
  
  fill(1,35,35);
  triangle(892,500,873,550,834,532);
  
  fill(0,76,33);
  rect(861,545,53,27);
  
  //tree15
  fill(99,89,68);
  rect(840,550,5,48);
  fill(0,92,77);
  ellipse(840, 523, 65, 30);
  
  fill(0,68,35);
  ellipse(840, 559, 30, 49);
  
  fill(0,35,35);
  ellipse(843, 547, 48, 47);
	
	//tree2
  fill(0,125,111);
  triangle(678,500,660,550,700,532);
  
  fill(0,100,111);
  triangle(678,525,660,565,700,551);
  
  fill(0,95,25);
  triangle(680,550,657,585,730,577);
  fill(75,50,50);
  rect(680,570,5,35);
  
  //tree17
  fill(50,100,88);
  circle(815,551,45);
  
  fill(0,57,15);
  square(794,512,32);
  
  fill(77,50,50);
  rect(813,555,5,55);
  
  fill(65,88,35);
  circle(821,551,34);
  
 //tree19
  fill(0,85,2);
  triangle(382,525,325,525,375,551);
  
  fill(5,87,91);
  triangle(382,500,330,500,363,530);
  
  fill(60,88,91);
  circle(387,489,33);
}

function drawMtn() {
		let xc = constrain(mouseX, 0, 500);
		fill(map(xc,0,500,8,13),map(xc,0,500,24,5),map(xc,0,500,58,72));
		triangle(0,400,100,250,250,400);
		triangle(200,400,380,270,550,400);
		fill(map(xc,0,500,75,29),map(xc,0,500,61,19),map(xc,0,500,96,106));
		triangle(200,400,380,270,350,400);
		fill(map(xc,0,500,8,13),map(xc,0,500,24,5),map(xc,0,500,58,72));
		triangle(50,400,250,200,400,400);
		fill(map(xc,0,500,75,29),map(xc,0,500,61,19),map(xc,0,500,96,106));
		triangle(50,400,250,200,200,400);
		triangle(-50,400,100,250,0,400);
	}

// Bird Class
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = random(height * 0.25, height * 0.75);
  }
  
  fly() {
    this.x += flightSpeedX;
    this.y += -flightSpeedY;
  }

  display() {
    noStroke(); // Remove stroke
    fill(0); // Set fill color to black
    triangle(this.x, this.y, this.x + 2, this.y + 8, this.x + 5, this.y - 10);
    ellipse(this.x, this.y, 12, 3);
  }
}

function moveBirds() {
  for (let i = 0; i < birds.length; i++) {
    birds[i].fly();
    birds[i].display();
  }
}

// Meteor Class
class Meteor {
  // Nature meteor class
	constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = random(1, 3); // Random horizontal speed
    this.speedY = random(1, 3); // Random vertical speed
  }

  update() {
    this.x -= this.speedX;
    this.y += this.speedY;
    
    // Reset meteor position if it goes off screen
    if (this.x < -100 || this.y > height + 100) {
      this.x = width + 100;
      this.y = random(-300, -100);
    }
  }

  display() {
    stroke('silver');
    strokeWeight(1);
    line(this.x - 293, this.y - 29, this.x - 280, this.y - 39);
  }
}

function mousePressed() {
  if (scene === "beach") {
    let b = new Bird(random(-10, 0), random(height * 0.75, height));
    birds.push(b);
  }
}

function keyPressed() {
  if (keyCode === 32) { // Space key
    if (scene === "beach") {
      scene = "nature";
      setupNature();
    } else {
      scene = "beach";
      drawBeach();
    }
  }
}