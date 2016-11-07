/*jshint bitwise: false*/

var EXP = EXP || {};

define(function () {

	var Planet = {
		seed: '',
		color: '#50E174',
		tilesheet: new Image(),
		sprites: {
			vegetation: {
				grass: { x:0, y:0 }
			}
		},
		atmosphere: {
			temperature: 0,
			toxic: false,
			vegetation: {
				min: 0,
				max: 9
			}
		}
	};
	
	Planet.tilesheet.src = 'images/tilesheets/planet/vegetation3.png';
	
	Planet.create = function () {
		
		this.seed = EXP.util.seed.create();
		this.setTemperature();
		this.setVegetation();
		
		return true;
	};
	
	Planet.drawVegetation = function () {
	
		var size = 5;
	
		var camX = Math.round(Math.round(EXP.camera.x/32)/size) || 0;
		var camY = Math.round(Math.round(EXP.camera.y/32)/size) || 0;
		
		var numW = Math.ceil( ((EXP.engine.width  / 32) + 10) / size / 2 );
		var numH = Math.ceil( ((EXP.engine.height / 32) + 10) / size / 2 );
				
		var tilesToDraw = [];
		
		for (var x = camX-numW; x < camX+numW; x++) {
			for (var y = camY-numH; y < camY+numH; y++) {	
			
				var left = [];
				var right = [];
				var number, dif, sn, en;
				
				for (var h = 0; h < size; h++) {
				
					sn = Math.round((x+':'+y+':'+this.seed).randomBetween(this.atmosphere.vegetation.min,this.atmosphere.vegetation.max));
					en = Math.round((x+':'+(y+1)+':'+this.seed).randomBetween(this.atmosphere.vegetation.min,this.atmosphere.vegetation.max));
					dif = (en - sn) / (size-1);
					number = Math.round(sn + (dif * h));
					
					left.push([x*size, y*size+h, number]);
				
				}
				
				for (var j = 0; j < size; j++) {
				
					sn = Math.round(((x+1)+':'+y+':'+this.seed).randomBetween(this.atmosphere.vegetation.min,this.atmosphere.vegetation.max));
					en = Math.round(((x+1)+':'+(y+1)+':'+this.seed).randomBetween(this.atmosphere.vegetation.min,this.atmosphere.vegetation.max));
					dif = (en - sn) / (size-1);
					number = Math.round(sn + (dif * j));
										
					right.push([(x+1)*size, y*size+j, number]);
				
				}
				
				for (var b = 0; b < left.length; b++) {
				
					for (var k = 0; k < size; k++) {
					
						dif = (right[b][2] - left[b][2]) / (size-1);
						number = Math.round(left[b][2] + (dif * k));
												
						tilesToDraw.push([x*size+k, y*size+b, number]);
											
					}
					
				}
			}
		}

		
		for (var i = 0; i < tilesToDraw.length; i++) {
				
			EXP.engine.ctx.drawImage(this.tilesheet, tilesToDraw[i][2]*32, this.sprites.vegetation.grass.y, 32, 32, Math.round(tilesToDraw[i][0]*32 + EXP.engine.width/2 - 32/2 - EXP.camera.x), Math.round(tilesToDraw[i][1]*32 + EXP.engine.height/2 - 32/2 - EXP.camera.y), 32, 32);
			
		}
	
	};
	
	Planet.render = function () {
		
		EXP.engine.ctx.fillStyle = this.color;
		EXP.engine.ctx.fillRect(0, 0, EXP.engine.width, EXP.engine.height);
		
		this.drawVegetation();
	
	};
	
	Planet.setVegetation = function () {
		
		this.atmosphere.vegetation.max = this.seed.randomBetween(0, 9);
		this.atmosphere.vegetation.min = this.seed.randomBetween(0, this.atmosphere.vegetation.max);
	
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
	
	Planet.calculateSpriteSheetIndex = function (centerValue, nw, n, ne, w, e, sw, s, se) {
	  
		if (!centerValue) {
			return 0;
		}
		  
		return [
		    n << 0,
		    e << 1,
		    s << 2,
		    w << 3,
		    ne << 4,
		    se << 5,
		    sw << 6,
		    nw << 7,
		].reduce(function(p, c) {
		  return p + c;
		}, 0);
	  
	};

	return Planet;

});