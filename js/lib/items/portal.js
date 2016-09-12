var Portal = {};

Horizon.items = Horizon.items || {};
Horizon.items.portal = Portal;

Portal.create = function(params) {
	
	params = params || {};
	
	var portal = {};
	
	portal.x = params.x || 0;
	portal.y = params.y || 0;
	portal.label = 'portal';
	portal.active = true;
	portal.width = 32;
	portal.height = 64;
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
	      		
		Engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + Engine.width/2 - this.width/2 - Camera.x), Math.round(this.y + Engine.height/2 - this.height*0.75 - Camera.y), this.width, this.height);
	};
	
	portal.activate = function (obj) {
		
		if(this.active){
		
			Sound.play('portal');
		
			this.active = false;
			Planet.create();
		}
				
	};
	
	return portal;
	
};