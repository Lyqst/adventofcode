import run from "aocrunner";

const findReflectionLine = (pattern) => {
  for (let i = 1; i < pattern.length; i++) {
    let upperPattern = pattern.slice(0, i).map(line => line.join(''));
    let lowerPatternReversed = pattern.slice(i).map(line => line.join('')).reverse();
    if (upperPattern.length > lowerPatternReversed.length) {
      upperPattern.splice(0, upperPattern.length - lowerPatternReversed.length);
    } else if (upperPattern.length < lowerPatternReversed.length) {
      lowerPatternReversed.splice(0, lowerPatternReversed.length - upperPattern.length);
    }
    if (upperPattern.toString() === lowerPatternReversed.toString()) {
      return i;
    }
  }
  return 0;
}

const findReflectionWithSmudge = (pattern) => {
  for (let i = 1; i < pattern.length; i++) {
    let upperPattern = pattern.slice(0, i).map(line => line.join(''));
    let lowerPatternReversed = pattern.slice(i).map(line => line.join('')).reverse();
    if (upperPattern.length > lowerPatternReversed.length) {
      upperPattern.splice(0, upperPattern.length - lowerPatternReversed.length);
    } else if (upperPattern.length < lowerPatternReversed.length) {
      lowerPatternReversed.splice(0, lowerPatternReversed.length - upperPattern.length);
    }
    const singleDiffs = upperPattern.filter((line, i) => {
      return line.split('').filter((char, j) => {
        return char !== lowerPatternReversed[i].split('')[j];
      }).length == 1;
    }).length;
    const multipleDiffs = upperPattern.filter((line, i) => {
      return line.split('').filter((char, j) => {
        return char !== lowerPatternReversed[i].split('')[j];
      }).length > 1;
    }).length;
    if (singleDiffs == 1 && multipleDiffs == 0) {
      return i;
    }
  }
  return 0
}

const part1 = (input) => {
  const patterns = input.split("\n\n").map(pattern =>
    pattern.split("\n").map(line => line.split(''))
  );
  return patterns.reduce((total, pattern) => {
    total += findReflectionLine(pattern) * 100;
    const transposedPattern = pattern.reduce((prev, next) =>
      next.map((_, i) =>
        (prev[i] || []).concat(next[i])
      ), []);
    total += findReflectionLine(transposedPattern);
    return total;
  }, 0)
};

const part2 = (input) => {
  const patterns = input.split("\n\n").map(pattern =>
    pattern.split("\n").map(line => line.split(''))
  );
  return patterns.reduce((total, pattern) => {
    total += findReflectionWithSmudge(pattern) * 100;
    const transposedPattern = pattern.reduce((prev, next) =>
      next.map((_, i) =>
        (prev[i] || []).concat(next[i])
      ), []);
    total += findReflectionWithSmudge(transposedPattern);
    return total;
  }, 0)
};

run({
  part1: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#
        `,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#
        `,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
