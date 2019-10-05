let numOG = 0;
let guessTimes = 0;
let history = [];
let time = 0;
let myTime;
let name;
let gameData = {};

const guessTimesDisplayArea = document.getElementById("times");
const alertArea = document.getElementById("alertArea");
const userGuesses = document.getElementById("userGuesses");
const button = document.getElementById("button");
const modal = document.getElementById("infoModal");
const buttonOk = document.getElementById("buttonOk");

function timeCounting() {
    time = 30;
    myTime = setInterval(function() {
        if (time > 0) {
            time -= 1;
            document.getElementById("time").innerHTML = time;
        } else if (time == 0) {
            alertArea.innerHTML = "GAME OVER, TIME'S UP!";
            document.getElementById(
                "modalContent"
            ).innerHTML = `GAME OVER, TIME\'S UP!`;
            document.getElementById("modalButton").click();
            guessTimesDisplayArea.innerHTML = guessTimes;
            userGuesses.innerHTML = `You guessed: ${history}.`;
            button.classList.add("invisible");
            stopTimer();
        }
        return;
    }, 1000);
}

function stopTimer() {
    clearInterval(myTime);
}

function initializeProgram() {
    getData();
    numOG = Math.floor(Math.random() * 100) + 1;
    console.log("I had ", numOG, " in mind.");
    guessTimes = 10;
    history = [];
    guessTimesDisplayArea.innerHTML = guessTimes;
    alertArea.innerHTML = "";
    userGuesses.innerHTML = "";
    button.classList.remove("invisible");
    document.getElementById(
        "modalContent"
    ).innerHTML = `<p>This is a game of guessing the mystery number within 1-100<br>You'll have 10 turns and 30 seconds to play<br>Are you interested ? Let's click Start Game to play!</p>`;
    document.getElementById("modalTitle").innerHTML = "Mystery Number";
    document.getElementById("buttonOk").innerHTML = "Start Game";
    document.getElementById("modalButton").click();
}

function getData() {
    gameData = JSON.parse(localStorage.getItem("data")) || {
        highscore: {
            user: "anomymous",
            guess: 0,
            time: 0
        },
        gamePlayed: [
            {
                user: "anomymous",
                guess: 0,
                time: 0
            }
        ]
    };
}

function saveData() {
    localStorage.setItem("data", JSON.stringify(gameData));
    console.log("saved");
}

function runProgram() {
    numOG = Math.floor(Math.random() * 100) + 1;
    console.log("I had ", numOG, " in mind.");
    guessTimes = 10;
    history = [];
    guessTimesDisplayArea.innerHTML = guessTimes;
    alertArea.innerHTML = "";
    userGuesses.innerHTML = "";
    button.classList.remove("invisible");
    timeCounting();
}

function displayGames() {
    let str = "";
    gameData.gamePlayed.forEach(val => {
        str += `<p> ${val.user} : guessed ${val.guess} times in ${val.time} seconds.</p> `;
    });
    console.log(str);
    document.getElementById("modalContent").innerHTML = str;
    document.getElementById("modalTitle").innerHTML = "Last games result:";
    document.getElementById("modalButton").click();
}

function displayHighScores() {
    let str = `<p> ${gameData.highscore.user} : guessed ${gameData.highscore.guess} times in ${gameData.highscore.time} seconds.</p> `;
    console.log(str);
    document.getElementById("modalContent").innerHTML = str;
    document.getElementById("modalTitle").innerHTML = "High Scores:";
    document.getElementById("modalButton").click();
}

function makeGuess() {
    let numEntered;
    numEntered = document.getElementById("numInput").value;

    if (time !== 0 && numEntered && guessTimes > 1) {
        console.log("User entered: ", numEntered, typeof numEntered);
        document.getElementById("numInput").value = "";

        alertArea.innerHTML = "";

        if (!history.includes(numEntered)) {
            history.push(numEntered);
            userGuesses.innerHTML = `You guessed: ${history}.`;
            if (numEntered > numOG) {
                numEntered - numOG < 10
                    ? (alertArea.innerHTML =
                          "Hmm, it's close, but still big, try again!")
                    : (alertArea.innerHTML = "No... too big, try again!");
            } else if (numEntered < numOG) {
                numOG - numEntered < 10
                    ? (alertArea.innerHTML =
                          "Hmm, it's close, but still small, try again!")
                    : (alertArea.innerHTML = "Nah... too small, try again");
            } else {
                // User guessed correct
                alertArea.innerHTML = "CORRECT!!!";
                stopTimer();
                button.classList.add("invisible");
                name = prompt("Please enter your name:");
                let timeTaken = 30 - time;
                let guessTaken = 11 - guessTimes;
                console.log(guessTaken);
                if (
                    name !== gameData.highscore.user &&
                    (gameData.highscore.time < timeTaken ||
                        gameData.highscore.guess < guessTaken)
                ) {
                    gameData.highscore.time = timeTaken;
                    gameData.highscore.guess = guessTaken;
                    gameData.highscore = {
                        user: name,
                        time: timeTaken,
                        guess: guessTaken
                    };
                    document.getElementById(
                        "modalContent"
                    ).innerHTML = `Congratulation! You are currently the best with ${guessTaken} guesses taken in ${timeTaken} seconds.`;
                    document.getElementById("modalButton").click();
                } else {
                    document.getElementById(
                        "modalContent"
                    ).innerHTML = `You already had the best score, try harder`;
                    document.getElementById("modalButton").click();
                }
                gameData.gamePlayed.unshift({
                    user: name,
                    time: timeTaken,
                    guess: guessTaken
                });
                saveData();
                guessTimes = 1;
            }
            guessTimes--;
            guessTimesDisplayArea.innerHTML = guessTimes;
        } else if (history.includes(numEntered) || time == 0) {
            alertArea.innerHTML = `You already entered ${numEntered}, please try another`;
            return;
        }
    } else if (guessTimes == 1 || time == 0) {
        stopTimer();
        history.push(numEntered);
        alertArea.innerHTML = "GAME OVER, try again!";
        document.getElementById(
            "modalContent"
        ).innerHTML = `GAME OVER, try again!`;
        document.getElementById("modalButton").click();
        guessTimesDisplayArea.innerHTML = guessTimes;
        userGuesses.innerHTML = `You guessed: ${history}.`;
        button.classList.add("invisible");
        return;
    }
}

//classList.add(" ")
