const inputProcessing = require('./index');

const testData = [
  ['block_mod__elem', { mod: '_', elem: '__' }],
  ['block_mod_mod__elem', { mod: '_', elem: '__' }],
  ['block_mod_mod_mod_mod_mod_mod_mod_mod__elem', { mod: '_', elem: '__' }],
  ['block–mod–val___elem', { mod: '–', elem: '___' }],
  ['block__mod__val—elem', { mod: '__', elem: '—' }],
  ['block--elem_mod_mod', { mod: '_', elem: '--' }], // first elem, second mod, watch to count
];

testData.forEach(([input, output], index) => {
  test(`${index + 1}`, () => {
    expect(inputProcessing(input)).toStrictEqual(output);
  });
});
