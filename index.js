var Blockchain = require("./blockchain.js");
var Block = require("./block.js");

var i;
var difficulty = 7;  // number of zeroes in the hash key
var blockchain = new Blockchain(difficulty);
var currentBlock, prevBlock, genesisBlock;

genesisBlock = new Block("Hello Blockchain");

for(i = 0; i <= 5; i++) {
    currentBlock = (i == 0) ? genesisBlock : new Block("This is the block #" + i, prevBlock.getHash());
    console.log("Mining block #" + i);  
    currentBlock.mineBlock(difficulty); // mining block with the required difficulty
    blockchain.add(currentBlock);    // add mined block into the blockchain
    prevBlock = currentBlock;
}

blockchain.checkDataIntegrity(); // check integrity

for(i = 0 ; i < blockchain.size(); i++) {
    currentBlock = blockchain.get(i);
    console.log("Block #" + i + " data: " + currentBlock.getData());
}