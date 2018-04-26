//EventHandler.js

function EventHandler(canvasIn, rendererIn, currentStateIn){

	this.canvas = canvasIn;
	this.renderer = rendererIn;
	this.currentState = currentStateIn;

	//event handlers----------------------------------------------------------------------
	
	//window resize event
	window.addEventListener('resize', function(){
										this.renderer.resizeCanvas(this.canvas);}.bind(this), 
										false);

	
	//mouse down event
	this.canvas.addEventListener('mousedown', function(evt){
												this.handleMouseDown(evt);
											}.bind(this), false);

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
	console.log("click!");
	console.log(evt.x);
	
};

//Implementing keyDown
EventHandler.prototype.handleKeyDown = function(evt){
	console.log(evt.key);
};

//Implementing keyUp
EventHandler.prototype.handleKeyUp = function(evt){
	console.log(evt.key);
};

