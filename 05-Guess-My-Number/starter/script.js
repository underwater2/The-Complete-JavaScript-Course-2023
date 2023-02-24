'use strict';

/*
// 70. PROJECT #1: Guess My Number!
// page에서 element 선택하기
console.log(document.querySelector('.message').textContent); // Start guessing...
console.log(document.querySelector('.message')); // <p class="message">Start guessing...</p>



// 71. What's the DOM and DOM Manipulation
// 1) DOM: Document Object Model. HTML document와 js 코드의 연결점.
// - HTML document를 구조화시켜 보여주는 것.
// - js가 HTML element에 접근해 조작할 수 있게 한다. (text나 HTML 속성 바꾸기, CSS 스타일 주기)
// - HTML 페이지가 로드되면 브라우저가 자동으로 DOM을 만든다.

// 2) DOM Tree 구조
// - Document: DOM으로의 entry point. js에 접근할 수 있다. element를 select하는 데 필요하다. (예시로 querySelector() 메서드는 이 객체에서만 사용 가능)
// - <html> element: 보통 HTML document의 root element
// - <head>, <body> element: sibling임
// ++ HTML document에 있으면, DOM tree에도 있어야 한다.

// 3) DOM !== js
// - DOM 메서드와 속성들은 js의 것이 아니라, web API의 일부이다.
// - web API(Application Programming Interface)
//   - js에도 있는 라이브러리라서 우리가 자동으로 사용할 수 있다.
//   - 각 브라우저마다 설명서가 있어서, 어떤 브라우저를 사용해도 동작한다.
//   - DOM 관련 말고도 Timer, Fatch api가 존재한다.



// 72. Selecting and Manipulating Elements
// 1) element 선택하기
console.log(document.querySelector('.message').textContent); // Start guessing...
// 2) 읽어온 element의 text를 바꾸기
document.querySelector('.message').textContent = '😄 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23; // <input /> 칸 안의 내용물이 value
console.log(document.querySelector('.guess').value);
*/

// 73. Handling Click Events
// 74. Implementing the Game Logic
// 75. Manipulating CSS Styles
// 77. Implementing Highscores
// Event: page에서 일어나는 일들. 클릭, 마우스 이동, key press
// Event Listener: Event를 감시하고 있다가, Event가 일어나면 반응함

// 랜덤 숫자가 1에서 20까지 나오도록 함
// Math.random()은 0에서 1미만까지의 소수를 반환한다.
// Math.trunc()로 소수 부분을 잘라낸다.
// ** 원하는 글자들을 한 번에 선택하고 싶을 때: opt 누른채로 더블클릭
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// 점수를 DOM에서 불러와서 변경 후 다시 DOM에 저장할 수도 있지만,
// app 내에서 언제나 사용할 수 있도록 선언해 주고 그것을 DOM에 표현해주는 방식이 더 좋다.
let score = 20; // state variable: app의 state의 한 부분이기 때문에

let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// .addEventListener(): element가 사용하는 메서드.
// - 첫 번째 parameter: 감시할 Event의 이름
// - 두 번째 parameter: Event가 발생했을 때 실행할 함수(Event Handler).
//  - 이 함수는 EventListener에 전달되는 용도로만 사용되고, Event가 발생할 때만 call된다.
document.querySelector('.check').addEventListener('click', function () {
  // <input />의 value는 항상 string으로 오므로, number로 변환해준다.
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess); // <input />이 빈칸인 상태에서 누르면 0, 'number'

  // 인풋이 없을 때
  // 0, ""는 falsy value이므로 아래처럼 쓸 수 있음
  if (!guess) {
    // document.querySelector('.message').textContent = '🛑 No number!';
    displayMessage('🛑 No number!');
    // 플레이어가 승리
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '😄 Correct Number!';
    displayMessage('😄 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    // <body> element의 style property에 접근한 후, background-color property에 접근해서 value 바꾸기
    // css에서는 background-color이지만, js에서는 -가 허용되지 않고 Camel case로 쓴다.
    document.querySelector('body').style.backgroundColor = '#60b347';

    // style을 조작할 때, value는 무조건 string이어야 한다.
    // -> value가 number라면, 30이 아니라 '30', unit을 포함하면 '30rem' 등이 되어야 한다.
    // 이 방식들은 inline style로 적용된다(HTML 파일에 style property로 들어감). css file은 수정하지 않는다.
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // 삼항연산자: operator이기 때문, value를 반환한다
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? 'Too high!' : 'Too Low!';
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lost the game!';
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  // // 예상값이 너무 큼
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too high!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  //   // 예상값이 너무 작음
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

// 76. Coding Challenge #1
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

// 78. Refactoring Our Code: The DRY Principle
