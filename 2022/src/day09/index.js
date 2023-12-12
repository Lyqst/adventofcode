import run from "aocrunner"

const directions = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

const part1 = (input) => {
  const moves = input.split("\n").map((line) => line.split(" ").map((x) => (isNaN(x) ? x : parseInt(x))))
  let headPos = [0, 0]
  let tailPos = [0, 0]
  const visited = new Set(['0,0'])
  moves.forEach(move => {
    const [dir, dist] = move
    for (let i = 0; i < dist; i++) {
      const newPos = [headPos[0] + directions[dir][0], headPos[1] + directions[dir][1]]
      if (Math.abs(newPos[0] - tailPos[0]) > 1 || Math.abs(newPos[1] - tailPos[1]) > 1) {
        tailPos = [headPos[0], headPos[1]]
        visited.add(`${tailPos[0]},${tailPos[1]}`)
      }
      headPos = newPos
    }
  });
  return visited.size
}

const part2 = (input) => {
  const moves = input.split("\n").map((line) => line.split(" ").map((x) => (isNaN(x) ? x : parseInt(x))))
  let knots = Array.from({length: 10}, () => [0, 0]);
  const visited = new Set(['0,0'])
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
  moves.forEach(move => {
    const [dir, dist] = move
    for (let i = 0; i < dist; i++) {
      knots[0] = [knots[0][0] + directions[dir][0], knots[0][1] + directions[dir][1]]
      knots.every((_, i) => {
        if(i > 0) {
          const xDiff = knots[i - 1][0] - knots[i][0]
          const yDiff = knots[i - 1][1] - knots[i][1]
          if(Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1){
            knots[i] = [knots[i][0] + clamp(xDiff, -1, 1), knots[i][1] + clamp(yDiff, -1, 1)]
            if(i == knots.length - 1) visited.add(`${knots[i][0]},${knots[i][1]}`)
          }
          else {
            return false
          }
        }
        return true
      });
    }
  });
  
  return visited.size
}

run({
  part1: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2
        `,
        expected: 1,
      },
      {
        input: `
        R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20
        `,
        expected: 36,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
