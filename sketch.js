//creates the database
var database;

//creates the variable for the dog
var dog, happyDog;

//creates the food supply
var foodStock, foodS;

//creates the variables for the dog images
var dogImg, happyDogImg;

function preload(){
  //loads the dog images
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

	


function setup() {
  createCanvas(500, 500);

  //assigns firebase database to the variable database
  database = firebase.database();

  //fetches food from database
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  //creates the dog and adds the animation
  dog = createSprite(250,250,50,50);
  dog.addAnimation("dogImg",dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background(46,139,87);

  fill(0);
  text("Press the UP ARROW to feed the dog!",150,100);
  text("Remaining food:"+foodS,150,150);

  
  drawSprites();
  //add styles here

}

//this function reads the value from the database
function readStock(data){
  foodS = data.val();
}

//this function writes the value from the database
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    if(foodS>0){
      foodS = foodS - 1;
    }
    dog.changeAnimation("happyDogImg",happyDogImg);
  }
}


