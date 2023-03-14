import insertTable from '@app/multiplicationTable';

describe('multiplicationTable', () => {
  describe('default', () => {
    it('creates a table', () => {
      document.body.innerHTML = `<div id="prime-table"></div>`;

      insertTable([2, 3, 5]);

      expect(document.getElementsByTagName('table')).toHaveLength(1);
    });

    it('adds values as headers', () => {
      document.body.innerHTML = `<div id="prime-table"></div>`;

      insertTable([2, 3, 5]);

      const result = Array.from(document.querySelectorAll('th')).map(
        (node) => node.textContent
      );

      expect(result).toEqual(['2', '3', '5', '2', '3', '5']);
    });

    it('adds multiples of the values to the DOM', () => {
      document.body.innerHTML = `<div id="prime-table"></div>`;

      insertTable([2, 3, 5]);

      const result = Array.from(document.querySelectorAll('td')).map(
        (node) => node.textContent
      );

      expect(result).toEqual([
        '',
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
