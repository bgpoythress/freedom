# freedom
A parametric, user friendly CAD program that feels like a game.


FILE STRUCTURE:
---

**freedom.html** - main html file.

**Freedom.js** - Runs the gameLoop and has all the top level objects and variables.  It is the connection between the model and the view.

Contains the following objects/variables:
* canvas object-the webGL drawing surface for HTML5.
* renderer object that handles all the webGL
rendering for the program.
* current state object that get assigned to whatever the current state is.  The current state can be a loading screen, a menu screen, or a model screen.  Maybe more things in the future.
* event handler object that takes all events a passes them down to the model and/or renderer to do things with.
* lastUpdate variable, currentTime variable, and delta variable that are used by the gameLoop to calculate how much time has passed since that last update to the currentState.
* debugging variable which can be turned on or off by the programmer in order to get error outputs on the console.

Contains the following functions:
* main().  No parameters, no returns.
* gameLoop().  No parameters, but is an anonymous function that uses variables defined in main().  Its job is to calculate the elapsed time since the last update, then to update the model, then to render the model, then it calles requestAnimationFrame(gameLoop) to recursively do it again.

**Renderer.js** - the Renderer class is in charge of rendering the model.  I tried to separate the renderer and the model as much as possible so the code could be ported later on.

Contains the following objects/variables:
* this.gl - the webGL context.
* this.VSHADER_SOURCE - the vertex shader
* this.FSHADER_SOURCE - the fragment shader
* this.a_Position - the location of the a_Position variable in the shader program.
* this.a_Color - the location of the a_Color variable in the shader program.
* this.u_ProjMatrix - the location of the u_ProjMatrix variable in the shader program.
* this.u_ViewMatrix - the location of the u_ViewMatrix variable in the shader program.
* this.u_ModelMatrix - the location of the u_ModelMatrix variable in the shader program.
* this.projMatrix - the projMatrix is the only matrix that is not managed by the current state and its children.  It is managed only by the renderer.
* this.memory - this is an instance of the GPUMemManager class.  All the things in the program are crammed into one buffer.  The memory object keeps track of how much memory is allocated, allocates new memory, and deletes old memory.

Contains the following methods:
* render(state) - takes a state object and returns nothing.  This function goes through and updates the memory instance with any changes the goes through the entire model hierarchy, rendering it as is goes.
* renderThing(thingToRender) -  takes any renderable object and returns nothing.  It will try to render anything that is passed to it.  This is really just a helper function to render(state)
* generateArray(dirtyObject) - takes an object that needs updating and returns nothing.  It generates the Float32Array object that will eventually be used by the this.memory object to properly manage the buffer object.
* renderLine(line) - takes a line object and returns nothing.  It is a helper function to render thing with specific drawing instructions for the line type of object.
* renderPoint(point) - takes a point object and returns nothing.  It is a helper function to render thing with specific drawing instructions for the point type of object.
* renderSurface(surface) - takes a surface object and returns nothing.  It is a helper function to render thing with specific drawing instructions for the surface type of object.
* resizeCanvas(canvas) - takes a canvas object and returns nothing.  This method updates the view if the browser window is resized.






