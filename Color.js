//Color.js
//Written by Brandon Poythress
//14MAY2018
//Description: 
//This class and global functions manage color in the program.

//Color class
function Color(rIn,gIn,bIn,aIn){
	this.type = "Color";
	this.r = rIn;
	this.g = gIn;
	this.b = bIn;
	this.a = aIn;
}

//Basic colors are listed below. RGBA format 
var RED = new Color(1.0, 0.0, 0.0, 1.0);
var GREEN = new Color(0.0, 1.0, 0.0, 1.0);
var BLUE = new Color(0.0, 0.0, 1.0, 1.0);
var BLACK = new Color(0.0, 0.0, 0.0, 1.0);
var WHITE = new Color(1.0, 1.0, 1.0, 1.0);