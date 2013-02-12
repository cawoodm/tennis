/**
	* Tennis Ball
	*/
Crafty.myGame.eBall = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;
	
	Crafty.sprite("img/ball.png", {
	  Ball: [0, 0, 32, 32]
	});
	Crafty.e("2D, DOM, Color, Collision, Ball")
		.color('rgb(0,0,255)')
		.attr({ x: W/2, y: 150, w: 32, h: 32, alpha: 1, 
	      dX1: 4,  // Initial speed
	      dX: 4,   //Crafty.math.randomInt(4, 6), 
				dY1: 2,
				dY: 2,
				moving: true
		})
		.bind('EnterFrame', function () {
			
			// Waiting for serve
			if (!this.moving) return;
			
			// Hit floor or roof
			var maxY = H - this.h;
			if (this.y < 0 || this.y > maxY) {
				// Bounce
				this.dY *= -1;
				// Stay in bounds
				if (this.y >= maxY) this.y = maxY; else if (this.y <= 0) this.y = 0;
				Crafty.audio.play('bounce', 1, 0.3);
			}

			// Ball out of bounds (right/left)
			if (this.x > W || this.x < 10) {
				var pad;

	      // Allocate points
	      if (this.x > W) {
	        this.x = W/6;
	        Crafty.myGame.scoreBoard.incScore("GamePointsLeft");
	        //Crafty("LeftPoints").each(function(){this.text(++this.points + " Points");});
	        pad = Crafty('padleft');
	      } else {
	        this.x = 4*W/6;
	        //Crafty("RightPoints").each(function(){this.text(++this.points + " Points");});
	        Crafty.myGame.scoreBoard.incScore("GamePointsRight");
	        pad = Crafty('padright');
	      }
	      // Play Cheer
	      if (Crafty.myGame.cheer && Math.abs(this.dX) > 5) Crafty.audio.play('cheer', 1, 0.1);
	      // Place ball at winner
	      this.y = pad.y; this.x = pad.x;
				// Reset speed
				this.dX = this.dX1*(Math.abs(this.dX)/this.dX);
				this.dY = this.dY1;                                
	      return;
			}
			this.x += this.dX;
			this.y += this.dY;
		})
		.onHit('Paddle', function (a) {
			
			// Waiting for serve
			if (!this.moving) return;
			
	    var p = a[0].obj;
	    var b = this;
	    if (this.dX>0) {
	      
	      // Don't let ball from behind you hit you
	      if (p.player !== 2) return;
	    
	      // Miss (avoid head/feet shots)
	      if (b.x > p.x) return;
	      
	    } else {

	      // Don't let ball from behind you hit you
	      if (p.player !== 1) return;

	      // Miss (avoid head/feet shots)
	      if (b.x < p.x+p.w/2) return;

	    }
		  // Hit ball back
		  this.dX *= -1;
		  // Angle of return ball is 1/5 of y-distance between centers
		  this.dY = ((b.y+b.h/2) - (p.y+p.h/2))/5;
	    this.dY = Math.max(Math.min(this.dY, 4), -4); // Keep between -4 and +4
		  // Speed up on each hit
		  this.dX += 0.3*Math.abs(this.dX)/this.dX;
		  this.dX = Math.round(this.dX*10)/10;
		  // Play hit sound
		  Crafty.audio.play('hit', 1, 1);
	  })
		.onHit('Wall', function(){
	    this.dX *= -1;
	    Crafty.audio.play('bounce', 1, 0.5);
	  })
	  .bind('KeyDown', function(k) {
	    if (k.key == 32) {
	      this.moving = !this.moving;
	      Crafty.audio.play('hit.serve', 1, 0.7);
	    }
	  });
};

