var coinimg;
var score = 0;
var bgimg;
var marioImg;
var marioSprite;
var coinSprite;
var obby1img, obby2img, obby3img;
var obbySprite;
var invisGround;
var coinGroup;
var obbyGroup;
var gameState = "play";

function preload() {
  bgimg = loadImage("backg.jpg");
  marioImg = loadAnimation("Capture1.png", "Capture3.png", "Capture4.png");
  coinimg = loadImage("coin.png");
  obby1img = loadImage("obstacle1.png");
  obby2img = loadImage("obstacle2.png");
  obby3img = loadImage("obstacle3.png");
}

function setup() {
  createCanvas(600, 200);
  marioSprite = createSprite(60, 135, 100, 100);
  marioSprite.scale = 0.5;
  marioSprite.addAnimation("marioRunning", marioImg);
  invisGround = createSprite(300, 170, 600, 10);
  score = 0;
  coinGroup = createGroup();
  obbyGroup = createGroup();
}

function draw() {
  background(bgimg);
  textSize(20);
  fill(255);
  text("Score: " + score, 500, 40);
  //text("life: "+ life , 500,60);
  if (gameState == "play") {
    spawnCoin();
    spawnObstacles();
    if (keyDown("space")) {
      marioSprite.velocityY = -10;
    }
    marioSprite.velocityY = marioSprite.velocityY + 1;
    marioSprite.collide(invisGround);
    invisGround.visible = false;
    if (marioSprite.isTouching(coinGroup)) {
      score = score + 1;
      coinGroup.destroyEach();
    }
    if (marioSprite.isTouching(obbyGroup)) {
      gameState = "end"
    }
  }
  if (gameState == "end") {
    coinGroup.setVelocityXEach(0);
    obbyGroup.setVelocityXEach(0);
  }
  drawSprites();
}

function spawnCoin() {
  if (frameCount % 60 == 0) {
    coinSprite = createSprite(600, 55, 10, 10);
    coinSprite.velocityX = -4;
    coinSprite.addImage(coinimg);
    coinSprite.scale = 0.2;
    coinGroup.add(coinSprite);
  }
}

function spawnObstacles() {
  if (frameCount % 60 == 0) {
    obbySprite = createSprite(600, 150, 10, 10);
    obbySprite.velocityX = -3;
    obbySprite.scale = 0.2;
    var r = Math.round(random(1, 3));
    switch (r) {
      case 1:
        obbySprite.addImage(obby1img);
        break;
      case 2:
        obbySprite.addImage(obby2img);
        break;
      case 3:
        obbySprite.addImage(obby3img);
        break;
    }
    obbyGroup.add(obbySprite);
  }
}
