import fetchMock from 'jest-fetch-mock';
import {
  generatePrimeTable,
  insertMultiplicationTable,
  resetTable,
  validatePrimeForm,
  addNFieldError,
  removeNFieldError,
} from '@app/primeTable';

describe('primeTable', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

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

      await insertMultiplicationTable([2, 3, 5], 0, { headRow, tbody });

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

      await insertMultiplicationTable([2, 3, 5], 0, { headRow, tbody });

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

  describe('generatePrimeTable', () => {
    it('fetches the primes', async () => {
      document.body.innerHTML = `<div id="multiplication-table"></div>`;
      const container = document.getElementById(
        'multiplication-table'
      ) as Element;
      fetchMock.mockResponse(JSON.stringify([2, 3, 5]));

      await generatePrimeTable(3, container);

      expect(fetchMock).toHaveBeenCalled();
    });
  });

  describe('validatePrimeForm', () => {
    it('when n valid parses n as an int', () => {
      const n = validatePrimeForm('2');

      expect(n).toBe(2);
    });
    it('when n not an integer returns null', () => {
      const n = validatePrimeForm('bad');

      expect(n).toBeNull();
    });
    it('when n is less than 1 returns null', () => {
      const n = validatePrimeForm('0');

      expect(n).toBeNull();
    });
  });

  describe('addNFieldError', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div id="n-field"><input id="n" class="form__input"></div>`;
    });

    it('adds error message', () => {
      expect(document.getElementById('n-error')).toBeNull();

      addNFieldError();

      expect(document.getElementById('n-error')).not.toBeNull();
    });
    it('adds error class to input', () => {
      addNFieldError();

      expect(document.getElementById('n')?.className).toBe(
        'form__input form__input--error'
      );
    });
  });

  describe('removeNFieldError', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div id="n-field">
        <input id="n" class="form__input form__input--error">
        <div id="n-error">Must be a positive integer</div>
      </div>`;
    });

    it('removes error', () => {
      expect(document.getElementById('n-error')).not.toBeNull();

      removeNFieldError();

      expect(document.getElementById('n-error')).toBeNull();
    });
    it('removes error class from input', () => {
      removeNFieldError();

      expect(document.getElementById('n')?.className).toBe('form__input');
    });
  });
});
