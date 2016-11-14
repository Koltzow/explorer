define(function () {

	var Camera = {
		_x: 0,
		_y: 0,
		x: 0,
		y: 0,
		target: null,
		focusTarget: null,
		focusDelay:30
	};
	
	Camera.update = function () {
	
		if(this.focusTarget !== null){
			this._x -= (this._x - this.focusTarget.x) * 0.1;
			this._y -= (this._y - this.focusTarget.y) * 0.1;
			
			this.x = Math.round(this._x);
			this.y = Math.round(this._y);
						
			if(Math.round(this._x) === this.focusTarget.x && Math.round(this._y) === this.focusTarget.y) {
			
				if(this.focusDelay > 0) {
					this.focusDelay--; 
					return;
				}
					
				this.focusTarget = null;
				
			}
			
			return;
		}
	
		if(this.target !== null){
			this._x -= (this._x - this.target.x) * 0.1;
			this._y -= (this._y - this.target.y) * 0.1;
			
			this.x = Math.round(this._x);
			this.y = Math.round(this._y);
		}
	
	};
	
	Camera.follow = function (obj) {
	
		if(obj !== undefined && typeof obj === 'object') this.target = obj;
		
	};
	
	Camera.unfollow = function () {
		
		this.target = null;
		
	};
	
	Camera.setPosition = function (x, y) {
	
		this._x = x;
		this._y = y;
		this.target = null;
		this.focus = null;
	
	};
	
	Camera.focus = function (obj, delay) {
	
		if(obj !== undefined && typeof obj === 'object') {
			this.focusTarget = obj;
		}
		
		if(delay !== undefined && typeof delay === 'number' && delay > -1) {
			this.focusDelay = delay*30;
		}
	
	};
	
	return Camera;
	
});