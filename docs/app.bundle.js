!function(t){function e(e){for(var s,a,o=e[0],c=e[1],u=e[2],d=0,l=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&l.push(n[a][0]),n[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);for(h&&h(e);l.length;)l.shift()();return r.push.apply(r,u||[]),i()}function i(){for(var t,e=0;e<r.length;e++){for(var i=r[e],s=!0,o=1;o<i.length;o++){var c=i[o];0!==n[c]&&(s=!1)}s&&(r.splice(e--,1),t=a(a.s=i[0]))}return t}var s={},n={0:0},r=[];function a(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=s,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(i,s,function(e){return t[e]}.bind(null,s));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var h=c;r.push([1466,1]),i()}({1466:function(t,e,i){"use strict";i.r(e);var s=i(39),n=i.n(s),r=i(7),a=i.n(r),o=i(11),c=i.n(o),u=i(32),h=i.n(u),d=i(33),l=i.n(d),p=i(17),f=i.n(p),y={WIDTH:640,HEIGHT:400,CENTER_WIDTH:320,CENTER_HEIGHT:200},m="preload",g="title",v={HURDLES:"hurdles",BALANCE_BEAM:"balance-beam",SPRINT:"sprint"},b="game-results";function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var w=function(t){h()(i,t);var e=k(i);function i(){return a()(this,i),e.call(this,{key:m})}return c()(i,[{key:"preload",value:function(){this.cameras.main.setBackgroundColor(4007227),this.setUpProgressBar(),this.load.audio("music/event-results",["assets/music/event-results.mp3","assets/music/event-results.ogg"]),this.load.audio("music/final-results",["assets/music/final-results.mp3","assets/music/final-results.ogg"]),this.load.audio("music/other-event",["assets/music/other-event.mp3","assets/music/other-event.ogg"]),this.load.audio("music/race",["assets/music/race.mp3","assets/music/race.ogg"]),this.load.audio("music/title",["assets/music/title.mp3","assets/music/title.ogg"]),this.load.bitmapFont("matchup-64-glow","assets/fonts/matchup-64-glow.png","assets/fonts/matchup-64-glow.xml"),this.load.bitmapFont("matchup-48","assets/fonts/matchup-48.png","assets/fonts/matchup-48.xml"),this.load.bitmapFont("matchup-24-white","assets/fonts/matchup-24-white.png","assets/fonts/matchup-24-white.xml"),this.load.bitmapFont("matchup-36-white","assets/fonts/matchup-36-white.png","assets/fonts/matchup-36-white.xml"),this.load.image("background-blue","assets/pack/Background/Blue.png"),this.load.image("background-brown","assets/pack/Background/Brown.png"),this.load.image("background-gray","assets/pack/Background/Gray.png"),this.load.image("background-green","assets/pack/Background/Green.png"),this.load.image("background-pink","assets/pack/Background/Pink.png"),this.load.image("background-purple","assets/pack/Background/Purple.png"),this.load.image("background-yellow","assets/pack/Background/Yellow.png"),this.load.image("podium-first","assets/podiums/first.png"),this.load.image("podium-second","assets/podiums/second.png"),this.load.image("podium-third","assets/podiums/third.png"),this.load.animation("virtual-guy-animations","assets/characters/virtual-guy.animations.json"),this.load.spritesheet("virtual-guy","assets/characters/virtual-guy.png",{frameWidth:32,frameHeight:32}),this.load.animation("mask-dude-animations","assets/characters/mask-dude.animations.json"),this.load.spritesheet("mask-dude","assets/characters/mask-dude.png",{frameWidth:32,frameHeight:32}),this.load.animation("ninja-frog-animations","assets/characters/ninja-frog.animations.json"),this.load.spritesheet("ninja-frog","assets/characters/ninja-frog.png",{frameWidth:32,frameHeight:32}),this.load.animation("pink-man-animations","assets/characters/pink-man.animations.json"),this.load.spritesheet("pink-man","assets/characters/pink-man.png",{frameWidth:32,frameHeight:32}),this.load.image("timing-bar","assets/timing-bar.png"),this.load.spritesheet("flag","assets/components/flag.png",{frameWidth:64,frameHeight:64}),this.load.animation("flag-animations","assets/components/flag.animations.json"),this.load.image("hurdles-ground","assets/games/hurdles/ground.png"),this.load.spritesheet("hurdles-hurdle","assets/games/hurdles/hurdle.spritesheet.png",{frameWidth:26,frameHeight:20}),this.load.image("beam","assets/games/balance-beam/beam.png"),this.load.image("beam-edge","assets/games/balance-beam/beam-edge.png"),this.load.image("beam-legs","assets/games/balance-beam/beam-legs.png")}},{key:"create",value:function(){this.scene.start(g)}},{key:"setUpProgressBar",value:function(){var t=y.WIDTH/2,e=y.HEIGHT/2,i=(this.add.rectangle(t-75,e,150,40,14306872).setOrigin(0,.5),this.add.rectangle(t-75+3,e,0,34,15633710).setOrigin(0,.5));this.load.on(Phaser.Loader.Events.PROGRESS,(function(t){var e=144*t;i.width=e}))}}]),i}(Phaser.Scene),T=[{texture:"background-pink",dx:-1,dy:-1}],P=function(){function t(e){var i=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:y.WIDTH,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:y.HEIGHT;a()(this,t),this.tileSprite=void 0,this.dx=void 0,this.dy=void 0;var c=this.generateBackgroundData();this.tileSprite=e.add.tileSprite(s,n,r,o,c.texture).setOrigin(0),this.dx=c.dx,this.dy=c.dy,e.events.on(Phaser.Scenes.Events.POST_UPDATE,this.update,this),e.events.once(Phaser.Scenes.Events.SHUTDOWN,(function(){e.events.off(Phaser.Scenes.Events.POST_UPDATE,i.update,i)})),console.log(c)}return c()(t,[{key:"update",value:function(){this.tileSprite.tilePositionX+=this.dx,this.tileSprite.tilePositionY+=this.dy}},{key:"generateBackgroundData",value:function(){var t=Phaser.Math.RND.pick(["background-blue","background-brown","background-gray","background-green","background-pink","background-purple","background-yellow"]),e=1*Phaser.Math.RND.sign(),i=1*Phaser.Math.RND.sign();return T.some((function(s){return s.texture===t&&s.dx===e&&s.dy===i}))?this.generateBackgroundData():{texture:t,dx:e,dy:i}}}]),t}();function S(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var x,D,E=function(t){h()(i,t);var e=S(i);function i(){var t;return a()(this,i),(t=e.call(this,{key:g})).background=void 0,t}return c()(i,[{key:"create",value:function(){new P(this),this.add.bitmapText(y.WIDTH/2,100,"matchup-64-glow","One Button Olympics!").setOrigin(.5),this.addEventButton(y.WIDTH/2,y.HEIGHT/2,"Hurdles",v.HURDLES),this.addEventButton(y.WIDTH/2,y.HEIGHT/2+50,"Balance Beam",v.BALANCE_BEAM),this.addEventButton(y.WIDTH/2,y.HEIGHT/2+100,"Sprint",v.SPRINT),this.sound.play("music/title",{loop:!0})}},{key:"startEvent",value:function(t){this.sound.stopByKey("music/title"),this.scene.start(t)}},{key:"addEventButton",value:function(t,e,i,s){var r=this;this.add.bitmapText(t,e,"matchup-36-white",i).setOrigin(.5).setInteractive().once(n.a.Input.Events.POINTER_DOWN,(function(){return r.startEvent(s)}))}}]),i}(n.a.Scene),R=i(169),I=i.n(R),H=i(125),N=i.n(H);!function(t){t.VIRTUAL_GUY="VIRTUAL_GUY",t.MASK_DUDE="MASK_DUDE",t.NINJA_FROG="NINJA_FROG",t.PINK_MAN="PINK_MAN"}(D||(D={}));var O=(x={},N()(x,D.VIRTUAL_GUY,{id:D.VIRTUAL_GUY,name:"Virtual Guy",texture:"virtual-guy"}),N()(x,D.MASK_DUDE,{id:D.MASK_DUDE,name:"Mask Dude",texture:"mask-dude"}),N()(x,D.NINJA_FROG,{id:D.NINJA_FROG,name:"Ninja Frog",texture:"ninja-frog"}),N()(x,D.PINK_MAN,{id:D.PINK_MAN,name:"Pink Man",texture:"pink-man"}),x),A=function(){function t(e,i){var s=this;a()(this,t),this.character=void 0,this.sprite=void 0,this.hasJumped=void 0,this.character=O[i],this.hasJumped=!1,this.sprite=e.physics.add.sprite(20,y.HEIGHT-96-16,this.character.texture),this.sprite.anims.play("".concat(this.character.texture,"-run")),e.physics.add.collider(this.sprite,e.ground),this.sprite.body.setGravity(0,400).setAccelerationX(100).setMaxSpeed(600).setBounce(.2,.2).setCollideWorldBounds(!0),this.sprite.body.onWorldBounds=!0;var n=function(){s.hasJumped||(s.hasJumped=!0,s.sprite.setVelocityY(-150),s.sprite.anims.play("".concat(s.character.texture,"-jump")))};e.input.on("pointerdown",n),e.input.keyboard.on("keydown-SPACE",n),e.events.on(Phaser.Scenes.Events.SHUTDOWN,(function(){e.input.off("pointerdown",n),e.input.keyboard.off("keydown-SPACE",n),s.sprite.destroy()}))}return c()(t,[{key:"update",value:function(){this.sprite.body.velocity.y>0&&this.sprite.anims.play("".concat(this.character.texture,"-fall"),!0),this.sprite.body.touching.down&&(this.sprite.anims.play("".concat(this.character.texture,"-run"),!0),this.hasJumped=!1)}}]),t}(),B=function(){function t(e,i){var s=this;a()(this,t),this.character=void 0,this.sprite=void 0,this.hasJumped=void 0,this.character=O[i],this.hasJumped=!1,this.sprite=e.physics.add.sprite(20,y.HEIGHT-96-16,this.character.texture),this.sprite.anims.play("".concat(this.character.texture,"-run")),e.physics.add.collider(this.sprite,e.ground),this.sprite.body.setGravity(0,400).setAccelerationX(100).setMaxSpeed(600).setBounce(.2,.2).setCollideWorldBounds(!0),this.sprite.body.onWorldBounds=!0,e.events.on(Phaser.Scenes.Events.SHUTDOWN,(function(){s.sprite.destroy()}))}return c()(t,[{key:"update",value:function(){(this.sprite.body.velocity.y>0&&this.sprite.anims.play("".concat(this.character.texture,"-fall"),!0),this.sprite.body.touching.down)?(this.sprite.anims.play("".concat(this.character.texture,"-run"),!0),this.hasJumped=!1):Phaser.Math.RND.pick([!0,!1,!1])&&!this.hasJumped&&(this.hasJumped=!0,this.sprite.anims.play("".concat(this.character.texture,"-jump")),this.sprite.setVelocityY(-150))}}]),t}(),G=i(556),_=i.n(G),M=function(){function t(e,i,s){var n=this;a()(this,t),this.scene=void 0,this.timer=void 0,this.startTime=void 0,this.text=void 0,this.scene=e,this.text=e.add.bitmapText(i,s,"matchup-36-white","00:00").setOrigin(.5),this.startTime=0,this.timer=e.time.addEvent({loop:!0,delay:10,paused:!0,callback:function(){return n.tick()}})}return c()(t,[{key:"start",value:function(){this.startTime=this.scene.time.now,this.timer.paused=!1}},{key:"tick",value:function(){var t=this.scene.time.now-this.startTime,e=Phaser.Math.RoundTo(t/1e3,-2),i=Math.round(e/60),s=String(e).split("."),n=_()(s,2),r=n[0],a=n[1],o=void 0===a?"":a,c=String(i).padStart(2,"0"),u=r.padStart(2,"0"),h=o.padStart(2,"0");this.text.setText("".concat(c,":").concat(u,".").concat(h))}},{key:"getSeconds",value:function(){}}]),t}();function W(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var U=y.HEIGHT-96,C=function(t){h()(i,t);var e=W(i);function i(){var t;return a()(this,i),(t=e.call(this,{key:v.HURDLES})).player=void 0,t.computerPlayers=void 0,t.ground=void 0,t.hurdles=void 0,t}return c()(i,[{key:"create",value:function(){this.createTrack(),this.addPlayers(),this.addPhysics(),this.addWinCondition();var t=new M(this,y.CENTER_WIDTH,100);t.text.setScrollFactor(0),t.start(),this.cameras.main.setBounds(0,0,2750,y.HEIGHT),this.cameras.main.startFollow(this.player.sprite),this.sound.play("music/race",{loop:!0})}},{key:"update",value:function(){this.player.update(),this.computerPlayers.forEach((function(t){return t.update()}))}},{key:"createTrack",value:function(){var t=this;new P(this).tileSprite.setScrollFactor(0),this.ground=this.add.tileSprite(0,U,2750,96,"hurdles-ground").setOrigin(0),this.hurdles=Array.from({length:10},(function(e,i){return t.physics.add.sprite(250*(i+1),U-8,"hurdles-hurdle")}))}},{key:"addPlayers",value:function(){this.player=new A(this,D.VIRTUAL_GUY),this.computerPlayers=[new B(this,D.MASK_DUDE),new B(this,D.NINJA_FROG),new B(this,D.PINK_MAN)]}},{key:"addPhysics",value:function(){var t=this;this.physics.world.setBounds(0,0,2750,y.HEIGHT),this.physics.world.setBoundsCollision(!1,!0,!1,!1),this.physics.add.existing(this.ground),this.ground.body.immovable=!0,this.ground.body.allowGravity=!1,this.hurdles.forEach((function(e){e.body.setGravityY(400).setCollideWorldBounds(!0).setDragX(200),t.physics.add.collider(e,t.ground),t.physics.add.collider(e,t.player.sprite,(function(){e.setVelocityX(n.a.Math.RND.between(100,200)),e.body.touching.up||e.setVelocityY(n.a.Math.RND.between(-150,-250))})),t.computerPlayers.forEach((function(i){t.physics.add.collider(e,i.sprite,(function(){e.setVelocityX(n.a.Math.RND.between(100,200)),e.body.touching.up||e.setVelocityY(n.a.Math.RND.between(-150,-250))}))}))}))}},{key:"addWinCondition",value:function(){var t=this;this.physics.world.on(n.a.Physics.Arcade.Events.WORLD_BOUNDS,(function(){var e=[{characterID:t.player.character.id,x:t.player.sprite.x}].concat(I()(t.computerPlayers.map((function(t){return{characterID:t.character.id,x:t.sprite.x}})))).sort((function(t,e){return e.x-t.x}));t.sound.stopByKey("music/race"),t.scene.start(b,{name:"HURDLES",first:e[0].characterID,second:e[1].characterID,third:e[2].characterID})}))}}]),i}(n.a.Scene);function L(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var j=function(t){h()(i,t);var e=L(i);function i(){var t;return a()(this,i),(t=e.call(this,{key:b})).background=void 0,t}return c()(i,[{key:"create",value:function(t){var e=this;this.sound.play("music/event-results",{loop:!0}),new P(this),this.add.bitmapText(y.WIDTH/2,120,"matchup-48",t.name).setOrigin(.5).setLetterSpacing(2),this.add.bitmapText(y.WIDTH/2,y.HEIGHT-40,"matchup-36-white","Back to Event List").setOrigin(.5).setInteractive().once(Phaser.Input.Events.POINTER_DOWN,(function(){e.sound.stopByKey("music/event-results"),e.scene.start(g)}));var i={first:{x:y.WIDTH/2,y:y.HEIGHT/2+60,height:60},second:{x:y.WIDTH/2-60,y:y.HEIGHT/2+60,height:40},third:{x:y.WIDTH/2+60,y:y.HEIGHT/2+60,height:20}};this.add.image(i.second.x,i.second.y,"podium-second").setOrigin(.5,1),this.add.image(i.first.x,i.first.y,"podium-first").setOrigin(.5,1),this.add.image(i.third.x,i.third.y,"podium-third").setOrigin(.5,1);var s=O[t.first];this.add.sprite(i.first.x,i.first.y-i.first.height,s.texture,0).setOrigin(.5,1);var n=O[t.second];this.add.sprite(i.second.x,i.second.y-i.second.height,n.texture,0).setOrigin(.5,1);var r=O[t.third];this.add.sprite(i.third.x,i.third.y-i.third.height,r.texture,0).setOrigin(.5,1),this.add.bitmapText(i.first.x,i.first.y,"matchup-24-white","1st").setOrigin(.5,0),this.add.bitmapText(i.second.x,i.second.y,"matchup-24-white","2nd").setOrigin(.5,0),this.add.bitmapText(i.third.x,i.third.y,"matchup-24-white","3rd").setOrigin(.5,0)}}]),i}(Phaser.Scene),V=function(){function t(e,i,s){a()(this,t),this.scene=void 0,this.selectorTween=void 0,this.greenZoneTween=void 0,this.container=void 0,this.bar=void 0,this.greenZone=void 0,this.selector=void 0,this.scene=e;var n=Phaser.Math.RND.between(80,120);this.container=e.add.container(i,s,[this.bar=e.add.sprite(0,0,"timing-bar"),this.greenZone=e.add.rectangle(this.bar.width/2-7-n,0,n,this.bar.height-14,7512349).setOrigin(0,.5),this.selector=e.add.rectangle(-this.bar.width/2+7,0,5,this.bar.height-14,14807956)]),this.selectorTween=this.scene.tweens.add({targets:this.selector,props:{x:this.bar.width/2-7},yoyo:!0,loop:-1,duration:Phaser.Math.RND.between(800,1200),paused:!0}),this.greenZoneTween=this.scene.tweens.add({targets:this.greenZone,props:{x:-this.bar.width/2+7},yoyo:!0,loop:-1,duration:Phaser.Math.RND.between(800,1200),paused:!0})}return c()(t,[{key:"select",value:function(){var t=this.greenZone.x,e=this.greenZone.x+this.greenZone.width;return t<=this.selector.x&&this.selector.x<=e}},{key:"start",value:function(){this.startSelectorMovement(),this.startGreenZoneMovement()}},{key:"startSelectorMovement",value:function(){this.selectorTween.play()}},{key:"startGreenZoneMovement",value:function(){this.greenZoneTween.play()}},{key:"speedUpSelector",value:function(){this.selectorTween.setTimeScale(1.2*this.selectorTween.timeScale)}},{key:"slowDownSelector",value:function(){this.selectorTween.setTimeScale(this.selectorTween.timeScale/1.2)}}]),t}(),J=function t(e,i,s,n){a()(this,t),this.sprite=void 0,this.id=void 0;var r=O[n].texture;this.sprite=e.add.sprite(i,s,r),this.id=n},F=function(){function t(e,i,s){a()(this,t),this.sprite=void 0,this.sprite=e.add.sprite(i,s,"flag")}return c()(t,[{key:"playWave",value:function(){this.sprite.anims.play("flag-wave")}},{key:"checkPass",value:function(t){return this.sprite.x<t.x}}]),t}();function K(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var Y=function(t){h()(i,t);var e=K(i);function i(){var t;return a()(this,i),(t=e.call(this,{key:v.BALANCE_BEAM})).timingBar=void 0,t.player=void 0,t.flag=void 0,t}return c()(i,[{key:"create",value:function(){this.sound.play("music/race",{loop:!0}),new P(this),this.flag=new F(this,575,263),this.flag.sprite.setScale(2),this.flag.playWave(),new M(this,y.CENTER_WIDTH,100).start(),this.timingBar=new V(this,y.CENTER_WIDTH,150);var t=y.WIDTH-64;this.add.container(y.CENTER_WIDTH,y.HEIGHT-64,[this.add.image(0,53,"beam-legs"),this.add.image(-1*t/2-1,0,"beam-edge"),this.add.tileSprite(0,0,t,19,"beam"),this.add.image(t/2+1,0,"beam-edge")]),this.player=new J(this,100,295,D.VIRTUAL_GUY),this.player.sprite.scale=2,this.start()}},{key:"start",value:function(){var t=this,e=function(){t.timingBar.select()?t.tweens.add({targets:t.player.sprite,props:{x:"+=".concat(Phaser.Math.RND.between(75,150))},duration:400,onComplete:function(){t.player.sprite.x+t.player.sprite.width>t.flag.sprite.x&&(t.tweens.killAll(),t.sound.stopByKey("music/race"),t.scene.start(b,{name:"BALANCE BEAM",first:D.VIRTUAL_GUY,second:D.NINJA_FROG,third:D.PINK_MAN}))}}):t.cameras.main.shake(100,.01)};this.input.on("pointerdown",e),this.input.keyboard.on("keydown-SPACE",e),this.events.on(Phaser.Scenes.Events.SHUTDOWN,(function(){t.input.off("pointerdown",e),t.input.keyboard.off("keydown-SPACE",e)})),this.timingBar.start()}}]),i}(Phaser.Scene),Z=function t(e,i){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};a()(this,t),this.tileSprite=void 0,this.body=void 0;var n=y.HEIGHT-96;this.tileSprite=e.add.tileSprite(0,n,i,96,"hurdles-ground").setOrigin(0,0),s.physics&&(e.physics.add.existing(this.tileSprite),this.body=this.tileSprite.body,this.body.setImmovable(!0))},X=function(){function t(e,i,s,n){a()(this,t),this.body=void 0,this.character=void 0,this.character=new J(e,i,s,n),e.physics.add.existing(this.character.sprite),this.body=this.character.sprite.body,this.body.setGravityY(400),this.body.collideWorldBounds=!0,this.body.setBounce(.2,0)}return c()(t,[{key:"incrementVelocity",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;this.body.velocity.x+=t}},{key:"decrementVelocity",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;this.body.velocity.x-=t}}]),t}();function q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var z=function(t){h()(i,t);var e=q(i);function i(t){var s;return a()(this,i),(s=e.call(this,t)).button=void 0,s}return i}(Phaser.Scene);function Q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var $=function(t){h()(i,t);var e=Q(i);function i(){var t;return a()(this,i),(t=e.call(this,{key:v.SPRINT})).flag=void 0,t.player=void 0,t.computerPlayers=void 0,t}return c()(i,[{key:"create",value:function(){var t=this;this.sound.play("music/race",{loop:!0}),new P(this).tileSprite.setScrollFactor(0),this.flag=new F(this,1600,y.HEIGHT-96-32);var e=new Z(this,1800,{physics:!0}),i=new V(this,y.CENTER_WIDTH,100);i.container.setScrollFactor(0),i.startSelectorMovement(),this.player=new X(this,50,y.HEIGHT-96-16,D.VIRTUAL_GUY),this.physics.add.collider(e.tileSprite,this.player.character.sprite),this.computerPlayers=[D.MASK_DUDE,D.NINJA_FROG,D.PINK_MAN].map((function(i){var s=new X(t,50,y.HEIGHT-96-16,i);return t.physics.add.collider(e.tileSprite,s.character.sprite),s})),this.physics.world.setBounds(0,0,1800,y.HEIGHT),this.cameras.main.setBounds(0,0,1800,y.HEIGHT),this.cameras.main.startFollow(this.player.character.sprite),this.button.addListener((function(){i.select()?(i.speedUpSelector(),t.player.incrementVelocity()):(i.slowDownSelector(),t.player.decrementVelocity())})),this.updateComputerPlayers()}},{key:"update",value:function(){if(this.flag.checkPass(this.player.character.sprite)){var t=[this.player].concat(I()(this.computerPlayers)).sort((function(t,e){return e.character.sprite.x-t.character.sprite.x}));this.scene.start(b,{name:"Sprint",first:t[0].character.id,second:t[1].character.id,third:t[2].character.id})}}},{key:"updateComputerPlayers",value:function(){var t=this;this.time.delayedCall(Phaser.Math.RND.between(500,750),(function(){t.computerPlayers.forEach((function(t){Phaser.Math.RND.pick([!0,!0,!1])?t.incrementVelocity(Phaser.Math.RND.between(75,125)):t.decrementVelocity(Phaser.Math.RND.between(25,75))})),t.updateComputerPlayers()}))}}]),i}(z),tt=i(168),et=i.n(tt);function it(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,s=f()(t);if(e){var n=f()(this).constructor;i=Reflect.construct(s,arguments,n)}else i=s.apply(this,arguments);return l()(this,i)}}var st=function(t){h()(i,t);var e=it(i);function i(t,s){var n;return a()(this,i),(n=e.call(this,t,s)).listeners=void 0,n.listeners=[],t.events.on(Phaser.Scenes.Events.START,n.startListening,et()(n)),t.events.on(Phaser.Scenes.Events.SHUTDOWN,n.stopListening,et()(n)),n}return c()(i,[{key:"startListening",value:function(){this.scene.input.on(Phaser.Input.Events.POINTER_DOWN,this.onPointerDown,this),this.scene.input.keyboard.on("keydown-SPACE",this.onPointerDown,this)}},{key:"stopListening",value:function(){this.listeners=[],this.scene.input.off(Phaser.Input.Events.POINTER_DOWN,this.onPointerDown,this),this.scene.input.keyboard.off("keydown-SPACE",this.onPointerDown,this)}},{key:"onPointerDown",value:function(){this.listeners.forEach((function(t){return t()}))}},{key:"addListener",value:function(t){this.listeners.push(t)}},{key:"removeListener",value:function(t){var e=this.listeners.findIndex((function(e){return e===t}));e>=0&&this.listeners.splice(e,1)}}]),i}(Phaser.Plugins.ScenePlugin),nt=[w,E,j,C,Y,$];new n.a.Game({width:y.WIDTH,height:y.HEIGHT,scene:nt,render:{pixelArt:!0},plugins:{scene:[{key:"Button",plugin:st,mapping:"button"}]},physics:{default:"arcade",arcade:{}}})}});