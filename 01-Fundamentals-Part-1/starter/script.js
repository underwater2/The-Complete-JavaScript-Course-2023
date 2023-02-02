/*
// 10. Values and Variables
let js = "amazing";

console.log(10 + 30 - 11);

// 자바스크립트의 변수 이름 컨벤션: camelCase
let firstName = "jason";
console.log(firstName);
console.log(firstName);
console.log(firstName);

// 변수 이름 규칙
// 1. 숫자로 시작하면 syntax error
// let 3years = 3;
// 2. 숫자, 글자, _, $만 포함할 수 있다.
// let jonas&matilda = 'JM';
// 3. 예약어(reserved keyword)는 변수 이름으로 사용할 수 없다.
// let new = 3;
// (불가능) let function = 'tea';
// (가능) let _function = 'tea';
// * 아래 name은 예약어이지만 변수 이름으로 사용했을 때 오류가 안뜬다. 하지만 다른 상황에서 문제가 생길 수 있으니 사용하지 말자
// let name = 'jonas';
// 4. 대문자로 시작하지 않는다.
// let Person = 'mina';
// * 모두 대문자인 변수는 상수로 취급된다.
// let PI = 3.1415
// 5. 변수 이름은 알아보기 쉽게 작성한다.
// let myFirstJob = 'Programmer';
// let myCurrentJob = 'Teacher'
// // 위 세트가 아래 세트보다 보기 쉽다.
// let job1 = 'Programmer';
// let job2 = 'Teacher'



// 12. Data Types
let JsIsFun = true;
console.log(JsIsFun);

// typeof 연산자: 타입 이름을 string으로 반환함
console.log(typeof false);
console.log(typeof JsIsFun);
console.log(typeof 23);
console.log(typeof "str");

// Dynamic Typing: 변수 안의 value를 다른 타입의 것으로 바꿀 수 있음
JsIsFun = "Jonas";
console.log(JsIsFun);

// undefined 타입: 선언만 하고 값을 할당하지 않으면 value와 type이 모두 undefined가 된다.
let year;
console.log(year);
console.log(typeof year);

// Dynamic Typing
year = 1997;
console.log(year);

// null의 typeof 버그
console.log(typeof null); // null이 찍혀야 하나 object가 나온다. 자바스크립트의 레거시 문제로 고치지 못하는 버그



// 13. let, const and var
// let, var는 ES6부터 등장
// 기본적으로 const를 쓰되 value가 꼭 바뀌어야 하는 변수라면 let 사용
// 변수에 재할당하면 오류의 원인이 될 수 있다.

// let: mutable. reassign 할 수 있다.
let age = 30;
age = 31;

// const: immutable. value를 바꿀 수 없다.
const birthYear = 1990;
// birthYear = 1991; // 에러

// const: 반드시 초깃값을 가지고 선언해야 한다.
// const job; // 에러

// var: ES6 이전에 사용. let과 비슷하게 재할당이 가능.
// let과 똑같아보이지만 scope 범위가 다름
var hobby = "programming";
hobby = "teaching";

// 변수를 선언하지 않고 그냥 쓰기 -> 금지. 현재 scope가 아니라 global object에 property를 생성하게 됨
lastName = "abel";
console.log(lastName);



// 14. Basic Operators
// Math operator
// -, *, /, **
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

// +: string의 concatenation에도 사용
const firstName = "jonas";
const lastName = "sch";
console.log(firstName + " " + lastName);

// Assignment operator
let x = 10 + 5; // 15
x += 10; // x = x + 10
x *= 4; // x = x * 4
x++; // x = x + 1
x--; // x = x - 1
x--;
console.log(x);

console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);



// 15. Operator Precedence
// mdn 연산자 우선순위 표 (table칸)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

// 우선순위가 높은 - 부터 왼쪽->오른쪽으로 계산되고, >가 쓰인다.
console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // - 부터 계산, =는 오른쪽->왼쪽 순이기 때문에 y = 10, x = 10 순으로 실행된다
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2; // ()를 반드시 쳐줘야 평균을 계산할 수 있다.
console.log(ageJonas, ageSarah, averageAge);



//17. Strings and Template Literals
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

// ""이든 ''이든 시작부호와 마지막 부호만 같으면 된다.
// 안에 "나 '를 쓰고 싶으면 다른 부호로 시작할 것
// 숫자를 계산한 후에 자동으로 str로 바꿔주는데, 이를 type coercion이라 한다.
const jonas =
  "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";
console.log(jonas);

// 템플릿 리터럴: ES6에서 사용
// 안에 어떤 자바스크립트 코드든 쓸 수 있다.
const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

// 변수가 들어가지 않은 일반적인 스트링까지 템플릿 리터럴로 쓰기도 한다.
console.log(`Just a regular string...`);

// multiline string
// \n: 엔터를 나타내는 char
// \n뒤의 \: 자바스크립트에서 엔터치고 코드를 치고 싶을 때 써줌
console.log(
  "string with \n\
multiple \n\
lines"
);

console.log(`string with
multiple
lines`);



//18. Taking Decisions: if / else Statements
// control structure라고도 함

const age = 15;

// if / else Statements
// else문은 선택적으로 쓸 수 있다
if (age >= 18) {
  console.log("Sarah can start driving license 👍");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. wait another ${yearsLeft} years :()`);
}

const birthYear = 1998;

// 변수를 코드 블럭 안에서 생성하면, 전역에서 변수를 불러올 수 없다.
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

//20. Type Conversion and Coercion

// 1) Type Conversion : 코드로 명시해줬을 때 형변환한다. number, string, boolean으로 변환할 수 있다. undefined, null로는 불가능.
const inputYear = "1991";
// Number(): string to number. 넣어준 변수 자체를 바꾸지 않고, 바꾼 결과를 return
console.log(Number(inputYear), inputYear);
// string에 + 기호를 쓰면 concatenate 한다.
console.log(inputYear + 18); // "199118"
console.log(Number(inputYear) + 18); // 2009

// 숫자가 될 수 없는 것을 숫자로 형변환했을 때
// NaN: Not a Number. Invalid Number를 뜻한다. 숫자 관련한 계산이 숫자를 return하는 것에 실패했을 때 나옴.
console.log(Number("Jonas")); // NaN
console.log(typeof NaN); // number

// String(): string to Number
console.log(String(23), 23);

// 2) Type coercion : 자바스크립트가 우리 모르게 형변환을 해준다. 알고 있어야 버그를 내지 않을 수 있다.
// + : number를 string으로 바꿔서 concatenate
console.log("I am " + 23 + " years old"); // "I am 23 years old"
// -, *, / : string을 number로 바꾸어 계산
console.log("23" - "10" - 3); // 10
console.log("23" * "2"); // 46
console.log("23" / "2"); // 11.5

// 3) 예제
let n = "1" + 1; // "11"
n = n - 1;
console.log(n); // 10

// 왼쪽부터 오른쪽으로 가며 한 연산씩 진행한다.
console.log(2 + 3 + 4 + "5"); // "95"
console.log("10" - "4" - "3" - 2 + "5"); // "15"



// 21. Truthy and Falsy Values
// Falsy values: 0, '', undefined, null, NaN
// false가 아니지만, boolean으로 변환했을 때 false인 것들.
// 나머지는 모두 Truthy values

// 실제로 Boolean()은 잘 쓰지 않는다. 대신 자바스크립트가 type coercion을 해줌
console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("jonas")); // true
console.log(Boolean({})); // true
console.log(Boolean("")); // false

// 0 => falsy value
const money = 0;
if (money) {
  console.log("money exists");
} else {
  console.log("money 0");
}

// 변수가 초기화 되었는지 아닌지 판단
// undefined => falsy value
// height를 0으로 선언하면 0도 falsy value이기 때문에, 로직에 맞지 않는 버그가 생긴다.
let height;
if (height) {
  console.log("height is defined");
} else {
  console.log("height is undefined");
}



// 22. Equality Operators: == vs. ===
// age === 18는 true or false를 반환
// 실행할 코드가 한 줄이면 if 블럭 {}를 생략할 수 있다.
const age = 18;
if (age === 18) console.log("You just became an adult");

// === : strict equality operator. type coercion을 하지 않기 때문에 정확하게 같을 때만 true 반환
// == : loose equality operator. type coercion을 한다. 규칙이 매우 복잡하다.
// == 연산자를 사용하면 버그가 날 확률이 높아, 아예 존재하지 않는 것으로 생각하고 반드시 쓰지 말자.
const age2 = "18";
if (age2 === 18) console.log("You just became an adult (strict)"); // false
if (age2 == 18) console.log("You just became an adult (loose)"); // true
// => '18' string이 number 18로 변환되어 true

// prompt는 string을 반환하기 때문에 Number로 감쌌다.
const favorite = Number(prompt("What's your favorite number?"));
console.log(favorite);
console.log(typeof favorite);

if (favorite == 23) {
  // '23' == 23 은 true
  console.log("cool! 23 is an amazing number! (loose)");
}

if (favorite === 23) {
  // '23' == 23 은 Number()로 형변환 해줘야 true
  console.log("cool! 23 is an amazing number! (strict)");
} else if (favorite === 7) {
  console.log("cool! 7 is an amazing number!");
} else if (favorite === 9) {
  console.log("cool! 9 is an amazing number!");
} else {
  console.log("Number is not 23 or 7 or 9");
}

// different operator
if (favorite !== 23) console.log("Why not 23?");



// 23. Boolean Logic
// js 뿐만 아니라 모든 프로그래밍 언어에 공통적으로 적용된다.
// truth table을 그려보면 연산 결과를 쉽게 알 수 있다.
// 1) AND : 모두 true면 true. js에서는 &&
// 2) OR : 하나만 true여도 true. js에서는 ||
// 3) NOT : true, false를 토글해줌. js에서는 !
// NOT은 AND, OR 보다 연산자 우선순위가 높다 (먼저 계산한다).



// 24. Logical Operators
const hasDriverLicense = true; // A 조건
const hasGoodVision = false; // B 조건

console.log(hasDriverLicense && hasGoodVision); // false
console.log(hasDriverLicense || hasGoodVision); // true
console.log(!hasDriverLicense); // false

if (hasDriverLicense && hasGoodVision) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}

const isTired = false; // C 조건
console.log(hasDriverLicense && hasGoodVision && isTired);

// 논리연산자를 추가하려면 +, - 처럼 오른 쪽에 추가하면 된다.
if (hasDriverLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}



// 26. The switch Statement
const day = "thursday";

// switch문. 길어질 수 있으나 가독성이 좋다.
switch (day) {
  case "monday": // day === "monday" 와 같다. strict comparision
    console.log("plan");
    console.log("go to meetup");
    break;
  case "tuesday":
    console.log("prepare videos");
    break;
  case "wedensday":
  case "thursday":
    console.log("write code");
    break;
  case "friday":
    console.log("recore videos");
    break;
  case "saturday":
  case "sunday":
    console.log("enjoy the weekend");
  default:
    console.log("not a valid day.");
}

// 위 switch문과 로직은 같고 문법만 다른 코드
if (day === "monday") {
  console.log("plan");
  console.log("go to meetup");
} else if (day === "tuesday") {
  console.log("prepare videos");
} else if (day === "wedensday" || day === "thursday") {
  console.log("write code");
} else if (day === "friday") {
  console.log("recore videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("enjoy the weekend");
} else {
  console.log("not a valid day.");
}



// 27. Statements and Expressions
// expressions: 그 자체로 value를 만드는 코드. 문장을 이루는 단어 같은 것
3 + 4;
1991;
true && false && !false;

// statements: value를 만들지 않고 원하는 action을 취하도록 해주는 코드. 문장 같은 것. ;로 끝나는 것들은 statement
// if statement
if (23 > 10) {
  const str = "23 is bigger"; // 이 줄은 statement, "23 is bigger"는 expression이다.
}

// js에서는 expression, statement 중 하나만 들어갈 수 있는 경우가 있다.
// ex) 템플릿 리터럴에는 expression만 들어갈 수 있다.
const me = "jonas";
console.log(`I'm ${2037 - 1999} years old ${me}`); // ${} 안에 if statement를 넣으면 에러 발생



// 28. The Conditional (Ternary) Operator
// value를 만드는 expression이다. (operator)
// 3부분으로 이루어져있어서 Ternary operator 라고도 한다.
// if/else statement 같은 역할을 하며, 훨씬 가독성있고 짧게 코드를 쓸 수 있다.
// if/else statement는 expression이 될 수 없으므로, 이때 Conditional Operator를 쓸 수 있다.
// 대신 Conditional Operator는 여러 줄의 코드를 넣을 수 없다. 이때는 if/else statement를 사용해야 한다.
const age = 23;
age >= 18
  ? console.log("I like to drink wine")
  : console.log("I like to drink water");

// 변수 선언에 조건을 줄 때 유용하게 사용된다.
const drink = age >= 18 ? "wine" : "water";
console.log(drink);

// 위 코드와 같음.
// 블럭 안에서 변수를 선언하면 블럭 밖에서 쓸 수 없기 때문에 밖에서 선언
let drink2;
if (age >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(drink2);

// expression이므로 템플릿 리터럴에 사용할 수 있다.
console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);



// 30. JavaScript Releases: ES5, ES6+ and ESNext
// 어떤 브라우저에서 modern js 기능을 지원하는지 표
// https://kangax.github.io/compat-table/es6/
*/
