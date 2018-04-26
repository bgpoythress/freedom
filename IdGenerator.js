//IdGenerator.js
//Written by Brandon Poythress
//25APR2018
//Description: 
//This class handles all ID distribution

function IdGenerator(){
	this.nextId = 1;
}

IdGenerator.prototype.getId = function(){
	var idToReturn = this.nextId;
	this.nextID = this.nextId + 1;
	return idToReturn;
};