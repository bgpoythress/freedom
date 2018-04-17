//GPUMemManager.js
//Written by Brandon Poythress 4/17/18
//There needs to be a lot of thought put into this memory manager.  right now it
//is good enough for development.  once the program is working pretty well more 
//attention should be given to this because the performance effects are significant.

function GPUMemoryManager(gl, initialSizeInBytes){
	//set the current buffer size in bytes
	this.bufferSizeInBytes = initialSizeInBytes;

	//the first block of memory takes up the entire buffer and is empty
	//starting at address 0.
	initialBlock = new MemoryBlock(0, this.bufferSizeInBytes);
	initialBlock.used = false;

	//list of all consumed memory blocks
	this.blockList = [];

	//add the big empty block to the blockList
	this.blockList.push(initialBlock);

	//create an empty buffer
	this.graphicsBuffer = gl.createBuffer();
	if(!this.vertexColorBuffer){
		console.log('Failed to create buffer object');
		return -1;
	}

	//Bind the buffer object to the target
	gl.bindBuffer(gl.ARRAY_BUFFER, this.graphicsBuffer);

	//Expand the buffer to its inital size in bytes
	gl.bufferData(gl.ARRAY_BUFFER, this.bufferSizeInBytes, gl.DYNAMIC_DRAW);

	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

GPUMemoryManager.prototype.allocate = function(vertexArray){
	//determine the size of the vertexArray in bytes
	var vertArraySize = vertexArray.length * vertexArray.BYTES_PER_ELEMENT;
	var locationOfNewMemory = -1;

	//find a empty block of memory
	for (var i=0; i<this.blockList.length; i++){
		if (!this.blockList[i].used && this.blockList[i].size>=vertArraySize){
			
			//if the required amount of memory is less than what is available
			//in the block, then break up the block into two
			if(this.blockList[i].size != vertArraySize){
				
				//create the new used block using the old location of the existing block
				usedBlock = new MemoryBlock(this.blockList[i].location, vertArraySize);
				usedBlock.used = true;

				//calculate the new location and size of the empty block
				freeLocation = this.blockList[i].location + vertArraySize;
				freeSize = this.blockList[i].size - vertArraySize;

				//create the empty block
				freeBlock = new MemoryBlock(freeLocation, freeSize);
				freeBlock.used = false;

				//replace the original block with the new used block and push
				//the empty block to the end of the stack
				this.blockList[i] = usedBlock;
				this.blockList.push(freeBlock);


			} else{

				//if the new and old block are the same size, creation of new
				//memory blocks is not necessary
				this.blockList[i].used = true;
			}

			locationOfNewMemory = this.blockList[i].location;

			//once memory has been allocated we can break out of the for loop
			break;


		} else {
			console.log("Out of memory in the GPUMemoryManager.  Need to expand memory");
		}
	}

	return locationOfNewMemory; //if a negative number is returned there is a problem
}


GPUMemoryManager.prototype.update = function(object){
	// if(object.isDirty || object.graphicsMemoryAddress == null){
		
	// 	//release the current memory block
	// 	for (var i; i<this.blockList.length; i++){

	// 	}
	//}
}



function MemoryBlock(locationIn, sizeIn){
	//is the memory block used or available.  Default is used.
	this.used = true;

	//location pointer of the memory block
	this.location = locationIn;

	//size of the memory block in bytes
	this.size = sizeIn;

}