/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
const renderFn = {
  createLineEl: (index) => {
    const verticalLineEl = document.createElement('div');

    verticalLineEl.style.width = index % 2 === 0 ? '5px' : '4px';
    verticalLineEl.style.height = '96px';
    verticalLineEl.style.backgroundColor = index % 2 === 0 ? 'white' : 'black';

    return verticalLineEl;
  },

  createFieldEl: () => {
    const widthField = 300 - (4 * 3 + 5 * 2) * 2;
    const fieldEl = document.createElement('div');

    fieldEl.style.width = `${widthField}px`;
    fieldEl.style.height = '96px';
    fieldEl.style.display = 'flex';
    fieldEl.style.flexWrap = 'wrap';
    fieldEl.style.alignContent = 'flex-start';

    return fieldEl;
  },

  createCellEl: (binaryValue) => {
    const cellEl = document.createElement('div');

    cellEl.style.width = '8px';
    cellEl.style.height = '8px';
    cellEl.style.backgroundColor = Number(binaryValue) === 1 ? 'black' : 'white';

    return cellEl;
  },
};

const renderBarcodeEl = (parentElement, binary, isAsyncRender = false) => {
  parentElement.style.display = 'flex';

  for (let index = 1; index <= 5; index++) {
    parentElement.append(renderFn.createLineEl(index));
  }

  const fieldEl = renderFn.createFieldEl();
  parentElement.append(fieldEl);

  for (let index = 1; index <= 5; index++) {
    parentElement.append(renderFn.createLineEl(index));
  }

  for (let index = 0; index < 12 * 32; index++) {
    if (isAsyncRender) {
      setTimeout(() => {
        fieldEl.append(renderFn.createCellEl(binary[index]));
      }, index * 4);
    } else {
      fieldEl.append(renderFn.createCellEl(binary[index]));
    }
  }
};

const decodeMessageToBinary = (debugInfo) => {
  const code = debugInfo.code.toString().padStart(3, '0');
  const message = debugInfo.message.padEnd(34, ' ');

  const str = `${debugInfo.id}${code}${message}`;

  const encoder = new TextEncoder();
  const bits = encoder.encode(`${str}${String.fromCharCode(0)}`);

  const lastBit = bits.reduce((sum, bit) => sum ^ bit);

  bits[47] = lastBit;

  let binary = '';

  bits.forEach((bit) => {
    binary += bit.toString(2).padStart(8, '0');
  });

  return binary;
};

/**
 * Отрисовать отладочную информацию кофемашины в element
 * @param debugInfo {CoffeeMachineDebugInfo} - отладочная информация
 * @param element {HTMLDivElement} - div с фиксированным размером 300x96 пикселей, в который будет отрисовываться баркод
 */
// eslint-disable-next-line no-unused-vars
function renderBarcode(debugInfo, parentElement, isAsyncRender) {
  const binary = decodeMessageToBinary(debugInfo);

  renderBarcodeEl(parentElement, binary, isAsyncRender);
}
