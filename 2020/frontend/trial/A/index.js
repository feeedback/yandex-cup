const findLatestWeight = (weights) => {
  weights.sort((a, b) => a - b);

  while (weights.length >= 2) {
    const max1 = weights.pop();
    const max2 = weights.pop();

    const diff = max1 - max2;

    if (weights.length === 0) {
      return diff;
    }

    if (diff === 0) {
      continue;
    }

    for (let index = 0; index < weights.length; index++) {
      if (diff <= weights[index]) {
        weights.splice(index, 0, diff);
        break;
      }
      if (index === weights.length - 1) {
        weights.push(diff);
        break;
      }
    }
  }

  return weights[0] || 0;
};

// const getRandomIntegerInRange = (min, max) => {
//   const diff = max - min + 1;
//   return () => Math.floor(Math.random() * diff) + min;
// };
// const rndmInt = getRandomIntegerInRange(1, 100);
// console.time();
// findLatestWeight(new Array(1000000).fill(0).map(() => rndmInt()));
// console.timeEnd();

module.exports = findLatestWeight;
