define(function(){var t={};return t.create=function(t){t=t||{};var i={};return i.x=t.x||0,i.y=t.y||0,i.label="health",i.active=!0,i.width=t.width||32,i.height=t.height||32,i.collider={width:24,height:7,left:4,top:25},i.boost=t.boost||10,i.tilesheet=new Image,i.tilesheet.src="images/tilesheets/items/health.png",i.animations={closed:{x:0,y:0,f:1,s:1},open:{x:0,y:1,f:1,s:1}},i.currentAnimation=i.animations.closed,i.currentAnimationFrame=0,i.update=function(){this.currentAnimationFrame+=1/this.currentAnimation.s,this.currentAnimationFrame>=this.currentAnimation.f&&(this.currentAnimationFrame=0)},i.render=function(){EXP.engine.ctx.drawImage(this.tilesheet,(this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width,this.currentAnimation.y*this.height,this.width,this.height,Math.round(this.x+EXP.engine.width/2-this.width/2-EXP.camera.x),Math.round(this.y+EXP.engine.height/2-this.height/2-EXP.camera.y),this.width,this.height),EXP.debug.showCollider&&(EXP.engine.ctx.fillStyle="rgba(0,255,0,0.5)",EXP.engine.ctx.fillRect(Math.round(this.x+this.collider.left+EXP.engine.width/2-this.width/2-EXP.camera.x),Math.round(this.y+this.collider.top+EXP.engine.height/2-this.height/2-EXP.camera.y),this.collider.width,this.collider.height))},i.activate=function(t){if(void 0!==t.health&&this.active){EXP.sound.play("health");for(var i=0;i<5;i++)setTimeout(function(){EXP.effects.exp.add(t.x,t.y-16,"+")},100*i);this.active=!1,this.currentAnimation=this.animations.open,t.health+=this.boost,t.health=t.health>t.maxHealth?t.maxHealth:t.health}delete this},i},t});