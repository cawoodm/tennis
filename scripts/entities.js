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
	      dX1: 4, // Initial speed
	      dX: 4, //Crafty.math.randomInt(4, 6), 
				dY1: 2,
				dY: 2,
				moving: false
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
				this.y = H/2; //H*Crafty.math.randomInt(1, 5);
				this.dX = this.dX1*(Math.abs(this.dX)/this.dX);    // Reset x speed
				this.dY = 0; //this.dY1;                                // Reset y speed
				//this.moving = false;
	      // Allocate points
	      if (this.x > W) {
	        this.x = W/6;
	        Crafty("LeftPoints").each(function(){this.text(++this.points + " Points");});
	        pad = getEntity('padleft');
	      } else {
	        this.x = 4*W/6;
	        Crafty("RightPoints").each(function(){this.text(++this.points + " Points");});
	        pad = getEntity('padright');
	      }
	      // Place ball at winner
	      this.y = pad.y; this.x = pad.x;
	      Crafty.audio.play('cheer1', 1, 0.1);
	      return;
			}
			this.x += this.dX;
			this.y += this.dY;
		}) //.collision(new Crafty.polygon([0,0],[0,32],[32,32],[32,0]))
		.onHit('Paddle', function (a) {
			
			// Waiting for serve
			if (!this.moving) return;
			
	    var p = a[0].obj;
	    var b = this;
	    if (this.dX>0) {
	      
	      // Don't let ball from behind you hit you
	      if (p.player !== 2) return;
	    
	      // Miss (avoid head/feet shots)
	      if (b.x > p.x)  {
		      Crafty.audio.play('cheer1', 1, 0.5);
	      	return;
	      } 
	      
	    } else {

	      // Don't let ball from behind you hit you
	      if (p.player !== 1) return;

	      // Miss (avoid head/feet shots)
	      if (b.x < p.x+p.w/2) {
		      Crafty.audio.play('cheer1', 1, 0.1);
	      	return;
	      }

	    }
		  // Hit ball back
		  this.dX *= -1;
		  // Angle of return ball is 1/5 of y-distance between centers
		  this.dY = ((b.y+b.h/2) - (p.y+p.h/2))/5;
	    this.dY = Math.max(Math.min(this.dY, 4), -4); // Keep between -4 and +4
		  // Speed up on each hit
		  this.dX += 0.3*Math.abs(this.dX)/this.dX;
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

/**
	* Tennis Court
	*/
Crafty.myGame.eCourt = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;

	// Green court
	Crafty.e("2D, DOM, Color")
	  .attr({x:20, y: 20, w: W-40, h: H-40})
	  .color('rgb(150,190,14)');

	var white = 'rgb(250,250,250)';
	var line = "2D, DOM, Color";
	Crafty.e(line).attr({x:20, y: 20, w: W-40, h: 5}).color(white);       // Top
	Crafty.e(line).attr({x:20, y: 20+(H-40)/6, w: W-40, h: 5}).color(white);   // Top
	Crafty.e(line).attr({x:20, y: H-20-5, w: W-40, h: 5}).color(white);   // Bottom
	Crafty.e(line).attr({x:20, y: 20+(H-40)*5/6, w: W-40, h: 5}).color(white); // Bottom
	Crafty.e(line).attr({x:20, y: 20, w: 5, h: H-40}).color(white);       // Left
	Crafty.e(line).attr({x:W-20-5, y: 20, w: 5, h: H-40}).color(white);   // Right
	Crafty.e(line).attr({x:W/2-2.5, y: 20, w: 5, h: H-40}).color(white);  // Net
	Crafty.e(line).attr({x:W/4, y: H/2-2.5, w: W/2, h: 5}).color(white);  // Mid         -
	Crafty.e(line).attr({x:W/4, y: 20+(H-40)/6, w: 5, h: (H-40)*4/6}).color(white);      // Mid Left  |
	Crafty.e(line).attr({x:W*3/4, y: 20+(H-40)/6, w: 5, h: (H-40)*4/6}).color(white);      // Mid Left  |
};

/**
	* Tennis Players
	*/
Crafty.myGame.ePlayers = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;

	// Sprites
	Crafty.sprite(32, "img/padleft.run.png", {
	  padleft: [0, 0]
	});
	Crafty.sprite(32, "img/padright.run.png", {
	  padright: [0, 0]
	});

	function runner(d) {
			// Disable AI when moved by player
			if (typeof this.off==='function') this.off();
			
			// Stop running
			if (d.x===0 && d.y===0) {
				Crafty.audio.stop('run');
				return this.stop();
			}
			
			// Start running
			if(!this.isPlaying('run')) {
				this.animate('run', 18, -1); // Start run animation
				console.log('run');
				Crafty.audio.play('run', -1, 0.3);
				}
	  }

	//Paddles
	Crafty.e("Paddle, 2D, DOM, Color, Multiway, Bound, AI, padleft, SpriteAnimation")
		.color('rgb(255,0,0)')
		.attr({ x: 20, y: H/2, w: 32, h: 32, player: 1 })
		.bound({minX: 0, minY: 0, maxX: W/2, maxY: H})
		.multiway(4, { W: -90, S: 90, D: 0, A: 180 })
		.difficulty(3)
		.bind('NewDirection', runner)
	  .animate('run', 0, 0, 5) // From x=0, y=0 to x=5 (6 frames)
		;
	Crafty.e("Paddle, 2D, DOM, Color, Multiway, Bound, padright, SpriteAnimation")
		.color('rgb(0,255,0)')
		.attr({ x: W-32, y: H/2, w: 32, h: 32, player: 2 })
		.multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180 })
		.bound({minX: W/2, minY: 0, maxX: W, maxY: H})
		.bind('NewDirection', runner)
	  .animate('run', 0, 0, 5) // From x=0, y=0 to x=5 (6 frames)
		//.speed({x:10,y:10})
		;

};

/**
	* Scoreboards
	*/
Crafty.myGame.eScoreboards = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;
			
	Crafty.e("LeftPoints, DOM, 2D, Text, Color")
		.attr({ x: 20, y: 10, w: 100, h: 20, points: 0 })
		.text("0 Points")
		.textColor('#FFFF00', 0.8)
	  ;
	Crafty.e("RightPoints, DOM, 2D, Text, Color")
		.attr({ x: W-100, y: 10, w: 100, h: 20, points: 0 })
		.text("0 Points")
		.textColor('#FFFFFF', 0.8)
		;
};

