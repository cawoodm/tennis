/**
	* AI
	* Computer Player
	*/
Crafty.c('AI', {
	init: function() {
		this._difficulty = 1;
		var player = this;
		this.play = function(e) {
			if (player.x != player._difficulty * 100) player.x = player._difficulty * 100;
			Crafty("Ball").each(function(){
				var ball = this;
				if (ball.dX>0 && player.player == 1) return;
				if (player.x > ball.x-Crafty.myGame.W/Crafty.math.randomInt(4,6)) // Bigger number = less reaction time (easier)
					player.y += (ball.y-player.y)/Crafty.math.randomInt(10,25); // Bigger number = slower movement (easier)
					player.x = player._difficulty * 100;
			});
		};
		this.bind("EnterFrame", this.play);
	},
	difficulty: function(l) {
		this.difficulty = Math.max(Math.min(l, 3), 0);
		return this;
	},
	off: function() {
		this.unbind("EnterFrame", this.play);
		return this;
	}
});

