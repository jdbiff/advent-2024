function zip(arra, arrb, func) {
  let res = [];

  for (let idx = 0; idx < arra.length; idx++) {
    res.push(func(arra[idx], arrb[idx]));
  }

  return res;
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

function allInRange(arr, lower, upper) {
  for (let idx = 0; idx < arr.length; idx++) {
    let val = Math.abs(arr[idx]);
    if (lower > val || val > upper) return false;
  }
  return true;
}

function allSameSign(arr) {
  for (let idx = 0; idx < arr.length - 1; idx++) {
    if (Math.sign(arr[idx]) !== Math.sign(arr[idx + 1])) return false;
  }
  return true;
}

/**
 * @param { Generator<number[], void, unknown> } gen
 * @param { ( val: number[] ) => bool } func
 * @returns { boolean }
 */
function any(gen, func) {
  while (true) {
    let x = gen.next();
    if (x.done) return false;

    if (func(x.value)) return true;
  }
}

/**
 * @param {number[]} arr
 * @returns {boolean}
 * */
function isSafe(arr) {
  arr = getDiffs(arr);
  return allInRange(arr, 1, 3) && allSameSign(arr);
}

/**
 * @generator
 * @param {number[]} arr
 * @returns {Generator<number[], void, unknown>}
 */
function* dampen(arr) {
  for (let idx = 0; idx < arr.length; idx++) {
    yield arr.filter((_, i) => i !== idx);
  }
}

export { getDiffs, allInRange, allSameSign, zip, isSafe, any, dampen };
