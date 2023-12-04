const fs = require('fs');

function removeLetters(string) {
  var newString = '';
  for (var i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i]))) {
      newString += string[i];
    } else {
      if (string.substring(i).startsWith('zero')) newString += '0';
      if (string.substring(i).startsWith('one')) newString += '1';
      if (string.substring(i).startsWith('two')) newString += '2';
      if (string.substring(i).startsWith('three')) newString += '3';
      if (string.substring(i).startsWith('four')) newString += '4';
      if (string.substring(i).startsWith('five')) newString += '5';
      if (string.substring(i).startsWith('six')) newString += '6';
      if (string.substring(i).startsWith('seven')) newString += '7';
      if (string.substring(i).startsWith('eight')) newString += '8';
      if (string.substring(i).startsWith('nine')) newString += '9';
    }
  }
  return newString;
}


var sum = 0;
const inputs = fs.readFileSync('../input', 'utf8').split('\n');
for (const input of inputs) {
  const newString = removeLetters(input);
  console.log(`${newString[0]} ${newString[newString.length - 1]}`);
  sum += parseInt(newString[0]) * 10 + parseInt(newString[newString.length - 1]);
}
console.log(sum);