/*
// 1. Calculate the average score for each team, using the test data below
const dolphinsAvg = (96 + 108 + 89) / 3;
const koalasAvg = (88 + 91 + 110) / 3;
console.log(dolphinsAvg, koalasAvg);

// 2. Compare the team's average scores to determine the winner of the competition,
// and print it to the console. Don't forget that there can be a draw, so test for that
// as well (draw means they have the same average score)
if (dolphinsAvg > koalasAvg) {
  console.log("Dolphins win!!");
} else if (dolphinsAvg < koalasAvg) {
  console.log("Koalas win!!");
} else {
  console.log("draw!!");
}

// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
// team only wins if it has a higher score than the other team, and the same time a
// score of at least 100 points. Hint: Use a logical operator to test for minimum
// score, as well as multiple else-if blocks �
const dolphinsAvg = (97 + 112 + 101) / 3;
const koalasAvg = (109 + 95 + 123) / 3;
console.log(dolphinsAvg, koalasAvg);

if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
  console.log("Dolphins win!!");
} else if (dolphinsAvg < koalasAvg && koalasAvg >= 100) {
  console.log("Koalas win!!");
} else {
  console.log("draw!!");
}
*/

// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
// both teams have the same score and both have a score greater or equal 100
// points. Otherwise, no team wins the trophy
const dolphinsAvg = (97 + 112 + 81) / 3;
const koalasAvg = (109 + 95 + 86) / 3;
console.log(dolphinsAvg, koalasAvg);

if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
  console.log("Dolphins win!!");
} else if (dolphinsAvg < koalasAvg && koalasAvg >= 100) {
  console.log("Koalas win!!");
} else if (
  dolphinsAvg === koalasAvg &&
  dolphinsAvg >= 100 &&
  koalasAvg >= 100
) {
  console.log("draw!!");
} else {
  console.log("no team wins the trophy");
}
