import run from "aocrunner";

const part1 = (input) => {
  const map = input.split("\n").map((line) => line.split(""));
  const emptyRows = map.reduce((rows, row, index) => {
    if (row.every((col) => col === ".")) {
      rows.push(index);
    }
    return rows;
  }, []);
  const emptyCols = map[0].reduce((cols, _, index) => {
    if (map.every((row) => row[index] === ".")) {
      cols.push(index);
    }
    return cols;
  }, []);
  const galaxies = map.reduce((galaxies, row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === "#") {
        galaxies.push([colIndex, rowIndex]);
      }
    });
    return galaxies;
  }, []);
  const galaxyPairs = galaxies.reduce((pairs, galaxy, index) => {
    for (let i = index + 1; i < galaxies.length; i++) {
      pairs.push([galaxy, galaxies[i]]);
    }
    return pairs;
  }, []);
  return galaxyPairs.reduce((total, [[x1, y1], [x2, y2]]) => {
    const emptyColsBetween = emptyCols.filter((col) => (col > x1 && col < x2) || (col > x2 && col < x1));
    const emptyRowsBetween = emptyRows.filter((row) => (row > y1 && row < y2) || (row > y2 && row < y1));
    return total + emptyColsBetween.length + emptyRowsBetween.length + Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }, 0);
};

const part2 = (input) => {
  const map = input.split("\n").map((line) => line.split(""));
  const emptyRows = map.reduce((rows, row, index) => {
    if (row.every((col) => col === ".")) {
      rows.push(index);
    }
    return rows;
  }, []);
  const emptyCols = map[0].reduce((cols, _, index) => {
    if (map.every((row) => row[index] === ".")) {
      cols.push(index);
    }
    return cols;
  }, []);
  const galaxies = map.reduce((galaxies, row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === "#") {
        galaxies.push([colIndex, rowIndex]);
      }
    });
    return galaxies;
  }, []);
  const galaxyPairs = galaxies.reduce((pairs, galaxy, index) => {
    for (let i = index + 1; i < galaxies.length; i++) {
      pairs.push([galaxy, galaxies[i]]);
    }
    return pairs;
  }, []);
  return galaxyPairs.reduce((total, [[x1, y1], [x2, y2]]) => {
    const emptyColsBetween = emptyCols.filter((col) => (col > x1 && col < x2) || (col > x2 && col < x1));
    const emptyRowsBetween = emptyRows.filter((row) => (row > y1 && row < y2) || (row > y2 && row < y1));
    return total + (emptyColsBetween.length * 999999) + (emptyRowsBetween.length * 999999) + Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }, 0);
  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        #..
        ...
        .#.
        `,
        expected: 4,
      },
      {
        input: `
        #..
        .#.
        ..#
        `,
        expected: 8,
      },
      {
        input: `
        #..
        ..#
        ..#
        `,
        expected: 10,
      },
      {
        input: `
        ...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....
        `,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
