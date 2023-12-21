import run from "aocrunner";

const part1 = (input) => {
  const map = input.split("\n").map((line) => line.split(""));
  const yStart = map.findIndex((line) => line.includes("S"));
  const xStart = map[yStart].findIndex((char) => char === "S");
  const nodes = [{ x: xStart, y: yStart, connected: []}];
  map.forEach((line, y) => line.forEach((char, x) => {
    if (char === ".") {
      nodes.push({ x: x, y: y, connected: [] });
    }
  }));
  nodes.forEach((node) => {
    nodes.forEach((otherNode) => {
      if (node !== otherNode && Math.abs(node.x - otherNode.x) + Math.abs(node.y - otherNode.y) === 1) {
        node.connected.push(otherNode);
      }
    });
  });
  let reachedNodes = [nodes[0]];
  for(let i = 0; i < 64; i++) {
    const newReachedNodes = [];
    reachedNodes.forEach((node) => {
      node.connected.forEach((connectedNode) => {
        if (newReachedNodes.filter((node) => node.x === connectedNode.x && node.y === connectedNode.y).length === 0) {
          newReachedNodes.push(connectedNode);
        }
      });
    });
    reachedNodes = newReachedNodes;
  }
  return reachedNodes.length;
};

const part2 = (input) => {

};

run({
  part1: {
    tests: [
      {
        input: `
        ...........
        .....###.#.
        .###.##..#.
        ..#.#...#..
        ....#.#....
        .##..S####.
        .##..#...#.
        .......##..
        .##.#.####.
        .##..##.##.
        ...........
        `,
        expected: 42,
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
  onlyTests: true,
});
