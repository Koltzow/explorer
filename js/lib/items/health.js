define(function () {

	var Health = {};
	
	Health.create = function(params) {
		
		params = params || {};
		
		var item = {};
		
		item.x = params.x || 0;
		item.y = params.y || 0;
		item.label = 'health';
		item.active = true;
		item.width = params.width || 32;
		item.height = params.height || 32;
		item.collider = {
			width: 24,
			height: 7,
			left: 4,
			top: 25
		};
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
		      			
			EXP.engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + EXP.engine.width/2 - this.width/2 - EXP.camera.x), Math.round(this.y + EXP.engine.height/2 - this.height/2 - EXP.camera.y), this.width, this.height);
			
			if(EXP.debug.showCollider){
			
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x + this.collider.left + EXP.engine.width/2 - this.width/2 - EXP.camera.x),
					Math.round(this.y + this.collider.top + EXP.engine.height/2 - this.height/2 - EXP.camera.y),
					this.collider.width,
					this.collider.height
				);
			}
		};
		
		item.activate = function (obj) {
			
			if(obj.health !== undefined && this.active){
			
				EXP.sound.play('health');
				
				for (var i = 0; i < 5; i++) {
									
					setTimeout(function () {
										
						EXP.effects.exp.add(obj.x, obj.y-16, '+');
					
					}, i*100)
					
				}
			
				this.active = false;
				this.currentAnimation = this.animations.open;
				obj.health += this.boost;
				obj.health = (obj.health > obj.maxHealth)?obj.maxHealth:obj.health;
			}
			
			delete this;
			
		};
		
		return item;
		
	};
	
	return Health;
	
});