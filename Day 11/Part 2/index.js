const fs = require('fs');
let input = fs.readFileSync('../input').toString().split('\n');
let scale = 1000000;
const galaxies = [];
for (let i = 0; i < input.length; i++) for (let j = 0; j < input[i].length; j++) if (input[i][j] == '#') galaxies.push({ start: { x: j, y: i }, x: j, y: i });
for (let i = 0; i < input.length; i++) {
	let empty = true;
	for (const char of input[i]) if (char != '.') empty = false;
	if (empty) for (const galaxy of galaxies) if (galaxy.start.y > i) galaxy.y += scale - 1;
}
for (let i = 0; i < input[0].length; i++) {
	let empty = true;
	for (let j = 0; j < input.length; j++) if (input[j][i] != '.') empty = false;
	if (empty) for (const galaxy of galaxies) if (galaxy.start.x > i) galaxy.x += scale - 1;
}
let sum = 0;
for (let i = 0; i < galaxies.length; i++) {
	for (let j = i + 1; j < galaxies.length; j++) {
		sum += Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
	}
}
console.log(sum);