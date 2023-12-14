import run from "aocrunner";

const transpose = (array) => array.reduce((prev, next) =>
  next.map((_, i) =>
    (prev[i] || []).concat(next[i])
  ), []);

const part1 = (input) => {
  return transpose(input.split("\n").map((line) => line.split(""))).reduce((total, line) => {
    let load = line.length;
    line.forEach((e, i) => {
      if (e == 'O') total += load--;
      else if (e == '#') load = line.length - i - 1;
    })
    return total;
  }, 0);
};

const part2 = (input) => {
  let map = input.split("\n").map((line) => line.split(""));
  let positions = [];
  //console.log(positions)
  for(let n = 0; n < 1000000000; n++) {
    for (let i = 0; i < 4; i++) {
      if (i % 2 == 0) map = transpose(map);
      map = map.map((line) => {
        const lineString = line.join("");
        let sections = lineString.split("#");
        sections = sections.map(section => {
          if (section.length > 1) {
            section = section.split("").sort((c, _) => {
              return (c == 'O' ? (i % 4 < 2 ? -1 : 1) : (i % 4 < 2 ? 1 : -1));
            }).join("");
          }
          return section
        });
        return sections.length > 1 ? sections.join("#").split('') : sections[0].split('');
      });
      if (i % 2 == 0) map = transpose(map);
    }
    if(positions.includes(map.join(';').toString())) {
      const loopStart = positions.indexOf(map.join(';').toString());
      map = positions.slice(loopStart)[(1000000000 - loopStart - 1) % (positions.length - loopStart)].split(";").map((line) => line.split(","));
      break;
    } else {
      positions.push(map.join(';').toString());
    }
  }
  return map.reduce((total, line, i) => {
    return total + (map.length - i) * line.filter(e => e == 'O').length;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
