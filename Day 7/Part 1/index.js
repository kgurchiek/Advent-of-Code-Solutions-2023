const fs = require('fs');
const hands = fs.readFileSync('../input', 'utf8').split('\n');

function tiebreaker(string) {
  var score = 0;
  for (var i = 0; i < string.length; i++) {
    score += 100**(string.length - 1 - i) * cardTypes.indexOf(string[i]);
  }
  return score;
}

const cardTypes = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const types = [];
for (var i = 0; i < hands.length; i++) {
  const hand = hands[i];
  const cards = {}
  for (const card of hand.substring(0, 5)) {
    if (cards[card] == null) cards[card] = 1;
    else cards[card]++;
  }
  const counts = Object.values(cards);
  if (counts.length == 1) types[i] = 7;
  else if (counts.includes(4)) types[i] = 6;
  else if (counts.includes(3) && counts.includes(2)) types[i] = 5;
  else if (counts.includes(3)) types[i] = 4;
  else if (counts.filter(a => a == 2).length == 2) types[i] = 3;
  else if (counts.includes(2)) types[i] = 2;
  else types[i] = 1;
}
const handObjs = [];
for (var i = 0; i < types.length; i++) handObjs.push({ i, value: hands[i].substring(0, 5), type: types[i] });
handObjs.sort((a, b) => a.type - b.type);

var ranks = [];
for (var i = 1; i <= 7; i++) {
  ranks = ranks.concat(handObjs.filter(a => a.type == i).sort((a, b) => tiebreaker(a.value) - tiebreaker(b.value)));
}
for (var i = 0; i < ranks.length; i++) for (var j = 0; j < handObjs.length; j++) if (handObjs[j].i == ranks[i].i) handObjs[j].rank = i + 1;
for (const hand of [...handObjs].sort((a, b) => a.rank - b.rank)) console.log(hand)

var total = 0;
for (var i = 0; i < handObjs.length; i++) {
  total += handObjs[i].rank * parseInt(hands[handObjs[i].i].substring(6))
}
console.log(total)