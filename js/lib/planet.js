var Planet = {
	seed: '',
	color: '#aaa',
	tilesheet: new Image(),
	sprites: {
		vegetation: {
			grass: { x:0, y:0 }
		}
	},
	atmosphere: {
		temperature: 0,
		toxic: false,
		vegetation: 0
	}
};

Horizon.planet = Planet;

Planet.tilesheet.src = 'images/tilesheets/planet/vegetation.png';

Planet.create = function () {
	
	this.seed = Seed.create();
	this.setTemperature();
	this.setColor();
	this.setVegetation();
	
	return true;
};

Planet.drawVegetation = function () {

	var camX = Math.round(Camera.x/32) || 0;
	var camY = Math.round(Camera.y/32) || 0;
	
	var numW = Math.ceil( ((Engine.width / 32)+2) / 2 );
	var numH = Math.ceil( ((Engine.height / 32)+2) / 2 );
	
	var tilesToDraw = [];
	
	for (var x = camX-numW; x < camX+numW+1; x++) {
		
		for (var y = camY-numH; y < camY+numH+1; y++) {
			
			var coord = x+':'+y+this.seed;
			var prob = coord.randomBetween(0, 1);
			
			if(prob < this.atmosphere.vegetation){
			
				var sX = Math.round(prob / this.atmosphere.vegetation * 10);
				
				Engine.ctx.drawImage(this.tilesheet, sX*32, this.sprites.vegetation.grass.y, 32, 32, Math.round(x*32 + Engine.width/2 - 32/2 - Camera.x), Math.round(y*32 + Engine.height/2 - 32/2 - Camera.y), 32, 32);
				
							
			}
		}
	}

	

};

Planet.render = function () {
	
	Engine.ctx.fillStyle = this.color;
	Engine.ctx.fillRect(0, 0, Engine.width, Engine.height);
	
	this.drawVegetation();

};

Planet.setVegetation = function () {

	var vegetation = this.seed.randomBetween(0, 1);

	this.atmosphere.vegetation = vegetation;

};

Planet.setToxicity = function () {

	var toxic = true;

	this.atmosphere.toxic = toxic;

};

Planet.setTemperature = function () {

	var minTemp = -273;
	var maxTemp = 500;
	
	this.atmosphere.temperature = Math.round(this.seed.randomBetween(minTemp, maxTemp));

};

Planet.setColor = function () {

	this.color = this.seed.color();

};
