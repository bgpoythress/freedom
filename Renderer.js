//Renderer.js


function Renderer(gl){

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
		//'	gl_Position = a_Position;\n'+
		'	gl_PointSize = 50.0;\n'+
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
	if(!initShaders(gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE)){
		console.log('Failed to initialize shaders.');
		return;
	}
	//end of shader code-------------------------------------------------------------------	
	
	//Specify the color for clearing the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	//get the locations of the attribute variables
	this.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (this.a_Position<0){
		console.log('Failed to get location of a_Position');
		return;
	}
	
	this.a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if (this.a_Color<0){
		console.log('Failed to get location of a_Color');
		return;
	}

	//get the locations of the uniform variables
	this.u_ProjMatrix = gl.getUniformLocation(gl.program, "u_ProjMatrix");
	if(this.u_ProjMatrix<0){
		console.log('Failed to get location of u_ProjMatrix');
		return;
	}

	this.u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
	if(this.u_ViewMatrix<0){
		console.log('Failed to get location of u_ViewMatrix');
		return;
	}

	this.u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
	if(this.u_ModelMatrix<0){
		console.log('Failed to get location of u_ModelMatrix');
		return;
	}

	this.modelMatrix = new Matrix4();
	this.viewMatrix = new Matrix4();
	this.projMatrix = new Matrix4();

	modelMatrix.setIdentity();
	viewMatrix.setLookAt(0, 10000, 0, 0, 0, 0, 0, 0, -1);
	projMatrix.setPerspective(30, 1, 1, 20000);

	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	gl.uniformMatrix4fv(u_ViewMatrix, false, modelMatrix.elements);
	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

	//create the graphics memory manager object
	this.memory = new GPUMemManager(gl);

}	
	


//------------------------------------------------------------------------------------
//This set of functions is the meat an potatoes of the renderer.  It  searches through
//the data structures of the given state and recursively decides how to render each item.

Renderer.prototype.render = function(gl, state){

	//first all dirty objects have to be updated
	for (var i = 0; i<state.dirtyList.length; i++){
		var verticesColors = new Float32Array([
			dirtyList[i].x, dirtyList[i].y, dirtyList[i].z,
			dirtyList[i].r, dirtyList[i].g, dirtyList[i].b, dirtyList[i].a]);
		this.memory.update(dirtyList[i], verticesColors);
		}

	//then clear the dirtyList.  There is a lot of online debate about the proper way
	//to clear an array in javascript.  beware of this if there are bugs.
	state.dirtyList.length = 0;

	//then all items in the render hierachy must be rendered
	this.renderThing(gl, state);
};



Renderer.prototype.renderThing = function(gl, thingToRender){
	//First I test the type of thing that is going to be rendered.
	//If the thing has a renderlist it sends each thing back to this function.
	
	gl.clear(gl_COLOR_BUFFER_BIT);

	if (thingToRender.hasRenderList){
		for (var i=0; i<thingToRender.renderList.length; i++){
			this.renderThing(gl, thingToRender.renderList[i]);
		}
	} else {
		switch(thingToRender.type){
			case "Plane":
				this.renderPlane(gl, thingToRender);
				break;

			case "Line":
				this.renderLine(gl, thingToRender);
				break;

			case "Point":
				this.renderPoint(gl, thingToRender);
				break;
		}
	}
};

Renderer.prototype.renderPlane = function(gl, plane){
	
};

Renderer.prototype.renderLine = function(gl, line){
	
};

Renderer.prototype.renderPoint = function(gl, point){
	gl.bindBuffer(gl.ARRAY_BUFFER, this.memory.graphicsBuffer);
	gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, 28, 0);
	gl.enableVertexAttribArray(this.a_Position);
	gl.vertexAttribPointer(this.a_Color, 4, gl.FLOAT, false, 28, 12);
	gl.eneableVertixAttribArray(this.a_Color);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.drawArrays(gl.POINTS, 0, 1);
	
};



//end of meat and potatoes--------------------------------------------------------------	







