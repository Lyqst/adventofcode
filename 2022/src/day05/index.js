import run from "aocrunner"

const part1 = (input) => {
  const [stack, moves] = input.split('\n\n').map((x) => x.split('\n'))
  const stacks = stack.pop().trim().split('').pop()
  const stacksArray = Array.from({ length: stacks }, () => [])
  stack.forEach(element => {
    element.match(/.{3,4}/g).forEach((x, i) => {
      x = x.trim().replace(/[\[\]]/g, '')
      if (x) stacksArray[i].push(x)
    })
  });
  moves.forEach(m => { 
    const move = m.match(/[0-9]+/g)
    for(let i = 0; i < move[0] && stacksArray[move[1] - 1][0]; i++) {
      stacksArray[move[2] - 1].unshift(stacksArray[move[1] - 1].shift())
    }
  })
  return stacksArray.reduce((final, stack) => final + stack[0], '')
}

const part2 = (input) => {
  const [stack, moves] = input.split('\n\n').map((x) => x.split('\n'))
  const stacks = stack.pop().trim().split('').pop()
  const stacksArray = Array.from({ length: stacks }, () => [])
  stack.forEach(element => {
    element.match(/.{3,4}/g).forEach((x, i) => {
      x = x.trim().replace(/[\[\]]/g, '')
      if (x) stacksArray[i].push(x)
    })
  });
  moves.forEach(m => { 
    const move = m.match(/[0-9]+/g)
    for(let i = 0; i < move[0]; i++) {
      move[0] - i - 1 < stacksArray[move[1] - 1].length && stacksArray[move[2] - 1].unshift(stacksArray[move[1] - 1].splice(move[0] - i - 1, 1))
    }
  })
  return stacksArray.reduce((final, stack) => final + stack[0], '')
}

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: 'CMZ',
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: 'MCD',
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  // onlyTests: true,
})
