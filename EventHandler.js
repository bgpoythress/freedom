//EventHandler.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This class handles all events

function EventHandler(canvasIn, rendererIn, currentStateIn){

	this.canvas = canvasIn;
	this.renderer = rendererIn;
	this.currentState = currentStateIn;

	//The EventHandler will hold on to a variable that contains the inverse perspective matrix
	//of the renderer.  The EventHandler will use this to give the currentState ray information
	//that it can use to figure out what was clicked or hovered over.
	this.inverseProjMatrix = new Matrix4();
	
	//ray after normalizing
	this.normalizedRay = new Vector4();

	//ray after applying the inverse perspective matrix
	this.eyeRay = new Vector4();

	//event handlers----------------------------------------------------------------------
	
	//window resize event
	window.addEventListener('resize', function(){
										this.renderer.resizeCanvas(this.canvas);}.bind(this), 
										false);

	//mouse down event
	this.canvas.addEventListener('mousedown', function(evt){
												this.handleMouseDown(evt);
											}.bind(this), false);

	this.canvas.addEventListener('mouseup', function(evt){
												this.handleMouseUp(evt);}.bind(this), false);

	//keydown event
	document.addEventListener('keydown', function(evt){
											this.handleKeyDown(evt);
										}.bind(this), false);

	//keyup event
	document.addEventListener('keyup', function(evt){
											this.handleKeyUp(evt);
										}.bind(this), false);


}

//Implementing mouseDown
EventHandler.prototype.handleMouseDown = function(evt){
	

};

//Implementing mouseUp
EventHandler.prototype.handleMouseUp = function(evt){
	
	//update the eyeRay variable so that it is ready to pass to the currentState
	this.updateEyeRay(evt);
	this.currentState.onMouseUp(evt, this.eyeRay);

};

//Implementing keyDown
EventHandler.prototype.handleKeyDown = function(evt){
	this.currentState.onKeyDown(evt);
};

//Implementing keyUp
EventHandler.prototype.handleKeyUp = function(evt){
	this.currentState.onKeyUp(evt);
};

EventHandler.prototype.updateEyeRay = function(evt){
	//steps to create a ray

	//step 0: 2d viewpoint coordinates
	var x = evt.x;
	var y = evt.y;
	var z = null;
	var w = null;

	//Step 1 and 2: Make normalized Device Coordinates.  x, y, and z
	//now define a vector looking in the negative z direction
	x = ((2.0 * x) / this.canvas.width) - 1.0;
	y = 1.0 - ((2.0 * y) / this.canvas.height);
	z = -1.0;
	w = 1.0;

	this.normalizedRay.elements[0] = x;
	this.normalizedRay.elements[1] = y;
	this.normalizedRay.elements[2] = z;
	this.normalizedRay.elements[3] = w;

	//console.log(this.normalizedRay);

	//Step 3: 4d Eye(Camera) Coordinates
	this.inverseProjMatrix.setInverseOf(this.renderer.projMatrix);

	//console.log(this.inverseProjMatrix);


	this.eyeRay = this.inverseProjMatrix.multiplyVector4(this.normalizedRay);
	this.eyeRay.elements[2] = -1.0
	this.eyeRay.elements[3] = 0.0;

	//console.log(this.eyeRay);
	

};



