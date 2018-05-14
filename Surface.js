//Surface.js
//Written by Brandon Poythress
//14MAY2018
//Description: 
//Surface class



//Surface class----------------------
function Surface(idIn, parentIdIn, parentDirtyListCallbackIn, colorIn){
	//Surface inherits properties from ModelObject but not methods
	ModelObject.call(this, "Surface", idIn, parentIdIn, false, parentDirtyListCallbackIn);

	//Surface is a drawable object
	DrawableObject.call(this, colorIn);
	
	this.triangles = [];

}

Surface.prototype = Object.create(DrawableObject.prototype);
Surface.prototype.constructor = Surface;