import { hashFunc } from '../../src/redux-data-provider/hashFunc';

test(`Test ${hashFunc.name} with normal objects`, () => {
  const obj1 = { id: 1, name: 'Duy' };
  const obj2 = { id: 1, name: 'Duy' };

  expect(hashFunc(obj1)).toBe(hashFunc(obj2));
});

test(`Test ${hashFunc.name} with complex objects`, () => {
  const obj1 = { id: 1, name: 'Duy', a: () => 1 };
  const obj2 = { id: 1, name: 'Duy', a: () => 2 };

  expect(hashFunc(obj1)).not.toBe(hashFunc(obj2));

  expect(hashFunc(obj1)).toBe(hashFunc(obj1));
  expect(hashFunc(obj2)).toBe(hashFunc(obj2));
});

test(`Test ${hashFunc.name} with similar objects`, () => {
  const obj1 = { id: 1, a: t => t.id };
  const obj2 = { id: 1, a: t => t.id };

  expect(hashFunc(obj1)).toBe(hashFunc(obj2));
});
