const findLatestWeight = (weights) => {
  // let current = weights[0];

  while (weights.length > 1) {
    // current = weights[0];
    let max1 = -Infinity
    let max2 = -Infinity

    for (let index = 0; index < weights.length; index++) {
      if (max1 > max2) {
        
      }
      if (weights[index] === weights[index - 1]) {
        weights[index - 1] = 0;
      } else {
        weights[index - 1] = weights[index] - weights[index - 1];
      }

      index -= 1;
    }
  }

  return weights[0];
};

module.exports = findLatestWeight;
