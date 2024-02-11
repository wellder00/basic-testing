// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 2, action: 'InvalidAction', expected: null },
  { a: 5, b: '2', action: Action.Add, expected: null },
  { a: '5', b: 2, action: Action.Add, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
  { a: 5, b: undefined, action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'table tests API to test all cases above',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
