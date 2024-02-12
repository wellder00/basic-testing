// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

interface ListNode {
  value: string | null;
  next: ListNode | null;
}

describe('generateLinkedList', () => {
  let list1: string[];
  let result: ListNode;
  
  beforeEach(() => {

    list1 = [
      'apple',
      'banana',
      'orange',
      'grape',
      'melon',
      'pineapple',
      'pear',
      'strawberry',
      'kiwi',
      'blueberry',
    ];

    result = {
      next: {
        next: {
          next: {
            next: {
              next: {
                next: {
                  next: {
                    next: {
                      next: {
                        next: {
                          next: null,
                          value: null,
                        },
                        value: 'blueberry',
                      },
                      value: 'kiwi',
                    },
                    value: 'strawberry',
                  },
                  value: 'pear',
                },
                value: 'pineapple',
              },
              value: 'melon',
            },
            value: 'grape',
          },
          value: 'orange',
        },
        value: 'banana',
      },
      value: 'apple',
    };
  });
  test('should generate linked list from values 1', () => {
    const resultLinkedList = generateLinkedList(list1);
    expect(resultLinkedList).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    const resultLinkedList = generateLinkedList(list1);
    expect(resultLinkedList).toMatchSnapshot();
  });
});
