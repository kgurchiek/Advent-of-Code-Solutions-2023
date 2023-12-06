const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

var start = 0;
for (; isNaN(parseInt(input[0][start])); start++) {}
const times = [ parseInt(input[0].substring(start).replaceAll('\r', '').replaceAll(' ', '')) ];
console.log(times)

for (start = 0; isNaN(parseInt(input[1][start])); start++) {}
const distances = [ parseInt(input[1].substring(start).replaceAll('\r', '').replaceAll(' ', '')) ];
console.log(distances)

const counts = [];
for (var i = 0; i < times.length; i++) {
  const time = parseInt(times[i]);
  const distance = parseInt(distances[i]);
  var count = 0;
  for (var j = 1; j < time; j++) if (j * (time - j) > distance) count++;
  counts.push(count)
}

console.log(counts)
var total = 1;
for (const count of counts) total *= count;
console.log(total)