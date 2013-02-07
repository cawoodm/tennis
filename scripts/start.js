

Crafty.myGame.eCourt();
Crafty.myGame.eBall();
Crafty.myGame.ePlayers();
Crafty.myGame.eScoreboards();

Crafty.audio.add("bounce", "audio/bounce.mp3");
Crafty.audio.add("hit", "audio/hit.mp3");
Crafty.audio.add("hit.serve", "audio/hit.serve.mp3");
Crafty.audio.add("run", "audio/run.mp3");
Crafty.audio.add("crowd", "audio/crowd.mp3");
Crafty.audio.add("cheer", "audio/cheer1.mp3");
Crafty.myGame['cheer'] = true;
Crafty.audio.add("bg", 'audio/bg'+Crafty.math.randomInt(0,2)+'.mp3');
Crafty.audio.play('bg', -1, 0.05);
Crafty.audio.play('crowd', -1, 0.03);