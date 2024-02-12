// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

let hello: string;

beforeAll(() => {
  hello = 'Hello';
});

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(hello)).resolves.toBe(hello);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(hello)).toThrowError(hello);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
