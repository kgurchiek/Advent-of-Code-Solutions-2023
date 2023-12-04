const fs = require('fs');

const games = fs.readFileSync('../input', 'utf8').split('\n');
var sum = 0;
for (const game of games) {
  const id = game.substring(5, game.indexOf(':'));
  const pulls = game.substring(game.indexOf(':') + 2).split(';');
  var isValid = true;
  for (const pull of pulls) {
    const colors = pull.split(',');
    for (var color of colors) {
      if (color[0] == ' ') color = color.substring(1);
      switch (color.split(' ')[color.split(' ').length - 1]){
        case 'red':
          if (parseInt(color.split(' ')[0]) > 12) isValid = false;
          break;
        case 'green':
          if (parseInt(color.split(' ')[0]) > 13) isValid = false;
          break;
        case 'blue':
          if (parseInt(color.split(' ')[0]) > 14) isValid = false;
          break;
      }
    }
  }
  if (isValid) sum += parseInt(id);
  else console.log(id)
}
console.log(sum)