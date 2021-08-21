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
      block.style.backgroundColor = binary[index] ? 'white' : 'black';
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
  const { id, code, message } = debugInfo;

  const str = `${id}${String(code).padStart(3, '0')}${message.padEnd(34, ' ')}`;
  console.log({ str });

  const encoder = new TextEncoder();
  // const view = encoder.encode(str.repeat(1000));
  const bits = encoder.encode(`${str}0`);

  const lastBit = bits.reduce((sum, bit, i) => (i === 47 ? sum : sum ^ bit));
  console.log({ lastBit });
  bits[47] = lastBit;

  console.log({ bits });

  let binary = '';

  bits.forEach((bit) => {
    binary += bit.toString(2);
  });

  return binary;
};

function renderBarcode() {
  // type CoffeeMachineDebugInfo = {
  //   /**
  //    * Идентификатор конкретной кофе-машины — строка из маленьких
  //    * и больших латинских букв и цифр, строго 10 символов
  //    */
  //   id: string;
  //   /**
  //    * Код ошибки — целое число от 0 до 999
  //    */
  //   code: number;
  //   /**
  //    * Сообщение об ошибке — строка из маленьких и больших
  //    * латинских букв, цифр и пробелов (от 0 до 34 символов)
  //    */
  //   message: string;
  // }

  // Алгоритм формирования контента баркода

  // Из отладочной информации формируется строка вида <id><code><message>. Поле code дополняется
  // незначащими нулями до трех символов. Поле message дополняется пробелами в конце до 34 символов.

  // Далее строка конвертируется в байтовый массив - каждому символу строки ставится в соответствие
  // его ASCII-код (число от 0 до 255). В конец массива дописывается один байт контрольной суммы,
  // которая вычисляется как побитовое сложение по модулю 2 (XOR) всех элементов массива.

  // Затем, каждый элемент полученного массива переводится в двоичную запись (восемь символов 0 или
  // 1) и кодируется последовательностью из восьми квадратов (0 - белый квадрат, 1 - черный
  // квадрат). Квадраты отрисовываются в контенте баркода последовательно и построчно.

  const debugInfo = {
    id: 'ezeb2fve0b',
    code: 10,
    message: '404 Error coffee not found',
  };
  const binary = decodeMessageToBinary(debugInfo);
  const box = renderBox();
  renderFields(box, binary);
}

console.log(renderBarcode());

document.addEventListener('DOMContentLoaded', () => {
  console.timeEnd('paint');
});
