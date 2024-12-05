const fs = require('fs');
let input = fs.readFileSync('../input').toString().split('\n');
for (let i = 0; i < input.length; i++) {
	let empty = true;
	for (const char of input[i]) if (char != '.') empty = false;
	if (empty) {
		input = input.slice(0, i + 1).concat(input.slice(i));
		i++;
	}
}
for (let i = 0; i < input[0].length; i++) {
	let empty = true;
	for (let j = 0; j < input.length; j++) if (input[j][i] != '.') empty = false;
	if (empty) {
		for (let j = 0; j < input.length; j++) input[j] = input[j].slice(0, i + 1) + input[j].slice(i);
		i++;
	}
}
const galaxies = [];
for (let i = 0; i < input.length; i++) for (let j = 0; j < input[i].length; j++) if (input[i][j] == '#') galaxies.push({ x: j, y: i });
let sum = 0;
for (let i = 0; i < galaxies.length; i++) for (let j = i + 1; j < galaxies.length; j++) sum += Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
console.log(sum);