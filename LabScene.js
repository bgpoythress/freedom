//LabScene.js

function LabScene(gl){

	//define the size of the scene in mm
	this.width = 10000.0;
	this.length = 10000.0;
	//define the points that make up the floor
	this.point1 = new Point(gl,
	 -this.width/2.0, 0.0, -this.length/2.0, WHITE);
	this.point2 = new Point(gl,
	 -this.width/2.0, 0.0, this.length/2.0, WHITE);
	this.point2 = new Point(gl,
	 -this.width/2.0, 0.0, this.length/2.0, WHITE);
	this.point2 = new Point(gl,
	 -this.width/2.0, 0.0, this.length/2.0, WHITE);

}

LabScene.prototype.draw = function(gl, renderer){

}

LabScene.prototype.update = function(lastUpdate){

}