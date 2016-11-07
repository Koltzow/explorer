define(function () {

	var JetfuelBar = {
		percent: 1,
		target: 1,
		cooldown: 0,
		cooldownStart: 30*5,
		x: 20,
		y: 315-24-24,
		icon: new Image()
	};
	
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
			EXP.sound.play('jpempty');
			this.cooldown = this.cooldownStart;
		}
		
		this.percent += (this.target - this.percent) * 0.1;
		this.percent = this.target;
		
		
	};
	
	JetfuelBar.render = function () {
	
		EXP.engine.ctx.drawImage(this.icon, 0, 72, 24, 24, this.x, this.y, 24, 24);
		
		EXP.engine.ctx.fillStyle = '#000';
		EXP.engine.ctx.fillRect(this.x+24+9, this.y + 8, 102, 8);
		
		EXP.engine.ctx.fillStyle = '#444';
		EXP.engine.ctx.fillRect(this.x+24+10, this.y + 9, 100, 6);
			
		EXP.engine.ctx.fillStyle = '#ccc';
		EXP.engine.ctx.fillRect(this.x + 24 + 10, this.y + 9, Math.round(this.percent * 100), 6);
	
	};
	
	return JetfuelBar;
	
});