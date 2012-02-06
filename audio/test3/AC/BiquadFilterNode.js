AC.BiquadFilterNode = function(type, o){
	this.o = this.ctx.createBiquadFilter();
	this.o.type = type;
	
	this.setFrequency(5000);
	this.setQuality(100);
	this.setQuality(1,true);
	
	if(o){
		this.connect(o);
	}
}

AC.BiquadFilterNode.LOWPASS = 0;
AC.BiquadFilterNode.HIGHPASS = 1;
AC.BiquadFilterNode.BANDPASS = 2;
AC.BiquadFilterNode.LOWSHELF = 3;
AC.BiquadFilterNode.HIGHSHELF = 4;
AC.BiquadFilterNode.PEAKING = 5;
AC.BiquadFilterNode.NOTCH = 6;
AC.BiquadFilterNode.ALLPASS = 7;

AC.BiquadFilterNode.prototype.ctx = null;
AC.BiquadFilterNode.prototype.connect = function(o){
	this.o.connect(o.o);
};

AC.BiquadFilterNode.prototype.disconnect = function(o){
	this.o.disconnect();
};

AC.BiquadFilterNode.prototype.setFrequency = function( value, procent ){
	
	if(procent){
		value = this.o.frequency.minValue + (( this.o.frequency.maxValue - this.o.frequency.minValue ) * (value/100));
	}
	
	this.o.frequency.value = value;
};

AC.BiquadFilterNode.prototype.setQuality = function( value, procent ){
	if(procent){
		value = this.o.Q.minValue + (( this.o.Q.maxValue - this.o.Q.minValue ) * (value/100));
	}
	
	this.o.Q.value = value;
};

AC.BiquadFilterNode.prototype.setGain = function( procentValue ){
	this.o.gain.value = this.o.gain.minValue + (( this.o.gain.maxValue - this.o.gain.minValue ) * (procentValue/100));
};