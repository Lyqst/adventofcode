import run from "aocrunner";


const part1 = (input) => {
  const resultMap = {
    'A': { 'X': 3, 'Y': 6, 'Z': 0 },
    'B': { 'X': 0, 'Y': 3, 'Z': 6 },
    'C': { 'X': 6, 'Y': 0, 'Z': 3 },
  }
  const shapeMap = { 'X': 1, 'Y': 2, 'Z': 3 }
  const games = input.split('\n').map((line) => { return line.split(' ') })
  return games.reduce((total, game) => {
    return total + resultMap[game[0]][game[1]] + shapeMap[game[1]]
  }, 0)
};

const part2 = (input) => {
  const resultMap = { 'X': 0, 'Y': 3, 'Z': 6 }
  const shapeMap = {
    'A': { 'X': 3, 'Y': 1, 'Z': 2 },
    'B': { 'X': 1, 'Y': 2, 'Z': 3 },
    'C': { 'X': 2, 'Y': 3, 'Z': 1 },
  }
  const games = input.split('\n').map((line) => { return line.split(' ') })
  return games.reduce((total, game) => {
    return total + resultMap[game[1]] + shapeMap[game[0]][game[1]]
  }, 0)
  return
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
