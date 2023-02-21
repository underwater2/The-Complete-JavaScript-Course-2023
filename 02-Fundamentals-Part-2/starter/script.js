"use strict";
/*
// 32. Activating Strict Mode
// strict mode: 안전한 js 코드를 작성하게 해줌, 꼭 가장 윗줄에 작성해야 적용된다. script 꼭 작성하도록 버릇을 들이자.
// 1. 잘못된 특정 코드 작성을 불가능하게 한다.
// 2. 원래라면 조용히 실패했을 것을, 무엇이 에러를 유발하는지 사용자에게 보여준다.

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
// if (passTest) hasDriverLicense = true; // 변수명이 틀렸으므로 콘솔에는 아무것도 뜨지 않는다. strict mode시에는 콘솔에 오류를 띄워줘서 에러를 쉽게 해결할 수 있다.
if (hasDriversLicense) console.log("I can drive!!");

// strict mode는 reserved words(예약어) 사용시 에러를 띄워준다.
// Uncaught SyntaxError: Unexpected strict mode reserved word
// const interface = "Audio";
// const private = 534;
// if를 변수 이름으로 쓰면 if문으로 인식한다.



// 33. Functions
// js의 가장 fundamental building lock
// 코드의 재사용성을 높여주어 clean code 작성에 도움을 준다. (반복적인 코드를 줄여준다.)
function logger() {
  console.log("My name is Jonas");
}

// calling / running / invoking function
// 함수를 여러 번 호출하는 모습 -> 중복코드 줄이기
logger();
logger();
logger();

// parameter: 함수가 call됐을 때 define된다. 코드 안의 빈 공백 역할. 함수 블럭 안에서만 쓸 수 있음
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

// argument: parameter에 들어가는 실제 value. ex) 5
// 함수가 실행되고나면 fruitProcessor(5, 0)는 return 값으로 대체된다.
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// built in 함수
console.log();
const num = Number("23");



// 34. Function Declarations vs. Expressions
// 1) function declaration
// 선언이지, 익명함수가 아니다.
function calcAge1 (birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1991);

// 2) function expression
// anonymous function(익명 함수)를 변수에 할당한다. 이 익명 함수는 expression이다. (value를 만든다)
// calcAge2는 함수가 된다.
// + 자바스크립트에서 함수는 value다. string, number와 같은 type이 아니다.
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);

console.log(age1, age2);

// 3) function declaration과 function expression의 차이점
// - declaration: 함수를 정의하기 전 코드에서 호출할 수 있다. hoisting 때문

// 4) 둘 중에 무엇을 써야 할까?
// - 개인적 선호에 따라 쓰면 된다. 하지만 둘다 알고있어야 한다.



// 35. Arrow Functions
// function expression의 다른 형태. 코드를 더 간단하게 요약해서 쓸 수 있다.

// 1) parameter가 하나, 실행할 코드는 return 한 줄 (가장 간단한 형태)
// parameter를 ()로 안감싸도 되나, 아래는 prettier가 자동으로 넣어준 것임
// cmd + (로 선택한 글자들을 ()로 감쌀 수 있다. (vscode 단축키)
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

// 2) 실행할 코드가 여러 줄일 때 -> {} 필요
// 3) parameter가 한 개 이상일 때 -> () 필요
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));

// * 언제 어떤 타입의 함수를 사용해야 할까?
// - arrow function만 사용하면 안된다. 다른 두 함수 타입과 근본이 다르기 때문. 이 부분은 나중에 설명한다고 함



// 36. Functions Calling Other Functions
// - 중복코드 제거 효과
// - 내용의 변경이 있을 때, 여러 줄의 코드를 수정할 필요 없이 함수 안의 내용만 바꿔주면 된다 (수정하며 생기는 버그를 피할 수 있다)
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));



// 37. Reviewing Functions
// 함수 배운 내용 복습

// 다른 함수에서 같은 parameter name을 써도 아무 상관 없다. (함수의 local variable같은 것임)
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  // return 키워드는 즉시 함수를 종료시킨다. => return 뒤에 코드를 넣으면 실행될 수 없다.
  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    // -1: 프로그래밍적으로 아무 의미 없다는 뜻의 standard
    return -1;
  }
};
console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));

// 함수 이름 옆에 ()를 쓰지 않으면, 함수 value 그 자체일 뿐이며 함수 실행은 되지 않는다.



// 39. Introduction to Arrays
// Array: 자료 구조 중 하나. 데이터를 저장하고 꺼내는 컨테이너 역할. 요소의 타입은 상관 없다.
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

// * Array 생성 방법 1)
// 더 자주 쓰인다.
const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

// * Array 생성 방법 2)
// Array 라는 함수를 호출하여 생성한다.
const y = new Array(1991, 1984, 2008, 2020);

// * x번째 요소를 출력하기
// Array는 zero-based여서 인덱스가 0부터 시작한다.
console.log(friends[0]);
console.log(friends[2]);

// * Array의 요소 갯수 구하기
// .length는 Array의 property다.
console.log(friends.length);

// * Array의 마지막 요소 출력하기
// [] 안에는 expression이 들어가야 한다. 숫자가 아니어도 상관 없다.
console.log(friends[friends.length - 1]);

// Array를 const로 선언했어도 요소를 바꿀 수 있다. primitive value만 immutable하고, Array는 primitive value가 아니기 때문
// 대신 Array를 통째로 바꾸는 것은 안된다.
friends[2] = "Jay";
console.log(friends);
// friends = ["Bob", "Alice"];
// friends = 3;

// Array 안에는 여러 가지 타입의 요소들이 들어갈 수 있다.
// 요소는 Expression이면 된다. 변수이름, 식, 배열 모두 들어간다.
const firstName = "Jonas";
const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

// * Exercise
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

// 함수를 먼저 호출하고, 다음 array에 replace 한다.
const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);



// 40. Basic Array Operations (Methods)

// method: 객체에 할당된 함수. 객체 옆에 .을 붙여 쓴다.

// 1) push(추가할 요소): 배열의 오른쪽에 요소 추가. 추가 후 배열의 길이를 반환
const friends = ["Michael", "Steven", "Peter"];
const newLength = friends.push("Jay");
console.log(friends);
console.log(newLength);

// 2) unshift(추가할 요소): 배열의 왼쪽에 요소 추가. 추가 후 배열의 길이를 반환
friends.unshift("John");
console.log(friends);

// 3) pop(): 배열의 오른쪽 요소 제거. 제거 후 제거된 요소를 반환
friends.pop();
const popped = friends.pop();
console.log(popped);
console.log(friends);

// 4) shift(): 배열의 왼쪽 요소 제거. 제거 후 제거된 요소를 반환
friends.shift();
console.log(friends);

// 5) indexOf(찾고싶은 요소): 배열에서 특정 요소의 index를 찾아 반환
console.log(friends.indexOf("Steven")); // 1
console.log(friends.indexOf("Bob")); // 없으면 -1 반환

// 6) includes(찾고싶은 요소): 배열에 특정 요소가 있으면 true, 없으면 false 반환.
// strict equality라서 type coercion 하지 않고 value의 내용과 타입 모두 같아야 한다.
friends.push(23);
console.log(friends.includes("Steven")); // true
console.log(friends.includes("Bob")); // false
console.log(friends.includes("23")); // false -> 타입이 다르므로 23과 "23"은 같지 않다.



// 42. Introduction to Objects
// Objects: 객체. key-value pair로 이루어져있다. array와 다르게 순서는 중요하지 않고, key로 value를 찾는다.
// value는 property라고도 한다. value에는 Expression이 들어간다.

const jonasArray = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Steven", "Peter"],
];

// * 객체를 생성하는 방법
// object literal syntax: 가장 쉽고 많이 쓰는 방법이다.
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Steven", "Peter"],
};



// 43. Dot vs. Bracket Notation
// 객체에서 value를 가져오는 두 가지 방법 . []
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Steven", "Peter"],
};
console.log(jonas);

// 1) Dot Notation: 정확한 key 값을 가지고만 쓸 수 있다.
console.log(jonas.lastName); // Schmedtmann

// 2) Bracket Notation: [] 안에 어떤 Expression이든 들어갈 수 있다.
// ex 1)
console.log(jonas["lastName"]); //Schmedtmann

const nameKey = "Name";
console.log(jonas["first" + nameKey]); // Jonas
console.log(jonas["last" + nameKey]); //Schmedtmann

// ex 2)
// prompt(): js의 built-in 함수. script의 어떤 곳에서나 부를 수 있다.
const interestedIn = prompt(
  "What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends"
);

// jonas.interestedIn은 undefined를 반환한다. jonas 객체에 그런 Key는 없다는 뜻
// [] 사용시에는 interestedIn이 Expression이므로 value를 잘 불러온다.
// undefined는 falsy value이므로 아래 if 조건에 사용할 수 있다.
if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job, and friends"
  );
}

// 3) 둘 중에 어떤 방식을 써야 하나?
// 평소에는 Dot Notation을 쓰고, 연산을 해야할 때는 Braket Notation을 써라

// 4) 객체에 key-value pair 추가하기
jonas.location = "Portugal";
jonas["twitter"] = "@jonasschmedtman"; // 마찬가지로 [] 안에는 Expression이면 뭐든 들어간다.
console.log(jonas);

// 5) Challenge
// "Jonas has 3 friends, and his best friend is called Michael" 만들기
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
);



// 44. Object Methods
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Steven", "Peter"],
  hasDriverLicense: true,

  // 객체 안에 포함된 함수를 method라고 한다. 메서드는 또한 value이므로 property다. (익명함수은 Expression이므로 value로 쓸 수 있다.)
  // this 키워드: 메서드를 호출하는 객체를 가리킨다. 코드를 중복으로 쓰는 것을 막아준다.
  calcAge: function () {
    console.log(this); // jonas 객체 출력
    this.age = 2037 - this.birthYear; // 같은 객체 안의 property를 사용, 새로 할당
    return this.age; // return은 선택
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }, and he has ${this.hasDriverLicense ? "a" : "no"} driver's license`;
  },
};

// * 함수 실행하는 2가지 방법
// 함수를 불러오고, ()를 붙여 실행시켜야 한다.
console.log(jonas.calcAge());
console.log(jonas["calcAge"]());

// jonas.calcAge()를 여러번 실행시켜서 그 때마다 jonas.age를 받을 필요 없이, 메서드로 계산 후 jonas.age에 저장해놓고 불러오면 된다.
// 메서드를 여러 번 실행하게 되면 성능적으로 좋지 않을 수 있다.
console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

// Challenge
// "Jonas is a 46-year old teacher, and he has a driver's license"
console.log(jonas.getSummary());

// Array는 객체이며, 그래서 .push(), .pop() 등의 메서드를 사용할 수 있다.



// 46. Iteration: The for Loop
// for loop: 반복작업을 해야 할 때, 중복코드를 만들지 않고 작성 가능하다. 모든 프로그래밍 언어에 공통적으로 존재한다.

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop는 condition이 true면 끝나지않고 계속 실행된다.
// rep 변수는 counter 역할
// condition 검증은 매 반복 전에 일어난다.
// 반복 후에 rep++가 일어난다.
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}



// 47. Looping Arrays, Breaking and Continuing
// 1) for loop를 array 순회하는 데 사용
const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Steven", "Peter"],
  true,
];

// for loop을 사용하지 않는다면?
// console.log(jonas[0])
// console.log(jonas[1])
// ...
// console.log(jonas[4])
// jonas[5]는 존재하지 않는다.

// 사용 예시 1)
const types = [];

// array는 인덱스가 0부터 시작하기 때문에, counter i를 0으로 초기화시켰다.
// 숫자를 하드코딩하지 않고 jonas.length로 써줘서, array의 길이가 변경되어도 요소 전체를 순회하도록 했다.
// array의 type은 object다.
for (let i = 0; i < jonas.length; i++) {
  console.log(jonas[i], typeof jonas[i]);

  // 새 array에 jonas 요소들의 type 이름을 넣기
  // 새로운 요소를 넣을 때 쓸 수 있는 2가지 방법
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}
console.log(types);

// 사용 예시 2)
const years = [1991, 2007, 1969, 2020];
const ages = [];

// 숫자와 배열끼리는 연산할 수 없으므로, for loop로 배열의 요소들을 순회하여 계산한다.
for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// 3) continue and break
// continue: 현재 반복을 끝내고 다음 반복으로 넘어간다.
console.log("--- ONLY STRINGS ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;

  console.log(jonas[i], typeof jonas[i]);
}
// break: 전체 반복 자체를 끝낸다.
console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;

  console.log(jonas[i], typeof jonas[i]);
}



// 48. Looping Backwards and Loops in Loops
const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Steven", "Peter"],
  true,
];

// 1) array의 인덱스 거꾸로 순회하기
// 0, 1, ..., 4
// 4, 3, ..., 0

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}

// 2) for loop 내부에 또다른 for loop 만들기
// exercise <= 3 으로 써도 같다.
for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);

  // 내부 for loop에서도 바깥 for loop의 변수에 접근할 수 있다.
  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
  }
}



// 49. The while Loop
// while loop: counter 변수에 구애되지 않고(몇 번 반복해야하는지 반드시 정할 필요가 없음) 조건만 가지기 때문에, for loop보다 유연하고 사용할 곳이 많다.
// 1) while loop를 for loop와 똑같이 동작하게 하기
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++; // loop의 마지막 부분에서 counter를 증가시킨다.
}

// 2) 몇 번 반복되는지 정할 필요가 없는 경우 => while loop 사용
// 반대로 몇 번 반복되는지 아는 경우 => for loop 사용
let dice = Math.trunc(Math.random() * 6) + 1; // 1, 2, 3, 4, 5, 6 중 랜덤

// 처음 dice가 6이면, 아예 while loop를 돌지 않는다.
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1; // 이 부분이 없으면 infinite loop로 빠진다.
  if (dice === 6) console.log("Loop is about to end...");
}
*/
