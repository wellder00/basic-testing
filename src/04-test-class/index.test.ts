// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

let balance: number;
let moreBalance: number;
let lessBalance: number;
let account: BankAccount;
let transferAccount: BankAccount;

beforeEach(() => {
  balance = 3333;
  moreBalance = 4444;
  lessBalance = 2222;
  account = getBankAccount(balance);
  transferAccount = getBankAccount(moreBalance);
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(moreBalance)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(moreBalance, transferAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(balance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const result = balance + moreBalance;
    expect(account.deposit(moreBalance).getBalance()).toBe(result);
  });

  test('should withdraw money', () => {
    const result = balance - lessBalance;
    expect(account.withdraw(lessBalance).getBalance()).toBe(result);
  });

  test('should transfer money', () => {
    const withdrawnMoney = balance - balance;
    const depositMoney = moreBalance + balance;
    expect(account.transfer(balance, transferAccount).getBalance()).toBe(
      withdrawnMoney,
    );
    expect(transferAccount.getBalance()).toBe(depositMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 1;
    jest.spyOn(lodash, 'random').mockReturnValue(mockBalance);
    const balance = await account.fetchBalance();
    expect(balance).toBe(mockBalance);
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(moreBalance);
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(balance).toBe(moreBalance);
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    expect(async () => await account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    jest.restoreAllMocks();
  });
});
