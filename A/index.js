const findLatestWeight = (weights) => {
  // let current = weights[0];
  weights.sort((a, b) => a - b); // 1,1,2,4,7,8

  while (weights.length > 1) {
    console.log({ weights });
    const weights2 = [];
    const max1 = weights.pop();
    const max2 = weights.pop();

    const diff = max1 - max2;
    console.log({ max1, max2, diff });
    let isPivotFound = false;

    if (diff !== 0) {
      for (let index = 0; index < weights.length; index++) {
        const current = weights[index];

        if (!isPivotFound && diff <= current) {
          weights2.push(diff);
          isPivotFound = true;
        }
        weights2.push(current);

        console.log(weights2);
        // index -= 1;
      }
      weights = weights2;
    }
  }

  return weights[0] || 0;
};
findLatestWeight([2, 7, 4, 1, 8, 1]);
module.exports = findLatestWeight;
/*
[2,7,4,1,8,1]
8,7,4,2,1,1

[2,4,1,1,1]
[2,1,1,1]
[1,1,1]
[1]
*/
