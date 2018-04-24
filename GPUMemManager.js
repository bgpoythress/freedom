//GPUMemManager.js
//Written by Brandon Poythress 4/17/18
//There needs to be a lot of thought put into this memory manager.  right now it
//is good enough for development.  once the program is working pretty well more 
//attention should be given to this because the performance effects are significant.

function GPUMemManager(gl){
	//set the current buffer size in bytes
	this.INITIAL_BUFFER_SIZE = 1024;
	this.BUFFER_GROW_SIZE = 1024;

	//the first block of memory takes up the entire buffer and is empty
	//starting at address 0.
	initialBlock = new MemoryBlock(0, this.INITIAL_BUFFER_SIZE);
	initialBlock.isAvailable = true;

	//list of all memory blocks
	this.blockList = [];

	//add the big empty block to the blockList
	this.blockList.push(initialBlock);

	//create an empty buffer
	this.graphicsBuffer = gl.createBuffer();
	if(!this.graphicsBuffer){
		console.log('Failed to create buffer object');
		return -1;
	}

	//Bind the buffer object to the target
	gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);

	//Expand the buffer to its inital size in bytes
	gl.bufferData(gl.ARRAY_BUFFER, this.INITIAL_BUFFER_SIZE, gl.DYNAMIC_DRAW);

	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

GPUMemManager.prototype.allocate = function(gl, vertexArray){
	//determine the size of the vertexArray in bytes
	var vertArraySize = vertexArray.length * vertexArray.BYTES_PER_ELEMENT;
	
	//set the index of the new memory to an error value.
	//this will only be corrected if memory is successfully allocated
	var indexOfNewMemory = -1;

	//find a empty block of memory
	for (var i=0; i<this.blockList.length; i++){
		if (this.blockList[i].isAvailable && this.blockList[i].size>=vertArraySize){

			//store the original size of the available block
			var sizeOfOldBlock = this.blockList[i].size;
			
			//if the required amount of memory is less than what is available
			//in the block, then break up the block into two
			if(this.blockList[i].size != vertArraySize){
				
				//use the current unused block as the new block
				this.blockList[i].size = vertArraySize;
				this.blockList[i].isAvailable = false;

				//calculate the new location and size of the empty block
				freeLocation = this.blockList[i].location + vertArraySize;
				freeSize = sizeOfOldBlock - vertArraySize;

				//create the empty block
				freeBlock = new MemoryBlock(freeLocation, freeSize);
				freeBlock.isAvailable = true;

				//Push the empty block to the end of the stack
				this.blockList.push(freeBlock);

			} else{

				//if the new and old block are the same size, creation of new
				//memory blocks is not necessary
				this.blockList[i].isAvailable = false;
			}

			//each drawable object will use index number instead of address
			//to access it's memory block so they do not have to iterate through
			//the blockList to find it
			indexOfNewMemory = i; 

			//allocate the memory in the GPU
			gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, this.blockList[i].location, vertexArray);
			gl.bindBuffer(gl.ARRAY_BUFFER, null);

			//once memory has been allocated we can break out of the for loop
			break;


		} else if(i == this.blockList.length - 1) {
			//if you dont break out of the foor loop before getting here, it means
			//that there was not a block of memory available
			console.log("Out of memory in the GPUMemoryManager.  Need to expand memory");
		}
	}

	return indexOfNewMemory; //if a negative number is returned there is a problem
};


GPUMemManager.prototype.update = function(gl, object, vertexArray){

	//first we must figure out is memory is already allocated or the object is new
	if(object.graphicsMemoryAddress){
		//because the object already has a memory address/index, i am going to release it.
		//each time I modify the vertices an existing object, I free its memory and rebuffer it.
		//this helps with memory fragmentation.
		this.blockList[object.graphicsMemoryAddress].isAvailable = true;
		object.graphicsMemoryAddress = null;
	}else{
		
	}

	//then we figure out if the object is requesting deletion.  If so we just return without
	//allocating any more.
	if(object.killMe){
		return;
	} else {
		object.graphicsMemoryAddress = this.allocate(gl, vertexArray);
	}

	if(debugging){
		console.log("Memory Information:");
		for (var i=0; i<this.blockList.length; i++){
			console.log("MemoryBlock Index:");
			console.log(i);
			console.log("MemoryBlock Size:");
			console.log(this.blockList[i].size);
			console.log("MemoryBlock Location:");
			console.log(this.blockList[i].location);
			console.log("-----------------------------");
		}
	}

};


function MemoryBlock(locationIn, sizeIn){
	//is the memory block used or available.  Default is used.
	this.isAvailable = false;

	//location pointer of the memory block
	this.location = locationIn;

	//size of the memory block in bytes
	this.size = sizeIn;

}