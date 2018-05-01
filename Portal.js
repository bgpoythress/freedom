//Portal.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This class represents the portal

function Portal(idIn, parentIn, parentDirtyListCallback){
	this.type = "Portal";
	this.id = idIn;
	this.parent = parentIn;

	//assign the callback function to the scene object
	this.tellParentThatImDirty = parentDirtyListCallback;

	this.usesRenderList = true;
	this.renderList = [];
	this.dirtyList = [];
	//this.init(gl);

}

Portal.prototype.update = function(){

};

// Portal.prototype.init= function(gl){
// 	// var point1 = new Point(gl, 0.2, 0.2, 0.0, RED);
// 	// var point2 = new Point(gl, -0.3, -0.3, 0.0, GREEN);
// 	// var point3 = new Point(gl, -0.7, -0.2, 0.0, WHITE);
// 	// var line1 = new Line(gl, point1, point2, BLUE);
// 	// this.itemList.push(line1);
// 	// this.itemList.push(point1);
// 	// this.itemList.push(point2);
// 	// this.itemList.push(point3);
// }

//loop through the items in the portal and draw them
// Portal.prototype.draw = function(gl, renderer){
// 	for(var i = 0; i< this.itemList.length; i++){
// 		this.itemList[i].draw(gl, renderer);
// 	}

// }