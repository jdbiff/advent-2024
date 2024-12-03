import { readFileSync } from "fs";
import { argv0 } from "process";

//const data = readFileSync("example.txt", "utf8");
const data = readFileSync("input.txt", "utf8");

let lines = data.trim().split("\n");

const regex = /(mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don't)\(\)/;

let enabled = true;

let partOne = lines
  .flatMap(matcher)
  .map(partOneProcess)
  .filter((val) => isNaN(val) === false)
  .reduce((a, b) => a + b, 0);

let partTwo = lines
  .flatMap(matcher)
  .map(partTwoProcess)
  .filter((val) => val !== undefined)
  .reduce((a, b) => a + b, 0);

function partOneProcess(match) {
  return parseInt(match.lhs) * parseInt(match.rhs);
}

function partTwoProcess(match) {
  if (match.act === "don't") {
    enabled = false;
    return undefined;
  }

  if (match.act === "do") {
    enabled = true;
    return undefined;
  }

  if (!enabled) return undefined;

  return parseInt(match.lhs) * parseInt(match.rhs);
}

function matcher(line) {
  let matcher = matches(line, regex);
  let res = [];
  while (true) {
    let n = matcher.next();
    if (n.done) break;
    res.push(n.value);
  }
  return res;
}

function* matches(line, regex) {
  let R = new RegExp(regex, "y");
  let idx = 0;

  while (idx < line.length) {
    R.lastIndex = idx;

    let match = R.exec(line);
    if (match !== null) {
      idx += match[0].length;
      yield {
        act: match[1] || match[4] || match[5],
        lhs: match[2],
        rhs: match[3],
      };
    } else {
      idx++;
    }
  }
}

console.log("p1", partOne);
console.log("p2", partTwo);
