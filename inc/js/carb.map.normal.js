/**
 *	All credits go to <http://29a.ch/> Jonas Wagner. 
 **/

if(!carb.map) carb.map = {};

carb.map.normal = function( target ){
	if(target){
		this.setTarget(target);
	}
}

carb.map.normal.prototype.shiny = 1.2;
carb.map.normal.prototype.specularity = 0;

carb.map.normal.prototype._normals = [];
carb.map.normal.prototype._texture = [];

carb.map.normal.prototype.setMap = function(el)
{
	this.map = el;

	// calculate normal map
	var normalsData	= this.map.get('ctx').getImageData( 
		0, 
		0, 
		this.map.get('width'), 
		this.map.get('height') 
	).data;

	this._texture = this.source.get('ctx').getImageData( 
		0, 
		0, 
		this.source.get('width'), 
		this.source.get('height') 
	).data;
	
	for(var i = 0, l = this.map.height*this.map.width*4; i < l; i+=4) {
		var nx = normalsData[i];
		
		// flip the y value
		var ny = 255-normalsData[i+1];
		var nz = normalsData[i+2];

		// normalize
		var magInv = 1.0/Math.sqrt(nx*nx + ny*ny + nz*nz);
		nx *= magInv;
		ny *= magInv;
		nz *= magInv;

		this._normals.push(nx);
		this._normals.push(ny);
		this._normals.push(nz);
	}
	
}

carb.map.normal.prototype.setTarget = function(el){
	this.target = el;
}

carb.map.normal.prototype.setSource = function(el){
	console.log( el );
	this.source = el;
}

carb.map.normal.prototype.getImageData = function(canvasName,x,y,w,h){
	
	x = x || 0;
	y = y || 0;

	
	switch(canvasName){
		case 'source':
		case 'map':
		case 'target':
		{
			w = w || this[canvasName].get('width');
			h = h || this[canvasName].get('height');
			
			this[canvasName].getImageData(x,y,w,h);
			break;
		}
	}
}

carb.map.normal.prototype.draw = function( lx, ly, lz)
{
	
	
    var imgData = this.target.ctx.getImageData(0, 0, this.target.width, this.target.height),
		data = imgData.data;
		i = 0,
		ni = 0,
		dx = 0, dy = 0, dz = 0,
		x = 0,y = 0,
		width = this.target.width, 
		height = this.target.height;
	
	
	for(var c = 0, l = ( width*height); c < l; c++) {
		x = c%width;
		y = Math.floor(c/width);
		
		// get surface normal
		nx = this._normals[ni];
		ny = this._normals[ni+1];
		nz = this._normals[ni+2];

		// make it a bit faster by only updateing the direction
		// for every other pixel
		if(this.shiny > 0 || (ni&1) == 0){
			// calculate the light direction vector
			dx = lx - x;
			dy = ly - y;
			dz = lz;

			// normalize it
			magInv = 1.0/Math.sqrt(dx*dx + dy*dy + dz*dz);
			dx *= magInv;
			dy *= magInv;
			dz *= magInv;
		}

		// take the dot product of the direction and the normal
		// to get the amount of specularity
		var dot = dx*nx + dy*ny + dz*nz,
			spec = (Math.pow(dot, 20)*this.specularity) + (Math.pow(dot, 400)*this.shiny),
//			spec += Math.pow(dot, 400)*this.shiny;
		
			// spec + ambient
			intensity = spec + 0.5;

		for(var channel = 0; channel < 3; channel++) {
			data[i+channel] = Math.round(clamp(this._texture[i+channel]*intensity, 0, 255));
		}
		i += 4;
		ni += 3;
	}
	
    /*for(var y = 0; y < this.target.height; y++) {
        for(var x = 0; x < this.target.width; x++) {
            // get surface normal
            nx = normals[ni];
            ny = normals[ni+1];
            nz = normals[ni+2];

            // make it a bit faster by only updateing the direction
            // for every other pixel
            if(shiny > 0 || (ni&1) == 0){
                // calculate the light direction vector
                dx = lx - x;
                dy = ly - y;
                dz = lz;

                // normalize it
                magInv = 1.0/Math.sqrt(dx*dx + dy*dy + dz*dz);
                dx *= magInv;
                dy *= magInv;
                dz *= magInv;
            }

            // take the dot product of the direction and the normal
            // to get the amount of specularity
            var dot = dx*nx + dy*ny + dz*nz;
            var spec = Math.pow(dot, 20)*specularity;
            spec += Math.pow(dot, 400)*shiny;
            // spec + ambient
            var intensity = spec + 0.5;

            for(var channel = 0; channel < 3; channel++) {
                data[i+channel] = Math.round(Math.clamp(textureData[i+channel]*intensity, 0, 255));
            }
            i += 4;
            ni += 3;
        }
    }*/
	
	this.target.ctx.putImageData(imgData, 0, 0);
}

