'use strict';

/*
[89. An High-Level Overview of JavaScript]
1. 자바스크립트의 특징들
1) High-level
- CPU, memory와 같은 컴퓨터 자원들을 신경쓸 필요가 없어 코드를 쓰기 쉽다.
- 하지만 low-level 언어처럼 빨라지거나 최적화될 수가 없다.
- low-level: CPU, memory와 같은 컴퓨터 자원들을 신경써야 한다. 예를 들어 C언어가 memory에 변수를 만들라고 명령하는 것 등

2) Garbade-collected
- js engine에 있는 알고리즘이 오래된, 사용하지 않는 object들을 청소해준다.
- 개발자가 직접 메모리 관리할 필요가 없다.

3) Interpreted or just-in-time compiled
- compiling, interpreting: 사람이 쓴 코드를, 컴퓨터 프로세스가 이해할 수 있는 0과 1로 이루어진 기계어로 변환하는 작업.
- js에서는 위 과정이 js engine에서 일어난다.

4) Multi-paradigm
- Paradigm: 코드를 쓸 때, 코딩 스타일이나 기술을 결정하는 접근법이나 마음가짐
- Paradigm 종류
  - Procedural programming
  - Object-oriented programming (OOP)
  - Functional programming (FP)
- Paradigm은 Imperative, Declarative로 나뉜다.
- js는 세 패러다임을 모두 사용할 수 있다.

5) Prototyped-based object-oriented
- js의 대부분은 객체로 이루어져있다. (primitive type 제외)
- ex) Array는 객체인데, .push() 등의 메서드를 가진 Prototype을 청사진삼아 우리는 Array를 생성하게 된다.
  - 우리가 만든 Array에서 메서드를 사용할 수 있는 이유는, Prototype의 메서드를 상속받기 때문에
  
6) First-class functions
- 함수를 일반 변수처럼 사용할 수 있다. 함수를 다른 함수의 Argument로 넣거나, return값으로 줄 수 있다.
- 모든 언어에 있는 것은 아니지만 js에는 있음

7) Dynamic
- 변수에 타입을 지정해서 선언하지 않으므로, 한 변수의 타입이 dynamic하게 바뀔 수 있다.
- 오류를 발생시키기도 한다.
- TypeScript: 타입을 지정하는 js

8) Single-threaded, Non-blocking event loop
- Concurrency model: js engine이 동시에 일어나는 여러 일들을 처리하는 방식
- Single thread: js는 한 번에 한 일만 수행할 수 있다.
- 오랜 시간이 걸리는 일은 Single thread를 block할 수 있기 때문에 event Loop를 사용
- event loop: 오랜 시간이 걸리는 일을 background에서 실행하고, 끝나면 main thread로 다시 옮겨온다.



[90. The JavaScript Engine and Runtime]
1. js engine이란?
- js code를 실행하는 프로그램
- 브라우저마다 다른 Js engine이 있다.
  - 대표적으로 google의 V8 Engine. 덕분에 chrome과 node.js가 많이 사용된다.
  - node.js: js runtime. 브라우저 밖에서 server-side app을 만들 수 있다.
- 구조
  - call stack: execution context를 이용해 코드를 실행하는 곳.
  - heap: 비구조적인 메모리 풀. app에 필요한 객체들이 모두 모여있다.

2. Compilation vs Interpretation
- Compilation
  - 소스 코드 전체를 한번에 기계어로 번역한다.  0과 1로 된, 이동 가능하며 어떤 컴퓨터에서도 실행 가능한 파일이 만들어진다.
  - 컴파일 직후 실행할 필요가 없다.
- Interpretation
  - 소스 코드를 한줄한줄 기계어로 변환하면서 실행을 동시에 한다.
  - js가 여기에 해당했었다.
  - compiling 언어보다 실행 속도가 매우 느리다.
- Just-in-time(JIT) compilation
  - 모던 js에서, 실행 속도를 빠르게 하기 위해서 도입한 방식
  - 소스 코드 전체를 한번에 기계어로 번역하고, 즉시 실행한다. 별도의 파일이 만들어지지 않는다.

3. 모던 js에서 Just-in-time(JIT) compilation
- 1) 코드가 js engine으로 들어온다.
- 2) parsing
  - 코드를 읽고 AST(abstract syntax tree)라는 자료구조로 변환한다.
  - 의미 단위로 js 코드를 쪼갠 후, AST에 구조적으로 정리한다.
  - 이때 syntax error를 체크한다.
  - 만들어진 AST는 기계어로 변환할 때 이용된다.
  - AST가 어떻게 생겼는지 알 필요는 없다.
  - AST는 DOM tree와 아무 관련이 없다.
- 3) compilation
  - AST를 기계어로 변환한다.
- 4) Execution
  - 컴파일 후, 바로 기계어를 실행한다.
  - call stack 내에서 일어난다.
- 5) optimization
  - 최대한 빨리 실행시키기 위해 unoptimized code로 먼저 실행한다.
  - 실행하는 동안, 코드를 최적화하고 재컴파일하는 과정을 반복한다.
  - 각각의 과정동안 코드는 계속 덮어씌워진다.
  - 이 과정 덕분에 V8같은 modern engine이 빠른 것.
- 이 모든 과정들은 코드를 실행하는 메인 스레드와 완전히 분리된 특별한 스레드에서 진행된다.
  - 코드에서 이 스레드에 접근할 수 없다.

4. JavaScript Runtime in browser
- js engine
  - js runtime의 핵심
- WEB API
  - DOM, Timer, Fetch API 등의 기능을 엔진에 제공함.
  - js 언어만의 것은 아니다. js는 window 객체를 통해서 WEB API에 접근할 수 있다.
- Callback queue
  - 실행할 준비를 하고있는 콜백함수들을 담은 queue
  - Event Handler는 콜백 함수이다.
    - 이벤트가 일어나면, 함수는 callback queue에 들어간다.
    - call stack이 비어있으면, 함수가 들어가 실행된다. 
    - Event loop: callback queue에 있는 함수를 call stack에 옮겨주는 것
      - 앞에서 배운, js에서 Concurrency model을 구현하는 데 중요

5. JavaScript Runtime in node.js
- 4. JavaScript Runtime in browser와 비슷하지만, 브라우저가 없기 때문에 WEB API가 없다.
- WEB API 대신 여러가지 C++ binding(= thread pool)이 있다.



[91. Execution Contexts and The Call Stack]
- compile 후, 코드가 실행(execute)되는 과정
  1. global execution context(top-level code) 생성
    -  코드들만 포함된다.
    - 함수 내 코드를 제외한, 변수 선언과 함수 선언이 포함된다.
    - 함수 내 코드는 call 되어야만 실행된다.
    - 코드가 실행되기 위해 필요한 모든 정보를 가지고 있다.
    - 처음에는 함수를 제외한 코드를 위한 global execution context가 생성된다.
    - global execution context는 코드가 얼마나 길든 반드시 하나 존재
  2. top-level code가 global execution context에서 실행됨
    - execution context
      - 자바스크립트가 execution context 안에서 실행된다.
  3. 함수 실행
    - CPU Processer가 위 실행을 끝내면 시작됨
    - 함수 또는 메서드가 하나 실행될 때마다, 그 함수를 실행하기 위한 정보를 담은 새로운 execution context가 생성된다.
      - 함수는 그 자신만의 execution context를 가진다.
  4. 엔진이 콜백이 도착하기를 대기
    - 함수가 모두 실행되고나면 이벤트, 콜백을 대기한다.
- execution context 상세
  - execution context 안에는 무엇이 있을까?
    1. Variable Environment
      - let, const, var 선언
      - 선언한 함수들
      - arguments objects: 함수들의 argument들을 저장
    2. Scope chain
      - 함수는 그 자신만의 execution context를 가지기 때문에, 그 안에 또 자신만의 변수들이 저장된다.
      - 함수는 Scope chain을 참조로 하여, 바깥의 변수에도 접근할 수 있다.
      - Scope chain은 각각의 execution context 안에 존재한다.
    3. this keyword
      - 각각의 execution context 안에 존재한다.
    - 위 1, 2, 3은 코드 실행 직전의 creation phase에서 생성된다.
    - arrow function의 execution context는 argument object, this keyword를 가지지 않는다.
      - 자신과 가장 가까운 부모 regular function을 이용해서 이들을 사용한다.
- Call stack
  - execution의 순서를 tracking할 수 있게 한다. (지도처럼)
  - Call stack의 가장 위에 있는 execution context가 실행중이다.
  - context가 위에 쌓이면서 실행되며, 아래에 있던 것은 멈춘다.
    - js가 single-thread이기 때문에 동시에 실행될 수는 없다.
  - 함수가 return되면 그 context는 stack에서 pop되며, 메모리에서 사라진다.
  - 모든 execution이 끝나면, call stack에 global execution context만 남아있다.
  - 브라우저가 꺼지거나 하여 완전히 finish되면 call stack이 비워진다.



[92. Scope and The Scope Chain]
- scoping
  - 프로그램에서 변수가 생성되고 접근되는 방식.
  - 변수가 어디 있는가? 특정 변수에는 어디서 접근할 수 있는가? 등의 질문과 관련함
- Lexical scoping
  - Scoping은 함수와 코드 블럭{}의 배치에 따라서 달라진다는 규칙.
- Scope
  - 변수가 선언되는 공간 또는 환경(코드 내 위치)
  - function Scope는 variable environment와 같다.
  - 종류
    - global scope
      - 함수나 블럭에 포함되지 않는 곳에 선언된 변수는 global scope에 속한다.
      - 어디서든 접근할 수 있다.
    - function scope
      - 함수 내에 선언된 변수는 그 함수 내부에서만 접근할 수 있다.
      - local scope라고도 한다. (<-> global scope)
      - 함수 선언 방식에 관계 없이, 모두 function scope를 만든다.
    - block scope
      - ES6부터 let, const와 함께 생겨났다.
      - var는 function scope만 적용되어 오류를 자주 유발했다.
        - var의 경우 가장 가까운 function scope에 포함된다.
      - let, const는 block scope가 적용된다. ES6부터는 var는 사용하지 말자. 
      - 호이스팅 방식
        - var: 스코프의 시작 지점에서 선언과 메모리 확보(초기화)가 동시에 일어나, 값 할당 이전에 변수를 참조할 수 있다.
        - let: 스코프의 시작 지점에서 선언만 진행한다. 초기화는 변수 선언문에 도달해서야 일어나기 때문에, 이때까지는 변수를 참조할 수 없다. (이 구간을 TDZ라고 부른다.)
      - 이해안돼서 참고한 사이트-> https://poiemaweb.com/es6-block-scope
- Scope of a variable
  - 특정 변수에 접근할 수 있는 코드의 범위
- Scope chain
  - 함수도 변수이기 때문에, 묶어서 변수라고 지칭하겠다.
  - 부모(바깥) 스코프의 변수들은 모두 참조 가능하다.
    - 반대는 성립하지 않는다. 부모 스코프에서 자식(안쪽) 스코프의 변수는 절대 참조 불가.
  - variable lookup: 현재 스코프에서 변수를 찾아내지 못하면, 한칸씩 바깥 스코프로 이동하면서 변수를 찾는다.
    - 찾아내면 그 변수를 copy하지 않고 그대로 사용한다.
    - 끝까지 찾지 못하면 에러가 뜬다.
  - 형제 scope의 경우 서로의 변수를 참조하지 못한다.
- Scope chain vs Call stack
  - 각 scope = (해당 execution context의 variable environment + 그 부모 scope들의 variable environment들)
  - scope chain은 함수가 call되는 순서(= call stack에 execution context들이 쌓인 순서)와는 무관하다.
    - 1함수 안에서 2함수를 call했다고 해서, 2함수에서 1함수의 변수를 꼭 참조할 수 있는 건 아님. 부모 자식 관계는 함수들의 블록의 위치 관계에 따라 결정된다.

    

// [93. Scoping in Practice]

// 함수의 parameter의 scoping은 변수와 차이 없다.
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  // variable lookup으로 global scope에 있는 firstName 변수를 찾아냄
  // console.log(firstName);

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`; // variable lookup
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      // 해당 scope, global scope 두 군데에 firstName이라는 변수가 있다.
      // js는 현재 scope에서 변수가 있는지 먼저 찾기 때문에, variable lookup이 일어나지 않는다.
      // 다른 scope에 선언한다면, 변수 이름이 같아도 전혀 문제가 없다. 둘은 완전히 다른 변수.
      // - 이 때문에, 같은 이름의 parameter를 여러 함수에 써도 문제 없다. 함수 끼리는 scope가 다르다.
      const str = `Of, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); // str은 const이므로 block scoped. 블럭 안이 아니므로 참조할 수 없다.
    console.log(millenial); // millenial은 var이므로 function scoped. 블럭을 무시하면 같은 함수 내에 있으므로 참조할 수 있다.
    // var은 동작 방식만 알고 있되, 사용하지 말 것

    // 함수는 strict mode 하에서만 block scoped.
    // add(2, 3);

    // 자식 scope에서 재할당한 값이 나온다. const나 let을 써서 새로운 변수를 만든 것이 아니기 때문.
    console.log(output); // 'NEW OUTPUT!'
  }
  printAge();

  return age;
}

// calcAge 함수보다 뒤에 선언되어있어서 오류가 날 것 같지만,
// 사실 함수 내부의 코드는 call 되기 전에는 실행되지 않기 때문에 이 변수의 선언이 먼저 일어난다.
const firstName = 'Jonas';
calcAge(1991);

// global scope에서는 그 어떤 다른 scope 안의 변수에도 접근할 수 없다. (자식 scope이기 때문)
// console.log(age);
// printAge();



[94. Variable Environment: Hoisting and The TDZ]

1. Hoisting
  - 어떤 변수들을 선언되기 전에 코드 내에서 접근/사용할 수 있도록 한다.
  - 변수가 자신의 scope의 맨 위로 이동한 것 같다고 표현하곤 한다.
  - 실제 동작 방식
    - execution되기 전에, 코드가 쫙 스캔되면서 변수 선언을 한다. (execution context의 creation phase동안 일어남)
    - 여기서 발견된 변수들은 variable environment object의 property로 추가된다.
  - 변수의 type에 따라 달라지는 Hoisting 방식
    | variable type                   | Hoisted? | Initial value                | Scope   |
    | ------------------------------- | -------- | ---------------------------- | ------- |
    | function declaration            |     O    | 실제 함수                      | Block (strict mode에서만! 아니라면 function)|
    | var variables                   |     O    | undefined                    | Funtion |
    | let and const variables         |     X    | <uninitialized>, TDZ         | Block   |
    | function expressions and arrows |     -    | var인지 let/const인지에 따라 결정 | -       |
    1. function declaration: 선언 전에 call해도 정상적으로 사용할 수 있다.
    2. var variables: 선언 전에 참조하면 undefined가 뜬다. js 상의 버그이다. 그래서 var 키워드를 쓰지 않는다.
    3. let and const variables: 실제로는 Hoisting이 일어나지만, 안일어나는 것처럼 동작한다.
      - 선언 전에 참조하면 error가 난다. variable environment에 define되었지만 initialize가 일어나지 않아서 쓸 값이 없기 때문이다.
      - scope 시작부터 변수의 선언까지를 TDZ(Temporal Dead Zone)라고 한다.
    4. function expressions and arrows
      - 이들은 변수와 똑같이 동작한다. var로 선언되었으면 2번, let/const이면 3번.

2. Temporal Dead Zone, let and const
  - Scope의 시작점에서 let/const 변수는 TDZ에 들어가게 되고, execution이 변수의 선언에 도달했을 때 TDZ를 빠져나와 안전하게 사용할 수 있게 된다.
  - ES6에 TDZ가 도입된 이유
    1. 에러를 피하거나 발견하기 쉽게 한다.
      - 선언 전에 변수에 접근하는 것은 좋지 않은 습관이며 피해야 한다.
    2. const 변수의 성질대로, 재할당을 못하도록 한다.
      - var의 경우에는 undefined로 initialize가 먼저 되는데, const 변수에서 이렇게 하면 규칙에 맞지 않을 것.
3. 왜 Hoisting이 존재하게 되었는가?
  - 선언 전에 함수를 사용할 수 있다는 특징은 때로 유용하다.
  - 당시의 기술로는 함수 Hoisting을 만들기 위해서는 var Hoisting도 만들어야 했다.
  - var Hoisting은 에러를 만들기 쉽기 때문에 지금은 let/const를 쓰는 것



// [95. Hoisting and TDZ in Practice]

// 1) Variables
console.log(me); // undefined
// console.log(job); // script.js:299 Uncaught ReferenceError: Cannot access 'job' before initialization
// console.log(year); // script.js:300 Uncaught ReferenceError: Cannot access 'year' before initialization

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// 2) Functions
console.log(addDecl(2, 3)); // 5

// const로 선언했을 때) Uncaught ReferenceError: Cannot access 'addExpr' before initialization
// var로 선언했을 때) Uncaught TypeError: addArrow is not a function
// - undefined(2, 3)한 것과 똑같다.
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

console.log(addArrow); // undefined

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// 3) Example
console.log(undefined);
// 여기서 numProducts는 10이 아니라 undefined이다. undefined는 falsy value라서 함수가 실행된다.
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// 4) 결론
// 1. 변수 선언할 때 var를 쓰지 말자. const를 기본으로 쓰고, 재할당할 일이 있다면 let으로 나중에 바꾸자.
// 2. 변수를 scope의 맨 처음에 선언하자.
// 3. 함수는 반드시 선언한 후에 사용하자. (function declaration은 에러가 나지 않지만, clean code가 아니므로 사용x)

// 5)
// window: 브라우저 내의 js의 global object.
// var로 선언한 변수는 window object의 property로 들어간다. (브라우저 콘솔에서 window 객체를 보면 x가 있다.)
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false



[96. The this Keyword]
1. this keyword가 동작하는 방식
1) this keyword/variable: 모든 execution context(모든 함수)에서 생성되는 특별한 변수. 
this 키워드가 사용되는 함수의 owner의 값을 가진다.
2) static한 값이 아니다. 함수가 호출된 방식에 따라 달라지며, 함수가 실제로 호출되었을 때만 값이 할당된다.
- Method일 때: <메서드를 call한(가지고 있는) 객체>
- Simple function call: (strict mode일 때)undefined / (strict mode 아닐 때)Window (<-브라우저에서의 global object)
- Arrow function: 자기 자신은 this 키워드를 가지지 않는다. 대신 <이 함수를 감싸고 있는 function 또는 부모 scope의 this(lexical this)>
- Event listener: <핸들러가 붙어있는 DOM element>
3) 주의!
- this 키워드는 함수 그 자체나 variable environment를 가리키지 않는다.



// [97. The this Keyword in Practice]

// 1. global scope의 this는 Window 객체이다.
console.log(this); // Window

// 2. 단순 function call의 경우 this는 undefined다. (현재 strict mode이므로)
// sloppy mode일 때는 Window다.
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined
};
calcAge(1991);

// 3. Arrow function의 경우 자신의 this를 가지지 않는다. 대신 parent scope의 this(lexical this keyword)를 가리킨다.
// 여기서 calcAgeArrow는 부모 함수가 없으므로, global scope의 this인 Window를 가리키게 된다.
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // Window
};
calcAgeArrow(1980);

// 4. Method의 경우 자신을 call한 객체를 가리킨다.
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(2037 - this.year);
    console.log(this); // jonas 객체
  },
};
jonas.calcAge();

// 4-1. calcAge 메서드가 jonas객체의 Property이지만, matilda 객체가 호출한다면 this는 matilda 객체이다.
const matilda = {
  year: 2017,
};
matilda.calcAge = jonas.calcAge; // function borrowing: 다시 function을 쓸 필요 없이 빌려오면 됨
matilda.calcAge();

// 4-2. 여기서 f는 simple function call이다. this는 undefined이기 때문에,
// console.log(2037 - this.year); 에서 오류가 난다.
const f = jonas.calcAge;
f();



// [98. Regular Functions vs. Arrow Functions]

// 1. this keyword
var firstName = 'Mathida';

// 객체에서 {}는 scope를 만드는 block이 아니고, 객체를 정의하는 object literal이다.
// 따라서 greet메서드는 global scope에 속한다.
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // // 0. this가 isMillenial에서 바뀌어 오류가 나던 코드
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(this.year >= 1981 && this.year <= 1996);
    // };
    // isMillenial();

    // // Solution 1. this를 보존하는 ES6 이전의 방법
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillenial();

    // Solution 2. this를 보존하는 ES6 이후의 방법
    // Arrow function을 사용하는 방법이다. 여기서 this는 부모 함수인 calcAge의 this이므로 jonas 객체이다.
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
// (원래)
// arrow function의 this는 부모 scope의 this를 가리킨다. Window는 firstName라는 property를 가지지 않으므로, undefined가 나오는 것.
// 언뜻 greet를 call한 jonas가 this가 될 것 같지만, Arrow function이기 때문에 그 규칙은 여기 적용이 안됨.
// (var firstName이 선언되었을 때)
// var로 변수를 선언하면 Window 객체의 Property로 들어간다. => var를 쓰면 안되는 이유 중 하나이다.
jonas.greet(); // (원래) Hey undefined / (var firstName이 선언되었을 때) Hey Mathilda
// (결론) 메서드로 arrow function을 절대 쓰지 말 것. this 키워드를 쓰지 않더라도 이 규칙을 지키면 버그 날 일이 없다.

// calcAge() 내부에서 call된 isMillenial은 simple function call이므로 this가 undefined이다. (js의 규칙임)
// calcAge() 내부의 this는 그대로 Method의 규칙을 따라 jonas다.
jonas.calcAge();

// 2. arguments keyword
// this keyword처럼 함수가 가지는 요소 중 하나.
// array의 형태로, 그 함수의 parameter들을 담고 있다.
// 다수의 parameter를 다루는 방식 중의 하나. ES6 이후에는 다른 방법이 생겼기 때문에 많이 쓰이지는 않는다.
// 일반 함수에서만 쓸 수 있다. arrow function에서는 arguments가 정의되어있지 않다.
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5); // Arguments(2) [2, 5,
addExpr(2, 5, 8, 12); // Arguments(4) [2, 5, 8, 12,

var addArrow = (a, b) => {
  console.log(arguments); // 에러
  return a + b;
};
addArrow(2, 5, 8);



// [99. Primitives vs. Objects (Primitive vs. Reference Types)]
// 1. Primitive 타입과 Object가 다르게 동작하여 헷갈리게 하는 예시
// 1) Primitive 타입
let age = 30;
let oldAge = age;
age = 31;
console.log(age); // 31
console.log(oldAge); // 30

// 2) Object
const me = {
  name: 'Jonas',
  age: 30,
};

const friends = me;
friends.age = 27;
console.log('friends:', friends); // age가 27
console.log('me:', me); // me.age는 변경한 적이 없는데 27임

// 2. Review: Primitives, Objects와 js engine
// 1) Primitives
// - Primitive types라고 부른다.
// - 종류: Number, String, Boolean, Undefined, Null, Symbol, BigInt
// - js engine의 call stack에 저장된다. 선언된 execution context에 저장되는 것.
// - js engine에서 생성 방식
//   - 변수를 생성하면 call stack에 고유한 Indentifier와 변수 이름이 생긴다.
//   - 변수는 메모리의 한 address(ex 0001) 값과 같다.
//   - 이 address에는 그 변수의 value가 저장되어있다.
//   - 1번 예시에서 age를 31로 바꿨을 때, age는 원래 address 대신 31이라는 값을 담은 새로운 address를 가리키게 되고,
//     - oldAge는 그대로 원래 address를 가리키고 있다. 그래서 두 값이 다르게 나온다.

// 2) Objects
// - Reference types라고 부른다.
// - 종류: Object literal, Arrays, Functions, Many more...
// - js engine에서 object들이 저장되는 memory인 Heap에 저장된다.
// - js engine에서 생성 방식
//   - heap에 Address가 생기고, value에 객체가 저장된다.
//   - call stack에 고유한 Indentifier와 변수 이름이 생긴다. (primitives와 동일한 방식)
//   - 이 address가 가지는 value는, heap에 생성되었던 address를 참조한다.
//   - 객체를 call stack에 저장하기에는 너무 크기 때문에 이런 저장 방식을 사용한다.
//   - 1번 예시에서 me와 friend의 Identifier는 같은 address를 가리킨다.
//   - 그래서 한 변수의 객체 내용을 바꾸면, 다른 변수에도 똑같은 영향을 미치게 된다.
//   - * const로 선언한 객체 변수가 있을 때, 객체의 내용을 변경해도 오류가 나지 않는다.
//     - heap에 있는 value를 바꿨을 뿐이고, 그 변수가 가리키는 value인 주소는 전혀 바뀌지 않았기 때문.
//     - 따라서 const는 primitives일 때만 immutable하고, object일 때는 mutable하다.
*/

// [100. Primitives vs. Objects in Practice]
// 1. Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); // Davis Williams

// 2. Reference types
// object의 property를 바꾸는 것은 heap에 저장된 value(object)를 변경하는 것이다.
// const, let의 경우 stack에 저장된 value(heap 주소)에만 관련이 있기 때문에, const로 선언해도 property를 바꿀 수 있다.
// 단, const로 선언했을 때 새로운 객체를 재할당할 수 없다. 그 객체는 heap에 새로운 메모리 주소에 들어가고 따라서 stack에 value가 바뀌기 때문
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessia = jessica;
marriedJessia.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessia);

// error남
// const일 때 새로운 객체 할당은 불가능
// marriedJessia = {}

// 3. Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// Object.assign(): 두 객체를 머지한다. 두 객체의 property를 모아 만든 새로운 객체를 반환한다.
// - deep clone이 아닌 shallow copy이기 때문에 한계가 있다.
// - first-level은 잘 복사하지만 Array 같은 객체가 property라면 이것까지는 복사하지 못한다.
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
