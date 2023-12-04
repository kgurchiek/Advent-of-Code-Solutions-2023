const fs = require('fs');

const games = fs.readFileSync('../input', 'utf8').split('\n');
var sum = 0;
for (const game of games) {
  const id = game.substring(5, game.indexOf(':'));
  const pulls = game.substring(game.indexOf(':') + 2).split(';');
  const max = { red: 1, green: 1, blue: 1 }
  for (const pull of pulls) {
    const colors = pull.split(',');
    console.log(colors);
    for (var color of colors) {
      if (color[0] == ' ') color = color.substring(1);
      switch (color.split(' ')[color.split(' ').length - 1].replaceAll('\r', '')) {
        case 'red':
          //console.log(parseInt(color.split(' ')[0]));
          if (parseInt(color.split(' ')[0]) > max.red) max.red = parseInt(color.split(' ')[0]);
          break;
        case 'green':
          if (parseInt(color.split(' ')[0]) > max.green) max.green = parseInt(color.split(' ')[0]);
          break;
        case 'blue':
          if (parseInt(color.split(' ')[0]) > max.blue) max.blue = parseInt(color.split(' ')[0]);
          break;
      }
    }
  }
  console.log(max)
  console.log(max.red * max.green * max.blue)
  sum += max.red * max.green * max.blue;
}
console.log(sum)