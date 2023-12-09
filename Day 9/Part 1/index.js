const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

function differences(sequence, progress) {
  const difference = [];
  for (var i = 1; i < sequence.length; i++) difference.push(parseInt(sequence[i]) - parseInt(sequence[i - 1]))
  progress = [difference].concat(progress);
  if (difference.filter(a => a != 0).length == 0) return extrapolate(progress);
  else return differences(difference, progress);
}

function extrapolate(progress) {
  var n = 0;
  for (var i = 1; i < progress.length; i++) n = parseInt(progress[i][progress[i].length - 1]) + n;
  return n;
}

var sum = 0;
for (const line of input) sum += differences(line.replaceAll('\r', '').split(' '), [ line.replaceAll('\r', '').split(' ') ])
console.log(sum)