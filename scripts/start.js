Crafty.scene("main", function() {

  // Generate World
  Crafty.myGame.eCourt();
  Crafty.myGame.eBall();
  Crafty.myGame.ePlayers();
  Crafty.myGame.eScoreboards();

  Crafty.myGame.scoreBoard = new Scoreboard();
  Crafty.myGame.scoreBoard.resetGameScore();

  // Declare Sounds
  Crafty.audio.add("bounce", "audio/bounce.mp3");
  Crafty.audio.add("hit", "audio/hit.mp3");
  Crafty.audio.add("hit.serve", "audio/hit.serve.mp3");
  Crafty.audio.add("run", "audio/run.mp3");
  Crafty.audio.add("crowd", "audio/crowd.mp3");
  Crafty.audio.add("cheer", "audio/cheer1.mp3");
  Crafty.myGame.cheer = true;

  // Declare (random) Music (0=none)
  Crafty.audio.add("bg", 'audio/bg' + Crafty.math.randomInt(1, 2) + '.mp3');

  // Play Sounds
  Crafty.support.audio=false;
  Crafty.audio.play('bg', - 1, 0.05);
  Crafty.audio.play('crowd', - 1, 0.03);
});

Crafty.scene("loading", function() {

  Crafty.e("2D, DOM, Color, Text").attr({
    w: 300,
    h: 20,
    x: 150,
    y: 120
  }).text("Click to begin...").css({
    "text-align": "center",
    "color": "#FFFFFF"
  });

  Crafty.addEvent(this, Crafty.stage.elem, "click", function() {
  	if (window.SoundsInit) return;
  	window.SoundsInit=true;
  	console.log("a")
  	Crafty.audio.add("hit", "audio/hit.mp3");
  	Crafty.audio.play('hit', 1, 0.3);
  	Crafty.scene("main");
  });

  //window.setTimeout(function() {Crafty.scene("main");}, 1000);

});
Crafty.scene("loading");


function Scoreboard() {
  var scores = ['0', '15', '30', '40'];
  this.games = [0, 0];
  this.initGame = function(){
		this.leftScore = 0;
		this.rightScore = 0;
		this.advantage = '';
  };
  /**
   * Increase the score on the scoreboard
   */
  this.incScore = function(eName) {
    var en = Crafty(eName);
    if (eName.indexOf('Left')>=0) {
      if (scores[this.leftScore] === '40') {
        if (scores[this.rightScore] !== '40') {
          this.incGame('Left');
          this.resetGameScore();
        } else if (this.advantage === 'Left') {
          this.incGame('Left');
          this.resetGameScore();
        } else {
          this.advantage = 'Left';
        }
        return;
      }
      en.removeComponent('Score' + scores[this.leftScore]);
      en.addComponent('Score' + scores[++this.leftScore]);
    } else {
        console.log('inc right');
      if (scores[this.rightScore] === '40') {
        if (scores[this.leftScore] !== '40') {
          this.incGame('Right');
          this.resetGameScore();
        } else if (this.advantage === 'Right') {
          this.incGame('Right');
          this.resetGameScore();
        } else {
          this.advantage = 'Right';
        }
        return;
      }
      en.removeComponent('Score' + scores[this.rightScore] == '0' ? '00' : scores[this.rightScore]);
			en.addComponent('Score' + scores[++this.rightScore]);
    }
  };
  this.incGame = function(side) {
    var en = Crafty('SetPoints'+side);
    en.removeComponent('Games'+en.points);
    en.points++;
    en.addComponent('Games'+en.points);
  };
  this.resetGameScore = function() {
			var en = Crafty('GamePointsLeft');
      en.removeComponent('Score' + scores[this.leftScore]);
      en.addComponent('Score0');
      en = Crafty('GamePointsRight');
      en.removeComponent('Score' + scores[this.rightScore] == '0' ? '00' : scores[this.rightScore]);
			en.addComponent('Score00');
			this.initGame();
  };
}