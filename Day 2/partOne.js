function partOne(sets) {
  sets = sets.map((set) => getDiffs(set));
  let between = sets.map((set) => allInRange(set, 1, 3));
  let signs = sets.map((set) => allSameSign(set));

  let ands = zip(between, signs, (a, b) => a & b);
  let partOne = ands.reduce((a, b) => a + b, 0);
  return partOne;
}

export { partOne };

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
