$(".message-box").slideDown(function() {
    setTimeout(function() {
        $(".message-box").slideUp();
    }, 15000);
});//displays instructions

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []; // this array keeps track of the pattern presented colors
var userClickedPattern = []; //this array keeps track of the pattern the user clicks

var startedGame = false; //keeps track if the game started or not

var level = 0; //keeps track of the levels

$("body").keypress(function (e){ //initiates the game if a key on the keyboard if pressed
  if (startedGame == false){//only works if it has not been started already
    $("#level-title").text("Level " + level); //changes the title
    nextSequence(); // calls this function to display the pattern
    startedGame = true;
  }

});

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id"); //keeps track of what colored button the user clicked
  userClickedPattern.push(userChosenColor); // adds it to the array that keeps track of the users pattern

  var audioFile = "sounds/" + userChosenColor + ".mp3";
  playSound(audioFile);//call the function to play the corresponding audio file

  animatePress(userChosenColor);//calls the function to animate the specific button

  checkAnswer(userClickedPattern.length-1); //checks to make sure the users pattern is correct
});

function nextSequence(){//creates the sequences the user is meant to remember and follow
  userClickedPattern = []; // clears the users array every time it displays a new pattern

  level++;//increases the level of the user

  $("#level-title").text("Level " + level);//changes the title text

  var randomNumber = Math.floor(Math.random() * 4); //gets a random number between 0 and 3
  var randomChosenColor = buttonColors[randomNumber];//chooses that random color
  gamePattern.push(randomChosenColor);//adds it to the game pattern array

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //creates a flash when the sequence is shown

  var audioFile = "sounds/" + randomChosenColor + ".mp3";
  playSound(audioFile);//plays the corresponding audio file

}

function checkAnswer(currentLevel){//checks if both the last button and the length of the arrays is the same
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){//if the user remembered the correct sequence
        nextSequence();//it calls this function and adds to the game pattern
      }, 1000);
    }
  }
  else{//if the user got the pattern wrong
    playSound("sounds/wrong.mp3");//play the corresponding sound

    $("body").addClass("game-over");//add this css class
    $("#level-title").text("Game Over, Press Any Key to Restart");//change the title

    setTimeout(function () {//remove the class after 200 milliseconds
      $("body").removeClass("game-over");
    }, 200);

    startOver();//call this function
  }
}

function startOver(){//resets the level, game pattern, and if the game started
  level = 0;
  gamePattern = [];
  startedGame = false;
}

function playSound(name){//plays the audio file passed in
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColor){//animates the button by adding and removing a css class
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
