class Spaceship {

    constructor(){
        this.velocity = new createVector(0, 0);
        this.location = new createVector(width/2, height/2);
        this.acceleration = new createVector(0, 0);
        this.maxVelocity = 5;
        this.bulletSys = new BulletSystem();
        this.size = 50;
    }

    run(){
        this.bulletSys.run();
        this.draw();
        this.move();
        this.edges();
        this.interaction();
    }

    draw(){
        fill(255,250,30);
        triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
        ellipse(this.location.x, this.location.y, this.size);
        fill(255);
        stroke(0);
        ellipse(this.location.x, this.location.y-10, this.size/2, this.size/3);
    }

    move(){
        // YOUR CODE HERE (4 lines)
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(f){
        this.acceleration.add(f);
    }

    interaction(){
        if (keyIsDown(LEFT_ARROW)){
            this.applyForce(createVector(-0.1, 0));
            noStroke();
            
            //draw jet fire to point left when arrow left
            jet(30, 10);
        }
        if (keyIsDown(RIGHT_ARROW)){
            // YOUR CODE HERE (1 line)
            this.applyForce(createVector(0.1, 0));
            noStroke();
            
            //draw jet fire to point right when arrow right
            jet(330, -10);
        }
        if (keyIsDown(UP_ARROW)){
            // YOUR CODE HERE (1 line)
            this.applyForce(createVector(0, -0.1));
            noStroke();
            
            //draw jet fire to point upwards when arrow up
            jet(0, 0);
        }
        if (keyIsDown(DOWN_ARROW)){
            // YOUR CODE HERE (1 line)
            this.applyForce(createVector(0, 0.1));
        }
    }

    fire(){
        this.bulletSys.fire(this.location.x, this.location.y);
    }

    edges(){
        if (this.location.x<0) this.location.x=width;
        else if (this.location.x>width) this.location.x = 0;
        else if (this.location.y<0) this.location.y = height;
        else if (this.location.y>height) this.location.y = 0;
  }

    setNearEarth(){
        //YOUR CODE HERE (6 lines approx)
        //downward gravity force
        var gravity = new createVector(0, 0.05);
        this.applyForce(gravity);

        //atmosphere friction that goes in the opposite direction of the velocity
        var friction = this.velocity.copy();
        friction.mult(-1);
        friction.div(30);
        this.applyForce(friction);
  }
}
