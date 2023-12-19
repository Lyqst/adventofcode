import run from "aocrunner";

const part1 = (input) => {
  let [workflowsRaw, partsRaw] = input.split("\n\n");
  const workflows = {};
  workflowsRaw.split('\n').forEach(
    (line) => {
      let [name, conditions] = line.split("{");
      conditions = conditions.split(',').map((condition, i, arr) => {
        if (i == arr.length - 1) return condition.slice(0, -1);
        const larger = condition.includes('>');
        const [variable, value, out] = condition.split(/[><:]/);
        return { variable, larger, value, out };
      });
      workflows[name] = conditions
    });
  const evalPart = (part, workflow) => {
    if (workflow == 'R') return false;
    if (workflow == 'A') return true;
    const conditions = workflows[workflow];
    for (const condition of conditions) {
      if (typeof condition == 'string') return evalPart(part, condition);
      const { variable, larger, value, out } = condition;
      const variableValue = part[variable];
      if (larger) {
        if (variableValue > value) return evalPart(part, out);
      } else {
        if (variableValue < value) return evalPart(part, out);
      }
    }
    return false;
  }
  const parts = partsRaw.split('\n').map((line) => {
    const part = {};
    line.slice(1, -1).split(',').forEach((pair) => {
      const [key, value] = pair.split('=');
      part[key] = Number(value);
    });
    return part;
  });
  return parts.reduce((total, part) => {
    if (evalPart(part, 'in')) return total + part.x + part.m + part.a + part.s;
    return total;
  }, 0);
};

const part2 = (input) => {
  let workflowsRaw = input.split("\n\n")[0];
  const workflows = {};
  workflowsRaw.split('\n').forEach(
    (line) => {
      let [name, conditions] = line.split("{");
      conditions = conditions.split(',').map((condition, i, arr) => {
        if (i == arr.length - 1) return condition.slice(0, -1);
        const larger = condition.includes('>');
        const [variable, value, out] = condition.split(/[><:]/);
        return { variable, larger, value: Number(value), out };
      });
      workflows[name] = conditions
    });
  const flows = []
  const evalFlow = (workflow, flow) => {
    if (workflow == 'R') return;
    if (workflow == 'A') { flows.push(flow); return; }
    const conditions = workflows[workflow];
    for (const condition of conditions) {
      if (typeof condition == 'string') return evalFlow(condition, flow);
      const { variable, larger, value, out } = condition;
      const variableValue = flow[variable];
      if (larger) {
        if (variableValue.min > value) { evalFlow(out, {...flow}); break }
        evalFlow(out, { ...flow, [variable]: { min: value + 1, max: variableValue.max } });
        flow = {...flow, [variable]: { min: variableValue.min, max: value } };
      } else {
        if(variableValue.max < value) { evalFlow(out, flow); break }
        evalFlow(out, { ...flow, [variable]: { min: variableValue.min, max: value - 1 } });
        flow = {...flow, [variable]: { min: value, max: variableValue.max } };
      }
    }
    return;
  }
  evalFlow('in', { x: { min: 1, max: 4000 }, m: { min: 1, max: 4000 }, a: { min: 1, max: 4000 }, s: { min: 1, max: 4000 } });
  return flows.reduce((total, flow) => {
    return total +
      (flow.x.max - flow.x.min + 1) *
      (flow.m.max - flow.m.min + 1) *
      (flow.a.max - flow.a.min + 1) *
      (flow.s.max - flow.s.min + 1);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}
        `,
        expected: 19114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}
        `,
        expected: 167409079868000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
