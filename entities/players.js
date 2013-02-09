/**
	* Tennis Players
	*/
Crafty.myGame.ePlayers = function() {

	var W = Crafty.myGame.W,
			H = Crafty.myGame.H;

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

};

