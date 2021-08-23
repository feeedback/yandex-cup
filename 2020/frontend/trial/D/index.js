/* eslint-disable default-case */
const clearWhiteSpaces = (str) => str
  .replace(/\r?\n|\r/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const processCell = (cell) => {
  const tag = cell.tagName.toLowerCase();
  const content = clearWhiteSpaces(cell.innerHTML);

  return {
    td: content,
    th: `**${content}**`,
  }[tag];
};

const processTr = (tr) => Array(...tr.children).map(processCell);

const convertHTMLtoMarkdown = (htmlCode) => {
  const div = document.createElement('div');
  div.innerHTML = htmlCode;
  const table = div.firstChild;

  const defaultAlign = 'left';
  const mapAlignValueToMarkdown = {
    left: ' :--- ',
    center: ' :---: ',
    right: ' ---: ',
  };

  const rows = [];
  const alignments = [];

  for (const child of table.children) {
    const childrenEl = Array(...child.children);

    switch (child.tagName.toLowerCase()) {
      case 'colgroup':
        alignments.push(...childrenEl.map((col) => col.align || defaultAlign));
        break;

      case 'thead':
        rows.push(...childrenEl.map(processTr));
        break;

      case 'tbody':
        rows.push(...childrenEl.map(processTr));
        break;
    }
  }

  if (alignments.length === 0) {
    alignments.push(...Array(rows[0].length).fill(defaultAlign));
  }

  const tHeaderRow = `| ${rows[0].join(' | ')} |`;
  const alignsRow = `|${alignments.map((align) => mapAlignValueToMarkdown[align]).join('|')}|`;
  const dataRows = rows.slice(1).map((rowContent) => `| ${rowContent.join(' | ')} |`);

  const markdownTable = [tHeaderRow, alignsRow, ...dataRows].join('\n');

  return markdownTable;
};

// eslint-disable-next-line no-unused-vars
function solution(input) {
  return convertHTMLtoMarkdown(input);
}
module.exports = convertHTMLtoMarkdown;
