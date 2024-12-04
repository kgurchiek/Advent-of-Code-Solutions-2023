const fs = require('fs');
const input =  fs.readFileSync('../input').toString();
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

let distances = {};
let index = input.indexOf('S');
distances[index] = 0;
let distance = 0;
while (true) {
	distance++;
	if (input[index] == 'S') distance = 1;
	let connectionIndices = [];
	for (const item of connections[input[index]]) {
		// console.log(item, index + item.x + -item.y * lineLength)
		connectionIndices.push(index + item.x + -item.y * lineLength);
	}
	let madeConnection = false;
	for (const connection of connectionIndices) {
		// console.log(connection, { char: input[connection] })
		if (['.', '\n'].includes(input[connection])) continue;
		if (connections[input[connection]].find(a => connection + a.x + -a.y * lineLength == index) && (distances[connection] == null ? Infinity : distances[connection]) < distances[index] - 1) {
			// console.log('Reset')
			distance = distances[connection];
			index = connection;
			madeConnection = true;
			break;
		} else if (connections[input[connection]].find(a => connection + a.x + -a.y * lineLength == index) && (distances[connection] == null ? Infinity : distances[connection]) > distance) {
			// console.log('Continue', distance, distances)
			distances[connection] = distance;
			index = connection;
			madeConnection = true;
			break;
		}
	}
	if (!madeConnection) break;
}
console.log('Farthest:', Object.keys(distances).reduce((a, b) => a > distances[b] ? a : distances[b], 0)) 