import {
  RdpActionsCollection,
  RdpConfig
} from '../src/RdpDefinition';

import mergeActions from '../src/mergeActions';

describe('Test bindAction memorization', () => {
  test('merge Actions from globalAction', () => {
    const actions: RdpActionsCollection<any> = { a: { get: jest.fn() } };

    const rs = mergeActions(undefined, actions);
    expect(typeof rs.a.get === 'function').toBe(true);
  });

  test('merge Actions from config', () => {
    const config: RdpConfig = { a: { actions: { get: jest.fn() } } };

    const rs = mergeActions(config, undefined);
    expect(typeof rs.a.get === 'function').toBe(true);
  });

  test('merge Actions from both', () => {
    const config: RdpConfig = { a: { actions: { get: jest.fn() } } };
    const actions: RdpActionsCollection<any> = { b: { get: jest.fn() } };

    const rs = mergeActions(config, actions);
    expect(typeof rs.a.get === 'function').toBe(true);
    expect(typeof rs.b.get === 'function').toBe(true);
  });
});
