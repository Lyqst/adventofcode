import run from "aocrunner";

const part1 = (input) => {
  return input.split("\n\n").map((line) => {
    return line.split("\n").reduce((total, cal) => total + parseInt(cal), 0)
  }).reduce((max, cal) => Math.max(max, cal), 0);
};

const part2 = (input) => {
  return input.split("\n\n").map((line) => {
    return line.split("\n").reduce((total, cal) => total + parseInt(cal), 0)
  }).sort((a, b) => b - a).slice(0, 3).reduce((total, cal) => total + cal, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000
        `,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000
        `,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
