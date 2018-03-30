var method = BlockChain.prototype;

function BlockChain(difficulty) {
	this.blocks = [];
	this.difficulty = difficulty;
}

method.add = function(block) {
	this.blocks.push(block);
}

method.get = function(i) {
	return this.blocks[i];
}

method.getDifficulty = function() {
	return this.difficulty;
}

method.size = function() {
	return this.blocks.length;
}

method.getLast = function() {
	return this.blocks.length > 0 ? this.blocks[this.blocks.length - 1] : null;
}

method.checkDataIntegrity = function() {
	var curBlock,prevBlock,currentTarget;
	var difficultyTarget = Array(this.difficulty).join("0");
	
	for(var i = 1; i < this.blocks.length; i++) {
		curBlock = this.blocks[i];
		prevBlock = this.blocks[i-1];
		currentTarget = curBlock.getHash();
		if(currentTarget.indexOf(difficultyTarget) < 0) {
			System.out.println("Block " + i + " is not mined yet");
			return false;
		}
		if(curBlock.getHash() != curBlock.computeHash()) {
			console.log("BLock " + i + " has been altered.");
			return false;
		}
		if(curBlock.getPreviousHash() != prevBlock.getHash()) {
			console.log("Previous hash does not match block " + i);
			return false;
		}		
	}
	console.log("blockchain is valid!");
	return true;
}


module.exports = BlockChain;