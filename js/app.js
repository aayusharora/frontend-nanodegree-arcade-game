// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y=y;
    this.width = 40;
    this.height = 20;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed= 200;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 500) {
        this.x =0;
    }

    this.x = this.x + Math.random()*this.speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y =y;
    this.width = 20;
    this.height = 40;
    this.score = 10000;
    this.pause = true;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function() {
  
   if(this.score <= 0 ) {
        //console.log("You Losse" );
        ctx.clearRect(10, 30, 500, 300);
   }
   else {
    //alert("You win");
     this.scoreBoard(-10);
   }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keycode) {

  console.log("hello");
     
     // this.reset();
    if(this.pause == true) {
         
        //console.log(this.y); 
        switch(keycode) {

           case 'left' :
            if(this.x > 0) {
               this.x = this.x - 20;
            }
            break;
           case 'right':
            if(this.x < 505) {
               this.x = this.x + 20;  
            } 
            break;
           case 'up' :
            if( this.y > 0) {
               this.y = this.y - 20;
            }
            break;
           case 'down':
             if( this.y < 400) {
               this.y = this.y + 20;
             }  
            break;
           default: 
               
       }
            
     } 

     if(keycode == 'pause') {
          this.pause = this.pause === true ? false : true;   
       }     

   }

 Player.prototype.scoreBoard = function(score) {
    //console.log(this.score);
  
  if(this.score >0) {
    this.score = this.score + score;
    ctx.clearRect(10, 30, 500, 300); //  <--  clear here 
    ctx.fillStyle = "#5fc148";  // set color to red
    ctx.fillRect(10, 30, 500, 300);   // <-- add rectangle in cleared  space
    ctx.font = "20px Arial";
    ctx.fillStyle = "#c43d0b";
    ctx.textBaseline = "top";
    ctx.fillText ("Score " + this.score, 10, 30);
  }
 

}

Player.prototype.reset = function() {

    //this.y = 430;
    //this.x = 210;
}

var allEnemies = [ new Enemy(0,50), new Enemy(-20,180), new Enemy(-320,180), new Enemy(-200,220)];
var player = new Player(210,400);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'pause'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
