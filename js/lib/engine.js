var Engine = {};

Horizon.engine = Engine;

Engine.create = function(seed, params) {

	var _this = this;

	params = params || {};
	this.seed = seed || '1';
	
	document.body.style.backgroundColor = '#111';
	
	this.container = document.createElement('div');
	this.container.id = 'canvas-container';
	this.container.style.height = window.innerHeight+'px';
	this.container.style.width = window.innerWidth+'px';
	this.container.style.display = 'table';
	
	var containerInner = document.createElement('div');
	containerInner.id = 'cavnas-container-inner';
	containerInner.style.display = 'table-cell';
	containerInner.style.verticalAlign = 'middle';
	
	this.container.appendChild(containerInner);
	document.body.appendChild(this.container);

	this.mainloop = null;
	
	this.bodies = [];
	this.stopped = true;
	this.fullscreen = params.fullscreen || true;
	this.width = 640;
	this.height = 360;
	this.backgroundColor = params.backgroundColor || '#03a9f4';
	this.fps = params.fps || 30;
	this.camera = params.camera || {x:0, y:0};
		
	this.canvas = document.createElement('canvas');
	this.canvas.style.margin = '0 auto';
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	var cW, cH;
	
	if(this.fullscreen) {
		if(this.width/this.height < window.innerWidth/window.innerHeight){
			cW = this.width/this.height*window.innerHeight;
			cH = window.innerHeight;
		} else {
			cW = window.innerWidth;
			cH = this.height/this.width*window.innerWidth;
		}
	} else {
		cW = this.width;
		cH = this.height;
	}
	
	this.canvas.style.width = cW+'px';
	this.canvas.style.height = cH+'px';
	containerInner.appendChild(this.canvas);
	
	this.ctx = this.canvas.getContext('2d');
	this.ctx.imageSmoothingEnabled = false;
	
	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000/_this.fps);
	          };
	})();
	
	this.now = Date.now();
	this.then = Date.now();
	this.interval = 1000/this.fps;
	this.delta = 0;
	
	//eventlisteners
	window.addEventListener('resize', this.resize.bind(this));
	Keyboard.addKeyPressListener('Escape', function () {
		if(_this.stopped){
			_this.run();
		} else {
			_this.stop();
		}
	});

};

Engine.clear = function () {
	
	this.ctx.clearRect(0, 0, this.width, this.height);
	
};

Engine.update = function () {

	this.bodies.sort(function (a, b) {
		return a.y + a.height > b.y + b.height;
	});
	
	for (var i = 0; i < this.bodies.length; i++) {
		this.bodies[i].update();
	}
		
	Shield.update();
	HealthBar.update();
	JetfuelBar.update();
	
	if(Camera.target !== undefined) Camera.update();
				
};

Engine.render = function () {

	this.clear();
		
	Planet.render();
	
	for (var i = 0; i < this.bodies.length; i++) {
		this.bodies[i].render();
	}
	
	Shield.render();	
	HealthBar.render();
	JetfuelBar.render();
	
	Touch.render();
	
};

Engine.add = function (body) {

	this.bodies.push(body);

};

Engine.resize = function () {

	var cW, cH;
	
	this.container.style.height = window.innerHeight+'px';
	this.container.style.width = window.innerWidth+'px';
	
	if(this.fullscreen) {
		if(this.width/this.height < window.innerWidth/window.innerHeight){
			cW = this.width/this.height*window.innerHeight;
			cH = window.innerHeight;
		} else {
			cW = window.innerWidth;
			cH = this.height/this.width*window.innerWidth;
		}
	} else {
		cW = this.width;
		cH = this.height;
	}
	
	this.canvas.style.width = cW+'px';
	this.canvas.style.height = cH+'px';
	
	this.render();
		
};

Engine.loop = function () {

	this.mainloop = requestAnimFrame(this.loop.bind(this));
	     
	this.now = Date.now();
	this.delta = this.now - this.then;
	     
	if (this.delta > this.interval) {
	        
		this.then = this.now - (this.delta % this.interval);
	    this.update();
	    this.render();
	
	}

};

Engine.run = function () {

	var _this = this;
	
	console.log('RUN');
	
	if(this.stopped){
	
		this.loop();
		this.stopped = false;
	
	}

};

Engine.stop = function () {

	if(!this.stopped){
	
		console.log('STOP');

		window.cancelAnimationFrame(this.mainloop);
		
		this.render();
		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		this.ctx.fillRect(0, 0, this.width, this.height);
		
		this.stopped = true;
	
	}

};
