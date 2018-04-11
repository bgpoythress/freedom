//DrawingPrimatives.js
//Written by Brandon Poythress
//16APR2018
//Description: 
//To draw things, you need color, points, lines...other things to come maybe  
//Those items are described here..

//------------------------------------------------------------------------------------
//color class
function Color(r,g,b,a){
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

//Basic colors are listed below. RGBA format 
var RED = new Color(1.0, 0.0, 0.0, 1.0);
var GREEN = new Color(0.0, 1.0, 0.0, 1.0);
var BLUE = new Color(0.0, 0.0, 1.0, 1.0);
var BLACK = new Color(0.0, 0.0, 0.0, 1.0);
var WHITE = new Color(1.0, 1.0, 1.0, 1.0);



//------------------------------------------------------------------------------------
//Point class
function Point(gl, xIn, yIn, zIn, colorIn){
	this.x = xIn;
	this.y = yIn;
	this.z = zIn;
	this.color = new Color()
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;
	this.verticesColors = new Float32Array([
		this.x,  this.y,  this.z,  			//pt1 location
		this.color.r,  this.color.g,  this.color.b, this.color.a	//pt1 color
	]);

	this.n = 1;
	
	//create buffer object
	this.vertexColorBuffer = gl.createBuffer();
	if(!this.vertexColorBuffer){
		console.log('Failed to create buffer object');
		return -1;
	}
	
	//Bind the buffer object to the target
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
	
	//Write data into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
	
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	this.FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
	
}

Point.prototype.setColorByObject = function(colorIn){
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;	
}

Point.prototype.draw = function(gl, renderer){
	renderer.drawPoint(gl, this.vertexColorBuffer, 3, 4, this.FSIZE, this.n)
}

//------------------------------------------------------------------------------------
//Line class
function Line(gl, point1In, point2In, colorIn){
	this.point1 = point1In;
	this.point2 = point2In;
	//this.point1.setColorByObject(colorIn); may not be necessary.  
	//this.point2.setColorByObject(colorIn); may not be necessary. 
	this.color = new Color()
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;
	
	this.verticesColors = new Float32Array([

	this.point1.x,  this.point1.y,  this.point1.z,  			//pt1 location
	this.color.r,  this.color.g,  this.color.b, this.color.a,	//pt1 color
		
    this.point2.x, this.point2.y,  this.point2.z,  				//pt2 location
    this.color.r,  this.color.g,  this.color.b, this.color.a	//pt2 color
		]);

	this.n = 2;
	
	//create buffer object
	this.vertexColorBuffer = gl.createBuffer();
	if(!this.vertexColorBuffer){
		console.log('Failed to create buffer object');
		return -1;
	}
	
	//Bind the buffer object to the target
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
	
	//Write data into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
	
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	this.FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
	
}

Line.prototype.setColorByObject = function(colorIn){
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;
	this.point1.setColorByObject(colorIn);
	this.point2.setColorByObject(colorIn);	
}

Line.prototype.draw = function(gl, renderer){
	renderer.drawLine(gl, this.vertexColorBuffer, 3, 4, this.FSIZE, this.n)
						
}
