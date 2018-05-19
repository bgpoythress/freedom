//Freedom.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This file is the main game loop

//if there are textures you have to run a local server with the command:
// If Python version is 3.X
// python -m http.server
// If Python version is 2.X
// python -m SimpleHTTPServer

debugging = true;

function main(){
	//retrieve the canvas from the html file
	var canvas = document.getElementById('webgl');
	if(!canvas){
		console.log('Failed to retrieve the <canvas> element');
		return;
	}

	//create the renderer instance
	var renderer = new Renderer(canvas);
	
	//load state
	var currentState = new ModelState();

	//event handler
	var eventHandler = new EventHandler(canvas, renderer, currentState);

	//size the canvase based on the current browser window size
	renderer.resizeCanvas(canvas);

	//There will probably be a function call somewhere around here that loads
	//existing saved data if there is any.
	
	//holds the time of last view update
	var lastUpdate = Date.now();
	var currentTime = Date.now();
	var delta;

	//define the game Loop
	var gameLoop = function(){
			currentTime = Date.now();
			delta = currentTime - lastUpdate;
			lastUpdate = currentTime;
			currentState.update(delta);
			renderer.render(currentState, canvas);
			requestAnimationFrame(gameLoop);
	};

	//starting the main game loop
	gameLoop();
}	


