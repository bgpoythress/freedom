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
	this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
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
		
		//use the generateArray function to produce Float32 arrays for 
		//the different kinds of primatives
		var verticesColors = this.generateArray(state.dirtyList[i]);
		console.log(verticesColors);

		//update the GPU memory with these vertices
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
			case "Surface":
				this.renderSurface(thingToRender);
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

Renderer.prototype.generateArray = function(dirtyObject){
	var verticesColors;
	var point1;
	var point2;
	var point3;
	var i;
	
	switch(dirtyObject.type){

		case "Surface":
			var trianglesLength = dirtyObject.triangles.length;
			var components = 7;
			verticesColors = new Float32Array(trianglesLength * components);
			
			for(i = 0; i<trianglesLength; i++){
				verticesColors[i*components] = dirtyObject.triangles[i].x;
				verticesColors[(i*components)+1] = dirtyObject.triangles[i].y;
				verticesColors[(i*components)+2] = dirtyObject.triangles[i].z;
				verticesColors[(i*components)+3] = dirtyObject.triangles[i].color.r;
				verticesColors[(i*components)+4] = dirtyObject.triangles[i].color.g;
				verticesColors[(i*components)+5] = dirtyObject.triangles[i].color.b;
				verticesColors[(i*components)+6] = dirtyObject.triangles[i].color.a;
			}

			return verticesColors;

		case "Line":
			point1 = dirtyObject.point1;
			point2 = dirtyObject.point2;

			verticesColors = new Float32Array([
			point1.x, point1.y, point1.z,
			point1.color.r, point1.color.g, point1.color.b, 
			point1.color.a,
			point2.x, point2.y, point2.z,
			point2.color.r, point2.color.g, point2.color.b, 
			point2.color.a]);

			return verticesColors;

		case "Point":

			verticesColors = new Float32Array([
			dirtyObject.x, dirtyObject.y, dirtyObject.z,
			dirtyObject.color.r, dirtyObject.color.g, dirtyObject.color.b, 
			dirtyObject.color.a]);

			return verticesColors;

		default:
			console.log("Renderer cannont generate an array for this object");

	}
};

Renderer.prototype.renderSurface = function(surface){
	//using the surface's memory index (graphics memory address), the actual memory
	//location in the buffer is stored in "memoryLocation"
	var numberOfVertices = surface.triangles.length;
	var memoryLocation = this.memory.blockList[surface.graphicsMemoryAddress].location;

	//draw the surface
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.memory.graphicsBuffer);
	this.gl.vertexAttribPointer(this.a_Position, 3, this.gl.FLOAT, false, 28, memoryLocation);
	this.gl.enableVertexAttribArray(this.a_Position);
	this.gl.vertexAttribPointer(this.a_Color, 4, this.gl.FLOAT, false, 28, memoryLocation+12);
	this.gl.enableVertexAttribArray(this.a_Color);
	
	this.gl.drawArrays(this.gl.TRIANGLES, 0, numberOfVertices);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
};

Renderer.prototype.renderLine = function(line){
	//using the point's memory index (graphics memory address), the actual memory
	//location in the buffer is stored in "memoryLocation"
	var memoryLocation = this.memory.blockList[line.graphicsMemoryAddress].location;

	//draw the line
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.memory.graphicsBuffer);
	this.gl.vertexAttribPointer(this.a_Position, 3, this.gl.FLOAT, false, 28, memoryLocation);
	this.gl.enableVertexAttribArray(this.a_Position);
	this.gl.vertexAttribPointer(this.a_Color, 4, this.gl.FLOAT, false, 28, memoryLocation+12);
	this.gl.enableVertexAttribArray(this.a_Color);
	
	this.gl.drawArrays(this.gl.LINES, 0, 2);

	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	//console.log(line.color);
	
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







