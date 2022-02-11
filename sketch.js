  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ironman, ironmanImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start"
var spacebg
var score = 0

function preload(){
  towerImg = loadImage("tower.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ironmanImg = loadImage("iron-man.png");
  spookySound = loadSound("spooky.wav");
  spacebg = loadImage("spacebg.jpg")
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
  ironman.scale = 0.6;
  ironman.addImage("ironman", ironmanImg);
}


function draw() {
  background(0);
  if (gameState === "start") {
    background(spacebg)
    stroke("purple");
    fill("yellow");
    textSize(40);
    strokeWeight(10)
    text("IronMan Runner", 180,170)
    textSize(30)
    fill("white")
    stroke("red");
    strokeWeight(10)

    text("Press Enter To Start", 150,400)
    noStroke()
    textSize(20)
    text("1. press space key to move up", 100, 450)
    text("2. press left and right arrow keys to move left and right", 40, 500)

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

      
    }
    
    if(keyDown("right_arrow")){
  
      ironman.x = ironman.x + 3;

    
      
    }
    if(keyDown("space")){
  
      ironman.velocityY = -10;

     
      
    }

    
  
    ironman.velocityY = ironman.velocityY + 0.8;
  
   

    
      spawnDoors();

  
     if(climbersGroup.isTouching(ironman)){
      ironman.velocityY = 0;
      score+=1
    }
    if(invisibleBlockGroup.isTouching(ironman) || ironman.y > 600){
      ironman.destroy();
      gameState = "end"
    }
    
  
  drawSprites();
  stroke("black");
  fill("red");
  textSize(30);
  text("Points "+score, 400, 30)
}
  if (gameState === "end"){
    background("yellow");
    stroke("red");
    fill("blue");
    textSize(30);
    strokeWeight(10)
    text("Game Over", 230,250)
    stroke("black");
    fill("red");
    textSize(30);
    text("Points "+score, 400, 30)
  }
  
} 


function spawnDoors()
 {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120,400)); 
    climber.x = door.x
    invisibleBlock.x = door.x
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    
     
    ironman.depth = door.depth;
    ironman.depth +=1 ;
    

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
     doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

