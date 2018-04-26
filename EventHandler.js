//EventHandler.js

function EventHandler(canvasIn, rendererIn, currentStateIn){

	this.canvas = canvasIn;
	this.renderer = rendererIn;
	this.currentState = currentStateIn;

	//event handlers
	//window resize event
	window.addEventListener('resize', function(){
										this.renderer.resizeCanvas(this.canvas);}.bind(this), 
										false);

	this.canvas.addEventListener('mousedown', function(evt){
												this.handleMouseDown(evt);
											}.bind(this), false);

}

EventHandler.prototype.handleMouseDown = function(evt){
	console.log("click!");
	console.log(evt.x);
};

