//ModelState.js

function ModelState(){
	this.type = "State";
	this.hasRenderList = true;
	this.IdGen = new IdGenerator();
	//an id of 0 inticates the root model object
	this.id = 0;  


	//the dirtyList and the renderList is the handshake between the "model" 
	//and the "view". The model and the renderer both have access to it.   
	//Whatever you place in the dirtyList will be re-presented to the GPU because it 
	//is new or it has changed...or it needs to be deleted.
	//whatever is in the renderList will be renderered.
	this.dirtyList = [];
	this.renderList = [];
	
	//initialize the event handler.  This may move to the upper-most file
	this.eventHandler = new EventHandler();

	//initialize the scene.
	this.scene = new LabScene(this.idGen.getId(), 
								this.id, 
								this.dirtyListCallback.bind(this));
	
	//initialize one portal.  Multiple portals will be supported in the final build.
	//may need a portal list
	this.portal = new Portal(this.idGen.getId(), this.id, this.dirtyListCallback.bind(this));  

	//each object that is the parent to renderable objects must have a renderList
	this.renderList.push(this.scene);
	this.renderList.push(this.portal);
	this.dirtyList.push(this.scene);
	this.dirtyList.push(this.portal);
	
}

// ModelState.prototype.draw = function(gl, renderer){
// 	this.scene.draw(gl, renderer);
// 	this.portal.draw(gl, renderer);
// }

ModelState.prototype.update = function(lastUpdate){
	this.scene.update(lastUpdate);
	this.portal.update(lastUpdate);
};

ModelState.prototype.dirtyListCallback = function(dirtyObject){
	this.dirtyList.push(dirtyObject);
	console.log(this.dirtyList);
};