'use strict';

// 82. PROJECT #3: Pig Game
// 84. Switching the Active Player
// 85. Holding Current Score
// app 만들기 전에 flow chart 그리기 -> diagrams.net

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// getElementById는 id로 select할 때만 사용 가능하다.
// - querySelector보다 빠르지만 선택하는 element의 수가 많지 않으면 유의미한 차이가 없어서 querySelector를 많이 쓴다.

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
// init 함수 안에서 선언하면, scope 때문에 함수 바깥에서 사용할 수 없다.
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0; // js가 자동으로 0을 '0'으로 변환하여 넣어준다.
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active', 'player--winner');
  // .add(): 추가할 class를 이미 가지고있으면 추가하지 않는다.
  // .remove(): 삭제할 class를 가지고있지 않아도 오류 나지 않는다.
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 83. Rolling the Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. 랜덤 dice roll 생성하기
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. 화면에 dice roll 보여주기
    // css property가 아니라서 .style로 들어가지 않는 것 같다.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. dice roll이 1인지 확인
    if (dice !== 1) {
      // current score에 dice roll을 더한다.
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      console.log('dd');
    } else {
      // player를 바꾼다.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;

    if (scores[activePlayer] >= 20) {
      // 플레이어 승리
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 다른 플레어어로 턴 넘기기
      switchPlayer();
    }
  }
});

// 86. Resetting the Game
btnNew.addEventListener('click', init);
