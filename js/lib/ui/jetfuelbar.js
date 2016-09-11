var JetfuelBar = {
	percent: 1,
	target: 1,
	cooldown: 0,
	cooldownStart: 30*5,
	x: 20,
	y: 248,
	icon: new Image()
};

Horizon.ui = Horizon.ui || {};
Horizon.ui.jetfuelbar = JetfuelBar;

JetfuelBar.icon.src = 'images/tilesheets/ui/ui.png';

JetfuelBar.update = function () {

	if(this.cooldown > 0){
		this.cooldown--;
		
		if(this.cooldown === 0){
			this.target = 1;
		}
	}
	
	this.target = (this.target < 0)?0:this.target;
	this.target = (this.target > 1)?1:this.target;
	
	if(this.target <= 0 && this.cooldown === 0){
		this.cooldown = this.cooldownStart;
	}
	
	this.percent += (this.target - this.percent) * 0.1;
	this.percent = this.target;
	
	
};

JetfuelBar.render = function () {

	Engine.ctx.drawImage(this.icon, 0, 72, 24, 24, this.x, this.y, 24, 24);
	
	Engine.ctx.fillStyle = '#000';
	Engine.ctx.fillRect(this.x+24+9, this.y + 8, 102, 8);
	
	Engine.ctx.fillStyle = '#444';
	Engine.ctx.fillRect(this.x+24+10, this.y + 9, 100, 6);
		
	Engine.ctx.fillStyle = '#ccc';
	Engine.ctx.fillRect(this.x + 24 + 10, this.y + 9, Math.round(this.percent * 100), 6);

};