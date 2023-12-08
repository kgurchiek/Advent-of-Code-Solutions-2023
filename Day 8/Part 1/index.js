const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

const instructions = input[0].replaceAll('\r', '');

var count = 0;
var i = 0;
for (; !input[i].startsWith('AAA'); i++);
while (!input[i].startsWith('ZZZ')) {
  for (var j = 0; j < instructions.length && !input[i].startsWith('ZZZ'); j++) {
    count++;
    const next = instructions[j] == 'L' ? input[i].substring(7, 10) : input[i].substring(12, 15);
    console.log(i, instructions[j], input[i])
    for (var k = 2; k < input.length; k++) if (input[k].startsWith(next)) i = k;
  }
}
console.log(count)