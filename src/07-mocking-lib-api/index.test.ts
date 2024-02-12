// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({ create: jest.fn() }));
jest.mock('lodash', () => ({ throttle: jest.fn((fn) => fn) }));

beforeEach(() => {
  const getMock = jest.fn().mockResolvedValue({ data: 'res' });
  (axios.create as jest.Mock).mockImplementation(() => ({
    get: getMock,
  }));
});

afterEach(() => jest.clearAllMocks());

describe('throttledGetDataFromApi', () => {
  const url = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };

  const path = 'users';

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    expect(axios.create).toBeCalledWith(url);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    expect(axios.create().get).toBeCalledWith(path);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(path);
    expect(response).toEqual('res');
  });
});
