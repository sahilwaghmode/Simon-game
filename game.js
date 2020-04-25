

var gamePattern = [];
var buttonColors = ["red","blue","green", "yellow"];
var userClickedPattern =[];
var level=0;
var started = false;
var pos = 0;

$(document).keypress(()=>{
    if(!started){
        level = 0;
        nextSequance();
        $("h1").text("Level " +level);
        started =    true;   
    }
})

function nextSequance() {
    level = level + 1;
    // console.log("in nextSequance()")
    var randomNumber = Math.floor(Math.random()*10);
    // console.log(randomNumber);
    var index = randomNumber % 4;
    var randomChosenColor = buttonColors[index];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //Audio is class which represent HTML tag audio
    //audio is object iof class Audio which has methods loke play() pause() etc.
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    // console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    var len =userClickedPattern.length;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern[len-1]);
})

function playSound(name){
    // console.log("in playSound()");
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    // console.log("in animatePress");
    $("#" + currentColor).addClass("pressed") ;
    setTimeout(()=>{$("#" + currentColor).removeClass("pressed") ;0}, 100);
}

function checkAnswer(currentLevel){
    // console.log(currentLevel);
    var result
    if(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
        console.log("success"); 
        result = 1;
    }
    else{
        console.log("you are failure");
        result = 0;
    }
    if(result){
        setTimeout(() => {
            nextSequance();
        }, 1000);
    }
    else{
        gameOver();
    }
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(()=> {$("body").removeClass("game-over");},100);
    playSound("wrong");
    started = false;
    $("h1").text("Press any key to play again");
}