'use strict';

/*
// [128. Default Parameters]
const bookings = [];

// ES6 이후 default value 특징
// 1. 파라미터를 직접 쓰면, default value을 덮어쓸 수 있다.
// 2. default value 자리에 어떤 expression이라도 쓸 수 있다.
// 3. 다른 파라미터를 expression으로 쓰는 경우, 사용하는 파라미터가 앞쪽에 위치해야 한다.
const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
  // ES5(ES6 전)에 default value를 설정하던 방법 - 지저분해서 잘 쓰지 않는다.
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price
  };
  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// 4. 중간값을 default value로 하고, 뒤 값을 파라미터 지정하고 싶을 경우 undefined를 사용한다
// - argument를 지정하지 않았을때, 해당 파라미터는 undefined가 되므로 결국 같은 것이다.
createBooking('LH123', undefined, 1000);
*/


// [129. How Passing Arguments Works: Value vs. Reference]
// 1. 함수에 파라미터로 넣을 경우, primitive type과 reference type의 차이!!
// primitive type인 flight 변수는 함수에 파라미터로 들어갈 때, 복사본을 만들어 넣는다. -> 함수 내에서 변화를 주어도 원래 변수에는 영향을 주지 않는다.
// reference type인 jonas 객체는 함수에 파라미터로 들어갈 때, 객체의 주소값을 복사하여 넣는다. -> 이 주소는 메모리 힙 내에 있는 같은 객체를 가리키고있으므로, 함수 내에서 변화를 주면 원래 변수도 변한다.
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert("Checked in");
  } else {
    alert("Wrong passport!");
  }
};
checkIn(flight, jonas);

console.log(flight); // LH234
console.log(jonas); // {name: 'Mr. Jonas Schmedtmann', passport: 24739479284}

// 함수에 파라미터로 변수를 넣는 것은 아래와 같다고 보면 된다...
const flightNum = flight;
const passenger = jonas;

// 2. 객체를 변경하는 다른 함수(newPassport)가 있을 경우, 원래 함수(checkIn)에도 영향을 줄 수 있다.
// -> 주의해야 한다.
const newPassport = function(person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
}

newPassport(jonas);
checkIn(flight, jonas);

// 3. 헷갈리는 부분 추가 설명
// 자바스크립트는 pass by reference할 수 없다(reference, 즉 객체 자체를 전달할 수 없다?)
// pass by value만 가능하다.
// 겉보기에는 reference를 전달하는 걸로 보이지만, 실제로는 주소값이라는 value를 전달하는 것이다.
// C++ 같은 언어에서는 가능하지만 js에서는 안된다.



// [130. First-Class and Higher-Order Functions]
// 1. first-class function
// - js는 first-class citizen(일급 객체)을 가지고, 이 덕분에 Higher-Order Functions(고차함수)를 사용할 수 있다.
// - js에서 함수는 first-class citizen(일급 객체)이다.
// - 함수는 객체의 한 종류이다.
// - 함수는 value라는 것을 의미 <- 객체는 value이다
// - 함수를 변수에 할당할 수 있고, 객체의 property로 넣어 메서드로 만들 수 있다.
// - 함수에서 다른 함수를 parameter로 전달받을 수 있다.
// - 함수에서 다른 함수를 return할 수 있다.
// - 함수에서 메서드를 call할 수 있다. <- 함수는 객체이기 때문에 가능함

// 2. Higher-Order Functions(고차함수)
// 1) 다른 함수를 parameter로 전달받는 함수
// - parameter로 전달되는 함수는 callback function이라 한다. <- 나중에 실행될 것이기 때문에
// 2) 다른 함수를 return하는 함수

// 3. first-class function과 Higher-Order Functions(고차함수)의 차이점
// 1) first-class function
// - 실제로 first-class function이라는 것은 존재하지 않는다.
// - 모든 함수는 value라는 것을 의미하기 위해 쓰는 말
// - js 말고도 모든 프로그래밍 언어에 유효한 개념
// 2) Higher-Order Functions(고차함수)
// - first-class function를 지원하는 언어에는 실제로 존재한다.



// [131. Functions Accepting Callback Functions]