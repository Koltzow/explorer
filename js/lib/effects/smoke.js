var Smoke = {
	particles: [],
	l: 30,
	s: 3,
	c: ['rgba(0,0,0,0.5)']
};

Smoke.add = function (x, y) {

	var d = Math.random()*2*Math.PI;
	var s = Math.random()*this.s;
	var l = this.l;
		
	this.particles.push({
		x  : x,
		y  : y,
		l  : l,
		r  : s,
		c  : this.c[Math.floor(Math.random() * this.c.length)]
	});
		
};
	
Smoke.update = function () {

	for (var i = 0; i < this.particles.length; i++) {
	
	    this.particles[i].l--;
	    this.particles[i].r += Math.random();
	    this.particles[i].y += 0.5;
	    this.particles[i].c = 'rgba(255, 255, 255, '+(1/this.l * this.particles[i].l)+')';
	    
	    if(this.particles[i].l < 0){
	    	this.particles.splice(i, 1);
	    }
	    
	}
	
}
	
Smoke.draw = function () {

	if(this.particles.length < 1) return false;
			
	for(var i = 0; i < this.particles.length; i++) {
		        
		Engine.ctx.fillStyle = this.particles[i].c;
		Engine.ctx.fillRect( this.particles[i].x + Engine.width/2 - Camera.x- this.particles[i].r/2, this.particles[i].y + Engine.height/2 - Camera.y - this.particles[i].r/2, this.particles[i].r, this.particles[i].r);
	        
	}
	
};