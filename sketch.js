var dog,sadDog,happyDog,database;
var foodS,foodStock;
var feed,addFood;
var foodObj;
var readState;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  
  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("FEED DOG");
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 50,30);
  }else if(lastFed==0){
  text("Last Feed : 12 AM",50,30);
  }else{
  text("Last Feed : "+ lastFed + " AM", 50,30);
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
   feed.show();
   addFood.show();
   
  }

  drawSprites();
}
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

