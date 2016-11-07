define(function () {

	var Portal = {};
	
	Portal.create = function(params) {
		
		params = params || {};
		
		var portal = {};
		
		portal.x = params.x || 0;
		portal.y = params.y || 0;
		portal.label = 'portal';
		portal.active = true;
		portal.width = 32;
		portal.height = 64;
		portal.collider = {
			width: 32,
			height: 32,
			top: 32,
			left: 0
		};
		portal.tilesheet = new Image();
		portal.tilesheet.src = 'images/tilesheets/items/portal.png';
		portal.animations = {
			active: {
				x: 0,
				y: 0,
				f: 3,
				s: 4
			}
		};
		portal.currentAnimation = portal.animations.active;
		portal.currentAnimationFrame = 0;
		
		portal.update = function () {
			
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
			
		};
		   
		portal.render = function(){
		      		
			EXP.engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + EXP.engine.width/2 - this.width/2 - EXP.camera.x), Math.round(this.y + EXP.engine.height/2 - this.width/2 - EXP.camera.y), this.width, this.height);
			
			if(EXP.debug.showCollider){
			
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x + this.collider.left + EXP.engine.width/2 - this.width/2 - EXP.camera.x),
					Math.round(this.y + this.collider.top + EXP.engine.height/2 - this.width/2 - EXP.camera.y),
					this.collider.width,
					this.collider.height
				);
			}
		};
		
		portal.activate = function (obj) {
			
			if(this.active){
			
				EXP.sound.play('portal');
				
				for (var i = 0; i < 5; i++) {
									
					setTimeout(function () {
										
						EXP.effects.exp.add(obj.x, obj.y-16, '-');
					
					}, i*100)
					
				}
			
				this.active = false;
				var self = this;
				self = undefined;
				EXP.planet.create();
			}
					
		};
		
		return portal;
		
	};
	
	return Portal;
	
});