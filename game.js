
var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0;

var firstPress = 0;

$(document).keypress(function(){
    if (firstPress === 0){
        nextSequence();
        firstPress++
    }
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    level++
    $('#level-title').text('Level ' + level);
}

$('.btn').click(function() {
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel) {
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if(gamePattern.length === userClickedPattern.length){
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
   
} else {
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(function(){
    $('body').removeClass('game-over');
    },200);

    $('h1').text('Game Over, Press Any Key to Restart');

    startOver();
}
}

function startOver() {
    userClickedPattern = [];
    level = 0;
    gamePattern = [];
    firstPress = 0;
}

//Anime and sound
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed');

    setTimeout(function(){
    $("#" + currentColour).removeClass('pressed');
    },100);
}
