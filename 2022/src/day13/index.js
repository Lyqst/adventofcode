import run from "aocrunner"

const arrayCompare = (a, b) => {
  for(let i = 0; i < a.length; i++) {
    if(i >= b.length)
      return -1
    if(!Array.isArray(a[i]) && !Array.isArray(b[i])){
      if(a[i] > b[i]) return -1
      if(a[i] < b[i]) return 1
    } else if(!Array.isArray(a[i])) {
      let c = arrayCompare([a[i]], b[i])
      if(c !== 0) return c
    } else if(!Array.isArray(b[i])) {
      let c = arrayCompare(a[i], [b[i]])
      if(c !== 0) return c
    } else {
      let c = arrayCompare(a[i], b[i])
      if(c !== 0) return c
    }
  }
  if(a.length < b.length)
    return 1
  return 0
}

const part1 = (input) => {
  return input.split('\n\n')
    .map(packets => packets.split('\n').map(packet => JSON.parse(packet)))
    .reduce((total, pair, index) => {
      return total + (arrayCompare(pair[0], pair[1]) == 1 ? index + 1 : 0)
    }, 0)
}

const part2 = (input) => {
  const list = input.split('\n').filter(line => line !== '').map(line => JSON.parse(line))
  list.push([[2]])
  list.push([[6]])
  const orderedList = list.sort((a, b) => arrayCompare(a, b)).reverse().map(packet => JSON.stringify(packet))
  return (1 + orderedList.indexOf('[[2]]')) * (1 + orderedList.indexOf('[[6]]'))
}

run({
  part1: {
    tests: [
      {
        input: `
        [1,1,3,1,1]
        [1,1,5,1,1]
        
        [[1],[2,3,4]]
        [[1],4]
        
        [9]
        [[8,7,6]]
        
        [[4,4],4,4]
        [[4,4],4,4,4]
        
        [7,7,7,7]
        [7,7,7]
        
        []
        [3]
        
        [[[]]]
        [[]]
        
        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]
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
        [1,1,3,1,1]
        [1,1,5,1,1]
        
        [[1],[2,3,4]]
        [[1],4]
        
        [9]
        [[8,7,6]]
        
        [[4,4],4,4]
        [[4,4],4,4,4]
        
        [7,7,7,7]
        [7,7,7]
        
        []
        [3]
        
        [[[]]]
        [[]]
        
        [1,[2,[3,[4,[5,6,7]]]],8,9]
        [1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
