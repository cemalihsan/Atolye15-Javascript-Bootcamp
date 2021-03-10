import { Sum } from '../src/helpers/math';

test('sum of 3 and 5 must be 8', () => {
  const result = Sum(3, 5);
  expect(result).toBe(8);
});
