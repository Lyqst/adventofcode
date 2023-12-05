import run from "aocrunner";

const part1 = (input) => {
  const lists = input.split(/[\n]*[a-z- ]*:[ ]*/g).filter((l) => l).map((l) => l.trim().split(/[\n]+/g).map((n) => n.split(/[\n ]/).map((m) => parseInt(m, 10))));

  const min = lists[0][0].reduce((min, seed) => {
    let val = seed
    for (let i = 1; i < lists.length; i++) {
      const map = lists[i].find((m) => val >= m[1] && val < m[1] + m[2]);
      map && (val = val - map[1] + map[0]);
    }
    return Math.min(min, val);
  }, Infinity);
  return min;
};

const part2 = (input) => {
  const lists = input.split(/[\n]*[a-z- ]*:[ ]*/g).filter((l) => l).map((l) => l.trim().split(/[\n]+/g).map((n) => n.split(/[\n ]/).map((m) => parseInt(m, 10))));
  const maxMap = lists[lists.length - 1].reduce((max, map) => Math.max(max, map[0] + map[2]), 0);
  let lowestPost;
  for (let pos = 0; pos < maxMap && isNaN(lowestPost); pos++) {
    let val = pos;
    for (let i = lists.length - 1; i > 0; i--) {
      const map = lists[i].find((m) => val >= m[0] && val < m[0] + m[2]);
      map && (val = val - map[0] + map[1]);
    }
    for(let i = 0; i < lists[0][0].length && isNaN(lowestPost); i += 2) {
      if(val >= lists[0][0][i] && val < lists[0][0][i] + lists[0][0][i + 1]) {
        lowestPost = pos
      }
    }
  }

  return lowestPost;
};

run({
  part1: {
    tests: [
      {
        input: `
          seeds: 79 14 55 13

          seed-to-soil map:
          50 98 2
          52 50 48

          soil-to-fertilizer map:
          0 15 37
          37 52 2
          39 0 15

          fertilizer-to-water map:
          49 53 8
          0 11 42
          42 0 7
          57 7 4

          water-to-light map:
          88 18 7
          18 25 70

          light-to-temperature map:
          45 77 23
          81 45 19
          68 64 13

          temperature-to-humidity map:
          0 69 1
          1 0 69

          humidity-to-location map:
          60 56 37
          56 93 4
        `,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          seeds: 79 14 55 13

          seed-to-soil map:
          50 98 2
          52 50 48

          soil-to-fertilizer map:
          0 15 37
          37 52 2
          39 0 15

          fertilizer-to-water map:
          49 53 8
          0 11 42
          42 0 7
          57 7 4

          water-to-light map:
          88 18 7
          18 25 70

          light-to-temperature map:
          45 77 23
          81 45 19
          68 64 13

          temperature-to-humidity map:
          0 69 1
          1 0 69

          humidity-to-location map:
          60 56 37
          56 93 4
        `,
        expected: 46,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
