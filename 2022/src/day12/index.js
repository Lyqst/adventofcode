import run from "aocrunner"


const part1 = (input) => {
  const map = input.split("\n").map((line) => line.split("").map((char) => char.charCodeAt(0)))
  const getNeighbours = (x, y) => {
    let arr = []
    x - 1 >= 0 && arr.push([x - 1, y])
    x + 1 < map.length && arr.push([x + 1, y])
    y - 1 >= 0 && arr.push([x, y - 1])
    y + 1 < map[0].length && arr.push([x, y + 1])
    return arr
  }
  const xStart = map.findIndex((line) => line.includes(83))
  const yStart = map[xStart].findIndex((c) => c === 83)
  map[xStart][yStart] = 97
  const xEnd = map.findIndex((line) => line.includes(69))
  const yEnd = map[xEnd].findIndex((c) => c === 69)
  map[xEnd][yEnd] = 122
  let openList = [[xStart, yStart]]
  let closedList = []
  let f = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => Infinity)
  );
  let g = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => Infinity)
  );
  let s = Array.from({ length: map.length }, () =>
    Array.from({ length: map[0].length }, () => Infinity)
  );
  g[xStart][yStart] = 0
  f[xStart][yStart] = 0
  s[xStart][yStart] = 0
  while (openList.length > 0) {
    openList.sort((a, b) => f[a[0]][a[1]] - f[b[0]][b[1]])
    let current = openList.shift()
    if (current[0] === xEnd && current[1] === yEnd)
      break
    closedList.push(current)
    const neighbours = getNeighbours(current[0], current[1])
    neighbours.forEach((neighbour) => {
      if (closedList.some((node) => node[0] === neighbour[0] && node[1] === neighbour[1]))
        return
      if (map[neighbour[0]][neighbour[1]] > map[current[0]][current[1]] + 1)
        return
      if (f[current[0]][current[1]] + 1 < g[neighbour[0]][neighbour[1]]) {
        if (!openList.some((node) => node[0] === neighbour[0] && node[1] === neighbour[1]))
          openList.push(neighbour)
        g[neighbour[0]][neighbour[1]] = f[current[0]][current[1]] + 1
        f[neighbour[0]][neighbour[1]] = f[current[0]][current[1]] + 1 + Math.abs(neighbour[0] - xEnd) + Math.abs(neighbour[1] - yEnd)
        s[neighbour[0]][neighbour[1]] = s[current[0]][current[1]] + 1
      }
    })
  }
  return s[xEnd][yEnd]
}

const part2 = (input) => {
  const map = input.split("\n").map((line) => line.split("").map((char) => char.charCodeAt(0)))
  const getNeighbours = (x, y) => {
    let arr = []
    x - 1 >= 0 && arr.push([x - 1, y])
    x + 1 < map.length && arr.push([x + 1, y])
    y - 1 >= 0 && arr.push([x, y - 1])
    y + 1 < map[0].length && arr.push([x, y + 1])
    return arr
  }
  const xStart = map.findIndex((line) => line.includes(83))
  const yStart = map[xStart].findIndex((c) => c === 83)
  map[xStart][yStart] = 97
  const xEnd = map.findIndex((line) => line.includes(69))
  const yEnd = map[xEnd].findIndex((c) => c === 69)
  map[xEnd][yEnd] = 122
  let startingPoints = []
  map.forEach((line, x) => line.forEach((c, y) => c === 97 && startingPoints.push([x, y])))
  return startingPoints.reduce((min, [x, y]) => {
    let openList = [[x, y]]
    let closedList = []
    let f = Array.from({ length: map.length }, () =>
      Array.from({ length: map[0].length }, () => Infinity)
    );
    let g = Array.from({ length: map.length }, () =>
      Array.from({ length: map[0].length }, () => Infinity)
    );
    let s = Array.from({ length: map.length }, () =>
      Array.from({ length: map[0].length }, () => Infinity)
    );
    g[x][y] = 0
    f[x][y] = 0
    s[x][y] = 0
    while (openList.length > 0) {
      openList.sort((a, b) => f[a[0]][a[1]] - f[b[0]][b[1]])
      let current = openList.shift()
      if (current[0] === xEnd && current[1] === yEnd)
        break
      closedList.push(current)
      const neighbours = getNeighbours(current[0], current[1])
      neighbours.forEach((neighbour) => {
        if (closedList.some((node) => node[0] === neighbour[0] && node[1] === neighbour[1]))
          return
        if (map[neighbour[0]][neighbour[1]] > map[current[0]][current[1]] + 1)
          return
        if (f[current[0]][current[1]] + 1 < g[neighbour[0]][neighbour[1]]) {
          if (!openList.some((node) => node[0] === neighbour[0] && node[1] === neighbour[1]))
            openList.push(neighbour)
          g[neighbour[0]][neighbour[1]] = f[current[0]][current[1]] + 1
          f[neighbour[0]][neighbour[1]] = f[current[0]][current[1]] + 1 + Math.abs(neighbour[0] - xEnd) + Math.abs(neighbour[1] - yEnd)
          s[neighbour[0]][neighbour[1]] = s[current[0]][current[1]] + 1
        }
      })
    }
    return min > s[xEnd][yEnd] ? s[xEnd][yEnd] : min
  }, Infinity)
}

run({
  part1: {
    tests: [
      {
        input: `
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi
        `,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi
        `,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
