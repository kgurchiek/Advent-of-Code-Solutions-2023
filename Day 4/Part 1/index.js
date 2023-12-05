const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

var total = 0;
for (const line of input) {
  const winners = line.substring(line.indexOf(':') + 2, line.indexOf('|')).split(' ').filter(x => !isNaN(parseInt(x)));
  const numbers = line.substring(line.indexOf('|') + 2).replaceAll('\r', '').split(' ').filter(x => !isNaN(parseInt(x)));
  lineSum = 0;
  for (const number of winners) {
    if (numbers.includes(number)) {
      if (lineSum == 0) lineSum++;
      else lineSum *= 2;
    }
  }
  console.log(lineSum);
  total += lineSum;
}
console.log(total);