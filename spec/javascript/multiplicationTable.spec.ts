import generateMultiplicationTable from '@app/multiplicationTable';

describe('generateMultiplicationTable', () => {
  test('it runs', () => {
    const result = generateMultiplicationTable();

    expect(result).toBe('Hello');
  });
});
