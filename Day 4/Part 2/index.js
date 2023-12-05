const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

const cards = {}
for (var i = 0; i < input.length; i++) cards[i + 1] = 1;
for (var i = 0; i < input.length; i++) {
  const line = input[i]
  const card = parseInt(line.substring(5, 8));
  const winners = line.substring(line.indexOf(':') + 2, line.indexOf('|')).split(' ').filter(x => !isNaN(parseInt(x)));
  const numbers = line.substring(line.indexOf('|') + 2).replaceAll('\r', '').split(' ').filter(x => !isNaN(parseInt(x)));
  lineSum = 0;
  for (const number of winners) if (numbers.includes(number)) lineSum++;
  console.log(`${card}: ${lineSum}`);
  for (var j = 1; j <= lineSum; j++) if (cards[card + j] != null) cards[card + j] += cards[card];
}
var total = 0;
for (const card in cards) total += cards[card];
console.log(total);