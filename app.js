let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highestScore = localStorage.getItem("highestScore") || 0;

let h2 = document.querySelector("h2");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        console.log("Game Started");
        started = true;
        startBtn.style.display = "none";

        levelUp();
    }
}

// Flash for Game
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash for User
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Next Level
function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}\nHighest Score : ${highestScore}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameFlash(randomBtn);
}

// Check Answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {

        // Update Highest Score
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        }

        h2.innerHTML = `
        Game Over! Your score was <b>${level}</b><br>
        Highest Score: <b>${highestScore}</b><br><br>
        Click <b>Start Game</b> to play again.
        `;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Button Press
function btnPress() {
    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Button Events
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    startBtn.style.display = "inline-block";
}