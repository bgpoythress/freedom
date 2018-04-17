//Renderer.js


function Renderer(gl){

	//shader code-------------------------------------------------------------------
	//vertex shader program
	this.VSHADER_SOURCE = 
		'attribute vec4 a_Position;\n' +
		'attribute vec4 a_Color;\n' +
		//'uniform mat4 u_ModelMatrix;\n'+
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
	
	//end of shader code-------------------------------------------------------------------	
	
	//initialize the renderer
	this.init(gl)
	
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
	
}	
	
//initialize the renderer	
Renderer.prototype.init = function(gl){
	
	//Initialize shaders
	if(!initShaders(gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE)){
		console.log('Failed to initialize shaders.');
		return;
	}
	
	//Specify the color for clearing the canvas
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

}

//------------------------------------------------------------------------------------
//This set of functions is the meat an potatoes of the renderer.  It  searches through
//the data structures of the given state and recursively decides how to render each item.

Renderer.prototype.render = function(gl, thingToRender){
	//First I test the type of thing that is going to be rendered.
	//If the thing has a renderlist it sends each thing back to this function.
	if (thingToRender.hasRenderList){
		var renderListLength = thingToRender.renderList.length;
		for (var i=0; i<renderListLength; i++){
			this.render(gl, thingToRender.renderList[i]);
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
}

Renderer.prototype.renderPlane = function(gl, plane){
	
}

Renderer.prototype.renderLine = function(gl, line){
	
}

Renderer.prototype.renderPoint = function(gl, point){
	
}

//end of meat and potatoes--------------------------------------------------------------	

Renderer.prototype.drawLine = function(gl, vertexColorBuffer, vertSize, colorSize, FSIZE, n){

	//Bind the buffer object to the target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	//Assign the buffer object to a_Position variable and enable it
	gl.vertexAttribPointer(this.a_Position, vertSize, gl.FLOAT, false, FSIZE*7, 0);
	gl.enableVertexAttribArray(this.a_Position);
	
	//Assign the buffer object to a_TexCoord variable and enable it
	gl.vertexAttribPointer(this.a_Color, colorSize, gl.FLOAT, false, FSIZE*7, FSIZE*3);
	gl.enableVertexAttribArray(this.a_Color);
	
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	
	gl.drawArrays(gl.LINES, 0, n);
	
}

Renderer.prototype.drawPoint = function(gl, vertexColorBuffer, vertSize, colorSize, FSIZE, n){
	//Bind the buffer object to the target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	//Assign the buffer object to a_Position variable and enable it
	gl.vertexAttribPointer(this.a_Position, vertSize, gl.FLOAT, false, FSIZE*7, 0);
	gl.enableVertexAttribArray(this.a_Position);
	
	//Assign the buffer object to a_TexCoord variable and enable it
	gl.vertexAttribPointer(this.a_Color, colorSize, gl.FLOAT, false, FSIZE*7, FSIZE*3);
	gl.enableVertexAttribArray(this.a_Color);
	
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	
	gl.drawArrays(gl.POINTS, 0, n);
}







