import { RdpConfig } from '../../src/redux-data-provider/RdpDefinition';
import { validateData } from '../../src/redux-data-provider/validateData';

test(`Test validateData`, () => {
  const config: RdpConfig = {
    //Load All Customer
    customer: {}, //Load vendor 1
    verndor: { id: 1 }, //Load product 1,2
    product: { id: () => [1, 2] }
  };

  const data = {
    //Load All Customer
    customer: undefined,
    verndor: { id: 1, name: 'V123' },
    product: [{ id: 1, name: 'P1' }, { id: 2, name: 'P2' }]
  }; //Load vendor 1 //Load product 1,2

  expect(validateData(data, config)).toBe(false);

  data.customer = [{ id: 1, name: 'C123' }];

  expect(validateData(data, config)).toBe(true);
});

test(`Test validateData custom validation`, () => {
  const config: RdpConfig = {
    verndor: { id: 1, validate: v => v.name === 'V123' }
  };

  const data = {
    verndor: { id: 1, name: 'V123' }
  };

  expect(validateData(data, config)).toBe(true);
});

test(`Test validateData with undefined config`, () => {
  const data = { vendor: { id: 1, name: 'V123' } };

  expect(validateData(data, null)).toBe(true);
});

test(`Test validateData undefined data`, () => {
  const config: RdpConfig = {
    vendor: { id: 1, validate: v => v.name === 'V123' }
  };

  expect(validateData(null, config)).toBe(false);
});

test(`Test validateData Array of Id with Array of data`, () => {
  const config = { vendor: { id: [1, 2] } };
  const data = { vendor: [{ id: 1, name: 'VD1' }, { id: 3, name: 'VD1' }] };

  expect(validateData(data, config)).toBe(false);
});
