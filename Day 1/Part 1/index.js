const fs = require('fs');

function removeLetters(string) {
  var newString = '';
  for (var i = 0; i < string.length; i++) if (!isNaN(parseInt(string[i]))) newString += string[i];
  return newString;
}

var sum = 0;
const inputs = fs.readFileSync('../input', 'utf8').split('\n');
for (const input of inputs) {
  const newString = removeLetters(input);
  console.log(newString[0]);
  sum += parseInt(newString[0]) * 10 + parseInt(newString[newString.length - 1]);
}
console.log(sum);