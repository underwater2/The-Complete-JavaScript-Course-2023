'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// (3) ES6 enhanced object literals [112.]
// value에서처럼 property에서도 계산(compute)할 수 있으며, 다른 변수에서 값을 끌어다 쓸 수도 있다.
// - [] 안에는 어떤 expression이라도 쓸 수 있다
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  // [`day-${2+4}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
  // [2 + 4]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // (1) ES6 enhanced object literals [112.]
  // property 이름과 value가 될 변수의 이름이 같으면, 변수 이름만 써도 된다. 자동으로 property 등록해줌
  openingHours,

  // (2) ES6 enhanced object literals [112 .]
  // propertyName: function() {},
  // 위의 방식을 아래처럼 축약해서 쓸 수 있다.
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
// =================================================================
// [103. Destructuring Arrays]
// Destructuring: ES6 기능. Array나 Object의 value들을 변수로 해체해주는 것.

const arr = [2, 3, 4];
// 1. array의 value를 찾기
// destructuring 하지 않음
const a = arr[0];
const b = arr[1];
const c = arr[2];

// destructuring
// 원본 array에는 영향을 미치지 않는다.
const [x, y, z] = arr;
console.log(x, y, z); // 2 3 4
console.log(arr);

// array의 첫번째, 세번째 value만 가져오고 싶을 때 -> 선언할 때 중간에 공백을 둔다.
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// 2. main과 secondary의 값을 서로 바꾸고싶을 때 (Switching variable)
// destructuring 하지 않음
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// destructuring
// 재할당이라서 const, let은 없음
// 중간매개(temp)가 없다는 장점 있음
[secondary, main] = [main, secondary];

// 3. Receive 2 return values from a function
// 간편하게 함수 return 값을 변수로 빼낼 수 있다.
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// 4. Nested destructuring (destructuring 중첩하기)
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j); // 2 (2) [5, 6]

const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 5 6

// 5. Default values
// 배열의 길이를 모를 때, 변수의 기본값 설정하기
// api에서 데이터를 받아올 때 등, 실제로 많이 사용된다.

// 사용하지 않았을 때 문제점 예시
// const [p, q, r] = [8, 9];
// console.log(p, q, r); // 8 9 undefined

// 사용 예시
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1



// [104. Destructuring Objects]
// 배열과 다르게 {}를 사용한다.
// 배열과 다르게 property의 순서가 없으므로, 정확한 property name이 필수이다.
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// 6. 함수의 parameter로 객체 전달하기
// 함수의 parameter가 많을 때 사용한다. parameter 순서를 기억하지 않아도 된다는 장점 있음
// 서드 파티 라이브러리에서 많이 사용
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// 1. 변수 이름으로 property name과 다른 이름 사용하기
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// 2. Default Values 설정하기
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); // menu만 undefined이므로 []이 된다.

// 3. Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// // 사용하지 않았을 때 문제점 예시
// a, b가 이미 선언되어서 const, let은 못쓴다.
// 아래처럼 쓰면 {a, b}는 코드 블럭으로 인식이 되어, 코드블럭에 obj를 할당하는 꼴이 되어 오류가 난다.
// {a, b} = obj; // Uncaught SyntaxError: Unexpected token '=' (at script.js:57:8)

// ()로 감싸주면 오류 나지 않고 잘 작동한다
({ a, b } = obj);
console.log(a, b); // 23 7

// 4. Nested Objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // 11 23



// [105. The Spread Operator (...)]
// Spread Operator: ES6 기능. arr 안에 있는 요소들을 꺼내어 하나하나 나열해준다.
// 모든 iterable에 사용할 수 있다. (array, string, map, set 등이며, object는 해당 안됨)
// - ES2018부터 object에도 사용할 수 있게 되었다.

// 1. array를 만들 때
// (bad) 지금까지 쓰던 방식
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // (5) [1, 2, 7, 8, 9]

// (good) Spread operator를 쓴 방식
const newArr = [1, 2, ...arr];
console.log(newArr); // (5) [1, 2, 7, 8, 9]

console.log(...newArr); // 1 2 7 8 9
console.log(1, 2, 7, 8, 9); // 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array (shallow copy)
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets, NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// ,로 나뉘어진 여러 개의 value들을 쓸 수 있는 곳은 아래 두 가지
// 1. array를 만들 때
// 2. 함수에 arguments를 전달할 때
// 아래는 error
// console.log(`${...str}`);

