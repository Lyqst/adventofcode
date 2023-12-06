import run from "aocrunner";

const part1 = (input) => {
  const [times, distances] = input.split("\n").map((list) => {
    return list.split(/[:][ ]*/)[1].split(/[ ]+/);
  });

  let ways = []
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    const solutions = [
      -(-time + Math.sqrt(time * time - 4 * distance)) / 2,
      -(-time - Math.sqrt(time * time - 4 * distance)) / 2,
    ].map((n, i) => {
      if (!Number.isInteger(n)) {
        return Math.ceil(n);
      } else if (i == 0) {
        return n + 1;
      }
      return n;
    });

    ways[i] = (solutions[1] - solutions[0]);
  }
  return ways.reduce((a, b) => a * b);
};

const part2 = (input) => {
  const [time, distance] = input.split("\n").map((list) => {
    return list.split(/[:][ ]*/)[1].replace(/[ ]+/g, '');
  });

  const solutions = [
    -(-time + Math.sqrt(time * time - 4 * distance)) / 2,
    -(-time - Math.sqrt(time * time - 4 * distance)) / 2,
  ].map((n, i) => {
    if (!Number.isInteger(n)) {
      return Math.ceil(n);
    } else if (i == 0) {
      return n + 1;
    }
    return n;
  });

  return (solutions[1] - solutions[0]);
};

run({
  part1: {
    tests: [
      {
        input: `
          Time:      7  15   30
          Distance:  9  40  200
        `,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          Time:      7  15   30
          Distance:  9  40  200
        `,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
