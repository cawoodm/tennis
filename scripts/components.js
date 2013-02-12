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

/**
  * Keep a 2D entity inside a bounded box
  */
Crafty.c('Bound', {
  init: function() {
    this.bind("EnterFrame", function(e) {
      if (!this.b) return;
      if (typeof this.b.minY != 'undefined' && this.y < this.b.minY) {this.y = this.b.minY + 1; this.dY = 0;}
      else if (typeof this.b.maxY != 'undefined' && this.y+this.h > this.b.maxY) this.y = this.b.maxY-this.h - 1;
      if (typeof this.b.minX != 'undefined' && this.x < this.b.minX) this.x = this.b.minX + 1;
      else if (typeof this.b.maxX != 'undefined' && this.x+this.w > this.b.maxX) this.x = this.b.maxX-this.w - 1;
    });
  },
  bound: function(bounds) {
    this.b = {
      minX: bounds.minX,
      minY: bounds.minY,
      maxX: bounds.maxX,
      maxY: bounds.maxY
    };
    return this;
  }
});

Crafty.c("Scoreboard", {
	init: function() {
	}
}); // Our slide component - listens for slide events
 // and smoothly slides to another tile location
 Crafty.c("Slide", {
   init: function() {
     this._stepFrames = 5;
     this._tileSize = 32;
     this._moving = false;
     this._vx = 0;
     this._destX = 0;
     this._sourceX = 0;
     this._vy = 0;
     this._destY = 0;
     this._sourceY = 0;
     this._frames = 0;

     this.bind("Slide", function(direction) {
       // Don't continue to slide if we're already moving
       if (this._moving) return false;
       this._moving = true;

       // Let's keep our pre-movement location
       // Hey, Maybe we'll need it later :)
       this._sourceX = this.x;
       this._sourceY = this.y;

       // Figure out our destination
       this._destX = this.x + direction[0] * 32;
       this._destY = this.y + direction[1] * 32;

       // Get our x and y velocity
       this._vx = direction[0] * this._tileSize / this._stepFrames;
       this._vy = direction[1] * this._tileSize / this._stepFrames;

       this._frames = this._stepFrames;
     }).bind("EnterFrame", function(e) {
       if (!this._moving) return false;

       // If we'removing, update our position by our per-frame velocity
       this.x += this._vx;
       this.y += this._vy;
       this._frames--;

       if (this._frames === 0) {
         // If we've run out of frames,
         // move us to our destination to avoid rounding errors.
         this._moving = false;
         this.x = this._destX;
         this.y = this._destY;
       }
       this.trigger('Moved', {
         x: this.x,
         y: this.y
       });
     });

   },
   slideFrames: function(frames) {
     this._stepFrames = frames;
   },

   cancelSlide: function() {
     this.x = this._sourceX;
     this.y = this._sourceY;
     this._moving = false;
   }
 });