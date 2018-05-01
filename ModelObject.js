//ModelObject.js
//Written by Brandon Poythress
//30APR2018
//Description: 
//This object contains some basic functionality for all model objects
//in terms of Model-View-Controller organization.

function ModelObject(typeIn, idIn, parentIdIn,
					usesRenderListIn, parentDirtyListCallbackIn){
	this.type = typeIn;
	this.id = idIn;
	this.parent = parentIdIn;
	this.usesRenderList = usesRenderListIn;
	this.passDirtyToParent = parentDirtyListCallbackIn;
	this.idGen = new IdGenerator();
	this.renderList = [];
}

ModelObject.prototype.dirtyListCallback = function(dirtyObject){
	this.passDirtyToParent(dirtyObject);
};