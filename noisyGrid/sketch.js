var stepSize = 20;

function setup() {
    createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    
    noiseDetail(5);
    
    colorGrid();
    compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
    // your code here    
    noStroke();
    
    //colors for background
    var pink = color(255, 125, 245);
    var blue = color(65, 135, 245);
    
    //map the color change to be dependant on mouseX
    var colChange = map(mouseX, width, 0, 1, 50);
    
    for(var x = 0; x < 25; x++) {
        for(var y = 0; y < 25; y++) {
            
            //setup values for noise
            var nX = x/30;
            var nY = y/30;
            var f = (frameCount*colChange)*0.0003;
            
            var n = noise(nX, nY, f);
            
            //lerpColor is used for smooth background color change
            var col = lerpColor(pink, blue, n);
            fill(col);
            rect(x*stepSize, y*stepSize, stepSize, stepSize);
        }
    }
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
    // your code here
    
    //map the compass to be dependant on mouseX
    var compassChange = map(mouseX, width, 0, 1, 50);
    
    for(var x = 0; x < 25; x++) {
        for(var y = 0; y < 25; y++) {
            
            //setup values for noise
            var nX = x/30;
            var nY = y/30;
            var f = (frameCount*compassChange)*0.0003;
            
            var n = noise(nX, nY, f);
            
            //map the noise to the angle for rotation of the compass needle
            var angle = map(n, 0, 1, 0, 720);

            //colors for compass needle
            var white = color(255, 255, 255);
            var red = color(255, 25, 0);
            
            //lerpColor is used for smooth compass needle color change
            var col = lerpColor(white, red, n);
            stroke(col);
            strokeWeight(3);
            
            //map the noise to the length of the compass needle
            var len = map(n, 0, 1, 0, 20);
            
            
            push();
                //translate origin to center of each rectangle
                translate(x*stepSize+stepSize/2, y*stepSize+stepSize/2)
                //rotate in accordance to the noise value
                rotate(radians(angle));
            
                line(0, 0, 0, -stepSize-len);
            
                //change colour for rectangle to black
                //as it represents the midpoint of each grid cell
                fill(255);
                strokeWeight(2);
                rect(-2, -2, 4, 4);
            pop();
        }
    }
}
