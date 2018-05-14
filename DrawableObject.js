//DrawableObject.js
//Written by Brandon Poythress
//01MAY2018

function DrawableObject(colorIn){
	this.graphicsMemoryAddress = null;
	this.killMe = false;

	this.color = new Color(colorIn.r, colorIn.g, colorIn.b, colorIn.a);
}

//setter to change the color
DrawableObject.prototype.setColorByObject = function(colorIn){
	this.color.r = colorIn.r;
	this.color.g = colorIn.g;
	this.color.b = colorIn.b;
	this.color.a = colorIn.a;	
};