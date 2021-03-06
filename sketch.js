var plain, plainImg;
var cityImg;
var b1Img, b2Img, b3Img;
var edges, starG, star2G, diamondG, birdG;
var diamondImg, starImg, star2Img;
var start, startImg;
var gameState = PLAY;
var restart, restartImg;
var PLAY = 0;
var END = 1;

function preload(){

  cityImg = loadImage("city.png");
  plainImg = loadImage("plane1.png");
  b1Img = loadImage("bird.png");
  b2Img = loadImage("bird2.png");
  b3Img = loadImage("bird4.png");
  starImg = loadImage("star.png");
  star2Img = loadImage("star2.png");
  diamondImg = loadImage("diamond.png");
  gameOverImg = loadImage("gameOver.png");
  startImg = loadImage("start_icon.png");
  restartImg = loadImage("restart.png");
   

}

function setup(){
  createCanvas(700,700)

  star2G = new Group();
  starG = new Group();
  diamondG = new Group();
  birdG = new Group();

  start = createSprite(350,350,10,10);
  start.addImage(startImg);
  start.scale = 1.2;

  gameOver = createSprite(350,300,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.7;

  restart = createSprite(350,1000,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.25;


  plain = createSprite(50,350,0,0);
  plain.addImage(plainImg);
  plain.scale = 0.3;

}

function draw(){
  background(cityImg);
  edges = createEdgeSprites();

  plain.visible = false;

  if(mousePressedOver(start)){
    gameState = PLAY;
  }
  

  if(gameState === PLAY){

    restart.y = 1000;
    gameOver.visible = false;
    plain.visible = true;
    start.y = 1000;


    plain.collide(edges);
    plain.y = mouseY

    if(plain.isTouching(birdG)){
      gameState = END;
    }

    bird();
    diamond();
    star();

    }

    if(gameState === END){
      gameOver.visible = true;
      birdG.destroyEach();
      starG.destroyEach();
      star2G.destroyEach();
      diamondG.destroyEach();
      restart.y = 350;

      if(mousePressedOver(restart)){
        gameState = PLAY;
      }

    }

    drawSprites();

}

function bird(){
  if(frameCount%100===0){
  var bird = createSprite(750,0,10,10);
  bird.lifetime = -1;
  bird.velocityX = -4;
  bird.y = Math.round(random(10,650));
  birdG.add(bird);
  
  var rand = Math.round(random(1,3))
    switch(rand){
      case 1: bird.addImage(b1Img);
      bird.scale = 0.25;
      break;
      
      case 2: bird.addImage(b2Img);
      bird.scale = 0.25;
      break;  
        
      case 3: bird.addImage(b3Img);    
      bird.scale = 0.25;
      break;
        
      default:break;
    }
    
  }
}

function star(){
  if(frameCount%250===0){
  var star = createSprite(750,0,10,10)
  star.lifetime = -1;
  star.velocityX = -4;
  star.y = Math.round(random(10,650));
  
  var rand = Math.round(random(1,2))
  switch (rand){
      
    case 1: star.addImage(starImg);
    star.scale = 0.5;
    starG.add(star);
    break;
    
    case 2: star.addImage(star2Img);
    star.scale = 0.3;
    star2G.add(star);
    break;
  
    default:break;
  
  }  
    
  }
}

function diamond(){
  if(frameCount % 300 === 0){
  var diamond = createSprite(750,0,0,0);
    diamond.addImage(diamondImg);
    diamond.scale = 0.15;
    diamond.y = Math.round(random(10,650));
    diamond.lifetime = -1;
    diamond.velocityX = -4;
    diamondG.add(diamond);
  }
}
