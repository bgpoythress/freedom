//Line.js
//Written by Brandon Poythress
//14MAY2018
//Description: 
//Line object

//Line class
function Line(idIn, parentIdIn, parentDirtyListCallbackIn, point1In, point2In, colorIn){
	
	//Line inherits properties from ModelObject but not methods
	ModelObject.call(this, "Line", idIn, parentIdIn, false, parentDirtyListCallbackIn);

	//Line is a drawable object
	DrawableObject.call(this, colorIn);

	this.point1 = point1In;
	this.point2 = point2In;
	

}

Line.prototype = Object.create(DrawableObject.prototype);
Line.prototype.constructor = Line;
