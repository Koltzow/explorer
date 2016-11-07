define(function () {

	var ShieldBar = {
		percent: 1,
		target: 1,
		x: 20,
		y: 315-24,
		icon: new Image()
	};
		
	ShieldBar.icon.src = 'images/tilesheets/ui/ui.png';
	
	ShieldBar.update = function () {
	
		this.percent += (this.target - this.percent) * 0.1;
		
	};
	
	ShieldBar.render = function () {
	
		EXP.engine.ctx.drawImage(this.icon, 0, 24, 24, 24, this.x, this.y, 24, 24);
		
		EXP.engine.ctx.fillStyle = '#000';
		EXP.engine.ctx.fillRect(this.x+24+9, this.y + 8, 102, 8);
		
		EXP.engine.ctx.fillStyle = '#444';
		EXP.engine.ctx.fillRect(this.x+24+10, this.y + 9, 100, 6);
			
		EXP.engine.ctx.fillStyle = '#ffe461';
		EXP.engine.ctx.fillRect(this.x + 24 + 10, this.y + 9, this.percent * 100, 6);
	
	};
	
	return ShieldBar;
	
});