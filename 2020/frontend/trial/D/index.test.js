/**
 * @jest-environment jsdom
 */

const inputProcessing = require('./index.js');

const testData = [
  [
    `<table>
    <colgroup>
        <col align="right" />
        <col />
        <col align="center" />
    </colgroup>
    <thead>
        <tr>
            <td>Command         </td>
            <td>Description     </td>
            <th>Is implemented  </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>git status</th>
            <td>List all new or modified    files</td>
            <th>Yes</th>
        </tr>
        <tr>
            <th>git diff</th>
            <td>Show file differences that haven’t been
 staged</td>
            <td>No</td>
        </tr>
    </tbody>
</table>`,
    `| Command | Description | **Is implemented** |
| ---: | :--- | :---: |
| **git status** | List all new or modified files | **Yes** |
| **git diff** | Show file differences that haven’t been staged | No |`,
  ],
];

testData.forEach(([input, output], index) => {
  test(`${index + 1}`, () => {
    expect(inputProcessing(input)).toStrictEqual(output);
  });
});
