var backgroundSprite, backgroundSpriteImage;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground, invisibleGround;
var gameState = 0;


function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundSpriteImage = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(600,600);
  FoodGroup = new Group();
obstacleGroup = new Group(); 

  backgroundSprite = createSprite(300,300,600,600);
  backgroundSprite.addImage(backgroundSpriteImage);
  backgroundSprite.scale = 0.8;
  backgroundSprite.velocityX = -4;
  backgroundSprite.x = backgroundSprite.width/2; 
  
  ground = createSprite(400,350,900,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale = 0.1;
  
  score = 0;
}
function draw() {
background("white");
  
  if (gameState === 0){
    
    ground.visible = false;
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(backgroundSprite.x<200){
      backgroundSprite.x = 400;
    }
    
    if(keyDown("w")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    if (FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 2;
    }
    
    if (obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.1;
    }
  switch(score){
      case 10: monkey.scale = 0.15;
            break;
      case 20: monkey.scale = 0.18;
            break;
      case 30: monkey.scale = 0.21;
            break;
      case 40: monkey.scale = 0.24;
            break;
            default: break;
    
  }
  }
  spawnObstacles();
  spawnFood();
  
  drawSprites();  
  
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
      
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,300,500);
}


function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -5;
    banana.y = random(120,200);    
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1
    
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15; 
    obstacle.velocityX = -6;    
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);
  }
}