const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

function greatestCommonDivisor(a, b) {  
  if (!b) return a;  
  return greatestCommonDivisor(b, a % b);  
}

function leastCommonMultiple(a, b) {
  return a * b / greatestCommonDivisor(a, b)
}

const instructions = input[0].replaceAll('\r', '');

const nodes = [];
const paths = [];
for (var i = 2; i < input.length; i++) {
  nodes.push(input[i].substring(0, 3));
  if (input[i][2] == 'A') paths.push(i);
}

var i = 0;
const counts = [];
for (var j = 0; j < paths.length; j++) {
  var count = 0;
  while (input[paths[j]][2] != 'Z') {
    count++;
    const next = instructions[i] == 'L' ? input[paths[j]].substring(7, 10) : input[paths[j]].substring(12, 15);
    // console.log(`${instructions[i]}, ${input[paths[j]]}`)
    paths[j] = nodes.indexOf(next) + 2;
    i++;
    if (i == instructions.length) i = 0;
  }
  counts.push(count)
  // console.log(JSON.stringify(paths))
  // console.log('')
}
console.log(counts)
var total = leastCommonMultiple(counts[1], counts[0]);
for (var i = 2; i < counts.length; i++) total = leastCommonMultiple(counts[i], total);
console.log(total);