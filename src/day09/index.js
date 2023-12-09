import run from "aocrunner";

const reduceLine = (line) => {
  if (line.length === 1) return [0];
  return line.map((num, index) => {
    if (index < line.length - 1) {
      return line[index + 1] - num;
    }
    return ''
  }).slice(0, -1);
};

const part1 = (input) => {
  const lines = input.split("\n").map((line) => line.split(' ').map(n => parseInt(n)));
  return lines.reduce((total, line) => {
    let lastNumbers = [];
    let currLine = line;
    while (currLine.some(n => n != 0)) {
      lastNumbers.push(currLine[currLine.length - 1]);
      currLine = reduceLine(currLine);
    }
    return total + lastNumbers.reduce((total, curr) => total + curr, 0);
  }, 0);
};

const part2 = (input) => {
  const lines = input.split("\n").map((line) => line.split(' ').map(n => parseInt(n)));
  return lines.reduce((total, line) => {
    let firstNumbers = [];
    let currLine = line;
    while (currLine.some(n => n != 0)) {
      firstNumbers.unshift(currLine[0]);
      currLine = reduceLine(currLine);
    }
    return total + firstNumbers.reduce((total, curr) => curr - total, 0);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
