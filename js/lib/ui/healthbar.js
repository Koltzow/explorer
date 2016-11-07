define(function () {

	var HealthBar = {
		percent: 1,
		target: 1,
		x: 20,
		y: 315,
		icon: new Image()
	};
	
	HealthBar.icon.src = 'images/tilesheets/ui/ui.png';
	
	HealthBar.update = function () {
	
		this.percent += (this.target - this.percent) * 0.1;
		
	};
	
	HealthBar.render = function () {
	
		EXP.engine.ctx.drawImage(this.icon, 0, 0, 24, 24, this.x, this.y, 24, 24);
		
		EXP.engine.ctx.fillStyle = '#000';
		EXP.engine.ctx.fillRect(this.x+24+9, this.y + 8, 102, 8);
		
		EXP.engine.ctx.fillStyle = '#444';
		EXP.engine.ctx.fillRect(this.x+24+10, this.y + 9, 100, 6);
			
		EXP.engine.ctx.fillStyle = '#74e494';
		EXP.engine.ctx.fillRect(this.x + 24 + 10, this.y + 9, this.percent * 100, 6);
	
	};
	
	return HealthBar;

});