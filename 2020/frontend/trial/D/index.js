//  regexp ???
// \<colgroup\>(\s*<col(?: align="([a-z]+)")? \/>\s*)+

// const jsdom = require('../../../../node_modules/jsdom/lib/api.js');

// const getDOMDocument = (data = '') => new jsdom.JSDOM(data).window.document;
// const document = getDOMDocument();

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

const getProcessors = (alignments, rows, defaultAlign) => ({
  colgroup: (colgroup) => {
    alignments.push(...Array(...colgroup.children).map((col) => col.align || defaultAlign));
  },
  thead: (thead) => {
    rows.push(...Array(...thead.children).map(processTr));
  },
  tbody: (tbody) => {
    rows.push(...Array(...tbody.children).map(processTr));
  },
});

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
  const mapTagNameToProcessors = getProcessors(alignments, rows, defaultAlign);

  for (const child of table.children) {
    mapTagNameToProcessors[child.tagName.toLowerCase()](child);
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
