//DrawingPrimatives.js
//Written by Brandon Poythress
//16APR2018
//Description: 
//To draw things, you need color, points, lines...other things to come maybe  
//Those items are described here..///

//------------------------------------------------------------------------------------
//color class
function Color(rIn,gIn,bIn,aIn){
	this.type = "Color";
	this.r = rIn;
	this.g = gIn;
	this.b = bIn;
	this.a = aIn;
}

//Basic colors are listed below. RGBA format 
var RED = new Color(1.0, 0.0, 0.0, 1.0);
var GREEN = new Color(0.0, 1.0, 0.0, 1.0);
var BLUE = new Color(0.0, 0.0, 1.0, 1.0);
var BLACK = new Color(0.0, 0.0, 0.0, 1.0);
var WHITE = new Color(1.0, 1.0, 1.0, 1.0);



//------------------------------------------------------------------------------------
//Point class
function Point(idIn, parentIdIn, parentDirtyListCallbackIn, xIn, yIn, zIn, colorIn){
	
	//Point inherits properties from ModelObject but not methods
	ModelObject.call(this, "Point", idIn, parentIdIn, false, parentDirtyListCallbackIn);

	//Point is a drawable object
	DrawableObject.call(this);
	
	this.x = xIn;
	this.y = yIn;
	this.z = zIn;
	this.color = new Color(colorIn.r, colorIn.g, colorIn.b, colorIn.a);	
	
}

Point.prototype.setColorByObject = function(colorIn){
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;	
};


//------------------------------------------------------------------------------------
//Line class
function Line(idIn, parentIdIn, parentDirtyListCallbackIn, point1In, point2In, colorIn){
	
	//Line inherits properties from ModelObject but not methods
	ModelObject.call(this, "Line", idIn, parentIdIn, false, parentDirtyListCallbackIn);

	//Line is a drawable object
	DrawableObject.call(this);

	this.point1 = point1In;
	this.point2 = point2In;
	
	this.color = new Color(colorIn.r, colorIn.g, colorIn.b, colorIn.a);

}

Line.prototype.setColorByObject = function(colorIn){
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;
	//this.point1.setColorByObject(colorIn);
	//this.point2.setColorByObject(colorIn);	
};

//Surface class----------------------
function Surface(idIn, parentIdIn, parentDirtyListCallbackIn, colorIn){
	//Surface inherits properties from ModelObject but not methods
	ModelObject.call(this, "Surface", idIn, parentIdIn, false, parentDirtyListCallbackIn);

	//Surface is a drawable object
	DrawableObject.call(this);

	this.color = new Color(colorIn.r, colorIn.g, colorIn.b, colorIn.a);
	
	
	this.triangles = [];

}


