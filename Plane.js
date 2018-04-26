//Plane.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This class represents a plane.

function Plane(idIn, parentIdIn, xIn, yIn, zIn, normalXIn, normalYIn, normalZIn, upXIn, upYIn, upZIn){
	this.type = "Plane";
	this.hasRenderList = false;
	this.graphicsMemoryAddress = null;
	this.id = idIn;
	this.parent = parentIdIn;

	//location of the plane's center point
	this.x = xIn;
	this.y = yIn;
	this.z = zIn;

	//normal vector components
	this.normalX = normalXIn;
	this.normalY = normalYIn;
	this.normalZ = normalZIn;

	//Local Y axis vector components
	this.upX = upXIn;
	this.upY = upYIn;
	this.upZ = upZIn;
}