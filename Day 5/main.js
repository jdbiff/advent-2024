import { readFileSync } from "fs";

//let section1 = readFileSync("example-s1.txt", "utf8");
//let section2 = readFileSync("example-s2.txt", "utf8");
let section1 = readFileSync("input-s1.txt", "utf8");
let section2 = readFileSync("input-s2.txt", "utf8");

let data_s1 = section1.trim().split("\n");
let data_s2 = section2
	.trim()
	.split("\n")
	.map((i) => i.split(",").map((j) => parseInt(j)));

let rule = [];

data_s1.forEach((i) => {
	let [val, bef] = i.split("|");
	val = parseInt(val);
	bef = parseInt(bef);
	if (val in rule) {
		rule[val].push(bef);
	} else {
		rule[val] = [bef];
	}
});

let data = data_s2.map((set) =>
	set.map((val, idx) => isCorrect(set.slice(idx + 1), val)),
);

let partOne = data
	.flatMap((set, idx) => (any(set, (s) => s !== true) ? null : idx))
	.filter((a) => a !== null)
	.flatMap((i) => data_s2[i][Math.trunc(data_s2[i].length / 2)])
	.reduce((a, b) => a + b, 0);

let partTwo = data
	.flatMap((set, idx) => (any(set, (s) => s !== true) ? idx : null))
	.filter((a) => a !== null)
	.map((i) => {
		let set1 = data_s2[i];
		let set2 = data[i];

		while (true) {
			set2.forEach((el, idx) => {
				if (el == false)
					[set1[idx], set1[idx + 1]] = [set1[idx + 1], set1[idx]];
			});
			set2 = set1.map((v, i) => isCorrect(set1.slice(i + 1), v));

			if (!any(set2, (s) => s == false)) break;
		}
		return set1;
	})
	.flatMap((i) => i[Math.trunc(i.length / 2)])
	.reduce((a, b) => a + b, 0);

function isCorrect(a, v) {
	return !any(a, (b) => (b in rule && rule[b].includes(v)) || false);
}

/**
 * @param { any[] } arr
 * @param { ( any ) => bool } func
 * @returns { boolean }
 */
function any(arr, func) {
	let res = false;
	arr.forEach((x) => {
		if (func(x) === true) {
			res = true;
			return;
		}
	});
	return res;
}

console.log("");
console.log("p1", partOne);
console.log("p2", partTwo);
