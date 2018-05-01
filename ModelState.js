//ModelState.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This is the top level model class

function ModelState(){
	
	//Inherits from ModelObject but because it is the top level object
	//it does not use id, parentId, or parentDirtyListCallback so they
	//are set to null.  It also does not need ModelObject methods,
	//so ModelState doesnt grab its prototypes.
	ModelObject.call(this, "State", null, null, true, null);

	//the state object manages its own model matrix
	//and view matrix.  The renderer handles proj
	//matrix...for now at least
	this.modelMatrix = new Matrix4();
	this.viewMatrix = new Matrix4();

	this.modelMatrix.setIdentity();

	//some temporary code to test moving around
	this.radius = -2500;
	this.angle = 0;

	

	//this is the state of the viewer or player or users
	this.eyeX = 0.0;
	this.eyeY = 1000.0;
	this.eyeZ = 0.0;

	this.lookX = -this.radius*Math.sin(this.angle);
	this.lookY = 0.0;
	this.lookZ = this.radius*Math.cos(this.angle);

	this.isMovingForward = false;
	this.isMovingBackward = false;
	this.isMovingRight = false;
	this.isMovingLeft = false;
	this.isRotatingRight = false;
	this.isRotatingLeft = false;

	this.viewMatrix.setLookAt(this.eyeX, this.eyeY, this.eyeZ, 
								this.lookX, this.lookY, this.lookZ, 
								0, 1, 0);
	
	//movement per millisecond
	this.acceleration = 0.0005;

	//the dirtyList and the renderList is the handshake between the "model" 
	//and the "view". The model and the renderer both have access to it.   
	//Whatever you place in the dirtyList will be re-presented to the GPU because it 
	//is new or it has changed...or it needs to be deleted.
	//whatever is in the renderList will be renderered. 
	
	//i am going to try a single dirtyList for everything
	this.dirtyList = [];

	

	//initialize the scene.
	this.scene = new LabScene(this.idGen.getId(), 
								this.id, 
								this.dirtyListCallback.bind(this));
	
	//initialize one portal.  Multiple portals will be supported in the final build.
	//may need a portal list
	this.portal = new Portal(this.idGen.getId(), 
								this.id, 
								this.dirtyListCallback.bind(this));  

	//each object that is the parent to renderable objects must have a renderList
	this.renderList.push(this.scene);
	this.renderList.push(this.portal);

	this.viewMatrix.setLookAt(this.eyeX, this.eyeY, this.eyeZ, 
								this.lookX, this.lookY, this.lookZ, 
								0, 1, 0);
	
}

// ModelState.prototype.draw = function(gl, renderer){
// 	this.scene.draw(gl, renderer);
// 	this.portal.draw(gl, renderer);
// }

ModelState.prototype.dirtyListCallback = function(dirtyObject){
	this.dirtyList.push(dirtyObject);
};



ModelState.prototype.update = function(delta){



	if(this.isRotatingRight){
		this.angle =  this.angle + delta*this.acceleration;
		console.log("rotating right");

	
	}else if(this.isRotatingLeft){
		console.log("rotating left");
		this.angle = this.angle - delta*this.acceleration;
	}

	this.viewMatrix.setLookAt(this.eyeX, this.eyeY, this.eyeZ, 
								-this.radius*Math.sin(this.angle), 
								this.lookY, this.radius*Math.cos(this.angle), 
								0, 1, 0);

	this.scene.update(delta);
	this.portal.update(delta);
};



ModelState.prototype.onKeyDown = function(evt){
	

	switch(evt.key){
		case "w":
			//this.isMovingForward = true;
			break;

		case "W":
			//this.isMovingForward = true;
			break;

		case "s":
			//this.isMovingBackward = true;
			break;

		case "S":
			//this.isMovingBackward = true;
			break;

		case "a":
			this.isRotatingLeft = true;
			break;

		case "A":
			this.isRotatingLeft = true;
			break;

		case "d":
			this.isRotatingRight = true;
			break;

		case "D":
			this.isRotatingRight = true;
			break;
	}

};

ModelState.prototype.onKeyUp = function(evt){
	switch(evt.key){
		case "w":
			//this.isMovingForward = false;
			break;

		case "W":
			//this.isMovingForward = false;
			break;

		case "s":
			//this.isMovingBackward = false;
			break;

		case "S":
			//this.isMovingBackward = false;
			break;

		case "a":
			this.isRotatingLeft = false;
			break;

		case "A":
			this.isRotatingLeft = false;
			break;

		case "d":
			this.isRotatingRight = false;
			break;

		case "D":
			this.isRotatingRight = false;
			break;
	}
	
};