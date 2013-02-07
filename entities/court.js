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

