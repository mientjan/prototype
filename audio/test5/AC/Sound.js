AC.Sound = function(url, fn)
{
	this.o = this.ctx.createBufferSource();
	
	this.xhr = new XMLHttpRequest();
	this.xhr.open('GET', url, true);
	this.xhr.responseType = 'arraybuffer';
	this.events = {};

	var self = this;
	this.xhr.onload = function() 
	{
		fn.call();
		// var self2 = self;
		self.ctx.decodeAudioData(this.response, function(buffer) {
			self.o.buffer = buffer;
		}, function(e){
			
		});
	}
	
	this.load();
}

AC.Sound.prototype.ctx = null;
AC.Sound.prototype.xhr = null;
AC.Sound.prototype.buffer = null;
AC.Sound.prototype.loaded = false;
AC.Sound.prototype.state = null;
AC.Sound.prototype.events = null;
AC.Sound.prototype.addEvent = function(name,fn){
	if(!this.events[name]){
		this.events[name] = [];
	}
	
	this.events[name].push(fn);
};

AC.Sound.prototype.load = function(){
	this.xhr.send();
}

AC.Sound.prototype.connect = function(o){
	this.o.connect(o.o);
}

AC.Sound.prototype.disconnect = function(){
	this.o.disconnect();
}

AC.Sound.prototype.play = function(){
	this.o.noteOn(0);
}