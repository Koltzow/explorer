var Seed = {};

Horizon.util = Horizon.util || {};
Horizon.util.seed = Seed;

Seed.create = function () {

	var seed = Math.random().toString(36).substring(7);	
	return seed;
	
};

String.prototype.color = function (seed) {

	
	var hash = this.getHashCode();
	var color = hash.intToHSL();
		
	return color;

};

String.prototype.randomBetween = function(min, max) {

	var hash = this.getHashCode();
	    
    min = min || 0;
    max = max || 1;
    
    var seed = (hash * 9301 + 49297) % 233280;
    var rnd = Math.abs(seed / 233280.0);
        
    return min + rnd * (max - min);
    
};