let numOG = 0;
let guessTimes = 0;
let history =[];
let time = 0;
let myTime;
let name;
let highscore = {};
let gamePlayed = {};

const guessTimesDisplayArea = document.getElementById("times");
const alertArea = document.getElementById("alertArea");
const userGuesses = document.getElementById("userGuesses");
const button = document.getElementById('button');
const modal = document.getElementById('infoModal');
const buttonOk = document.getElementById('buttonOk');

function timeCounting() {
  time = 30;
  myTime = setInterval(function(){
    if(time > 0){
      time -= 1;
      document.getElementById('time').innerHTML = time;
    } else if(time == 0) {
        document.getElementById("modalContent").innerHTML = (`GAME OVER, TIME\'S UP!`);
        document.getElementById("modalButton").click();
        alertArea.innerHTML = "GAME OVER, TIME\'S UP!";
        guessTimesDisplayArea.innerHTML = guessTimes;
        userGuesses.innerHTML = `You guessed: ${history}.`
        button.classList.add("invisible")
        stopTimer();
      } return;
  }, 1000);
}

function stopTimer() {
  clearInterval(myTime);
}

function initializeProgram() {
  numOG = Math.floor(Math.random() * (100)) + 1;
  console.log("I had ", numOG," in mind.");
  guessTimes = 10;
  history = [];
  guessTimesDisplayArea.innerHTML = guessTimes;
  alertArea.innerHTML = "";
  userGuesses.innerHTML = "";
  button.classList.remove("invisible");
  document.getElementById("modalContent").innerHTML = `<p>This is a game of guessing the mystery number within 1-100<br>You'll have 10 turns and 30 seconds to play<br>Are you interested ? Let's click Start Game to play!</p>`;
  document.getElementById("modalTitle").innerHTML = ('Mystery Number');
  document.getElementById("buttonOk").innerHTML = ('Start Game');
  document.getElementById("modalButton").click();
}

function runProgram() {
  numOG = Math.floor(Math.random() * (100)) + 1;
  console.log("I had ", numOG," in mind.");
  guessTimes = 10;
  history = [];
  guessTimesDisplayArea.innerHTML = guessTimes;
  alertArea.innerHTML = "";
  userGuesses.innerHTML = "";
  button.classList.remove("invisible");
  timeCounting();
}

function displayGames() {
  let str = " ";
  let listOfGamePlayed = Object.keys(gamePlayed);
  for (let i = 0; i < listOfGamePlayed.length; i++ ){
    str += `<p> ${listOfGamePlayed[i]} : guessed ${gamePlayed[listOfGamePlayed[i]]["guesses_taken"]} times in ${gamePlayed[listOfGamePlayed[i]]["time_play"]} seconds.</p> `
  }
  console.log(str);
  document.getElementById("modalContent").innerHTML = (str);
  document.getElementById("modalTitle").innerHTML = ('Last games result:');
  document.getElementById("modalButton").click();
}

function displayHighScores() {
  let str = " ";
  let listOfHighScore = Object.keys(highscore);
  if (listOfHighScore) {
    for (let i = 0; i < listOfHighScore.length; i++ ){
      str += `<p> ${listOfHighScore[i]} : guessed ${gamePlayed[listOfHighScore[i]]["guesses_taken"]} times in ${gamePlayed[listOfHighScore[i]]["time_play"]} seconds.</p> `
    }
    console.log(str);
    document.getElementById("modalContent").innerHTML = (str);
    document.getElementById("modalTitle").innerHTML = ('High Scores:');
    document.getElementById("modalButton").click();
  } return;
}

function makeGuess() {
  let numEntered;
  numEntered = document.getElementById("numInput").value;

  if (time !==0 && numEntered && guessTimes > 1 ) {
    console.log("User entered: ", numEntered, typeof(numEntered));
    document.getElementById("numInput").value = "";

    alertArea.innerHTML = ""; 

    if (!history.includes(numEntered)) {
      history.push(numEntered);
      userGuesses.innerHTML = `You guessed: ${history}.`
      if (numEntered > numOG) {
        (numEntered - numOG ) < 10 ? alertArea.innerHTML = 'Hmm, it\'s close, but still big, try again!' : alertArea.innerHTML = 'No... too big, try again!';
      } else if (numEntered < numOG) {
        (numOG - numEntered) < 10 ? alertArea.innerHTML = 'Hmm, it\'s close, but still small, try again!' : alertArea.innerHTML = 'Nah... too small, try again';
      } else {
        // User guessed correct
        alertArea.innerHTML = 'CORRECT!!!'
        stopTimer()
        button.classList.add("invisible");
        name = prompt('Please enter your name:');
        let timeTaken = 30 - time;
        let guessTaken = 11 - guessTimes;
        console.log(guessTaken);
        if (highscore == true) {
          if (Object.keys(highscore).includes(name)) {
            if ((highscore[name]['time_play'] < timeTaken) || (highscore[name]['guesses_taken'] < guessTaken)) {
              highscore[name] = {'time_play' : timeTaken,'guesses_taken': guessTaken};
              gamePlayed[name] = {'time_play' : timeTaken,'guesses_taken': guessTaken};
              document.getElementById("modalContent").innerHTML = (`Congratulation! You are currently the best with ${guessTaken} guesses taken in ${timeTaken} seconds.`);
              document.getElementById("modalButton").click();
            } else {
              document.getElementById("modalContent").innerHTML = (`You already had the best score, try harder`);
              document.getElementById("modalButton").click();
            }
          } else {gamePlayed[name] = {'time_play' : timeTaken,'guesses_taken': guessTaken};}
        } else {
          highscore[name] = {'time_play' : timeTaken,'guesses_taken': guessTaken};
          document.getElementById("modalContent").innerHTML = (`Congratulation! You are currently the best with ${guessTaken} guesses taken in ${timeTaken} seconds.`);
          document.getElementById("modalButton").click();
          gamePlayed[name] = {'time_play' : timeTaken,'guesses_taken': guessTaken};
        }
        guessTimes = 1;
      };
      guessTimes-- ;
      guessTimesDisplayArea.innerHTML = guessTimes;
      // if(guessTimes == 4){
      //   document.getElementById('gamecontainer').style.backgroundColor = 'rgba(251, 255, 204, 0.8)';
      // } else if (guessTimes == 3) {
      //   document.getElementById('gamecontainer').style.backgroundColor = 'rgba(255, 249, 204, 0.8)';
      // } else if (guessTimes == 2) {
      //   document.getElementById('gamecontainer').style.backgroundColor = 'rgba(255, 240, 204, 0.8)';
      // } else if (guessTimes == 1) {
      //   document.getElementById('gamecontainer').style.backgroundColor = 'rgba(250, 192, 137, 0.8)';
      // } else {
      //   document.getElementById('gamecontainer').style.backgroundColor = 'rgba(250, 181, 137, 0.8)';
      // } 
    } else if (history.includes(numEntered) || time == 0) {
        alertArea.innerHTML = `You already entered ${numEntered}, please try again`;
        return;
    }
  } else if (guessTimes == 1 || time == 0) {
      stopTimer();
      history.push(numEntered);
      alertArea.innerHTML = "GAME OVER, try again!";
      document.getElementById("modalContent").innerHTML = (`GAME OVER, try again!`);
      document.getElementById("modalButton").click();
      guessTimesDisplayArea.innerHTML = guessTimes;
      userGuesses.innerHTML = `You guessed: ${history}.`
      button.classList.add("invisible");
      return;
    }
}

  

//classList.add(" ")