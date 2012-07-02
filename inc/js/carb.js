var carb = {};
carb.load = function(mix,fn){

	this.mix = mix;
	this.fn = fn;
	this.loaded = 0;
	
	if( typeof(mix.length) != 'number' ){
		this.mix = [this.mix];
	}
	
	this.mix.each(function(src, i){
		this.mix[i] = new Image();
		this.mix[i].onload = this._onload.bind(this);
		this.mix[i].src = src;
		
	}, this );
}

carb.load.prototype._onload = function(){
	this.loaded++;
	
	if( this.mix.length == this.loaded ){
		this.fn.call(null, this.mix);
	}
}

carb.canvas = function(w,h){
	this.el = document.createElement('canvas');
	this.el.width = w;
	this.el.height = h;
	this.width = w;
	this.height = h;
}

carb.canvas.prototype.hide = function(){
	this.el.style.display = 'none';
	return this;
}

carb.canvas.prototype.show = function(){
	this.el.style.display = 'block';
	return this;
}

carb.canvas.prototype.inject = function(el){
	el.appendChild(this.el);
	return this;
}

carb.canvas.prototype.get = function(name){
	switch(name){
		case 'ctx':{
			if(!this.ctx){
				this.ctx = this.el.getContext('2d');
			}

			return this.ctx;
			break;
		}
		
		case 'width':
		case 'height':
		case 'el':{
			return this[name];
			break;
		}
	}
	
	return null;
}

carb.canvas.prototype.set = function(name,value){
	if(name=='width'){
		this.el.width = value;
		this.width = value;
	} else if( name=='height' ){
		this.el.height = value;
		this.height = value;
		
	}
	
	return this;
}

carb.shape = {};
carb.shape.triangle = function(ctx,x,y,size){
	ctx.beginPath();
	ctx.moveTo(x,y); 
	ctx.lineTo(x,y-size);  
	ctx.lineTo(x-size,y);  
	ctx.closePath();  
	ctx.fill();
}
carb.shape.piramid = function(ctx,x,y,size,rotate){
	
	ctx.save();
	ctx.translate(x,y);
	if(rotate) ctx.rotate(rotate);
	
	ctx.beginPath();
	ctx.moveTo(-size/2,-size/2); 
	ctx.lineTo(-size/2,size/2);
	ctx.lineTo(0,0); 
	ctx.closePath();  
	ctx.fill();
	
	ctx.restore(); 
}

/***
 * extended Math functions
 */

clamp = function(x, mn, mx) {
    if(x < mn) return mn;
    if(x > mx) return mx-1;
    return x;
}