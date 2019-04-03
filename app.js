/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

init();


// Event listeners
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. Random number;
    var dice = Math.floor(Math.random() * 6) + 1;
    // var dice = 6;
    // 2. Display the result;
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;
    // 3. Update the round score IF the rolled number was not a 1.
    if(dice === 6 && dice === 6) {
      // 1. Player loses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
      // 2. Next player's turn
      nextPlayer();
    } else if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
    
      // Next player
      nextPlayer();
    }
    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add CURRENT to Global score;
    scores[activePlayer] += roundScore;

    // Update the UI;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

      var input = document.querySelector('.final-score').value;
      var vinningScore;
      console.log(input);
      if(input) {
        vinningScore = input;
      } else {
        vinningScore = 100;
      }

    // Check if the user won;
    if (scores[activePlayer] >= vinningScore) {
      alert("You Won!!!");
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);

  roundScore = 0;

  document.getElementById("current-" + activePlayer).textContent = "0";

  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
}

// document.querySelector("#current-" + activePlayer).textContent = dice;
