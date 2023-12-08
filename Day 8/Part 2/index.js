const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

const instructions = input[0].replaceAll('\r', '');

const paths = [];
for (var i = 2; i < input.length; i++) if (input[i][2] == 'A') paths.push(i);
console.log(paths)

var i = 0;
var count = 0;
for (; paths.filter(a => input[a][2] == 'Z').length != paths.length; count++) {
  for (var j = 0; j < paths.length; j++) {
    const next = instructions[i] == 'L' ? input[paths[j]].substring(7, 10) : input[paths[j]].substring(12, 15);
    // console.log(instructions[i], input[paths[j]])
    for (var k = 2; k < input.length; k++) if (input[k].startsWith(next)) paths[j] = k;
  }
  i++;
  if (i == instructions.length) i = 0;
  // console.log(paths)
  // console.log('')
}
console.log(count)