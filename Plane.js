//Plane.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This class represents a plane.

function Plane(idIn, parentIdIn, parentDirtyListCallback, xIn, yIn, zIn, normalXIn, normalYIn, normalZIn, upXIn, upYIn, upZIn){
	
	//basic information about the plane
	this.type = "Plane";
	this.id = idIn;
	this.parent = parentIdIn;
	this.idGen = new IdGenerator();

	//rendering information
	this.hasRenderList = true;
	this.renderList = [];

	//color of the plane
	this.color = GREEN;

	//callback function to the parent
	//used to inform about children that need
	//to be updated in the GPU because they have
	//changed
	this.passDirtyToParent = parentDirtyListCallback;

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

	//size of the plane in mm.  May be better
	//to pass this into the constructor
	//but for now I will hard code it
	this.size = 10000;

	//create the points that make up the
	//four corners of the plane.  We
	//need them to draw the lines but we
	//will not add them to the render
	//list of the plane
	point1 = new Point(this.idGen.getId(),
					this.id, this.dirtyListCallback.bind(this),
					-this.size/2.0, 0.0, -this.size/2.0,
					 this.color);

	point2 = new Point(this.idGen.getId(),
					this.id, this.dirtyListCallback.bind(this),
					-this.size/2.0, 0.0, this.size/2.0, this.color);

	point3 = new Point(this.idGen.getId(),
					this.id, this.dirtyListCallback.bind(this),
					this.size/2.0, 0.0, this.size/2.0, this.color);

	point4 = new Point(this.idGen.getId(),
					this.id, this.dirtyListCallback.bind(this),
					this.size/2.0, 0.0, -this.size/2.0, this.color);

	//add the four lines to dirty and render lists
	this.line1 = new Line(this.idGen.getId(),
						this.id, this.dirtyListCallback.bind(this),
						point1, point2, BLACK);

	
	
	this.line2 = new Line(this.idGen.getId(),
						this.id, this.dirtyListCallback.bind(this),
						point2, point3, BLACK);
	
	
	this.line3 = new Line(this.idGen.getId(),
						this.id, this.dirtyListCallback.bind(this),
						point3, point4, BLACK);
	
	this.line4 = new Line(this.idGen.getId(),
						this.id, this.dirtyListCallback.bind(this),
						point4, point1, BLACK);

	this.passDirtyToParent(this.line1);
	this.passDirtyToParent(this.line2);
	this.passDirtyToParent(this.line3);
	this.passDirtyToParent(this.line4);
	this.renderList.push(this.line1);
	this.renderList.push(this.line2);
	this.renderList.push(this.line3);
	this.renderList.push(this.line4);

	//create a surface object
	this.surface = new Surface(this.idGen.getId(),
								this.id, this.dirtyListCallback.bind(this),
								this.color);

	//I am going to render planes partially transparent
	//this.surface.color.a = 0.2;
	
	this.surface.triangles.push(point1, point2, point3,
								point1, point3, point4);

	this.passDirtyToParent(this.surface);
	this.renderList.push(this.surface);

}

Plane.prototype.dirtyListCallback = function(dirtyObject){
	this.passDirtyToParent(dirtyObject);
};

Plane.prototype.update = function(){

};