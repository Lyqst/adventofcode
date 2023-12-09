import run from "aocrunner"

const part1 = (input) => {
  const instructions = input.split('\n').map((line) => { return line.split(' ') })
  let dirs = []
  let sizes = {}
  instructions.forEach((instruction) => {
    if (instruction[1] === 'cd' && instruction[2] === '..') {
      dirs.pop()
    } else if (instruction[1] === 'cd') {
      dirs.push(instruction[2])
    } else if (Number(instruction[0])) {
      let fullpath = ''
      dirs.forEach((dir) => {
        fullpath += dir + '/'
        sizes[fullpath] = sizes[fullpath] ? sizes[fullpath] + Number(instruction[0]) : Number(instruction[0])
      })
    }
  })
  return Object.values(sizes).filter(size => size <= 100000).reduce((total, size) => total + size, 0)
}

const part2 = (input) => {
  const instructions = input.split('\n').map((line) => { return line.split(' ') })
  let dirs = []
  let sizes = {}
  instructions.forEach((instruction) => {
    if (instruction[1] === 'cd' && instruction[2] === '..') {
      dirs.pop()
    } else if (instruction[1] === 'cd') {
      dirs.push(instruction[2])
    } else if (Number(instruction[0])) {
      let fullpath = ''
      dirs.forEach((dir) => {
        fullpath += dir + '/'
        sizes[fullpath] = sizes[fullpath] ? sizes[fullpath] + Number(instruction[0]) : Number(instruction[0])
      })
    }
  })
  const needed =  sizes['//'] - 40000000
  return Math.min(...Object.values(sizes).filter(size => size >= needed))
}

run({
  part1: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k
        `,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        $ cd /
        $ ls
        dir a
        14848514 b.txt
        8504156 c.dat
        dir d
        $ cd a
        $ ls
        dir e
        29116 f
        2557 g
        62596 h.lst
        $ cd e
        $ ls
        584 i
        $ cd ..
        $ cd ..
        $ cd d
        $ ls
        4060174 j
        8033020 d.log
        5626152 d.ext
        7214296 k
        `,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
