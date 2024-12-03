/**
 * @param {number[]} sets
 */
function partTwo(sets) {
  let damped = sets.map(
    (set) => isSafe(set) || any(dampen(set), (damped) => isSafe(damped)),
  );

  return damped.map((v) => (v == true ? 1 : 0)).reduce((a, b) => a + b, 0);
}

export { partTwo };

/**
 * @param { () => {} } gen
 * @param { ( val ) => bool } func
 */
function any(gen, func) {
  while (true) {
    let x = gen.next();
    if (x.done) break;

    if (func(x.value)) return true;
  }
}

function isSafe(arr) {
  arr = getDiffs(arr);
  return allInRange(arr, 1, 3) && allSameSign(arr);
}

function getDiffs(arr) {
  let res = [];
  for (let idx = 0; idx < arr.length; idx++) {
    if (idx + 1 >= arr.length) {
      break;
    }
    res.push(arr[idx] - arr[idx + 1]);
  }
  return res;
}

/**
 * @generator
 * @param {number[]} arr
 */
function* dampen(arr) {
  for (let idx = 0; idx < arr.length; idx++) {
    yield arr.filter((_, i) => i !== idx);
  }
}

function allInRange(arr, lower, upper) {
  for (let idx = 0; idx < arr.length; idx++) {
    let val = Math.abs(arr[idx]);
    if (lower > val || val > upper) return false;
  }
  return true;
}

function allSameSign(arr) {
  for (let idx = 0; idx < arr.length - 1; idx++) {
    //console.log(
    //  arr[idx],
    //  arr[idx + 1],
    //  Math.sign(arr[idx]) !== Math.sign(arr[idx + 1]),
    //);
    if (Math.sign(arr[idx]) !== Math.sign(arr[idx + 1])) return false;
  }
  return true;
}
