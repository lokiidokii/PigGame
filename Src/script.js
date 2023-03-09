'use strict';

//  Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // put these variables here to prevent scoping issue

// Starting conditions
const init = function () {
scores = [0, 0]; // Big Scores
currentScore = 0;
activePlayer = 0;
playing = true; // True when playing the game

score0El.textContent = 0;
score1El.textContent = 0;
current0El.textContent = 0;
current1El.textContent = 0;

diceEl.classList.add('hidden'); // Hide d6
player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
// 1. Generate a random dice roll
    const dice = Math.trunc(Math.random()*6)+1;
// 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
// 3. Check for rolled 1
    // Add dice to current score
    if(dice !== 1){
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } 
    // Switch to next player
    else {
    switchPlayer();
    }
}
});

btnHold.addEventListener('click', function() {
    if (playing) {
    // Add current score to score of active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // Check if player's score is >= 100 to see if game is finished
    if (scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        // Finish him!!!
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    } else {
    // Else switch player
    switchPlayer();
    } 
}
});

btnNew.addEventListener('click', init);