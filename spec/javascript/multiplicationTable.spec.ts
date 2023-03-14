import { getPrimes, insertMultiples } from '@app/multiplicationTable';

describe('multiplicationTable', () => {
  describe('getPrimes', () => {
    it('returns the primes in the table', () => {
      document.body.innerHTML = `<table>
        <thead>
          <tr>
            <td></td>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">5</th>
          </tr>
        </thead>
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

      const primes = getPrimes();

      expect(primes).toEqual([2, 3, 5]);
    });
  });

  describe('insertMultiples', () => {
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

      insertMultiples([2, 3, 5]);

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
