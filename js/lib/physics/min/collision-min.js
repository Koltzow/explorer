var Collision={};Horizon.physics=Horizon.physics||{},Horizon.physics.collision=Collision,Collision.test=function(i,o){return i.x+i.width>o.x&&i.x<o.x+o.width&&i.y+i.height>o.y&&i.y<o.y+o.height};