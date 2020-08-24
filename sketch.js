//Create variables here
var dog,happyDog,foodS = 0,foodStock;
var dogST;
var database;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  var foodStock = database.ref('food')
  foodStock.on("value",function(data){
    foodS = data.val();
  });

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  var dogState = database.ref('gameState');
  dogState.on("value",function(data){
    dogST = data.val();
  })
}


function draw() {  
  background(46, 139, 87);
  fill("red");
  text("NOTE:PRESS UP ARROW KEY TO FEED DRAGO MILK",120,30);

  //console.log(foodS);
  console.log(dogST);

  if(foodS !== undefined){
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      updateDogState(1);
    }

    if(dogST === 1){
      dog.addImage(happydogImg);
    }
    drawSprites();
  
  }
  
}


//function showError(){
  //console.log("THERE IS AN ERROR IN YOUR CODE")
//}

function updateDogState(y){
  database.ref('/').update({
    gameState:y
  });
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    food:x
  })
}



