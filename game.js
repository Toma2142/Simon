const buttonColors = [`red`, `blue`, `green`, `yellow`];
let gamePattern = [];
let useClickPattern = [];
let start = false;
let level = 0;

$(`html`).on(`keydown`, function (e) {
    if (e.key === `Enter` && level === 0) {
        nextSequence();
        start = true;
    } else {
        console.log(e.key);
    }

});

function picksLeft () {
    for (i = 0; i <= gamePattern.length; i++) {

    }
}

function retry() {
    gamePattern = [];
    useClickPattern = [];
    start = false;
    level = 0;
}

function checkAnswer(level) {
    let isEqual = gamePattern.toString() === useClickPattern.toString();
    if (isEqual === true && level === useClickPattern.length) {
        console.log(`Right`);
        setTimeout(function () {
            useClickPattern = [];
            nextSequence();
        }, 1000);

    } else if (isEqual === false && level === useClickPattern.length) {
        console.log(`wrong`);
        let wrong = new Audio(`sounds/wrong.mp3`)
        wrong.play();
        $(`body`).addClass(`game-over`);
        setTimeout(function () {
            $(`body`).removeClass(`game-over`);
        }, 200);
        $(`#level-title`).text(`GAME OVER!`);
        setTimeout(function () {
            $(`#level-title`).text(`Press Enter to play again!`);
            retry();
        }, 2500);
    } else {

    }
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    $(`#` + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    gamePattern.push(randomChosenColor);
    $(`#level-title`).text(`Level ` + level);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    let x = $('#' + currentColor);
    x.addClass(`pressed`);
    setTimeout(function () {
        x.removeClass('pressed');
    }, 100);
}
$(".btn").on("pointerdown", function (e) {
    if (start === true) {
        let userChosenColor = e.target.id;
        playSound(userChosenColor);
        animatePress(userChosenColor);
        useClickPattern.push(userChosenColor);
        checkAnswer(level);
    } else {
        console.log(`Game has not started`);
    }

});