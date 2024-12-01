import * as FS from "fs";

let data = FS.readFileSync("input.txt", "utf8");

let l = [];
let r = [];

data
	.trim()
	.split("\n")
	.map((line) => line.split("   "))
	.forEach((pair) => {
		l.push(pair[0]);
		r.push(pair[1]);
	});

l = l.sort((a, b) => a - b);
r = r.sort((a, b) => a - b);

let pOne = l.map((lhs, i) => Math.abs(lhs - r[i])).reduce((a, b) => a + b, 0);
let pTwo = l
	.map((l) => l * r.filter((i) => i == l).length)
	.reduce((a, b) => a + b, 0);

console.log(pOne);
console.log(pTwo);
