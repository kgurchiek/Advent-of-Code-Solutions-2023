const fs = require('fs');
const maps = fs.readFileSync('../input', 'utf8').split('\r\n\r\n');

const seeds = {};

for (const map of maps) {
  if (map.startsWith('seeds')) for (const seed of map.substring(7).split(' ')) seeds[seed.trim()] = parseInt(seed.trim());
  else {
    const ranges1 = [];
    const ranges2 = [];
    for (const range of map.substring(map.indexOf('\r') + 2).split('\r\n')) {
      ranges2.push({ start: parseInt(range.split(' ')[0]), end: parseInt(range.split(' ')[0]) + parseInt(range.split(' ')[2]) - 1 });
      ranges1.push({ start: parseInt(range.split(' ')[1]), end: parseInt(range.split(' ')[1]) + parseInt(range.split(' ')[2]) - 1 });
    }
    
    const conversions = [];
    for (var i = 0; i < ranges1.length; i++) {
      const range = ranges1[i];
      const seedsKeys = Object.keys(seeds);
      for (var j = 0; j < seedsKeys.length; j++) {
        if (conversions.includes(j)) continue;
        const seed = seeds[seedsKeys[j]];
        if (seed >= range.start && seed <= range.end) {
          seeds[seedsKeys[j]] = ranges2[i].start + seed - range.start;
          conversions.push(j);
        }
      }
    }
  }
  // console.log(seeds)
}

console.log(seeds);
var lowest;
for (const seed in seeds) if (lowest == null || seeds[seed] < lowest) lowest = seeds[seed];
console.log(lowest);