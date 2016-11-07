define(function () {

	var Player = {};
	
	Player.create = function(params) {
	
		params = params || {};
	
		var char = {};
		
		char.controllable = params.controllable || false;
		char.id = 'player';
		char.x = params.x || 0;
		char.y = params.y || 0;
		char.z = params.z || 0;
		char.vz = 0;
		char.shield = 100;
		char.maxShield = 100;
		char.health = 50;
		char.maxHealth = 100;
		char.speed = 5;
		char.width = params.width || 32;
		char.height = params.height || 32;
		char.collider = {
			width: 18,
			height: 7,
			left: 7,
			top: 25
		};
		char.dir = {x:0, y:0};
		char.history = [];
		char.maxHistory = 20;
		char.step = false;
		char.walking = false;
		char.jumping = false;
		char.footsteps = new Image();
		char.footsteps.src = 'images/tilesheets/characters/footsteps.png';
		char.shadow = new Image();
		char.shadow.src = 'images/tilesheets/characters/shadow.png';
		char.tilesheet = new Image();
		char.tilesheet.src = 'images/tilesheets/characters/player.png';
		char.animations = {
			idle: {
				right:		{ x:0, y:0, f:1, s:1 },
				down:		{ x:1, y:0, f:1, s:1 },
				left:		{ x:2, y:0, f:1, s:1 },
				up:			{ x:3, y:0, f:1, s:1 }
			},
			walking: {
				right:		{ x:0, y:1, f:4, s:2 },
				downright:	{ x:0, y:2, f:4, s:2 },
				down:		{ x:0, y:3, f:4, s:2 },
				downleft:	{ x:0, y:4, f:4, s:2 },
				left:		{ x:0, y:5, f:4, s:2 },
				upleft:		{ x:0, y:6, f:4, s:2 },
				up:			{ x:0, y:7, f:4, s:2 },
				upright:	{ x:0, y:8, f:4, s:2 }
			},
			flying: {
				right:		{ x:0, y:9, f:4, s:2 }
			}
		};
		char.currentAnimation = char.animations.idle.down;
		char.currentAnimationFrame = 0;
		
		char.update = function () {
				
			if(this.controllable){
			
				var x = this.x;
				var y = this.y;
			
				//set starting position
				var dir = EXP.controller.dir;
				var altSpeed = false;
				
				if(dir.x !== 0 || dir.y !== 0){
					
					if(!this.walking && Math.round(this.z) === 0) EXP.sound.play('footsteps', {loop: -1});
					this.walking = true;
					
					//walking
					if(dir.x > 0 && dir.y == 0){ this.currentAnimation = this.animations.walking.right; } else 
					if(dir.x > 0 && dir.y > 0) { 
						this.currentAnimation = this.animations.walking.downright; 
						altSpeed = 3;
					} else
					if(dir.x == 0 && dir.y > 0){ this.currentAnimation = this.animations.walking.down; } else
					if(dir.x < 0 && dir.y > 0) { 
						this.currentAnimation = this.animations.walking.downleft;
						altSpeed = 3;
					} else
					if(dir.x < 0 && dir.y == 0){ this.currentAnimation = this.animations.walking.left; } else
					if(dir.x < 0 && dir.y < 0) { 
						this.currentAnimation = this.animations.walking.upleft;
						altSpeed = 3;	
					} else
					if(dir.x == 0 && dir.y < 0){ this.currentAnimation = this.animations.walking.up; } else 
					if(dir.x > 0 && dir.y < 0) { 
						this.currentAnimation = this.animations.walking.upright;
						altSpeed = 3;
					}
					
					this.dir.x = dir.x;
					this.dir.y = dir.y;
					
					this.x += this.dir.x * (altSpeed || this.speed);
					this.y += this.dir.y * (altSpeed || this.speed);
										
				} else {
				
					EXP.sound.stop('footsteps');
					this.walking = false;
								
					//standing
					if(this.dir.y > 0){ this.currentAnimation = this.animations.idle.down } else 
					if(this.dir.y < 0){	this.currentAnimation = this.animations.idle.up } else 
					if(this.dir.x > 0){ this.currentAnimation = this.animations.idle.right } else {
						this.currentAnimation = this.animations.idle.left;
					}
					
				}			
				
				
			}
					
			if(EXP.controller.keyboard.isPressed('Space') || (EXP.controller.gamepad.connected && EXP.controller.gamepad.buttons.length > 0 && EXP.controller.gamepad.buttons[0].pressed)){ 
			
				if(EXP.ui.jetfuelbar.target > 0){
				
					if(!this.flying){
						EXP.sound.play('jpstart');
						EXP.sound.play('jpboost', {loop: -1});
						
						EXP.sound.stop('footsteps');
						this.walking = false;
					}
				
					this.vz -= 1.5;
					this.flying = true;
					EXP.ui.jetfuelbar.target -= 0.005;
					EXP.effects.smoke.add(this.x, this.y-this.z+10);
				} else {
					EXP.sound.stop('jpboost');
					EXP.sound.stop('jpstart');
					
					if(this.flying) {
						EXP.sound.play('jpland');
						
						//standing
						if(this.dir.y > 0){ this.currentAnimation = this.animations.idle.down } else 
						if(this.dir.y < 0){	this.currentAnimation = this.animations.idle.up } else 
						if(this.dir.x > 0){ this.currentAnimation = this.animations.idle.right } else {
							this.currentAnimation = this.animations.idle.left;
						}
						
					}
					
					this.flying = false;
					
				}
			} else {
				EXP.sound.stop('jpboost');
				EXP.sound.stop('jpstart');
				
				if(this.flying){
					EXP.sound.play('jpland');
					
					//standing
					if(this.dir.y > 0){ this.currentAnimation = this.animations.idle.down } else 
					if(this.dir.y < 0){	this.currentAnimation = this.animations.idle.up } else 
					if(this.dir.x > 0){ this.currentAnimation = this.animations.idle.right } else {
						this.currentAnimation = this.animations.idle.left;
					}
				}
				
				this.flying = false;
			}
			
			
			//gravity
			this.vz += 1;
			
			this.z -= this.vz;
			
			if(this.z < 0){
				this.flying = false;
				this.z = 0;
				this.vz = 0;
			} else if (this.z > 100) {
				this.z = 100;
				this.vz = 0;
			}
			
			if(this.flying){
				this.walking = false;
				this.currentAnimation = this.animations.flying.right;
			}
			
			this.currentAnimationFrame += 1/this.currentAnimation.s;
			
			if(this.currentAnimationFrame >= this.currentAnimation.f){
				this.currentAnimationFrame = 0;
			}
			
			var colliding = false;
			
			for (var i = 0; i < EXP.engine.bodies.length; i++) {
				if(EXP.engine.bodies[i] === this) { continue; }
				//check collition
				if(EXP.physics.collision.test(this, EXP.engine.bodies[i]) && this.z < 32){
					if(EXP.engine.bodies[i].activate !== undefined) { EXP.engine.bodies[i].activate(this); }
					
					colliding = true;
				}
			}
			
			if(colliding){
				this.x = x;
				this.y = y;
			}
			
			var x = this.x;
			var y = this.y;
					
			if(this.history[0] !== ''+x+':'+y+'' && this.walking){
				this.history.unshift(x+':'+y);
				if(this.maxHistory < this.history.length ){
					this.history.pop();
				}
			}
			
			EXP.ui.healthbar.target = this.health / this.maxHealth;
			EXP.ui.shieldbar.target = this.shield / this.maxShield;
			
		};
		
		char.render = function () {
		
			for (var i = 1; i < this.history.length; i++) {
				
				var coord = this.history[i].split(':');
				var x = Math.round(parseFloat(coord[0]));
				var y = Math.round(parseFloat(coord[1]));
							
				EXP.engine.ctx.drawImage(this.footsteps, (i+this.step)*32, 0, 32, 32, x + EXP.engine.width/2 - 32/2 - EXP.camera.x, y + EXP.engine.height/2 - 32/2 - EXP.camera.y, this.width, this.height);
				
			}
			
			if(this.walking){
				this.step = !this.step;
			}
			
			EXP.engine.ctx.drawImage(this.shadow, 0, 0, 32, 5, Math.round(this.x + EXP.engine.width/2 - this.width/2 - EXP.camera.x), Math.round(this.y+29 + EXP.engine.height/2 - this.height/2 - EXP.camera.y), 32, 5);	
			
		
			EXP.engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + EXP.engine.width/2 - this.width/2 - EXP.camera.x), Math.round(this.y - this.z + EXP.engine.height/2 - this.height/2 - EXP.camera.y), this.width, this.height);
			
			if(EXP.debug.showCollider){
				EXP.engine.ctx.fillStyle = 'rgba(0,255,0,0.5)';
				EXP.engine.ctx.fillRect(
					Math.round(this.x + this.collider.left + EXP.engine.width/2 - this.width/2 - EXP.camera.x),
					Math.round(this.y + this.collider.top - this.z + EXP.engine.height/2 - this.height/2 - EXP.camera.y),
					this.collider.width,
					this.collider.height
				);
			}
		
		};
	
		
		return char;
		
	};
	
	return Player;
	
});