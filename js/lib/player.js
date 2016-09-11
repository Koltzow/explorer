var Player = {};
var Smoke = {
	particles: [],
	l: 30,
	s: 3,
	c: ['rgba(0,0,0,0.5)']
};

Horizon.player = Player;
	
Smoke.add = function (x, y) {

	var d = Math.random()*2*Math.PI;
	var s = Math.random()*this.s;
	var l = this.l;
		
	this.particles.push({
		x  : x,
		y  : y,
		l  : l,
		r  : s,
		c  : this.c[Math.floor(Math.random() * this.c.length)]
	});
		
};
	
Smoke.update = function () {

	for (var i = 0; i < this.particles.length; i++) {
	
	    this.particles[i].l--;
	    this.particles[i].r += Math.random();
	    this.particles[i].y += 0.5;
	    this.particles[i].c = 'rgba(255, 255, 255, '+(1/this.l * this.particles[i].l)+')';
	    
	    if(this.particles[i].l < 0){
	    	this.particles.splice(i, 1);
	    }
	    
	}
	
}
	
Smoke.draw = function () {

	if(this.particles.length < 1) return false;
			
	for(var i = 0; i < this.particles.length; i++) {
		        
		Engine.ctx.fillStyle = this.particles[i].c;
		Engine.ctx.fillRect( this.particles[i].x + Engine.width/2 - Camera.x- this.particles[i].r/2, this.particles[i].y + Engine.height/2 - Camera.y - this.particles[i].r/2, this.particles[i].r, this.particles[i].r);
	        
	}
	
};

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
	char.dir = [0,1];
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
	
		this.walking = false;
	
		if(this.controllable){
		
			//set starting position
			var dir = {x:0, y:0};
			var altSpeed = false;
		
			//test buttons
			if(Keyboard.isPressed('w') || Keyboard.isPressed('ArrowUp')){ dir.y -= 1; } 
			if(Keyboard.isPressed('s') || Keyboard.isPressed('ArrowDown')){ dir.y += 1; }
			if(Keyboard.isPressed('a') || Keyboard.isPressed('ArrowLeft')){ dir.x -= 1; }
			if(Keyboard.isPressed('d') || Keyboard.isPressed('ArrowRight')){ dir.x += 1; }
			
			if(Touch.enabled){
				dir = Touch.dir;
			}
			
			if(GamePad.connected){
				dir = GamePad.dir;
			}
			
			if(dir.x !== 0 || dir.y !== 0){
			
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
				
				this.dir = dir;
				
				this.x += this.dir.x * (altSpeed || this.speed) ;
				this.y += this.dir.y * (altSpeed || this.speed);
				
			} else {
							
				//standing
				if(this.dir.y > 0){ this.currentAnimation = this.animations.idle.down } else 
				if(this.dir.y < 0){	this.currentAnimation = this.animations.idle.up } else 
				if(this.dir.x > 0){ this.currentAnimation = this.animations.idle.right } else {
					this.currentAnimation = this.animations.idle.left;
				}
				
			}
			
			
			
		}
		
		//console.log(GamePad);
		
		if(Keyboard.isPressed('Space') || (GamePad.connected && GamePad.buttons.length > 0 && GamePad.buttons[0].pressed)){ 
		
			if(JetfuelBar.target > 0){
				this.vz -= 1.5;
				this.flying = true;
				JetfuelBar.target -= 0.005;
				Smoke.add(this.x, this.y-this.z+10);
			}
		}
		
		
		//gravity
		this.vz += 1;
		
		this.z -= this.vz;
		
		if(this.z < 0){
			this.flying = false;
			this.z = 0;
			this.vz = 0;
		} else if (this.z > 80) {
			this.z = 80;
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
		
		for (var i = 0; i < Engine.bodies.length; i++) {
			if(Engine.bodies[i] === this) { continue; }
			//check collition
			if(Collision.test(this, Engine.bodies[i]) && this.z < 32){
				if(Engine.bodies[i].activate !== undefined) { Engine.bodies[i].activate(this); }
			}
		}
		
		var x = this.x;
		var y = this.y;
				
		if(this.history[0] !== ''+x+':'+y+'' && this.walking){
			this.history.unshift(x+':'+y);
			if(this.maxHistory < this.history.length ){
				this.history.pop();
			}
		}
		
		HealthBar.target = this.health / this.maxHealth;
		Shield.target = this.shield / this.maxShield;
		
		Smoke.update();
		
	
	};
	
	char.render = function () {
	
		for (var i = 1; i < this.history.length; i++) {
			
			var coord = this.history[i].split(':');
						
			Engine.ctx.drawImage(this.footsteps, (i+this.step)*32, 0, 32, 32, Math.round(parseFloat(coord[0]) + Engine.width/2 - 32/2 - Camera.x), Math.round(parseFloat(coord[1]) + Engine.height/2 - 32/2 - Camera.y), this.width, this.height);
			
		}
		
		if(this.walking){
			this.step = !this.step;
		}
		
		if(this.flying){
			Engine.ctx.drawImage(this.shadow, 0, 0, 32, 32, Math.round(this.x + Engine.width/2 - this.width/2 - Camera.x), Math.round(this.y + Engine.height/2 - this.height/2 - Camera.y), 32, 32);	
		}
		
		Smoke.draw();
	
		Engine.ctx.drawImage(this.tilesheet, (this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width, this.currentAnimation.y*this.height, this.width, this.height, Math.round(this.x + Engine.width/2 - this.width/2 - Camera.x), Math.round(this.y - this.z + Engine.height/2 - this.height/2 - Camera.y), this.width, this.height);
	
	};

	
	return char;
	
};

