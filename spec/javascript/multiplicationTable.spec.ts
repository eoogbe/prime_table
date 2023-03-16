import {
  insertMultiplicationTable,
  resetTable,
} from '@app/multiplicationTable';

describe('multiplicationTable', () => {
  describe('resetTable', () => {
    it('creates a table', () => {
      document.body.innerHTML = `<div id="multiplication-table"></div>`;
      const container = document.getElementById(
        'multiplication-table'
      ) as Element;

      resetTable(container);

      expect(document.getElementsByTagName('table')).toHaveLength(1);
    });
  });

  describe('insertMultiplicationTable', () => {
    let spiedRaf: jest.Spied<typeof window.requestAnimationFrame>;

    beforeEach(() => {
      spiedRaf = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((cb: FrameRequestCallback) => {
          cb(0); // eslint-disable-line n/no-callback-literal
          return 0;
        });
    });

    afterEach(() => {
      spiedRaf.mockRestore();
    });

    it('adds values as headers', async () => {
      document.body.innerHTML = `<div id="multiplication-table">
          <table>
            <thead>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>`;
      const headRow = document.querySelector('thead tr') as HTMLTableRowElement;
      const tbody = document.querySelector('tbody') as HTMLTableSectionElement;

      await insertMultiplicationTable([2, 3, 5], { headRow, tbody });

      const result = Array.from(document.querySelectorAll('th')).map(
        (node) => node.textContent
      );

      expect(result).toEqual(['2', '3', '5', '2', '3', '5']);
    });

    it('adds multiples of the values to the DOM', async () => {
      document.body.innerHTML = `<div id="multiplication-table">
          <table>
            <thead>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>`;
      const headRow = document.querySelector('thead tr') as HTMLTableRowElement;
      const tbody = document.querySelector('tbody') as HTMLTableSectionElement;

      await insertMultiplicationTable([2, 3, 5], { headRow, tbody });

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
