const fs = require('fs');
let input =  fs.readFileSync('../input').toString();
const lineLength = input.indexOf('\n') + 1;
const connections = {
	'|': [{ x: 0, y: -1 }, { x: 0, y: 1 }],
	'-': [{ x: -1, y: 0 }, { x: 1, y: 0 }],
	'L': [{ x: 0, y: 1 }, { x: 1, y: 0 }],
	'J': [{ x: -1, y: 0 }, { x: 0, y: 1 }],
	'7': [{ x: -1, y: 0 }, { x: 0, y: -1 }],
	'F': [{ x: 0, y: -1 }, { x: 1, y: 0 }],
	'S': [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }]
}
let pipes = [];
let index = input.indexOf('S');
pipes.push(index);
let directions = [];
for (let x = -1; x <= 1; x++) {
	for (let y = -1; y <= 1; y++) {
		if ((x == 0 && y == 0) || (x != 0 && y != 0) || !input[index + x + -y * lineLength] || input[index + x + -y * lineLength] == '.') continue;
		let connectionIndex = index + x + -y * lineLength;
		if (connections[input[connectionIndex]].find(a => connectionIndex + a.x + -a.y * lineLength == index)) directions.push({ x, y });
	}
}
for (const key in connections) {
	if (key == 'S') continue;
	const item = connections[key];
	if (directions.filter(a => a.x == item[0].x && a.y == item[0].y).length && directions.filter(a => a.x == item[1].x && a.y == item[1].y).length) input = input.slice(0, index) + key + input.slice(index + 1);
}
while (true) {
	let connectionIndices = [];
	for (const item of connections[input[index]]) {
		// console.log(item, index + item.x + -item.y * lineLength)
		connectionIndices.push(index + item.x + -item.y * lineLength);
	}
	let madeConnection = false;
	for (const connection of connectionIndices) {
		// console.log(connection, { char: input[connection] })
		if (['.', '\n'].includes(input[connection])) continue;
		if (!pipes.includes(connection) && connections[input[connection]].find(a => connection + a.x + -a.y * lineLength == index)) {
			// console.log('Continue', pipes)
			pipes.push(connection);
			index = connection;
			madeConnection = true;
			break;
		}
	}
	if (!madeConnection) break;
}
let contained = [];
for (let i = 0; i < input.length; i += lineLength) {
	let chars = [];
	for (let j = 0; j < lineLength; j++) {
		if (input[i + j] == '\n') continue;
		if (!pipes.includes(i + j)) {
			if ((chars.filter(a => a == '|').length + chars.filter(a => ['F', 'J'].includes(a)).length / 2 - chars.filter(a => ['L', '7'].includes(a)).length / 2) % 2 != 0) contained.push(i + j);
		} else if (input[i + j] != '.' && connections[input[i + j]].find(a => a.y != 0)) chars.push(input[i + j]);
	}
}
console.log(contained.length);
// console.log(contained.map(a => ({ i: a, x: a % lineLength + 1, y: Math.floor(a / lineLength) + 1 })));