// 2. 함수에 arguments를 전달할 때
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredients);

// (bad) 지금까지 쓰던 방식
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// (good) Spread operator를 쓴 방식
restaurant.orderPasta(...ingredients);

// Objects 복사하기 (Shallow copy)
// 원래 객체의 property들을 풀어준다.
// property들의 순서는 상관없다.
const newRestaurant = { foundedIn: 1988, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano



// [106. Rest Pattern and Parameters]
// spread operator와 반대로 요소들을 모아 array로 만들어준다. (destructuring assignment 되지 않은 요소들을 묶음)
// spread operator와 ...를 쓰는 점이 같지만, 위치한 곳이 할당 연산자(=)의 왼쪽이냐 오른쪽이냐에 따라서 서로 구분된다.

// 1. Destructuring
// SPREAD, because on LEFT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// error
// rest pattern 뒤에 변수가 오면 안된다.
// rest pattern을 한 번에 두 개 이상 쓸 수도 없다.
// const [pizza, , risotto, ...otherFood, bread] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2. Functions
// numbers는 모든 parameter들을 모은 array가 된다.
// parameter를 처음부터 array로 하는 것보다 이 방식이 낫다.
// - 들어갈 parameter들을 개별로도, array로 묶어서도 전달할 수 있기 때문에 더 좋다.
const add = function (...numbers) {
  console.log(numbers); // (2) [2, 3]
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

// mainIngredient: mushrooms
// otherIngredients: ['onion', 'olives', 'spinach']
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// mainIngredient: mushrooms
// otherIngredients: []
restaurant.orderPizza('mushrooms');



// [107. Short Circuiting (&& and ||)]
// Logical operator(AND, OR)의 특징
// 1) Use ANY data type
// 2) return ANY data type
// 3) short-circuiting
//   - OR: 가장 앞에 있는 truthy value를 return한다. 뒤의 연산은 생략한다.
//   - AND: 가장 앞에 있는 Falsy value를 return한다. 뒤의 연산은 생략한다.

// 1. OR
// 모두 Falsy value면 가장 마지막 value를 return 한다. short-circuiting는 일어나지 않는다.
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

// 사용예시) 변수에 default value 설정하기
// 주의) 아래 두 방식에서는 restaurant.numGuests = 0; 일때는 원하는 대로 동작하지 않는다. 해결법은 다음 장에
// 기존 방식
// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10

// OR operator 사용
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('----------');

// 2. AND
// 모두 Truthy value면 가장 마지막 value를 return 한다. short-circuiting는 일어나지 않는다.
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // Jonas

console.log('Hello' && 23 && null && 'Jonas'); // null

// 사용예시) ~가 존재하면 ~를 수행시키기
// 아래 if else문과 &&은 똑같은 동작을 한다
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// && 뒤에 single value 말고도 아무거나 와도 된다.
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');



// [108. The Nullish Coalescing Operator (??)]
// The Nullish Coalescing Operator (??)
// - ES2020에 도입
// - OR Operator와 비슷하지만 약간 다름
// - Nullish: null and undefined (NOT 0 or '')
// -> null과 undefined만 Falsy value로 취급하고, 0과 ''는 Truthy value로 취급한다.
// -> 따라서 0과 ''일 때도 Short circuiting이 일어난다.

// OR 연산자로 변수에 default value 설정하기
// 문제) restaurant.numGuests가 0으로 설정되어있을 때도 default value(10)을 갖게된다.
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// 원하는대로 잘 동작함
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);



// [109. Logical Assignment Operators]
// - ES2021에 도입

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// 1. OR assignment operator (||=)
// - 왼쪽 변수가 falsy면 오른쪽의 값을 할당함.
// numGuests property가 있으면 그대로 놔두고, 없으면 default value로 10을 줌
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// 2. nullish assignment operator(??=)
// - nullish: null이나 undefined를 의미
// - 왼쪽 변수가 nullish면 오른쪽의 값을 할당함.
// - 1.OR에서 있던 문제를 해결) rest1.numGuests이 0으로 설정되어있을 때, falsy이기 때문에 default value를 할당하는 문제.
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// 3. AND assignment operator(&&=)
// - 왼쪽 변수가 truthy면 오른쪽의 값을 할당함.
// 객체에 owner property가 있으면 <ANONYMOUS>로 바꿔준다.
// rest1.owner = rest1.owner && '<ANONYMOUS>'; // {name: 'Capri', numGuests: 0, owner: undefined}
// rest2.owner = rest2.owner && '<ANONYMOUS>'; // {name: 'La Piazza', owner: '<ANONYMOUS>', numGuests: 10}

// 왼쪽이 falsy면 아무일도 일어나지 않고 끝난다. owner: undefined 가 들어가지 않아 AND operator를 쓰는 것보다 더 깔끔하다.
rest1.owner &&= '<ANONYMOUS>'; // {name: 'Capri', numGuests: 0}
rest2.owner &&= '<ANONYMOUS>'; // {name: 'La Piazza', owner: '<ANONYMOUS>', numGuests: 10}

console.log(rest1);
console.log(rest2);



// [110.Coding Challenge #1]

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// We're building a football betting app (soccer for my American friends 😅)!

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// GOOD LUCK 😀

// 1
// destructuring
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// 2
// destructuring, rest syntax(...)
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3
// spread operator(...)
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5
// destructuring
// 내 답변
// const { team1, draw, team2 } = game.odds;
// 강의자 답변
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6 (문제가 이해 안감)
// rest parameter 쓰기 : 모든 argument들을 한 array에 모아준다.
const printGoals = function (...players) {
  console.log(...players);
  console.log(`${players.length} goals were scored`);
};
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
printGoals(...game.scored);

// 7
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
// team1 < team2 || console.log('Team 2 is more likely to win');



// [111. Looping Arrays: The for-of Loop]
// ES6에서 도입

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// item은 각 menu를 순회하는 iteration에서 현재 element이다.
// continue, break를 사용할 수 있다.
for (const item of menu) console.log(item);

// 각 element의 index를 알고싶을 때
// + destricturing assignment
// array.entries()와 Object.entries()의 차이 알기!
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
// console.log(menu.entries()); // Array Iterator {}
// console.log([...menu.entries()]); // [[0, 'Focaccia'], [1, 'Bruschetta'], [2, 'Garlic Bread'],...등등]



// [112. Enhanced Object Literals]
// ES6 이후 Object Literals 작성이 더 편리해짐
// - 위 restaurant 객체를 가지고 설명했다.
// (1) property 이름과 value가 될 변수의 이름이 같으면, 변수 이름만 써도 된다.
// (2) 메서드 간단하게 쓰기
// (3) property를 expression으로 쓰기



// [113. Optional Chaining (?.)]
// ES2020에 도입
// ?. 왼쪽의 property가 존재하지 않으면 error 대신 undefined를 반환한다.

// console.log(restaurant.openingHours.mon); // undefined
// undefined의 property를 읽으려하면 에러가 난다.
// console.log(restaurant.openingHours.mon.open); // Uncaught TypeError: Cannot read properties of undefined (reading 'open')

// restaurant.openingHours과 restaurant.openingHours.mon이 존재하는지 아닌지 모를 때, if문을 아래처럼 써야 한다.
// - depth가 깊고 존재유무가 불분명한 property가 많을수록 아래 방식으로 모든 경우를 잡아내는 게 어려워진다
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
// ? 왼쪽에 있는 것이 nullish가 아니면 (undefined나 null이 아니면) 뒤를 실행한다.
// ? 왼쪽에 있는 것이 nullish가 맞으면 뒤를 실행하지 않고 바로 undefined를 반환한다.
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open); // 위에 쓴 if문과 비슷한 역할을 한다.

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // 변수를 property name으로 쓰려면 []이 필요하다. (.에 이어서 쓰면 안됨)
  // || 으로 쓰면 문제가 생긴다. 왼쪽 값이 0으로 존재할 때도 closed로 되게 하기 때문
  // ?. 과 ?? 는 같이 쓰이는 경우가 많다. 둘은 ES2020에서 같이 도입되었고, nullish라는 개념에 의존한다.
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Method를 호출하기 전, method가 존재하는지 체크함
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Array 내에 요소가 존재하는지 체크함
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
const users = [];

console.log(users[0]?.name ?? 'User array empty');

// 위처럼 ?.과 ??를 쓰지 않는다면, 아래처럼 복잡한 if/else문을 써야할 것이다.
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');



// [114. Looping Objects: Object Keys, Values, and Entries]

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties); // (3) ['thu', 'fri', 'sat']

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr); // We are open on 3 days: thu, fri, sat,

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entrie
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]로 destructuring (for-of 문)
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/
