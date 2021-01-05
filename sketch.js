var monkey,ground,background;
var bananaGroup,obstacleGroup;
var bananaImage,obstacleImage;
var score=0;
var gameState,PLAY=1,END=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",);
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  
  background=createSprite(200,200,400,15);
  background.addImage(backImage);
  background.x = background.width /2;
  
  monkey=createSprite(50,360,10,15);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale=0.05;
  
  ground=createSprite(200,380,400,10);
  ground.visibile=false;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
}

function draw() {
  //background(220);
  
  background.velocityX = -4;
  if(background.x<0){
    background.x = background.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-8;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
    //score=Math.round(random(10,100));
  switch(score){
      case 10: monkey.scale=0.12;
        break;
      case 20: monkey.scale=0.14;
        break;
      case 30: monkey.scale=0.16;
        break;
      case 40: monkey.scale=0.18;
        break;
      default:
        break;
  }
  
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.05;
    gameState=END;
  }
  

  
  foodGroup();
  obstacles();
  drawSprites();
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE: " + score,200,50);
}

function foodGroup(){
  if(frameCount%60==0){
    var banana=createSprite(400,100,40,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.y=Math.round(random(250,340));
    banana.velocityX=-6;
    banana.lifetime=135;
    
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%80==0){
    var obstacle=createSprite(400,370,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    
    obstacle.lifetime=300;
    
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    obstacleGroup.add(obstacle); 
  }
}

