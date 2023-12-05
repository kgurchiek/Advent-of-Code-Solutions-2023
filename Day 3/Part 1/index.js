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
    console.log(`(${x}, ${y}): ${char} ${!isNaN(char)}`);
    if (!isNaN(char)) {
      var numWidth;
      for (numWidth = 1; !isNaN(line[x + numWidth]); numWidth++) {}
      console.log(`${numWidth} ${line.substring(x, x + numWidth)}`);
      var valid = false;
      for (var i = -1; i <= numWidth + 1 || valid; i++) {
        for (var j = -1; j <= 2 || valid; j++) {
          console.log(`(${ + i}, ${y + j}): ${getChar(x + i, y + j)}`)
          const testChar = getChar(x + i, y + j);
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