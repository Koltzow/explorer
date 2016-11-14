define(function () {

	var Debug = {
	    
	    colliders: false
	
	};
	
	Debug.showColliders = function () {
		this.colliders = true;
	};
	
	Debug.hideColliders = function () {
		this.colliders = false;
	};
		
	return Debug;
    
});