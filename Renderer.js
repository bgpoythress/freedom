//Renderer.js
//Written by Brandon Poythress
//17APR2018
//Description: 
//This class renders the state


function Renderer(canvas){

	//get the rendering context
	this.gl = getWebGLContext(canvas);
	if(!this.gl){
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	//shader code-------------------------------------------------------------------
	//vertex shader program
	this.VSHADER_SOURCE = 
		'attribute vec4 a_Position;\n' +
		'attribute vec4 a_Color;\n' +
		'uniform mat4 u_ModelMatrix;\n'+
		'uniform mat4 u_ViewMatrix;\n' +
		'uniform mat4 u_ProjMatrix;\n' +
		'varying vec4 v_Color;\n' +
		'void main() {\n' +
		'	gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;\n'+
		// '	gl_Position = a_Position;\n'+
		'	gl_PointSize = 10.0;\n'+
		'	v_Color = a_Color;\n'+
		'}\n';
	
	//fragment shader program
	this.FSHADER_SOURCE = 
		'precision mediump float;' +
		'varying vec4 v_Color;\n' +
		'void main() {\n' +
		'gl_FragColor = v_Color;\n' +
		'}\n';
	
	//initialize shaders
	if(!initShaders(this.gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE)){
		console.log('Failed to initialize shaders.');
		return;
	}
	//end of shader code-------------------------------------------------------------------	
	
	//Specify the color for clearing the canvas
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	//gl.clear(gl.COLOR_BUFFER_BIT);
	
	//get the locations of the attribute variables
	this.a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
	if (this.a_Position<0){
		console.log('Failed to get location of a_Position');
		return -1;
	}
	
	this.a_Color = this.gl.getAttribLocation(this.gl.program, 'a_Color');
	if (this.a_Color<0){
		console.log('Failed to get location of a_Color');
		return -1;
	}

	//get the locations of the uniform variables
	this.u_ProjMatrix = this.gl.getUniformLocation(this.gl.program, "u_ProjMatrix");
	if(this.u_ProjMatrix<0){
		console.log('Failed to get location of u_ProjMatrix');
		return;
	}

	this.u_ViewMatrix = this.gl.getUniformLocation(this.gl.program, "u_ViewMatrix");
	if(this.u_ViewMatrix<0){
		console.log('Failed to get location of u_ViewMatrix');
		return;
	}

	this.u_ModelMatrix = this.gl.getUniformLocation(this.gl.program, "u_ModelMatrix");
	if(this.u_ModelMatrix<0){
		console.log('Failed to get location of u_ModelMatrix');
		return;
	}

	this.modelMatrix = new Matrix4();
	this.viewMatrix = new Matrix4();
	this.projMatrix = new Matrix4();

	this.modelMatrix.setIdentity();
	this.viewMatrix.setLookAt(0, 15000, 0, 0, 0, 0, 0, 0, -1);
	this.projMatrix.setPerspective(45, canvas.width/canvas.height, 1, 20000);
	this.gl.viewport(0, 0, canvas.width, canvas.height);
	console.log(this.projMatrix);

	this.gl.uniformMatrix4fv(this.u_ModelMatrix, false, this.modelMatrix.elements);
	this.gl.uniformMatrix4fv(this.u_ViewMatrix, false, this.viewMatrix.elements);
	this.gl.uniformMatrix4fv(this.u_ProjMatrix, false, this.projMatrix.elements);

	//create the graphics memory manager object
	this.memory = new GPUMemManager(this.gl);

}	
	


//------------------------------------------------------------------------------------
//This set of functions is the meat an potatoes of the renderer.  It  searches through
//the data structures of the given state and recursively decides how to render each item.

Renderer.prototype.render = function(state){

	//first all dirty objects have to be updated
	for (var i = 0; i<state.dirtyList.length; i++){
		var verticesColors = new Float32Array([
			state.dirtyList[i].x, state.dirtyList[i].y, state.dirtyList[i].z,
			state.dirtyList[i].color.r, state.dirtyList[i].color.g, state.dirtyList[i].color.b, 
			state.dirtyList[i].color.a]);
			console.log(verticesColors);
		this.memory.update(this.gl, state.dirtyList[i], verticesColors);
		}

	//then clear the dirtyList.  There is a lot of online debate about the proper way
	//to clear an array in javascript.  beware of this if there are bugs.
	state.dirtyList.length = 0;

	this.gl.clear(this.gl.COLOR_BUFFER_BIT);

	//then all items in the render hierachy must be rendered
	this.renderThing(state);
};



Renderer.prototype.renderThing = function(thingToRender){
	//First I test the type of thing that is going to be rendered.
	//If the thing has a renderlist it sends each thing back to this function.
	
	
	

	if (thingToRender.hasRenderList){
		for (var i=0; i<thingToRender.renderList.length; i++){
			this.renderThing(thingToRender.renderList[i]);
		}
	} else {
		switch(thingToRender.type){
			case "Plane":
				this.renderPlane(thingToRender);
				break;

			case "Line":
				this.renderLine(thingToRender);
				break;

			case "Point":
				this.renderPoint(thingToRender);
				break;
		}
	}
};

Renderer.prototype.renderPlane = function(plane){
	
};

Renderer.prototype.renderLine = function(line){
	
};

Renderer.prototype.renderPoint = function(point){

//using the point's memory index (graphics memory address), the actual memory
//location in the buffer is stored in "memoryLocation"
var memoryLocation = this.memory.blockList[point.graphicsMemoryAddress].location;

	//draw the point
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.memory.graphicsBuffer);
	this.gl.vertexAttribPointer(this.a_Position, 3, this.gl.FLOAT, false, 28, memoryLocation);
	this.gl.enableVertexAttribArray(this.a_Position);
	this.gl.vertexAttribPointer(this.a_Color, 4, this.gl.FLOAT, false, 28, memoryLocation+12);
	this.gl.enableVertexAttribArray(this.a_Color);
	
	this.gl.drawArrays(this.gl.POINTS, 0, 1);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	
};

Renderer.prototype.resizeCanvas = function(canvas){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.projMatrix.setPerspective(60, canvas.width/canvas.height, 1, 20000);
		this.gl.uniformMatrix4fv(this.u_ProjMatrix, false, this.projMatrix.elements);
};



//end of meat and potatoes--------------------------------------------------------------	







