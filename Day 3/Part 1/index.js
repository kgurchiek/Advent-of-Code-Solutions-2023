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
    if (!isNaN(parseInt(char))) {
      var numWidth;
      for (numWidth = 1; !isNaN(parseInt(line[x + numWidth])); numWidth++) {}
      var valid = false;
      for (var i = -1; i <= 1 && !valid; i++) {
        for (var j = -1; j <= numWidth && !valid; j++) {
          const testChar = getChar(x + j, y + i);
          if (isNaN(testChar) && testChar != '.') valid = true;
        }
      }
      if (valid) {
        sum += parseInt(line.substring(x, x + numWidth));
        console.log(parseInt(line.substring(x, x + numWidth)));
      }
      x += numWidth - 1;
    }
  }
}
console.log(sum);