
var gamePattern = [];
var buttonColors = ["red","blue","green", "yellow"];
var userClickedPattern =[];
var level=0;
var started = false;
var pos = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequance();
      started = true;
    }
  });

function nextSequance() {
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*10);
    var index = randomNumber % 4;
    var randomChosenColor = buttonColors[index];

    gamePattern.push(randomChosenColor);
    console.log("Game Pattern " + gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //Audio is class which represent HTML tag audio
    //audio is object iof class Audio which has methods loke play() pause() etc.
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  

  function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequance();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}
function gameOver(){
    $("body").addClass("game-over");
    setTimeout(()=> {$("body").removeClass("game-over");},200);
    playSound("wrong");
    $("h1").text("Game Over, Press any key to play again");
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}