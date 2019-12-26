import getApi from '../src/getApi';

describe('Test getApi', () => {
  test('get action by key', () => {
    const api: any = getApi('customer', { customer: {} }, { customer: { get: jest.fn() } });

    expect(typeof api.get === 'function').toBe(true);
  });

  test('get action by name', () => {
    const api: any = getApi('customer', { customer: { name: 'aa' } }, {
      aa: { get: jest.fn() }
    } as any);

    expect(typeof api.get === 'function').toBe(true);
  });

  test('get action no api', () => {
    const api = getApi('customer', { customer: { name: 'aa' } }, {} as any);

    expect(api).toBeUndefined();
  });
});
