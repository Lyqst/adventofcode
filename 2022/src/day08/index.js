import run from "aocrunner"

const part1 = (input) => {
  const map = input.split("\n").map((line) => line.split(''))
  const visibility = Array.from(map, (_, i) => Array.from(map[0], (_, j) => i == 0 || j == 0 || i == map.length - 1 || j == map[0].length - 1))
  for (let i = 1; i < map.length - 1; i++) {
    let highestA = map[i][0];
    let highestB = map[i][map[0].length - 1];
    for (let j = 1; j < map[0].length - 1; j++) {
      if (map[i][j] > highestA) {
        highestA = map[i][j]
        visibility[i][j] = true
      }
      if (map[i][map[0].length - 1 - j] > highestB) {
        highestB = map[i][map[0].length - 1 - j]
        visibility[i][map[0].length - 1 - j] = true
      }
    }
  }
  for (let j = 1; j < map[0].length - 1; j++) {
    let highestA = map[0][j];
    let highestB = map[map.length - 1][j];
    for (let i = 1; i < map.length - 1; i++) {
      if (map[i][j] > highestA) {
        highestA = map[i][j]
        visibility[i][j] = true
      }
      if (map[map.length - i - 1][j] > highestB) {
        highestB = map[map.length - i - 1][j]
        visibility[map.length - i - 1][j] = true
      }
    }
  }
  return visibility.flat().filter((v) => v).length
}

const part2 = (input) => {
  const map = input.split("\n").map((line) => line.split(''))
  const scores = Array.from(map, () => Array.from(map[0], () => 0))
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[0].length - 1; j++) {
      let score = [0, 0, 0, 0]
      let k = 1
      while(i > 0) {
        if (map[i - k][j] >= map[i][j] || i - k == 0) {
          score[0] = k
          break
        }
        k++
      }
      k = 1
      while(i < map.length - 1) {
        if (map[i + k][j] >= map[i][j] || i + k == map.length - 1) {
          score[1] = k
          break
        }
        k++
      }
      k = 1
      while(j > 0) {
        if (map[i][j - k] >= map[i][j] || j - k == 0) {
          score[2] = k
          break
        }
        k++
      }
      k = 1
      while(j < map[0].length - 1) {
        if (map[i][j + k] >= map[i][j] || j + k == map[0].length - 1) {
          score[3] = k
          break
        }
        k++
      }
      scores[i][j] = score.reduce((a, b) => a * b, 1)
    }
  }
  return Math.max(...scores.flat())
}

run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
