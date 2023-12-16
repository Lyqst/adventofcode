import run from "aocrunner";


const part1 = (input) => {
  return beam(input.split("\n").map((line) => line.split("")), 0, -1, 1, false);
};

const beam = (contraption, xStart, yStart, dirStart, vStart) => {
  const visited = new Set();
  const negativeVisitedMirrors = new Set();
  const positiveVisitedMirrors = new Set();
  const throwLine = (x, y, dir, v) => {
    let newX = x + (v ? dir : 0);
    let newY = y + (v ? 0 : dir);
    while (newX >= 0 && newX < contraption.length && newY >= 0 && newY < contraption[0].length) {
      const grid = contraption[newX][newY]
      if (((grid === '|' && !v) || (grid === '-' && v))) {
        visited.add(`${newX},${newY}`);
        throwLine(newX, newY, 1, !v);
        throwLine(newX, newY, -1, !v);
        break;
      } else if (['/', '\\'].includes(grid)) {
        const visitedMirrors = (dir * (grid === '\\' && !v ? -1 : 1)) > 0 ? positiveVisitedMirrors : negativeVisitedMirrors;
        if (visitedMirrors.has(`${newX},${newY}`)) break;
        visitedMirrors.add(`${newX},${newY}`);
        throwLine(newX, newY, grid === '/' ? -dir : dir, !v);
        break;
      }
      visited.add(`${newX},${newY}`);
      newX += v ? dir : 0;
      newY += v ? 0 : dir;
    }
  };
  throwLine(xStart, yStart, dirStart, vStart);
  return visited.size + new Set([...negativeVisitedMirrors, ...positiveVisitedMirrors]).size;
}

const part2 = (input) => {
  const contraption = input.split("\n").map((line) => line.split(""));
  let max = 0
  for (let i = 0; i < contraption.length; i++) {
    max = Math.max(max, beam(contraption, i, -1, 1, false));
    max = Math.max(max, beam(contraption, i, contraption[0].length, -1, false));
  }
  for (let i = 0; i < contraption[0].length; i++) {
    max = Math.max(max, beam(contraption, -1, i, 1, true));
    max = Math.max(max, beam(contraption, contraption.length, i, 1, true));
  }
  return max;
};

run({
  part1: {
    tests: [
      {
        input: `
        .|...\\....
        |.-.\\.....
        .....|-...
        ........|.
        ..........
        .........\\
        ..../.\\\\..
        .-.-/..|..
        .|....-|.\\
        ..//.|....
        `,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `

        `,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
