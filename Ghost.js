  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ironman, ironmanImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start"
var score = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ironmanImg = loadImage("iron-man.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ironman = createSprite(200,200,50,50);
  ironman.scale = 0.3;
  ironman.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
  if (gameState === "start") {
    stroke("red");
    fill("blue");
    textSize(30);
    text("press enter to start", 200,250)
    text("press left and right and space keys", 100,300)
  }

  if (keyDown("enter")) {
   gameState = "play"
  }
 if(tower.y > 400){
      tower.y = 300
    } 
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
        ironman.x = ironman.x - 3;

      // write a code to move left when left arrow is pressed
    }
    if(keyDown("right_arrow")){
  
          ironman.x = ironman.x + 3;

      // write a code to move left when right arrow is pressed
      
    }
    if(keyDown("space")){
  
         ironman.velocityY = -10;

      // write a code to move up when space arrow is pressed
      
    }

    
  
  ironman.velocityY = ironman.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower

    
      spawnDoors();

  
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
     if(climbersGroup.isTouching(ironman)){
      ironman.velocityY = 0;
      score+=1
    }
    if(invisibleBlockGroup.isTouching(ironman) || ironman.y > 600){
      ironman.destroy();
      gameState = "end"
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    background("yellow");
    stroke("red");
    fill("blue");
    textSize(30);
    text("Game Over", 230,250)
  }
  stroke("black");
    fill("red");
    textSize(30);
    text("score"+score, 400, 30)
} 


function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    door.x = Math.round(random(120,400)); 
    climber.x = door.x
    invisibleBlock.x = door.x
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    
     
    ironman.depth = door.depth;
    ironman.depth +=1 ;
    
    //assign lifetime for the  door, climber and invisible block

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    
     doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

