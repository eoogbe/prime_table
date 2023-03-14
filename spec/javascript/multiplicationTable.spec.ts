import insertTable from '@app/multiplicationTable';

describe('multiplicationTable', () => {
  describe('default', () => {
    it('adds multiples of the values to the DOM', () => {
      document.body.innerHTML = `<table>
        <tbody>
          <tr>
            <th scope="row">2</th>
          </tr>
          <tr>
            <th scope="row">3</th>
          </tr>
          <tr>
            <th scope="row">5</th>
          </tr>
        </tbody>
      </table>`;

      insertTable([2, 3, 5]);

      const result = Array.from(document.querySelectorAll('td')).map(
        (node) => node.textContent
      );

      expect(result).toEqual([
        '4',
        '6',
        '10',
        '6',
        '9',
        '15',
        '10',
        '15',
        '25',
      ]);
    });
  });
});
