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
function calcAge1(birthYear) {
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
// key는 property라고도 한다. value에는 Expression이 들어간다.

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
*/
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
jonsa["twitter"] = "@jonasschmedtman"; // 마찬가지로 [] 안에는 Expression이면 뭐든 들어간다.
console.log(jonas);
