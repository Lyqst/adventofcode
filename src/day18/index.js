import run from "aocrunner";

const directionsOrder = {
  'R': 0,
  'D': 1,
  'L': 2,
  'U': 3
}

const directionMap = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1]
]

const distFix = {
  '0,1': [1, 0],
  '1,2': [0, 1],
  '1,0': [0, -1],
  '2,3': [1, 0],
  '3,0': [0, 1],
  '3,2': [0, -1],
}

const part1 = (input) => {
  const steps = input.split("\n").map((line) => line.split(" ").slice(0, 2).map((v, i) => i == 0 ? directionsOrder[v] : Number(v)));
  let vertices = [[0, 0]];
  let downFlag = steps[0][0] == 1;
  let leftFlag = steps[0][0] == 2;
  steps.forEach((step, i) => {
    let [dir, dist] = step;
    const [x, y] = vertices[vertices.length - 1];
    let next = i + 1;
    if (i == steps.length - 1) next = 0;
    const nextDir = steps[next][0];
    let d = [0, 0];
    if (nextDir == 0 && leftFlag) {
      leftFlag = false
      d[1] = 1;
    }
    if (nextDir == 1 && !downFlag) {
      downFlag = true;
      d[0] = 1;
    }
    if (nextDir == 2 && !leftFlag) {
      leftFlag = true;
      d[1] = -1;
    }
    if (nextDir == 3 && downFlag) {
      downFlag = false;
      d[0] = -1;
    }
    vertices.push([x + directionMap[dir][0] * dist + d[0], y + directionMap[dir][1] * dist + d[1]]);
  });
  const xMin = Math.min(...vertices.map(v => v[0]));
  const yMin = Math.min(...vertices.map(v => v[1]));
  vertices = vertices.map(v => [v[0] - xMin, v[1] - yMin]);
  let sum = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    sum += vertices[i][0] * vertices[i + 1][1] - vertices[i + 1][0] * vertices[i][1];
  }
  return Math.abs(sum / 2);
};

const part2 = (input) => {
  const steps = input.split("\n").map((line) => line.split(" ").map((v, i) => i == 2 ? v.split('').slice(2, 8) : v));
  let vertices = [[0, 0]]
  let downFlag = steps[0][2][5] == 1;
  let leftFlag = steps[0][2][5] == 2;
  steps.forEach((step, i) => {
    const hex = step[2];
    const [dist, dir] = [Number('0x' + hex.slice(0, 5).join('')), hex[5]];
    const [x, y] = vertices[vertices.length - 1];
    let next = i + 1;
    if (i == steps.length - 1) next = 0;
    const nextDir = steps[next][2][5];
    let d = [0, 0];
    if (nextDir == 0 && leftFlag) {
      leftFlag = false
      d[1] = 1;
    }
    if (nextDir == 1 && !downFlag) {
      downFlag = true;
      d[0] = 1;
    }
    if (nextDir == 2 && !leftFlag) {
      leftFlag = true;
      d[1] = -1;
    }
    if (nextDir == 3 && downFlag) {
      downFlag = false;
      d[0] = -1;
    }
    vertices.push([x + directionMap[dir][0] * dist + d[0], y + directionMap[dir][1] * dist + d[1]]);
  });
  const xMin = Math.min(...vertices.map(v => v[0]));
  const yMin = Math.min(...vertices.map(v => v[1]));
  vertices = vertices.map(v => [v[0] - xMin, v[1] - yMin]);
  let sum = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    sum += vertices[i][0] * vertices[i + 1][1] - vertices[i + 1][0] * vertices[i][1];
  }
  return Math.abs(sum / 2);
};

run({
  part1: {
    tests: [
      {
        input: `
        R 6 (#70c710)
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)
        `,
        expected: 62,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 6 (#70c710)
        D 5 (#0dc571)
        L 2 (#5713f0)
        D 2 (#d2c081)
        R 2 (#59c680)
        D 2 (#411b91)
        L 5 (#8ceee2)
        U 2 (#caa173)
        L 1 (#1b58a2)
        U 2 (#caa171)
        R 2 (#7807d2)
        U 3 (#a77fa3)
        L 2 (#015232)
        U 2 (#7a21e3)
        `,
        expected: 952408144115,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
