//create variables here
var database , dog , dog1 , dog2;
var position;

var feed,add;
var foodObject;
var Feedtime;
var Lastfeed;

function preload(){
  //load images here
  dogimg1 = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(1000,500);
  database = firebase.database();
  console.log(database);

  foodObject = new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimag1);
  dog.scale=0.2;

  var dogo = database.ref('food');
  dogo.on("value",readPosition,showError);
  feed = createButton("FEED DRAGO");
  feed.position(500,15);
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood)

}

function draw(){
  background(46,139,87);
  foodObject.display();

  drawSprites();

  fill(255,255,255);
  textSize(15);
}

function readPosition(data){
  position=data.val();
  foodObject.updateFoodStock(position);
  console.log(position.x);

}

function showError(){
  console.log("Error in writing to the database");

}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }else{
    nazo=0
  }
  database.ref('/').set({
    'Food':nazo
  })

}

function AddFood(){
  position++
  database.ref('/').update({
    Food:position
  })

}

function FeedDog(){
  dog.affImage(dogimg2);
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}