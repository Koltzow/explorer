define(function(){var i={};return i.create=function(i){i=i||{};var t={};return t.x=i.x||0,t.y=i.y||0,t.type="object",t.label="portal",t.hidden=!1,t.disabled=!1,t.width=32,t.height=64,t.collided=!1,t.colliding=!1,t.collider={width:32,height:32,top:32,left:0},t.isTrigger=!0,t.tilesheet=new Image,t.tilesheet.src="images/tilesheets/items/portal.png",t.animations={active:{x:0,y:0,f:3,s:4}},t.currentAnimation=t.animations.active,t.currentAnimationFrame=0,t.update=function(){this.currentAnimationFrame+=1/this.currentAnimation.s,this.currentAnimationFrame>=this.currentAnimation.f&&(this.currentAnimationFrame=0)},t.render=function(){this.hidden||(EXP.engine.ctx.drawImage(this.tilesheet,(this.currentAnimation.x+Math.floor(this.currentAnimationFrame))*this.width,this.currentAnimation.y*this.height,this.width,this.height,Math.round(this.x+EXP.engine.width/2-this.width/2-EXP.camera.x),Math.round(this.y+EXP.engine.height/2-this.width/2-EXP.camera.y),this.width,this.height),EXP.debug.colliders&&(EXP.engine.ctx.fillStyle="rgba(0,255,0,0.5)",EXP.engine.ctx.fillRect(Math.round(this.x+this.collider.left+EXP.engine.width/2-this.width/2-EXP.camera.x),Math.round(this.y+this.collider.top+EXP.engine.height/2-this.width/2-EXP.camera.y),this.collider.width,this.collider.height)))},t.onCollisionEnter=function(i){if(!this.collided){this.hidden=!0,EXP.sound.play("portal");for(var t=0;t<5;t++)setTimeout(function(){EXP.effects.exp.add(i.x,i.y-16,"-")},100*t);EXP.planet.create()}this.collided=!0,this.colliding=!0},t.onCollisionExit=function(i){this.colliding=!1},t.onCollisionStay=function(i){},t},i});