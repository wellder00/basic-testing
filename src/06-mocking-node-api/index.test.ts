import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

jest.mock('fs');
jest.mock('fs/promises');

let callback: jest.Mock;
let thousandMs = 1000;

beforeEach(() => {
  jest.useFakeTimers();
  callback = jest.fn();
  jest.spyOn(global, 'setTimeout');
  jest.spyOn(global, 'setInterval');
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('doStuffByTimeout', () => {
  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, thousandMs);
    expect(setTimeout).toHaveBeenCalledWith(callback, thousandMs);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, thousandMs);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(thousandMs);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, thousandMs);
    expect(setInterval).toHaveBeenCalledWith(callback, thousandMs);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, thousandMs);
    expect(setInterval).toHaveBeenCalledWith(callback, thousandMs);
    for (let i = 0; i < 5; i++) {
      jest.advanceTimersByTime(thousandMs);
    }
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const fileTxt = 'readme.txt';
  const fileContent = 'File content';
  test('should call join with pathToFile', async () => {
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue('mocked/path/to/readme.txt');
    await readFileAsynchronously(fileTxt);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, fileTxt);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(fileTxt);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(fileContent);
    const result = await readFileAsynchronously(fileTxt);
    expect(result).toBe(fileContent);
  });
});
