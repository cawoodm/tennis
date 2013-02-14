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

	// Player Left (with AI)
	Crafty.sprite(32, "img/padleft.run.png", {
	  padleft: [0, 0]
	});
	Crafty.e("Paddle, 2D, DOM, Color, Multiway, Bound, AI, padleft, SpriteAnimation")
		.color('rgb(255,0,0)')
		.attr({ x: 20, y: H/2, w: 32, h: 32, player: 1 })
		.bound({minX: 0, minY: 0, maxX: W/2, maxY: H})
		.multiway(4, { W: -90, S: 90, D: 0, A: 180 })
		.difficulty(3)
		.bind('NewDirection', runner)
	  .animate('run', 0, 0, 5) // From x=0, y=0 to x=5 (6 frames)
		;
  
  // Player Right
	Crafty.sprite(32, "img/padright.run.png", {
	  padright: [0, 0]
	});
	Crafty.e("Paddle, 2D, DOM, Color, Multiway, Bound, padright, SpriteAnimation")
		.color('rgb(0,255,0)')
		.attr({ x: W-32, y: H/2, w: 32, h: 32, player: 2 })
		.multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180 })
		.bound({minX: W/2, minY: 0, maxX: W, maxY: H})
		.bind('NewDirection', runner)
	  .animate('run', 0, 0, 5) // From x=0, y=0 to x=5 (6 frames)
		//.speed({x:10,y:10})
		;

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
				Crafty.audio.play('run', -1, 0.3);
				}
	  }

};

/**
	* Scoreboards
	*/
Crafty.myGame.eScoreboards = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;
			
	Crafty.sprite("img/digits.png", {
		Score0:  [0,   0, 70, 60],
		Score15: [0,  60, 70, 60],
		Score30: [0, 120, 70, 60],
		Score40: [0, 180, 70, 60],
		Score00: [0, 240, 70, 60]
	});
			
	Crafty.sprite("img/digits0.png", {
		Games0:  [0,   0, 35, 60],
		Games1:  [35,  0, 35, 60],
		Games2:  [70,  0, 35, 60],
		Games3:  [105, 0, 35, 60],
		Games4:  [140, 0, 35, 60],
		Games5:  [175, 0, 35, 60],
		Games6:  [210, 0, 35, 60]
	});
			
	// Game Points
	Crafty.e("GamePointsLeft, DOM, 2D")
		.attr({ x: W/2-90, y: 10, w: 70, h: 60, points: 0 })
/*		.bind('Game', function(e) {
			console.log('Game', e);
			Crafty.myGame.scoreBoard.resetGameScore();
		})*/
	  ;
	Crafty.e("GamePointsRight, DOM, 2D")
		.attr({ x: W/2+20, y: 10, w: 70, h: 60, points: 0 })
/*		.bind('Game', function(e) {
			console.log('Game', e);
			Crafty.myGame.scoreBoard.resetGameScore();
		})*/
		;
	
	// Set Points
	Crafty.e("SetPointsLeft, DOM, 2D, Games0")
		.attr({ x: 20, y: 10, w: 35, h: 60, points: 0})
		.bind('Set', function(e) {
			console.log('Set', e);
			Crafty.myGame.scoreBoard.resetSetScore();
		})
	  ;
	Crafty.e("SetPointsRight, DOM, 2D, Games0")
		.attr({ x: W-90, y: 10, w: 35, h: 60, points: 0 })
		.bind('Game', function(e) {
			console.log('Set', e);
			Crafty.myGame.scoreBoard.resetSetScore();
		})
		;

};

