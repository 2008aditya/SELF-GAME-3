var PLAY = 1;
var END = 0;
var gameState = PLAY;
var life=3
var BackgroundImage,Astronaut,Earth;
var AlienImg
var Fuel,Goldcoin,Life;
var Asteriod,Reset1,Reset2,Shoot;
var Blast;

function preload() {
  GameOver=loadImage("assets/GameOver.png")
  AstronautShoot=loadSound("assets/shooting.wav")
  GameOverSound=loadSound("assets/GameOversound.wav")
  BackgroundImg=loadImage("assets/background.jpg")
  AstronautImg=loadImage("assets/spaceship.png")
  AlienImg=loadImage("assets/ailein.png")
  EarthImg=loadImage("assets/earth.png")
  DestroyEarthImg=loadImage("assets/destroyearth.png")
  FuelImg=loadImage("assets/fuel.png")
  GoldcoinImg=loadImage("assets/goldcoin.png")
  LifeImg=loadImage("assets/life.png")
  AsteriodImg=loadImage("assets/asteroid.png")
  Reset1Img=loadImage("assets/reset1.png")
  Reset2Img=loadImage("assets/reset2.png")
  ShootImg=loadImage("assets/shoot.png")
  Shoot2Img=loadImage("assets/shoot2.png")
  BlastImg=loadImage("assets/blast.png")

}


function setup(){
  createCanvas(windowWidth,windowHeight)

  AlienGroup=new Group();
  AsteriodGroup=new Group();
  Asteriod2Group=new Group()
  bulletGroup=new Group();
  shootGroup=new Group();

  Background=createSprite(windowWidth,windowHeight/2);
  Background.addImage(BackgroundImg)
  Background.velocityX=-3


  Earth=createSprite(100,100,50,50)
   Earth.addImage(EarthImg)
   Earth.scale=1

   Life=createSprite(780,40,30,30)
   Life.addImage(LifeImg)
   Life.scale=0.3


  Astronaut=createSprite(300,500, 50,50)
  Astronaut.addImage(AstronautImg)


   Reset2=createSprite(1600,100,20,20)
   Reset2.addImage(Reset2Img)
   Reset2.scale=0.5
}

