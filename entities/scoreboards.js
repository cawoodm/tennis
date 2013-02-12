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
		.bind('Game', function(e) {
			console.log('Game', e);
			Crafty.myGame.scoreBoard.resetGameScore();
		})
	  ;
	Crafty.e("GamePointsRight, DOM, 2D")
		.attr({ x: W/2+20, y: 10, w: 70, h: 60, points: 0 })
		.bind('Game', function(e) {
			console.log('Game', e);
			Crafty.myGame.scoreBoard.resetGameScore();
		})
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

