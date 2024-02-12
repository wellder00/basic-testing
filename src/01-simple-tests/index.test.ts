// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const result = (firstNum: unknown, secondNum: unknown, act: unknown) => {
    return simpleCalculator({ a: firstNum, b: secondNum, action: act });
  };
  test('should add two numbers', () => {
    expect(result(2, 2, Action.Add)).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(result(2, 2, Action.Subtract)).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(result(5, 2, Action.Multiply)).toBe(10);
  });

  test('should divide two numbers', () => {
    expect(result(10, 2, Action.Divide)).toBe(5);
  });

  test('should exponential two numbers', () => {
    expect(result(5, 2, Action.Exponential)).toBe(25);
  });

  test('should return null for invalid action', () => {
    expect(result(5, 2, 'InvalidAction')).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(result('5', 2, Action.Divide)).toBeNull();
    expect(result(5, '2', Action.Divide)).toBeNull();
    expect(result(null, 2, Action.Divide)).toBeNull();
    expect(result(5, undefined, Action.Divide)).toBeNull();
  });
});
