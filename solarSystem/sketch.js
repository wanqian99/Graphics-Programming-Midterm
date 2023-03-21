var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    // DRAW SUN
    push();
        translate(width/2, height/2);
        rotate(radians(speed/3)); //spin earth around its axis
        celestialObj(color(255,150,0), 200); // SUN

        // DRAW EARTH
        push();
            rotate(radians(speed)); //rotate earth around sun
            translate(300, 0);
            push();
                rotate(radians(speed)); //spin earth around its axis
            pop();
            celestialObj(color(0,0,255), 80); // EARTH

            // DRAW MOON
            push();
                rotate(radians(-speed*2)); //rotate moon aniclockwise around earth
                translate(100, 0);
                celestialObj(color(255), 30); // MOON
            pop();
    
    
            // DRAW MOON2
            push();
                rotate(radians(-speed*3)); //rotate moon2 around earth
                translate(150, 0);
                celestialObj(color(255,0,0), 50); // MOON2
    
                push();
                rotate(radians(speed)); //rotate asteroids around earth
                asteroids(30, color(245, 220,70), 3);
                rotate(radians(45));
                asteroids(28,color(245, 220,130), 5);// asteroids
                rotate(radians(23));
                asteroids(32,color(245, 220,70), 1);// asteroids
                rotate(radians(40));
                asteroids(32,color(255), 1);// asteroids
                pop();
            pop();
        pop();
    pop();
    
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

function asteroids(dist, c, size) {
    noStroke();
    fill(c);
    ellipse(dist, 0, size, size);
    ellipse(-dist, 0, size, size);
    ellipse(0, -dist, size, size);
    ellipse(0, dist, size, size);
    
//    ellipse(-20, -20, size, size);
}
