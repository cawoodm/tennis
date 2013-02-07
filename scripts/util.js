function getEntity(id) {
	var entity;
	Crafty(id).each(function(){entity = this;});
	return entity;
}

function toggleSound(id) {
	Crafty.audio.stop(id);
}