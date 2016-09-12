var Touch = {
    
    supported: false,
    enabled: false,
    radius: 10,
    threshold: 20,
    pos: {
    	start: null,
   		move: null
   	},
    dir: {
    	x: 0,
    	y: 0
    },
    joystick: null,
    boost: null,
    listeners: []

};

Horizon.touch = Touch;

Touch.start = function(e) {

	if(!this.enabled){
		this.enabled = true;
	}

	for (var i = 0; i < e.touches.length; i++) {
		
		if(e.touches[i].clientX > window.innerWidth / 2){
			this.boost = i;
		} else {
			this.joystick = i;
		}
		
	}
	
	if(this.joystick !== null){
		
		this.pos.start = {
			x: e.touches[this.joystick].clientX,
			y: e.touches[this.joystick].clientY
		};
	
	}
	
};

Touch.move = function(e) {
	
	this.pos.move = {
		x: e.touches[0].clientX,
		y: e.touches[0].clientY
	};
	
	this.dir.x = 0;
	this.dir.y = 0;
	
	var difX = this.pos.move.x - this.pos.start.x;
	var difY = this.pos.move.y - this.pos.start.y;
	
	if((difX < this.threshold && difX > -this.threshold) && (difY < this.threshold && difY > -this.threshold)) return;
			
	angle = Math.atan2(-1, 0) - Math.atan2(difY, difX);
	angle = -angle * 360 / (2*Math.PI);
	angle = (angle < 0) ? angle + 360: angle;
	
	if(angle < 22.5 || angle >= 337.5){
		this.dir.y = -1;
	} else if (angle < 67.5 && angle >= 22.5) {
		this.dir.x = 1;
		this.dir.y = -1;
	} else if (angle < 112.5 && angle >= 67.5) {
		this.dir.x = 1;
	} else if (angle < 157.5 && angle >= 112.5) {
		this.dir.x = 1;
		this.dir.y = 1;
	} else if (angle < 202.5 && angle >= 157.5) {
		this.dir.y = 1;
	} else if (angle < 247.5 && angle >= 202.5) {
		this.dir.x = -1;
		this.dir.y = 1;
	} else if (angle < 292.5 && angle >= 247.5) {
		this.dir.x = -1;
	} else if (angle < 337.5 && angle >= 292.5) {
		this.dir.x = -1;
		this.dir.y = -1;
	}
	
};
   
Touch.end = function(e){

	if(this.pos.start !== null && this.pos.move === null){
		console.log('click');
	}
	
	this.pos.start = null;
	this.pos.move = null;
	
	this.dir = {
		x: 0,
		y: 0
	};
	
};

Touch.render = function () {

	if(this.pos.start !== null){
		Engine.ctx.beginPath();
		Engine.ctx.arc(this.pos.start.x, this.pos.start.y, 40, 0, 2 * Math.PI, false);
		Engine.ctx.lineWidth = 2;
		Engine.ctx.strokeStyle = 'white';
		Engine.ctx.stroke();
	}
	
	if(this.pos.move !== null){
		Engine.ctx.beginPath();
		Engine.ctx.arc(this.pos.move.x, this.pos.move.y, 20, 0, 2 * Math.PI, false);
		Engine.ctx.fillStyle = 'rgba(255,255,255,0.5)';
		Engine.ctx.fill();
	}
	
};
   
Touch.addClickListener = function(coord, dim, callback){
      
      
   
};

document.addEventListener("touchstart", Touch.start.bind(Touch));
document.addEventListener("touchmove", Touch.move.bind(Touch));
document.addEventListener("touchend", Touch.end.bind(Touch));

if(screen.orientation !== undefined){
	Touch.supported = true;
}