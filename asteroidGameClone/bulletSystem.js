class BulletSystem {

    constructor(){
        this.bullets = [];
        this.velocity = new createVector(0, -5);
        this.diam = 10;
    }

    run(){
        this.move();
        this.draw();
        this.edges();
    }

    fire(x, y){
        this.bullets.push(createVector(x,y));
    }

    //draws all bullets
    draw(){
        fill(255);
        for (var i=0; i<this.bullets.length; i++){
            ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
        }
    }

    //updates the location of all bullets
    move(){
        for (var i=0; i<this.bullets.length; i++){
            this.bullets[i].y += this.velocity.y;
        }
    }

    //check if bullets leave the screen and remove them from the array
    edges(){
        // YOUR CODE HERE (3 lines approx)
        for(var i = this.bullets.length-1; i >= 0; i--) {
          if(this.bullets[i].y < 0) {
              this.bullets.splice(i, 1);
          }
        }
    }
}
