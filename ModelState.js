//ModelState.js

function ModelState(){
	this.type = "State";
	this.hasRenderList = true
	
	//initialize the event handler.  This may move to the upper-most file
	this.eventHandler = new EventHandler();

	//initialize the scene.
	this.scene = new LabScene();
	
	//initialize one portal.  Multiple portals will be supported in the final build.
	//may need a portal list
	this.portal = new Portal();  

	//each object that is the parent to renderable objects must have a renderList
	this.renderList = [];
	this.renderList.push(this.scene);
	this.renderList.push(this.portal);
}

// ModelState.prototype.draw = function(gl, renderer){
// 	this.scene.draw(gl, renderer);
// 	this.portal.draw(gl, renderer);
// }

ModelState.prototype.update = function(lastUpdate){
	this.scene.update(lastUpdate);
	this.portal.update(lastUpdate);
}