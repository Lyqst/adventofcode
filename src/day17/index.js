import run from "aocrunner";

const part1 = (input) => {
  const map = input.split("\n").map((line) => line.split(""));
  let openList = [[0, 0, 0, 0, 0]];
  let g = {};
  g['0,0,0,0,0'] = 0;
  const getNeighbours = (node) => {
    let neighbours = [];
    (node[2] != 1 || node[4] < 3) && (node[2] != -1) && neighbours.push([node[0] + 1, node[1], 1, 0, node[2] == 1 ? node[4] + 1 : 1]);
    (node[2] != -1 || node[4] < 3) && (node[2] != 1) && neighbours.push([node[0] - 1, node[1], -1, 0, node[2] == -1 ? node[4] + 1 : 1]);
    (node[3] != 1 || node[4] < 3) && (node[3] != -1) && neighbours.push([node[0], node[1] + 1, 0, 1, node[3] == 1 ? node[4] + 1 : 1]);
    (node[3] != -1 || node[4] < 3) && (node[3] != 1) && neighbours.push([node[0], node[1] - 1, 0, -1, node[3] == -1 ? node[4] + 1 : 1]);
    return neighbours.filter(([x, y, , ,]) => x >= 0 && x < map.length && y >= 0 && y < map[0].length);
  }
  let best = 0;
  while (openList.length > 0) {
    openList.sort((a, b) => g[a.join(',')] - g[b.join(',')])
    let current = openList.shift();
    if (current[0] === map.length - 1 && current[1] === map[0].length - 1) {
      best = g[current.join(',')]
      break;
    }
    const neighbours = getNeighbours(current);
    neighbours.forEach((neighbour) => {
      if (!g[neighbour.join(',')]) g[neighbour.join(',')] = Infinity;
      const dist = g[current.join(',')] + Number(map[neighbour[0]][neighbour[1]]);
      if (dist < g[neighbour.join(',')]) {
        if (!openList.some((node) => node.join(',') === neighbour.join(',')))
          openList.push(neighbour);
        g[neighbour.join(',')] = dist;
      }
    })
  }
  return best;
};

const part2 = (input) => {
  const map = input.split("\n").map((line) => line.split(""));
  let openList = [[0, 0, 0, 0, 0]];
  let g = {};
  g['0,0,0,0,0'] = 0;
  const getNeighbours = (node) => {
    let neighbours = [];
    (node[2] != 1 || node[4] < 10) && (node[2] === 1 || node[4] > 3 || node[4] === 0) && (node[2] != -1) && neighbours.push([node[0] + 1, node[1], 1, 0, node[2] == 1 ? node[4] + 1 : 1]);
    (node[2] != -1 || node[4] < 10) && (node[2] === -1 || node[4] > 3 || node[4] === 0) && (node[2] != 1) && neighbours.push([node[0] - 1, node[1], -1, 0, node[2] == -1 ? node[4] + 1 : 1]);
    (node[3] != 1 || node[4] < 10) && (node[3] === 1 || node[4] > 3 || node[4] === 0) && (node[3] != -1) && neighbours.push([node[0], node[1] + 1, 0, 1, node[3] == 1 ? node[4] + 1 : 1]);
    (node[3] != -1 || node[4] < 10) && (node[3] === -1 || node[4] > 3 || node[4] === 0) && (node[3] != 1) && neighbours.push([node[0], node[1] - 1, 0, -1, node[3] == -1 ? node[4] + 1 : 1]);
    return neighbours.filter(([x, y, , ,]) => x >= 0 && x < map.length && y >= 0 && y < map[0].length);
  }
  let best = 0;
  while (openList.length > 0) {
    openList.sort((a, b) => g[a.join(',')] - g[b.join(',')])
    let current = openList.shift();
    if (current[0] === map.length - 1 && current[1] === map[0].length - 1 && current[4] > 3) {
      best = g[current.join(',')]
      break;
    }
    const neighbours = getNeighbours(current);
    neighbours.forEach((neighbour) => {
      if (!g[neighbour.join(',')]) g[neighbour.join(',')] = Infinity;
      const dist = g[current.join(',')] + Number(map[neighbour[0]][neighbour[1]]);
      if (dist < g[neighbour.join(',')]) {
        if (!openList.some((node) => node.join(',') === neighbour.join(',')))
          openList.push(neighbour);
        g[neighbour.join(',')] = dist;
      }
    })
  }
  return best;
};

run({
  part1: {
    tests: [
      {
        input: `
        2413432311323
        3215453535623
        3255245654254
        3446585845452
        4546657867536
        1438598798454
        4457876987766
        3637877979653
        4654967986887
        4564679986453
        1224686865563
        2546548887735
        4322674655533
        `,
        expected: 102,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2413432311323
        3215453535623
        3255245654254
        3446585845452
        4546657867536
        1438598798454
        4457876987766
        3637877979653
        4654967986887
        4564679986453
        1224686865563
        2546548887735
        4322674655533
        `,
        expected: 94,
      },
      {
        input: `
        111111111111
        999999999991
        999999999991
        999999999991
        999999999991
        `,
        expected: 71
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
