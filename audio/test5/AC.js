var AC = function(){
	this.ctx = new webkitAudioContext();
	
	AC.Sound.prototype.ctx = this.ctx;
	AC.BiquadFilterNode.prototype.ctx = this.ctx;
	AC.Speaker.prototype.ctx = this.ctx;
}