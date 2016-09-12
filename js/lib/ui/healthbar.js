var HealthBar = {
	percent: 1,
	target: 1,
	x: 20,
	y: 315,
	icon: new Image()
};

Horizon.ui = Horizon.ui || {};
Horizon.ui.healthbar = HealthBar;

HealthBar.icon.src = 'images/tilesheets/ui/ui.png';

HealthBar.update = function () {

	this.percent += (this.target - this.percent) * 0.1;
	
};

HealthBar.render = function () {

	Engine.ctx.drawImage(this.icon, 0, 0, 24, 24, this.x, this.y, 24, 24);
	
	Engine.ctx.fillStyle = '#000';
	Engine.ctx.fillRect(this.x+24+9, this.y + 8, 102, 8);
	
	Engine.ctx.fillStyle = '#444';
	Engine.ctx.fillRect(this.x+24+10, this.y + 9, 100, 6);
		
	Engine.ctx.fillStyle = '#74e494';
	Engine.ctx.fillRect(this.x + 24 + 10, this.y + 9, this.percent * 100, 6);

};