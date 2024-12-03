import * as FS from "fs";
import { partOne } from "./partOne.js";
import { partTwo } from "./partTwo.js";

//let data = FS.readFileSync("example.txt", "utf8");
let data = FS.readFileSync("input.txt", "utf8");

data = data.trim().split("\n");

let sets = data
  .map((e) => e.split(" "))
  .map((set) => set.map((val) => parseInt(val)));

console.log("p1", partOne(sets));
console.log("p2", partTwo(sets));
