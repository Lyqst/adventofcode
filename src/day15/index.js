import run from "aocrunner";

const part1 = (input) => {
  return input.split(',').reduce((total, step) => {
    return total + step.split('').reduce((total, c) => { return ((total + c.charCodeAt(0)) * 17) % 256 }, 0);
  }, 0);
};

const part2 = (input) => {
  const boxes = new Array(256).fill(0).map(() => []);
  input.split(',').forEach(step => {
    const [label, op] = step.split(/[=-]/);
    const box = label.split('').reduce((total, c) => { return ((total + c.charCodeAt(0)) * 17) % 256 }, 0);
    if(op){
      const existingIndex = boxes[box].findIndex(lense => lense.label === label);
      if(existingIndex > -1)
        boxes[box][existingIndex].op = op;
      else
        boxes[box].push({label, op});
    } else 
      boxes[box] = boxes[box].filter(lense => lense.label !== label);
  });
  return boxes.reduce((total, box, i) => {
    return total + (i + 1) * box.reduce((total, lense, j) => {
      return total + (j + 1) * parseInt(lense.op)
    }, 0);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
        `,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
        `,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
