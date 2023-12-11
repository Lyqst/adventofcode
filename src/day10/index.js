import run from "aocrunner";
import exp from "constants";

const getConnectedPipes = (x, y, pipe) => {
  switch (pipe) {
    case '|':
      return [[x - 1, y], [x + 1, y]];
    case '-':
      return [[x, y - 1], [x, y + 1]];
    case 'L':
      return [[x - 1, y], [x, y + 1]];
    case 'J':
      return [[x - 1, y], [x, y - 1]];
    case '7':
      return [[x + 1, y], [x, y - 1]];
    case 'F':
      return [[x + 1, y], [x, y + 1]];
    case 'S':
      return [[x, y], [x, y]];
  }
  return [];
}

const part1 = (input) => {
  const map = input.split('\n').map((row) => row.split(''));
  const initial = [map.indexOf(map.find((row) => row.includes('S'))), map.find((row) => row.includes('S')).indexOf('S')];
  let loop = new Set([initial.toString()]);
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  dirs.forEach((dir) => {
    const [x, y] = [initial[0] + dir[0], initial[1] + dir[1]];
    const connected = getConnectedPipes(x, y, map[x][y]).map((coord) => coord.toString());
    if (connected.some((coord) => coord == initial.toString())) {
      loop.add(connected[0]);
      loop.add(connected[1]);
    }
  });
  loop.forEach((coord) => {
    const [x, y] = coord.split(',').map((coord) => parseInt(coord));
    const connected = getConnectedPipes(x, y, map[x][y]).map((coord) => coord.toString());
    loop.add(connected[0]);
    loop.add(connected[1]);
  });
  return loop.size / 2;
};

const part2 = (input) => {
  const map = input.split('\n').map((row) => row.split(''));
  const initial = [map.indexOf(map.find((row) => row.includes('S'))), map.find((row) => row.includes('S')).indexOf('S')];
  let loop = new Set([initial.toString()]);
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  dirs.forEach((dir) => {
    const [x, y] = [initial[0] + dir[0], initial[1] + dir[1]];
    const connected = getConnectedPipes(x, y, map[x][y]).map((coord) => coord.toString());
    if (connected.some((coord) => coord == initial.toString())) {
      loop.add(connected[0]);
      loop.add(connected[1]);
    }
  });
  loop.forEach((coord) => {
    const [x, y] = coord.split(',').map((coord) => parseInt(coord));
    const connected = getConnectedPipes(x, y, map[x][y]).map((coord) => coord.toString());
    loop.add(connected[0]);
    loop.add(connected[1]);
  });
  let expandedMap = Array.from(Array(map.length * 2 + 1), () => new Array(map[0].length * 2 + 1).fill(1))
  loop.forEach((coord) => {
    const [x, y] = coord.split(',').map((coord) => parseInt(coord));
    expandedMap[x * 2 + 1][y * 2 + 1] = 0;
    const [connectedA, connectedB] = getConnectedPipes(x * 2 + 1, y * 2 + 1, map[x][y]);
    expandedMap[connectedA[0]][connectedA[1]] = 0;
    expandedMap[connectedB[0]][connectedB[1]] = 0;
  });
  const outside = new Set(['0,0']);
  outside.forEach((coord) => {
    const [x, y] = coord.split(',').map((coord) => parseInt(coord));
    expandedMap[x][y] = 0;
    dirs.forEach((dir) => {
      if (x + dir[0] >= 0 && x + dir[0] < expandedMap.length && y + dir[1] >= 0 && y + dir[1] < expandedMap[x].length && expandedMap[x + dir[0]][y + dir[1]]) {
        outside.add(`${x + dir[0]},${y + dir[1]}`);
      }
    });
  });
  return expandedMap.reduce((total, row, index) => {
    if (index % 2 == 0) return total
    return total + row.reduce((total, cell, index) => {
      if (index % 2 == 0) return total
      return total + cell;
    }, 0);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        ..F7.
        .FJ|.
        SJ.L7
        |F--J
        LJ...
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        .....
        .S-7.
        .|.|.
        .L-J.
        .....
        `,
        expected: 1,
      },
      {
        input: `
        ...........
        .S-------7.
        .|F-----7|.
        .||.....||.
        .||.....||.
        .|L-7.F-J|.
        .|..|.|..|.
        .L--J.L--J.
        ...........
        `,
        expected: 4
      },
      {
        input: `
        .F----7F7F7F7F-7....
        .|F--7||||||||FJ....
        .||.FJ||||||||L7....
        FJL7L7LJLJ||LJ.L-7..
        L--J.L7...LJS7F-7L7.
        ....F-J..F7FJ|L7L7L7
        ....L7.F7||L7|.L7L7|
        .....|FJLJ|FJ|F7|.LJ
        ....FJL-7.||.||||...
        ....L---J.LJ.LJLJ...
        `,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
