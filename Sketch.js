//Sketch.js
function Sketch(idIn, planeIn){
	this.type = "Sketch";
	this.id = idIn;

	//this is the plane that the sketch sits on
	this.plane = planeIn;

	//this is the list of objects in the sketch
	this.primativeList = [];

	//every child of the sketch gets a local id number
	this.idGen = new IdGenerator();
}

Sketch.prototype.addPoint = function(xIn, yIn, zIn, colorIn){
	point = new Point(this.idGen.getId, xIn, yIn, zIn, colorIn);
	this.primativeList.push(point);
}