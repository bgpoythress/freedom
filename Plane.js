//Plane.js

function Plane(idIn, xIn, yIn, zIn, normalXIn, normalYIn, normalZIn, upXIn, upYIn, upZIn){
	this.type = "Plane";
	this.id = idIn;

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