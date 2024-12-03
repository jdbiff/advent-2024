import * as FS from "fs";
import { any, dampen, isSafe } from "./funcs.js";

//let data = FS.readFileSync("example.txt", "utf8");
let data = FS.readFileSync("input.txt", "utf8");

data = data.trim().split("\n");

let sets = data
  .map((e) => e.split(" "))
  .map((set) => set.map((val) => parseInt(val)));

function partOne(sets) {
  return sets.map((set) => isSafe(set)).reduce((a, b) => a + b, 0);
}

function partTwo(sets) {
  let damped = sets.map(
    (set) => isSafe(set) || any(dampen(set), (damped) => isSafe(damped)),
  );

  return damped.reduce((a, b) => a + b, 0);
}

console.log("p1", partOne(sets));
console.log("p2", partTwo(sets));
