const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

$(document).keypress(function () {
    if (!start) {
        $("h1").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$('.btn').click((e) => {
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

const nextSequence = () => {
    userClickedPattern = [];
    level++;
    $("h1").text('Level ' + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(90).fadeOut(90).fadeIn(90);
    playSound(randomChosenColor);
}

const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000)

        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

const startOver = () => {
    level = 0;
    start = false;
    gamePattern = [];
}


const animatePress = (currentColor) => {
    $("#" + currentColor).addClass('pressed')

    setTimeout(() => {
        $("#" + currentColor).removeClass('pressed')
    }, 90)
}


const playSound = (colorName) => {
    let audio = new Audio("/sounds/" + colorName + ".mp3")
    audio.play()
}