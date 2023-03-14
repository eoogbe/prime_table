import { getPrimes } from '@app/multiplicationTable';

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
            <th scope="row">3</th>
            <th scope="row">5</th>
          </tr>
          <tr>
          </tr>
        </tbody>
      </table>`;

      const primes = getPrimes();

      expect(primes).toEqual([2, 3, 5]);
    });
  });
});