function draw(){
//background(BackgroundImg)

if (Background.x <0){
  Background.x = Background.width/2;
}
Background.velocityX=Background.velocityX-0.050
Asteriod.velocityX=Asteriod.velocityX+1

if(gameState===PLAY){


  GameOver.visible = false;
for(var i=0;i<AlienGroup.length;i++){ if(AlienGroup.get(i).collide(Astronaut)){ AlienGroup.get(i).destroy();
 GameOverSound.play()
 life=life-1
  }
  }


  
for(var i=0;i<bulletGroup.length;i++){ if(bulletGroup.get(i).collide(Astronaut)){ bulletGroup.get(i).destroy();
  GameOverSound.play()
  life=life-1
  }
  }

  for(var i=0;i<bulletGroup.length;i++){ if(bulletGroup.get(i).collide(Earth)){ bulletGroup.get(i).destroy();
    GameOverSound.play()
    life=life-1

    }
    }

    
  for(var i=0;i<AlienGroup.length;i++){ if(AlienGroup.get(i).collide(Earth)){ AlienGroup.get(i).destroy();
    GameOverSound.play()
    life=life-1
    }
    }

      
  for(var i=0;i<AsteriodGroup.length;i++){ if(AsteriodGroup.get(i).collide(Earth)){ AsteriodGroup.get(i).destroy();
    GameOverSound.play()
   life=life-1
   
    }
    }

    for(var i=0;i<Asteriod2Group.length;i++){ if(Asteriod2Group.get(i).collide(Earth)){ Asteriod2Group.get(i).destroy();
      GameOverSound.play()
      life=life-1

      }
      }

      for(var i=0;i<Asteriod2Group.length;i++){ if(Asteriod2Group.get(i).collide(Astronaut)){ Asteriod2Group.get(i).destroy();
        GameOverSound.play()
        life=life-1
  
        }
        }

  for(var i=0;i<AsteriodGroup.length;i++){ if(AsteriodGroup.get(i).collide(Astronaut)){ AsteriodGroup.get(i).destroy();
    GameOverSound.play()
    life=life-1
    }
    }

    for(var i=0;i<shootGroup.length;i++){
      if(shootGroup.get(i).isTouching(AlienGroup)){
        AlienGroup.destroyEach();
      
     }
    }

    for(var i=0;i<shootGroup.length;i++){
      if(shootGroup.get(i).isTouching(bulletGroup)){
        bulletGroup.destroyEach();
        shootGroup.get(i).destroy()
      
     }
    }
    


if(keyDown(UP_ARROW)){
  Astronaut.y=Astronaut.y-10
}

if(keyDown(DOWN_ARROW)){
  Astronaut.y=Astronaut.y+10
}

if(keyDown(RIGHT_ARROW)){
  Astronaut.x=Astronaut.x+10
}

if(keyDown(LEFT_ARROW)){
  Astronaut.x=Astronaut.x-10
}

if(keyDown("space")) {
  AstronautShoot.play();
}

AlienAttack();
Asteriod();
Asteriod2();
AstronautFuel();

if(keyDown("space")){
  Shoot();
}

}

drawSprites();
textSize(40);
fill("red")
stroke("yellow")
textFont("shadowed black")
strokeWeight(5)
text("  : "+ life, 800,50);

if(life===0){
gameState=END;
}
else if(gameState===END){
  Astronaut.velocityX=0;
 gameOver=createSprite(800,450,100,100)
 gameOver.addImage(GameOver)
 gameOver.scale=2.5
  GameOver.visible = true;
  DestroyEarth=createSprite(120,100,50,50)
  DestroyEarth.addImage(DestroyEarthImg)
 DestroyEarth.scale=1.8

 if(mousePressedOver(Reset2)) {
  gameState=PLAY;
}
}

}

function Shoot(){
 shoot=createSprite(300,440,5,5) 
 shoot.x=Astronaut.x+100;
 shoot.y=Astronaut.y
 shoot.addImage(ShootImg)
 shoot.scale=0.110
 shoot.velocityX=10
 shootGroup.add(shoot)
} 

function AlienAttack(){
  if(frameCount % 120 === 0) {
   Alien=createSprite(1700,500,50,50)
   Alien.y = Math.round(random(50,windowHeight-100));
   Alien.addImage(AlienImg)
   Alien.scale=0.5
   Alien.velocityX=-7;
   Alien.lifetime=900
   AlienGroup.add(Alien)

   bullet=createSprite(Alien.x-20,Alien.y-20,20,20);
   bullet.addImage(Shoot2Img);
   bullet.velocityX=-10;
   bullet.scale=0.2;
   bulletGroup.add(bullet)
   AstronautShoot.play();
  }
}

function Asteriod(){
  if(frameCount%200===0){
  asteriod=createSprite(1700,800,30,30)
  asteriod.y= Math.round(random(50,windowHeight-100));
  asteriod.addImage(AsteriodImg)
  asteriod.scale=1.4
  asteriod.velocityX=-5
  asteriod.lifetime=900
  AsteriodGroup.add(asteriod)
  }
}

function Asteriod2(){
  if(frameCount%300===0){
  asteriod2=createSprite(1700,200,30,30)
  asteriod2.y= Math.round(random(50,windowHeight-100));
  asteriod2.addImage(AsteriodImg)
  asteriod2.scale=2
  asteriod2.velocityX=-5
  asteriod2.lifetime=900
  Asteriod2Group.add(asteriod2)
  }
}

function AstronautFuel(){
  if(frameCount%1000===0){
    fuel=createSprite(1700,400,40,40)
    fuel.y= Math.round(random(50,windowHeight-100));
    fuel.addImage(FuelImg)
    fuel.scale=0.3
    fuel.velocityX=-14
  }
}

 