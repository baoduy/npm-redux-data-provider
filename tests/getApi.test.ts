import { RdpFinalConfig } from '../../src/redux-data-provider/RdpDefinition';
import getApi from '../../src/redux-data-provider/getApi';

describe('Test getApi', () => {
  test('get action by key', () => {
    const api = getApi(
      'customer',
      { customer: {} },
      { customer: { get: jest.fn() } }
    );

    expect(typeof api.get === 'function').toBe(true);
  });

  test('get action by name', () => {
    const api = getApi(
      'customer',
      { customer: { name: 'aa' } },
      { aa: { get: jest.fn() } }
    );

    expect(typeof api.get === 'function').toBe(true);
  });

  test('get action no api', () => {
    const api = getApi('customer', { customer: { name: 'aa' } }, {});

    expect(api).toBeUndefined();
  });
});
