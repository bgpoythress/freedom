//Vertex.js
//Written by Brandon Poythress
//14MAY2018
//Description: 
//I found that it was necessary to separate vertices from points.
//Points are objects that are visible and selectable to the user.
//vertices are the building blocks for complex objects but
//are not necessarily viewable or able to be interacted with by
//the user.  Each point will contain a vertex object, but
//every vertex will not be necessarily be a point.

function Vertex(xIn, yIn, zIn){

	this.x = xIn;
	this.y = yIn;
	this.z = zIn;
}