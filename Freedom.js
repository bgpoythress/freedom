//Freedom.js

//if there are textures you have to run a local server with the command:
// If Python version is 3.X
// python -m http.server
// If Python version is 2.X
// python -m SimpleHTTPServer



function main(){
	//retrieve the canvas from the html file
	var canvas = document.getElementById('webgl');
	if(!canvas){
		console.log('Failed to retrieve the <canvas> element');
		return;
	}
	//get the rendering context
	var gl = getWebGLContext(canvas);
	if(!gl){
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	//create the renderer instance
	var renderer = new Renderer(gl);
	
	
	//load state
	var currentState = new ModelState();
	
	
	//holds the time of last view update
	var lastUpdate = Date.now();


	//draw state
	renderer.draw(currentState);

	//define the game Loop
	var gameLoop = function(){
			currentState.update(lastUpdate);
			renderer.draw(currentState);
			requestAnimationFrame(gameLoop);
	};

	//starting the main game loop
	gameLoop();
}	
	
////////////////////////////////////////////////////////////////////////////////////
//a reference game loop from google


// function update(progress) {
//   // Update the state of the world for the elapsed time since last render
// }
// 
// function draw() {
//   // Draw the state of the world
// }
// 
// function loop(timestamp) {
//   var progress = timestamp - lastRender
// 
//   update(progress)
//   draw()
// 
//   lastRender = timestamp
//   window.requestAnimationFrame(loop)
// }
// var lastRender = 0
// window.requestAnimationFrame(loop)
// 
// 

////////////////////////////////////	
	

	
	
	// Set the positions of vertices
// 	var n = initVertexBuffers(gl);
// 	if (n<0){
// 		console.log('Failed to set the positions of the vertices');
// 		return;
// 	}
// 	
// 	Get the storage location of u_ViewMatrix  and u_ModelMatrix variable
// 	var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
// 	var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
// 	
// 	Set the eye point, look at point, and up direction
// 	var viewMatrix = new Matrix4();
// 	
// 	Register the event handler to be called on key press
// 	document.onkeydown = function(ev){
// 		keydown(ev, gl, n, u_ViewMatrix, viewMatrix)
// 	};
// 	
// 	var projMatrix = new Matrix4();
// 	projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0);
// 	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
// 	
// 	draw(gl, n, u_ViewMatrix, viewMatrix);
// 	
// 	
// 	
// }
// 
// var g_eyeX = 0.20;
// var g_eyeY = 0.25;
// var g_eyeZ = 0.25;
// 
// function keydown(ev, gl, n, u_ViewMatrix, viewMatrix){
// 	if(ev.keyCode == 39){
// 		g_eyeX += 0.01;
// 	} else if(ev.keyCode ==37){
// 		g_eyeX -= 0.01;
// 	} else{
// 		return;
// 	}
// 	draw(gl, n, u_ViewMatrix, viewMatrix);
// 
// }
// 
// function draw(gl, n, u_ViewMatrix, viewMatrix){
// 		viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);
// 		gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
// 		gl.clear(gl.COLOR_BUFFER_BIT);
// 		gl.drawArrays(gl.TRIANGLES, 0, n);
// }
// 
// function initVertexBuffers(gl){
// 	var verticesColors = new Float32Array([
// 
// 	0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
//     -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
//      0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
//    
//      0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
//     -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
//      0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 
// 
//      0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
//     -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
//      0.5, -0.5,   0.0,  1.0,  0.4,  0.4
// 		]);
// 	
// 	var n = 9;
// 	
// 	create buffer object
// 	var vertexColorBuffer = gl.createBuffer();
// 	if(!vertexColorBuffer){
// 		console.log('Failed to create buffer object');
// 		return -1;
// 	}
// 	
// 	Bind the buffer object to the target
// 	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
// 	
// 	Write data into the buffer object
// 	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
// 	
// 	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
// 	
// 	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
// 	if (a_Position<0){
// 		console.log('Failed to get location of a_Position');
// 	}
// 	
// 	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
// 	if (a_Color<0){
// 		console.log('Failed to get location of a_Color');
// 	}
// 	
// 	Assign the buffer object to a_Position variable and enable it
// 	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*6, 0);
// 	gl.enableVertexAttribArray(a_Position);
// 	
// 	Assign the buffer object to a_TexCoord variable and enable it
// 	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*3);
// 	gl.enableVertexAttribArray(a_Color);
// 	
// 	Unbind the buffer object
//    gl.bindBuffer(gl.ARRAY_BUFFER, null);
// 	
// 	return n;
// }

	

	
	
	
	
	