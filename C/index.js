/* eslint-disable no-bitwise */

console.time('paint');

const renderBox = () => {
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.width = '300px';
  box.style.height = '96px';
  // box.style.backgroundColor = "#ffcece"
  box.style.margin = 'auto';
  box.style.display = 'flex';
  document.body.append(box);

  return box;
};
const renderBox2 = () => {
  const box = document.createElement('img');
  box.classList.add('box');
  box.style.width = '300px';
  box.style.height = '96px';
  // box.style.backgroundColor = "#ffcece"
  box.style.margin = 'auto';
  box.style.display = 'flex';
  // box.src = 'https://contest.yandex.ru/testsys/statement-image?imageId=f37625061f759da40ce3e02a28ce7f4abab6c9d8cfd88a3614609051e7b153a7'
  box.src =
    'https://contest.yandex.ru/testsys/statement-image?imageId=b195b513214a228276aee97746209ea7ee83cf73cec6e258363178582f124214';
  document.body.append(box);

  const line = document.createElement('div');
  line.style.width = '304px';
  line.style.height = '2px';
  line.style.backgroundColor = 'red';
  line.style.margin = 'auto';
  // box.style.display = 'flex';
  document.body.append(line);
};

// const delay = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });

const renderFields = (box, binary) => {
  for (let i = 1; i <= 5; i++) {
    const verticalLine = document.createElement('div');
    verticalLine.classList.add('vertical-line');
    verticalLine.style.width = i % 2 === 0 ? '5px' : '4px';
    verticalLine.style.height = '96px';
    verticalLine.style.backgroundColor = i % 2 === 0 ? 'white' : 'black';
    box.append(verticalLine);
  }

  //  С левого и правого края баркод ограничен пятью полосками
  //  (чёрная, белая, чёрная, белая, чёрная).
  //  Ширина чёрной полоски — 4 пикселя, белой полоски - 5 пикселей.
  const widthField = 300 - (4 * 3 + 5 * 2) * 2;
  const field = document.createElement('div');
  field.classList.add('field');
  field.style.width = `${widthField}px`;
  field.style.height = '96px';
  // field.style.backgroundColor = 'green'
  // field.style.margin = 'auto';
  // field.style.display = 'grid';
  // field.style.gridTemplate = 'repeat(12, 8px) / repeat(32, 8px)';
  field.style.display = 'flex';
  field.style.flexWrap = 'wrap';
  field.style.alignContent = 'flex-start';
  box.append(field);

  for (let i = 1; i <= 5; i++) {
    const verticalLine = document.createElement('div');
    verticalLine.classList.add('vertical-line');
    verticalLine.style.width = i % 2 === 0 ? '5px' : '4px';
    verticalLine.style.height = '96px';
    verticalLine.style.backgroundColor = i % 2 === 0 ? 'white' : 'black';
    box.append(verticalLine);
  }

  let index = 0;
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 32; x++) {
      // await delay(1)
      const block = document.createElement('div');
      block.classList.add('block');
      block.style.width = '8px';
      block.style.height = '8px';
      block.style.backgroundColor = Number(binary[index]) === 1 ? 'black' : 'white';
      field.append(block);
      index += 1;
    }
  }
};
/**
 * Отрисовать отладочную информацию кофемашины в element
 * @param debugInfo {CoffeeMachineDebugInfo} - отладочная информация
 * @param element {HTMLDivElement} - div с фиксированным размером 300x96 пикселей, в который будет отрисовываться баркод
 */

// async function renderBarcode(debugInfo, element) {
const decodeMessageToBinary = (debugInfo) => {
  console.log(debugInfo);

  const code = debugInfo.code.toString().padStart(3, '0');
  const message = debugInfo.message.padEnd(34, ' ');

  const str = `${debugInfo.id}${code}${message}`;
  console.log({ str });

  const encoder = new TextEncoder();
  const bits = encoder.encode(`${str}0`);

  const lastBit = bits.reduce((sum, bit) => sum ^ bit);

  bits[47] = lastBit;

  console.log({ bits });

  let binary = '';

  bits.forEach((bit) => {
    binary += bit.toString(2).padStart(8, '0');
  });

  console.log({ binary });
  return binary;
};

function renderBarcode() {
  renderBox2();
  // const debugInfo = {
  //   id: 'ezeb2fve0b',
  //   code: 10,
  //   message: '404 Error coffee not found',
  // };
  const debugInfo = {
    id: 'Teapot1234',
    code: 0,
    message: 'No coffee this is a teapot',
  };
  const binary = decodeMessageToBinary(debugInfo);
  const box = renderBox();
  renderFields(box, binary);
}

console.log(renderBarcode());