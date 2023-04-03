'use strict';

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



// [115. Coding Challenge #2]

// Let's continue with our football betting app!

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// GOOD LUCK 😀

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

// 1
for (const [index, player] of game.scored.entries())
  console.log(`Goal ${index + 1}: ${player}`);

// 2
let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
console.log(sum / Object.values(game.odds).length);

// 3
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[key] ? `victory ${game[key]}` : 'draw'}: ${value}`
  );
}

// BONUS
let scorers = {};
for (const player of game.scored) {
  let temp = scorers[player] ?? 0;
  scorers[player] = temp + 1;
}
console.log(scorers);



// [116. Sets]
// ES6에서 set과 map이 도입됨. 이전 js에는 array, object 밖에 없었다. => 둘이 사용법이 비슷함
// Set: unique value만 가지는 자료구조. 중복되는 요소가 있을 수 없다. 요소들의 순서는 의미가 없다(index가 없다). iterable이다.
// Set은 array를 대체할 수 없다. unique value를 다룰 때는 유용하지만, 대부분의 경우에는 메서드가 더 다양한 array를 사용한다.

// Set 생성하기. new Set() 괄호 안에 iterable을 넣는다. 보통 array를 넣는다.
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // Set(3) {'Pasta', 'Pizza', 'Risotto'}

console.log(new Set('Jonas')); // Set(5) {'J', 'o', 'n', 'a', 's'}
console.log(new Set('')); // Set(0) {size: 0}

// Set 사용법
// array에서는 .length다. 다름에 유의
console.log(ordersSet.size);

// Set에 특정 요소가 있는지 판단. array에서의 .includes() 메서드와 비슷
console.log(ordersSet.has('Pizza')); // true
console.log(ordersSet.has('Bread')); // false

// 요소 추가
ordersSet.add('Garlic bread');
ordersSet.add('Garlic bread');

// 요소 제거
ordersSet.delete('Risotto');

// Set의 모든 요소를 제거
// ordersSet.clear();
console.log(ordersSet);

// Set의 요소를 array[2] 처럼 가져올 수는 없다. 이 기능이 필요하다면 array에 저장할 것.
// - set은 index가 없기 때문.
// - 그리고 요소를 찾아올 필요도 없다. set은 요소들의 중복이 없으므로 그 순서가 중요하지 않다.
// - 중요한 것은 .has()로 특정 요소가 있는지 없는지 판단하는 것 뿐

// Loop
// iterable이므로 Loop를 돌 수 있다.
for (const order of ordersSet) console.log(order);

// Example
// 1. array의 중복 요소 제거하기
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// set을 array로 변환: set도 iterable이므로 spread operator(...)를 사용할 수 있다.
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// array에 종류가 다른 요소가 몇개나 있는지 확인
console.log(new Set(staff).size); // 3

// string에 종류가 다른 요소가 몇개나 있는지 확인
console.log(new Set('jonasschmedtmann').size);



// [117. Maps: Fundamentals]
// key-value로 이루어짐. object는 key가 string만 가능하지만, map은 어떤 type이나 가능함(array, object, map 등...)
// set보다 쓰임이 많음

const rest = new Map();
// 추가하기 (set의 .add()와 비슷)
// 추가만 하는 것이 아니라, 추가 후의 map을 반환까지 한다.
// - .set()을 연속으로 사용하는 chaining이 가능하다.
rest.set('name', 'Classico Italino');
rest.set(1, 'Firenze, Ital');
console.log(2, rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :{');

// 값을 불러오기
// .get() 괄호 안에 key를 넣어준다. key의 type을 정확히 쓰도록 유의한다. (잘못쓰면 undefined)
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

// boolean 값을 key로 가질 때 할 수 있는 방식 -> 코드 가독성이 떨어지므로 자주 쓰지는 말자
// 레스토랑이 time 시간에 열었는지 닫았는지 출력
const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// 특정 key가 있는지 확인
// .has() 괄호 안에 key를 넣어준다.
// Object에서도 hasOwnProperty 메서드가 있다.
console.log(rest.has('categories'));

// 특정 key를 제거
// delete() 괄호 안에 key를 넣어준다.
// Object에서도 delete 메서드가 있지만, 느려서 사용을 권장하지 않는다.
rest.delete(2);
console.log(rest);

// map의 크기
console.log(rest.size); // 7

// 모든 요소들을 제거하고 빈 map으로 만듦
// rest.clear()

// value로 array, object 사용하기
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); // Test
// 아래처럼 쓰면 set할 때의 array와 구성은 같지만, memory 상의 주소가 다르다.
console.log(rest.get([1, 2])); // Undefined

// 개발자도구에서 key를 보면, 선택한 h1 element가 표시된다.
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);



// [118. Maps: Iteration]

// 빈 Map을 생성한 후에 .set()으로 요소를 하나씩 더해줄 수도 있지만,
// 아래 방법 사용하는 게 더 좋음
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
// map은 iterable이라 바로 for loop로 순회할 수 있다.
// - 반면 object는 iterable이 아니라서 Object.entries()로 iterable으로 변경해주는 작업을 거쳐야한다.
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

// map의 key를 boolean으로 하여 아래처럼 쓸 수 있음
console.log(question.get(answer === question.get('correct')));

// Convert map to array
// new Map()의 괄호 안에 넣던 2중 array를 얻을 수 있다.
// - 말이 안되는 것 같지만 아무튼 그렇다고 함
console.log([...question]);
// 위와 같은 결과
console.log([...question.entries()]);
// key, value만 담은 array 만들기
console.log([...question.keys()]);
console.log([...question.values()]);



// [119. Summary: Which Data Structure to Use?]
// 앞에서 배운 js의 built-in data structure 4개 중 어떤 것을 사용해야할까?
// + stack, queue 같은 built-in이 아닌 자료구조들도 있다!!

// <Source of Data>
// 1. From the program itself: 소스코드에서 직접 읽는 데이터 (e.g. 상태메시지)
// 2. From the UI: 유저가 쓴 input이나 DOM에 쓰여진 데이터 (e.g. todo 앱의 태스크)
// 3. From external sources: web API 등에서 받은 외부 데이터
// - API: Application Programming Interface
// 이러한 데이터들을 결국 Data structure(자료구조)에 저장하게 된다.
// 단순 나열이라면? -> Array나 Set 사용
// key-value쌍이 필요하다면? -> Object나 Map 사용

// web API에서 받는 데이터 형식은 주로 JSON이다.
// JSON은 Js object로 바로 변환될 수 있다. 같은 format을 쓰기 때문

// <Array vs Set>
// 1. Array를 써야할 때
// - value들의 순서가 중요할 때
// - value들의 중복이 허용되어야할 때
// - data를 조작해야할 때 (array method가 다양하므로)
// 2. Set을 써야할 때
// - unique value를 써야할 때
// - 성능이 매우 중요할 때 (검색, 삭제가 array보다 10배 빠르다)
// - array의 중복 요소를 제거해야할 때

// <Object vs Map>
// 1. Object
// - 전통적인 key-value 저장소
// - .과 []로 property에 접근/작성하기 쉽다.
// - 사용처
//   - property로 함수(메서드)를 가져야할 때 사용 <- 메서드에 접근하기가 편해서
//   - JSON을 다뤄야할 때 사용 (JSON -> Object -> Map 식으로 변환할 수는 있다.)
// 2. Map
// - 성능이 더 좋음
// - key에 string 말고도 모든 데이터 타입을 넣을 수 있음
// - iterate하기 편하다
// - size를 계산하기 편하다
// - 사용처
//   - 단순 key-value 매핑이 필요할 때
//   - string이 아닌 타입의 key가 필요할 때



// [Coding Challenge #3]
 
// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);
// console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
// BONUS
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4
for (const [minutes, event] of gameEvents) {
  // console.log(minutes, event);
  console.log(
    `${minutes <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${minutes}: ${event}`
  );
}



// [121. Working With Strings - Part 1]

const airline = 'TAP Air Portugal';
const plane = 'A320';

// 특정 index의 글자 찾기
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

// 총 길이 찾기
console.log(airline.length);
console.log('B737'.length);

// 찾고 싶은 글자의 index 찾기
// 1) 첫번째 index (맨 왼쪽)
console.log(airline.indexOf('r')); // 6
// 2) 마지막 index (맨 오른쪽)
console.log(airline.lastIndexOf('r')); // 10
// 3) 없는 글자를 찾았을 때 -1 반환
console.log(airline.indexOf('portugal')); // -1
// slice 메서드의 argument로 많이 사용됨.

// 스트링 잘라내기 .slice()
// 원본 string에는 변화가 없다. (string은 primitive type이기 때문에 mutate할 수 없다. ????)
// 1) index 4에서 시작, 스트링의 끝까지인 substring를 반환한다.
console.log(airline.slice(4)); // Air Portugal
// 2) index 4에서 시작, 7은 미포함하여 substring를 반환한다.
// - 반환되는 substring의 길이는 (뒤인덱스-앞인덱스) 값과 같다.
console.log(airline.slice(4, 7)); // Air

// 3) 첫번째 단어 찾기
console.log(airline.slice(0, airline.indexOf(' '))); // TAP
// 4) 마지막 단어 찾기
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

// 5) 마이너스 index를 썼을 때
// - string의 마지막 글자의 인덱스는 -1, 왼쪽으로 올수록 -1씩 늘어난다.
// - -2에서 시작하여 스트링의 끝까지
console.log(airline.slice(-2));  // al
console.log(airline.slice(1, -1)); // AP Air Portuga

// 6) 사용 예시
const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// 7) string은 primitive type인데 메서드를 사용할 수 있는 이유?
// string의 메서드를 호출하면, js가 string을 Object로 변환한다. 이 Object 안에 메서드도 포함되어있다.
// 메서드의 return 값은 string 타입이다.
console.log(new String('Jonas')); // String {'Jonas'}
console.log(typeof new String('Jonas')); // object
console.log(typeof new String('Jonas').slice(1)); // string



// [122. Working With Strings - Part 2]

const airline = 'TAP Air Portugal';

// 1. 전체를 대문자/소문자로 바꾸기
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL
console.log(airline.toLowerCase()); // tap air portugal

// 1) Fix capitalization in name (앞글자만 대문자인 글자로 바꾸기)
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passenger[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // Jonas

// 2) Comparing emails (변형된 이메일이 원래와 같은 문자인지 판단)
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// 두 메서드 모두 결과 string을 return하기 때문에, chaining해서 호출할 수 있다.
// const trimmedEmail = loginEmail.trim();
// const lowerEmail = trimmedEmail.toLowerCase();
const normalizedEmail = loginEmail.trim().toLowerCase();
console.log(normalizedEmail); // hello@jonas.io
console.log(email === normalizedEmail); // true

// 3) replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// 맨 처음에 나오는 'door'만 'gate'로 변경된다.
console.log(announcement.replace('door', 'gate')); // All passengers come to boarding gate 23. Boarding door 23!
// 모든 'door'를 'gate'로 변경 1번 (다른 프로젝트에서 개발할 때는 에러나던데....)
console.log(announcement.replaceAll('door', 'gate')); // All passengers come to boarding gate 23. Boarding gate 23!
// 모든 'door'를 'gate'로 변경 2번
// - regular expression (정규표현식, 정규식) 사용
// - /으로 감싼 string은 정규 표현식이 된다. 뒤에 g는 global이라는 뜻으로, 정규 표현식에 맞는 것들을 모두 찾아낸다.
console.log(announcement.replace(/door/g, 'gate')); // All passengers come to boarding gate 23. Boarding gate 23!

// 4) Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// 5) Practice exercise
const checkBaggage = function (items) {
  // gun, Gun, gUn 등 여러가지를 비교할 필요 없이, 소문자인 gun을 기준으로만 하면 된다.
  const baggage = items.toLowerCase();
  if (baggage.includes('gun') || baggage.includes('knife')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');



// [123. Working With Strings - Part 3]

// 1. Split and join
// .split(문자)
// - {문자}를 구분자로 하여, 구분자로 분리된 글자들을 array에 모아 반환
// .join(문자)
// - {문자}를 구분자로 하여, array의 요소들을 한 string으로 묶어 반환
console.log('a+very+nice+string'.split('+')); // (4) ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); // (2) ['Jonas', 'Schmedtmann']

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); // Mr. Jonas SCHMEDTMANN

// 예제) 단어의 앞자리를 대문자로 변경
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.split(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// 2. Padding
// .padStart(길이, 문자)
// - string.length가 {길이}가 될 때까지 문자열 앞에 {문자}를 채워넣는다. 결과를 반환한다.
// .padEnd(길이, 문자)
// - string.length가 {길이}가 될 때까지 문자열 뒤에 {문자}를 채워넣는다. 결과를 반환한다.
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// 예제) 카드번호에서 마지막 4자리만 빼고 앞자리는 모두 *로 변경
const maskCreditCard = function (number) {
  // number를 String으로 변환하는 방법 2가지
  // const str = String(number);
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// 3. Repeat
// .repeat(숫자)
// - {숫자} 만큼 문자열을 반복해놓은 결과를 return 한다.
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);



// [Coding Challenge #4]

// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable 
//   calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

// GOOD LUCK 😀

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const texts = text.split('\n');
  // for in이 아니라 for of로 사용해야함 (for in은 이제 안씀)
  for (let [index, t] of texts.entries()) {
    t = t.trim().toLowerCase();
    const underbar = t.indexOf('_');
    t =
      t.slice(0, underbar) +
      t[underbar + 1].toUpperCase() +
      t.slice(underbar + 2);
    // .padEnd(20, ' ')는 .padEnd(20)와 같다. 공백은 생략할 수 있다.
    console.log(t.padEnd(20, ' ') + '✅'.repeat(index + 1));
  }
});



// [125. String Methods Practice]
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 아래처럼 콘솔에 출력하기 (final에 더 깔끔한 코드 있음)
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

for (const flight of flights.split('+')) {
  let str = '';
  if (flight.startsWith('_Delayed')) {
    str += '🔴 ';
  }
  const arr = flight.split(';');
  str += `${arr[0].slice(1).replace('_', ' ')} from ${arr[1]
    .slice(0, 3)
    .toUpperCase()} to ${arr[2].slice(0, 3).toUpperCase()} (${arr[3].replace(
    ':',
    'h'
  )})`;
  console.log(str.padStart(44));
}
*/
