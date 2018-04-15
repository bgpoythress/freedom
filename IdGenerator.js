//IdGenerator.js

function IdGenerator(){
	this.nextId = 1;
}

IdGenerator.prototype.getId = function{
	var idToReturn = this.nextId;
	this.nextID = this.nextId + 1;
	return idToReturn;
}