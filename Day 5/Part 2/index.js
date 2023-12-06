const fs = require('fs');
const maps = fs.readFileSync('../input', 'utf8').split('\r\n\r\n');

const seeds = [];

for (const map of maps) {
  if (map.startsWith('seeds')) {
    const seedsInput = map.substring(7).split(' ');
    for (var i = 0; i < seedsInput.length; i += 2) {
      seeds.push({ start: parseInt(seedsInput[i].trim()), end: parseInt(seedsInput[i].trim()) + parseInt(seedsInput[i + 1].trim()) - 1 });
    }
    console.log(seeds)
  } else {
    const ranges1 = [];
    const ranges2 = [];
    for (const range of map.substring(map.indexOf('\r') + 2).split('\r\n')) {
      ranges2.push({ start: parseInt(range.split(' ')[0]), end: parseInt(range.split(' ')[0]) + parseInt(range.split(' ')[2]) - 1 });
      ranges1.push({ start: parseInt(range.split(' ')[1]), end: parseInt(range.split(' ')[1]) + parseInt(range.split(' ')[2]) - 1 });
    }
    
    const conversions = [];
    for (var i = 0; i < ranges1.length; i++) {
      const range = ranges1[i];
      for (var j = 0; j < seeds.length; j++) {
        if (conversions.includes(j)) continue;
        if ((seeds[j].start >= range.start && seeds[j].start <= range.end) || (seeds[j].end >= range.start && seeds[j].end <= range.end)) {
          conversions.push(j);
          if (seeds[j].start < range.start) {
            seeds.push({ start: seeds[j].start, end: range.start - 1 });
            conversions.push(conversions.length - 1);
            seeds[j].start = range.start
          }
          if (seeds[j].end > range.end) {
            seeds.push({ start: range.end + 1, end: seeds[j].end });
            conversions.push(conversions.length - 1);
            seeds[j].end = range.end;
          }

          seeds[j].start = ranges2[i].start + seeds[j].start - range.start;
          seeds[j].end = ranges2[i].start + seeds[j].end - range.start;
        }
      }
      // console.log(`${map.substring(0, map.indexOf(':') + 1)} ${JSON.stringify(seeds)}`);
    }
  }
  // console.log(seeds)
}

console.log(seeds);
var lowest = Infinity;
for (const seed of seeds) if (seed.start < lowest) lowest = seed.start;
console.log(lowest)