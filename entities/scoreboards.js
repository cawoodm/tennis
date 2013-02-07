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

