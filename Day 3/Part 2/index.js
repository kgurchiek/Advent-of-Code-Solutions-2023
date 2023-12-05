const fs = require('fs');
const input = fs.readFileSync('../input', 'utf8').split('\n');

function getChar(x, y) {
  if (input[y] == null || input[y][x] == null) return '.';
  return input[y][x];
}

var sum = 0;
for (var y = 0; y < input.length; y++) {
  const line = input[y];
  for (var x = 0; x < line.length; x++) {
    const char = line[x];
    if (char == '*') {
      const adjacent = [];
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          const testChar = getChar(x + j, y + i);
          if (!isNaN(parseInt(testChar))) {
            console.log(testChar)
            var k;
            for (k = -1; !isNaN(parseInt(getChar(x + j + k, y + i))); k--) {}
            k++;
            var num = '';
            for (k; !isNaN(parseInt(getChar(x + j + k, y + i))); k++) num += getChar(x + j + k, y + i);
            j += k - 1;
            adjacent.push(parseInt(num));
          }
        }
      }
      console.log(adjacent)
      if (adjacent.length == 2) sum += adjacent[0] * adjacent[1]
    }
  }
}
console.log(sum);