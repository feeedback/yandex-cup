const inputProcessing = require('./index');

const testData = [
  [[2, 7, 4, 1, 8, 1], 1], //
  [[2, 2], 0], //
  [[2], 2], //
];

testData.forEach(([input, output], index) => {
  test(`${index + 1}`, () => {
    expect(inputProcessing(input)).toStrictEqual(output);
  });
});
