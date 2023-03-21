////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
    propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: angle});
    propellerAxis = Bodies.circle(150, 480, 15, {isStatic: true});
    World.add(engine.world, [propeller, propellerAxis]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
    fill(115, 70, 10);
    drawVertices(propeller.vertices);
    
    fill(75, 40, 5);
    drawVertices(propellerAxis.vertices);
    
    //turn the propeller
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle = angle + angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
    var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0, restitution: 0.95 });
    Matter.Body.setMass(bird, bird.mass*10);
    World.add(engine.world, [bird]);
    birds.push(bird);
    
    //generate array for random birds colour and opacity;
    birdsColA.push(random(0, 255));
    birdsColB.push(random(0, 255));
    birdsColC.push(random(0, 255));
    birdsAlpha.push(random(150, 220));
    
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
    for(var i = 0; i < birds.length; i++) {
        //random colour for each bird
        noStroke();
        fill(birdsColA[i], birdsColB[i], birdsColC[i], birdsAlpha[i]);
        drawVertices(birds[i].vertices);
    
        //check if bird is outside of the screen
        if(isOffScreen(birds[i])) {
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
            
            //remove colors from array
            birdsColA.splice(i, 1);
            birdsColB.splice(i, 1);
            birdsColC.splice(i, 1);
            birdsAlpha.splice(i, 1);
            
            i--;
        }
    }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
    //setups boxes using composite
    boxes = Composites.stack(650, 100, 3, 6, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 80, 80, {render: {fillStyle: "green"}});
    });
    
    World.add(engine.world, [boxes]);
    
    //generate random colors for each box
    for(var i = 0; i < boxes.bodies.length; i++) {
        var g = random(50, 255);
        boxes.bodies[i].render.fillStyle = color(0,g,0);
    }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
    noStroke();
    for(var i = 0; i < boxes.bodies.length; i++) {
        fill(boxes.bodies[i].render.fillStyle);
        drawVertices(boxes.bodies[i].vertices);
        
        //remove tower that is out of range
        if(isOffScreen(boxes.bodies[i])) {
            removeBox(i);
        }
    }
  pop();
}

function removeBox(index) {
    removeFromWorld(boxes.bodies[index]);
    boxes.bodies.splice(index, 1);
    boxCount -=1;
}

////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
    //slightshotbird setup
    slingshotBird = Bodies.circle(180, 200, 20, {friction: 0, restitution: 0.95, mass: 10});
    
    //slingshot constraint setup
    slingshotConstraint = Constraint.create({
        pointA: {x: 180, y: 160},
        bodyB: slingshotBird,
        pointB: {x: 0, y: 0},
        stiffness: 0.01,
        damping: 0.0001
    });
    
    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
    fill(250, 128, 114);
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
