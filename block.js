var sha256 = require("sha256");
var method = Block.prototype;

function Block(data, previousHash) {
	if(typeof previousHash === "undefined") previousHash = "genesis_block";
	this._previousHash = previousHash;
	this._data = JSON.stringify({ data: data });
	this._nonce = 0;
	this._timeStamp = new Date().getTime();	
	this._hash = this.computeHash();
    
}

method.mineBlock = function(difficulty) {
	var targetDifficulty = Array(difficulty).join("0");
	while(this._hash.indexOf(targetDifficulty) < 0) {
		this._nonce++;
		this._hash = this.computeHash();	
	}
	console.log("BLOCK MINED ==> " + this._hash);
}

method.getData = function() {
	var e = JSON.parse(this._data);
	return e.data;
}

method.getHash = function() {
	return this._hash;
}

method.getPreviousHash = function() {
	return this._previousHash;
}

method.computeHash = function() {
	return sha256(
  		  	this.previousHash 
  			+ this._data
		  	+ this._timeStamp
		  	+ this._nonce
  	);
};

module.exports = Block;