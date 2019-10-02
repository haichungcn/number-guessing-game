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

function timeCounting() {
  time = 30;
  myTime = setInterval(function(){
    if(time > 0){
      time -= 1;
      document.getElementById('time').innerHTML = time;
    } else if(time == 0) {
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

function makeGuess() {
  if (time !==0 && guessTimes > 0) {
    let numEntered = document.getElementById("numInput").value;
    console.log("User entered: ", numEntered, typeof(numEntered));
    document.getElementById("numInput").value = "";

    alertArea.innerHTML = ""; 

    if (numEntered && guessTimes > 0 && !history.includes(numEntered)) {
      history.push(numEntered);
      userGuesses.innerHTML = `You guessed: ${history}.`
      if (numEntered > numOG) {
        (numEntered - numOG ) < 10 ? alertArea.innerHTML = 'Hmm, it\'s close, but still big, try again!' : alertArea.innerHTML = 'No... too big, try again!';
      } else if (numEntered < numOG) {
        (numOG - numEntered) < 10 ? alertArea.innerHTML = 'Hmm, it\'s close, but still small, try again!' : alertArea.innerHTML = 'Nah... too small, try again';
      } else {
        alertArea.innerHTML = 'CORRECT!!!'
        stopTimer()
        button.classList.add("invisible");
        name = prompt('Please enter your name:');
        let timeTaken = 30 - time;
        let guessTaken = 10 - guessTimes;
        if (Object.keys(highscore).includes(name)) {
          if ((highscore[name]['time_play'] < timeTaken) || (highscore[name]['guesses_taken'] < guessTaken)) {
            highscore[name] = {'time_play' : timeTaken,'guesses_taken': guessTaken};
            prompt(`Congratulation! You are the best with ${guessTaken} guesses taken in ${timeTaken} seconds.`);
          }
        } else {
          prompt('You already have a higher score');
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
    } else if (guessTimes == 0 || time == 0) {
      stopTimer();
      history.push(numEntered);
      alertArea.innerHTML = "GAME OVER, try again!";
      guessTimesDisplayArea.innerHTML = guessTimes;
      userGuesses.innerHTML = `You guessed: ${history}.`
      button.classList.add("invisible");
      return;
    } else if (history.includes(numEntered) || time == 0) {
      alertArea.innerHTML = `You already entered ${numEntered}, please try again`;
      return;
    }
  } return;
}

  

//classList.add(" ")