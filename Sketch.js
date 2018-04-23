//Sketch.js
function Sketch(idIn, parentIn, parentDirtyListCallback, planeIn){
	this.type = "Sketch";
	this.hasRenderList = true;
	this.id = idIn;
	this.parent = parentIn;
	this.passDirtyToParent = parentDirtyListCallback;

	//this is the plane that the sketch sits on
	this.plane = planeIn;

	//this is the list of objects in the sketch
	this.renderList = [];
	this.dirtyList = [];

	//every child of the sketch gets a local id number
	this.idGen = new IdGenerator();
}

Sketch.prototype.addPoint = function(xIn, yIn, zIn, colorIn){
	point = new Point(this.idGen.getId, this.id, this.dirtyListCallback.bind(this),
					 xIn, yIn, zIn, colorIn);
	this.renderList.push(point);
};

Sketch.prototype.dirtyListCallback = function(dirtyObject){
	this.passDirtyToParent(dirtyObject);
};