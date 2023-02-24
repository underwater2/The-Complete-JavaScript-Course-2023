'use strict';

// 79. PROJECT #2: Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// 같은 클래스를 가진 element가 여러 개 있으면?

// 1) querySelector(): 가장 위에 있는 element만 불러온다.
// const btnsOpenModal = document.querySelector('.show-modal');
// console.log(btnsOpenModal);

// 2) querySelectorAll(): NodeList에 모든 element를 담는다.
// NodeList: Array와 비슷하게 작동한다.
const btnsOpenModal = document.querySelectorAll('.show-modal');

// 80. Working With Classes
// eventListener에 들어갈 함수들이 중복되므로, 변수에 넣어주고 반복 사용하여 중복 코드를 줄인다.
const openModal = function () {
  // 클래스 이름 앞에 .을 붙이지 않는다
  // 클래스를 두 개 이상 삭제하려면, 'class1', 'class2' 처럼 ,로 구분해서 써준다
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  // web page의 style을 바꿀 때
  // modal.style.display = 'block';
  // 위처럼 css property 하나하나 변경하기보다, property의 묶음인 class를 조작하는 게 훨씬 편하다.
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for문도 if/else문처럼, 실행할 코드가 한줄이면 {} 생략할 수 있다.
for (let i = 0; i < btnsOpenModal.length; i++)
  // Event Handler 함수에 () 붙이지 않는다. ()를 붙이면 js가 아래 줄을 실행할 때 Event Handler 함수가 call 된다.
  // click 이벤트가 있을 때만 js 엔진이 Event Handler 함수를 실행하도록 한다.
  // Event Listener === Event Handler
  btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// 81. Handling an "Esc" Keypress Event
// keyboard event: global event라고도 한다. 특정 element가 아닌 document 전체에서 일어날 수 있기 때문
// * keydown, keypress, keyup 이벤트의 실행 순서
// ① 키보드 'G'를 누른다.
// ② keydown 이벤트가 발생한다. (input text 창에는 'G'가 입력이 반영되지 않은 상태.)
// ③ 'G'가 입력된다. (input text 창에 입력한 'G'가 반영된 상태/)
// ④ keypress 이벤트가 발생한다.
// ⑤ 'G' 키에서 손을 뗀다.
// ⑥ keyup 이벤트가 발생한다.
// keypress 이벤트는 deprecated되어 권장되지 않는다.

// 어떤 키를 눌렀는지 알아내는 방법?
// - js는 keydown event가 일어날 때 마다 event object를 만든다.
// - event object는 해당 event의 정보를 담고 있다.
// - event Listener은 이 object를 argument로 담아올 수 있다. (argument의 이름은 무엇이든 상관 없다.)
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
