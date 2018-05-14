//Point.js
//Written by Brandon Poythress
//14MAY2018
//Description: 
//I found that it was necessary to separate vertices from points.
//Points are objects that are visible and selectable to the user.
//vertices are the building blocks for complex objects but
//are not necessarily viewable or able to be interacted with by
//the user.  Each point will contain a vertex object, but
//every vertex will not be necessarily be a point.

//Point class
function Point(idIn, parentIdIn, parentDirtyListCallbackIn, xIn, yIn, zIn, colorIn){
	
	//Point inherits properties from ModelObject but not methods
	ModelObject.call(this, "Point", idIn, parentIdIn, false, parentDirtyListCallbackIn);

	//Point is a drawable object
	DrawableObject.call(this, colorIn);
	
	//this is the vertex location of the point
	this.vertex = new Vertex(xIn, yIn, zIn);
	
}

//Inheriting methods from drawable object but keeping constructor 
Point.prototype = Object.create(DrawableObject.prototype);
Point.prototype.constructor = Point;