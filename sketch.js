var standing_image, tower_image, door_image, climber_image, spooky_sound
var ghost, tower, doors, climber
var invisible_railing
var PLAY = 1;
var END = 0;
var gameState = PLAY

function preload(){
  standing_image = loadImage("ghost-standing.png");
  tower_image = loadImage("tower.png");
  door_image = loadImage("door.png");
  climber_image = loadImage("climber.png");
  spooky_sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(tower_image);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 300);
  ghost.addImage(standing_image);
  ghost.scale = 0.3;
  ghost.debug = true;
  
  doorsG = new Group();
  climberG = new Group();
  invisible_railingG = new Group();
}

function draw(){
  background(0);
  if(gameState === PLAY){
    if(tower.y>400){
      tower.y = 300;
    }
  
    if(keyDown("left_Arrow")){
      ghost.x = ghost.x + (-3);
    }
  
    if(keyDown("right_Arrow")){
      ghost.x = ghost.x + 3;
    }
  
    if(keyDown("up_Arrow")){
      ghost.velocityY = -2;
    }
  
    ghost.velocityY = ghost.velocityY + 0.1;
  
    if(climberG.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
    if(invisible_railingG.isTouching(ghost)){
      ghost.destroy();
      gameState = END;
    }
    spawn_doors();
    spooky_sound.play();
    drawSprites();
  }else if(gameState ===END){
    textSize (40);
    text("Game Over", 200, 300);
  }
  
}

function spawn_doors(){
  if(frameCount % 100 === 0){
    doors = createSprite(40, -20);
    doors.addImage(door_image);
    doors.x = Math.round(random(150, 500));
    doors.velocityY = 4;
    doors.lifetime = 620;
    
    ghost.depth = doors.depth;
    ghost.depth = ghost.depth + 1;
    
    doorsG.add (doors);
    
    climber = createSprite(40, 35);
    climber.addImage(climber_image);
    climber.x = doors.x;
    climber.velocityY = 4;
    climber.lifetime = 620;
    
    climberG.add (climber);
    
    invisible_railing = createSprite(40, 35);
    invisible_railing.width = climber.width;
    invisible_railing.height = 2;
    invisible_railing.x = doors.x;
    invisible_railing.velocityY = 4;
    invisible_railing.debug = true;
    
    invisible_railingG.add (invisible_railing);
    
  }
 
}