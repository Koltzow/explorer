define(function () {

	var Space = {
		starcount: 50,
		stars: []
	};
	
	Space.enter = function (coords) {
		
		if(coords !== undefined && coords.x !== undefined && coords.y !== undefined){
			//set spaceship coords
		}
		
		//create stars
		this.stars = [];
		for (var i = 0; i < this.starcount; i++) {
			var star = {
				x: Math.random() * EXP.engine.width,
				y: Math.random() * EXP.engine.height,
				z: Math.random(),
			}
			
			this.stars.push(star);
		}
		
	}
	
	Space.update = function () {
	
		//update stars
		for (var i = 0; i < this.stars.length; i++) {
			var s = this.stars[i];
			
			if(s.x < 0) s.x = EXP.engine.width;
			if(s.x > EXP.engine.width) s.x = 0;
			if(s.y < 0) s.y = EXP.engine.height;
			if(s.y > EXP.engine.height) s.y = 0;
		}
	
	};
	
	
	Space.render = function () {
	
		
		EXP.engine.ctx.fillStyle = 'rgb(20,20,50)';
		EXP.engine.ctx.fillRect(0, 0, EXP.engine.width, EXP.engine.height);
		
		//render stars
		EXP.engine.ctx.fillStyle = 'white';
		
		for (var i = 0; i < this.stars.length; i++) {
			var x = this.stars[i].x - (EXP.camera.x*this.stars[i].z - Math.floor(EXP.camera.x*this.stars[i].z/EXP.engine.width));
			var y = this.stars[i].y - (EXP.camera.y*this.stars[i].z - Math.floor(EXP.camera.y*this.stars[i].z/EXP.engine.height));
			EXP.engine.ctx.fillRect(Math.round(x), Math.round(y), 1,1);
		}
		
	};
	
	return Space;
	
});