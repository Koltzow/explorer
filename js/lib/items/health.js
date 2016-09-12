var Health = {};

Horizon.items = Horizon.items || {};
Horizon.items.health = Health;

Health.create = function(params) {
	
	params = params || {};
	
	var item = {};
	
	item.x = params.x || 0;
	item.y = params.y || 0;
	item.label = 'health';
	item.active = true;
	item.width = params.width || 32;
	item.height = params.height || 32;
	item.boost = params.boost || 10;
	item.tilesheet = new Image();
	item.tilesheet.src = 'images/tilesheets/items/health.png';
	item.animations = {
		closed: {
			x: 0,
			y: 0,
			f: 1,
			s: 1
		},
		open: {
			x: 0,
			y: 1,
			f: 1,
			s: 1
		}
	};
	item.currentAnimation = item.animations.closed;
	item.currentAnimationFrame = 0;
	
	item.update = function () {
		
		this.currentAnimationFrame += 1/this.currentAnimation.s;
		
		if(this.currentAnimationFrame >= this.currentAnimation.f){
			this.currentAnimationFrame = 0;
		}
		
	};
	   
	item.render = function(){
	      
		//context.drawImage(this.tilesheet, this.x + wW/2, this.y + wH/2, item.width*2, this.height*2);
		
		Engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + Engine.width/2 - this.width/2 - Camera.x), Math.round(this.y + Engine.height/2 - this.height/2 - Camera.y), this.width, this.height);
	};
	
	item.activate = function (obj) {
		
		if(obj.health !== undefined && this.active){
		
			Sound.play('health');
		
			this.active = false;
			this.currentAnimation = this.animations.open;
			obj.health += this.boost;
			obj.health = (obj.health > obj.maxHealth)?obj.maxHealth:obj.health;
		}
		
		delete this;
		
	};
	
	return item;
	
};