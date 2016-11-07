define(function () {

	var Camera = {
		x: 0,
		y: 0,
		target: null
	};
	
	Camera.update = function () {
	
		if(this.target !== null){
			this.x -= (this.x - this.target.x) * 0.1;
			this.y -= (this.y - this.target.y) * 0.1;
			
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
		}
	
	};
	
	Camera.follow = function (obj) {
	
		if(obj !== undefined && typeof obj === 'object') this.target = obj;
		
	};
	
	Camera.unfollow = function () {
		
		this.target = null;
		
	};
	
	return Camera;
	
});