function getEntity(id) {
	var entity;
	Crafty(id).each(function(){entity = this;});
	return entity;
}

function toggleSound(id) {
  Crafty.audio.stop(id);
  console.log(1, 'Crafty.myGame['+id+']');
  console.log(2, Crafty.myGame[id]);
  Crafty.myGame[id] = !Crafty.myGame[id];
  console.log(3, Crafty.myGame[id]);
}

function muteSound() {
	Crafty.audio.toggleMute();
}