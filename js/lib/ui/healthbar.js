define(function () {

	var HealthBar = {
		percent: 1,
		target: 1,
		x: 20,
		y: 24+16*2,
		icon: new Image()
	};
	
	HealthBar.icon.src = 'images/tilesheets/ui/ui.png';
	
	HealthBar.update = function () {
	
		this.percent += (this.target - this.percent) * 0.1;
		
	};
	
	HealthBar.render = function () {
	
		EXP.engine.ctx.drawImage(this.icon, 0, 0, 24, 24, this.x, this.y, 24, 24);
		
		EXP.engine.ctx.fillStyle = 'rgba(0,0,0,0.5)';
		EXP.engine.ctx.fillRect(this.x+20, this.y + 4, 103, 16);
		
		EXP.engine.ctx.fillStyle = 'rgba(255,255,255,0.3)';
		EXP.engine.ctx.fillRect(this.x+20, this.y + 8, 100, 8);
			
		EXP.engine.ctx.fillStyle = '#29fcb5';
		EXP.engine.ctx.fillRect(this.x + 20, this.y + 8, Math.round(this.percent * 100), 8);
	
	};
	
	return HealthBar;

});