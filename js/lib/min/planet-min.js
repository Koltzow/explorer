var Planet={seed:"",color:"#aaa",tilesheet:new Image,sprites:{vegetation:{grass:{x:0,y:0}}},atmosphere:{temperature:0,toxic:!1,vegetation:0}};Horizon.planet=Planet,Planet.tilesheet.src="images/tilesheets/planet/vegetation.png",Planet.create=function(){return this.seed=Seed.create(),this.setTemperature(),this.setColor(),this.setVegetation(),!0},Planet.drawVegetation=function(){for(var e=Math.round(Camera.x/32)||0,t=Math.round(Camera.y/32)||0,a=Math.ceil((Engine.width/32+2)/2),n=Math.ceil((Engine.height/32+2)/2),i=[],r=e-a;e+a+1>r;r++)for(var o=t-n;t+n+1>o;o++){var s=r+":"+o+this.seed,h=s.randomBetween(0,1);if(h<this.atmosphere.vegetation){var g=Math.round(h/this.atmosphere.vegetation*10);Engine.ctx.drawImage(this.tilesheet,32*g,this.sprites.vegetation.grass.y,32,32,Math.round(32*r+Engine.width/2-16-Camera.x),Math.round(32*o+Engine.height/2-16-Camera.y),32,32)}}},Planet.render=function(){Engine.ctx.fillStyle=this.color,Engine.ctx.fillRect(0,0,Engine.width,Engine.height),this.drawVegetation()},Planet.setVegetation=function(){var e=this.seed.randomBetween(0,1);this.atmosphere.vegetation=e},Planet.setToxicity=function(){var e=!0;this.atmosphere.toxic=e},Planet.setTemperature=function(){var e=-273,t=500;this.atmosphere.temperature=Math.round(this.seed.randomBetween(e,t))},Planet.setColor=function(){this.color=this.seed.color()};