//LabScene.js

function LabScene(){

	this.type = "Scene";
	this.IdGen = new IdGenerator();

	//to test the rendering system, the lab scene will contain a single sketch
	//with 4 points that make up a plane.  This plane will serve as the 
	//floor for future development.

	floorPlane = new Plane(this.IdGen.getId(), 0.0, 0.0, 0.0, 
		0.0, 1.0, 0.0, 0.0, 0.0, -1.0);

	sketch1 = new sketch(this.IdGen.getId(), floorPlane);


	//define the size of the scene in mm
	this.width = 10000.0;
	this.length = 10000.0;

	sketch1.addPoint(-this.width/2.0, 0.0, -this.length/2.0, BLUE);
	sketch1.addPoint(-this.width/2.0, 0.0, this.length/2.0, BLUE);
	sketch1.addPoint(this.width/2.0, 0.0, this.length/2.0, BLUE);
	sketch1.addPoint(this.width/2.0, 0.0, -this.length/2.0, BLUE);

	this.renderList = [sketch1];


}

// LabScene.prototype.draw = function(gl, renderer){


// }

LabScene.prototype.update = function(lastUpdate){

}