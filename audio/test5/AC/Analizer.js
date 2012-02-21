AC.Analyser = function(o){
	this.o = this.ctx.createAnalyser();
	this.o.fftSize = 1024;
	
	this.setFrequency(5000);
	
	if(o){
		this.connect(o);
	}
}

