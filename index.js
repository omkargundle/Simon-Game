var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var red = new Audio("./sounds/red.mp3");
var blue = new Audio("./sounds/blue.mp3");
var green = new Audio("./sounds/green.mp3");
var yellow = new Audio("./sounds/yellow.mp3");
var wrongAnswer = new Audio("./sounds/wrong.mp3");
var started = false;
var level = 0;

function addAnimation(color) {
    // $("#" + color).fadeOut(100).fadeIn(100);
    $("#" + color).addClass("pressed")
    setTimeout(function () {
        $("#" + color).removeClass("pressed")
    }, 100)
}
function playSound(color) {
    switch (color) {
        case "red":
            red.currentTime = 0;
            red.play();
            break;

        case "blue":
            blue.currentTime = 0;
            blue.play();
            break;

        case "green":
            green.currentTime = 0;
            green.play();
            break;

        case "yellow":
            yellow.currentTime = 0;
            yellow.play();
            break;

        default:
            break;
    }
}
$(".btn").on("click", handler);

$(document).on("keydown", () => {
    if (!started) {
        started = true;
        nextSequence();
    }
})



function nextSequence() {
    userClickedPattern = []
    level = level + 1;
    $("h1").text("Level " + level);

    var randomNumber = Math.round((Math.random() * 3));
    var randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);
    addAnimation(randomChoosenColor);
    playSound(randomChoosenColor);
}

function handler() {
    var userChossenColor = this.id;
    addAnimation(userChossenColor);
    playSound(userChossenColor)
    userClickedPattern.push(userChossenColor);

    checkAnswer(userClickedPattern.length - 1)

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {

                nextSequence();
            }, 1000)
        }


    } else {
        wrongAnswer.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over. Press any key to continue.");
        started = false;
        gamePattern = [];
        level = 0;
        console.log("worn");
        console.log(gamePattern);
    }
}

