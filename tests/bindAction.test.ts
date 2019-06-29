import {
  RdpActionsCollection,
  RdpConfig
} from '../../src/redux-data-provider/RdpDefinition';

import { bindAction } from '../../src/redux-data-provider/bindAction';
import mergeActions from '../../src/redux-data-provider/mergeActions';

describe('Test bindAction memorization', () => {
  test.skip('bindAction the same config and actions', () => {
    const config: RdpConfig = { a: true };
    const actions: RdpActionsCollection<any> = { a: { get: jest.fn() } };

    const result1 = bindAction(mergeActions(config, actions), jest.fn());
    const result2 = bindAction(mergeActions(config, actions), jest.fn());

    expect(result1).toBe(result2);
  });

  test('bindAction the same config and difference actions', () => {
    const config: RdpConfig = { a: true };
    const actions1: RdpActionsCollection<any> = { a: { get: () => '123' } };
    const actions2: RdpActionsCollection<any> = { a: { get: jest.fn() } };

    const result1 = bindAction(mergeActions(config, actions1), jest.fn());
    const result2 = bindAction(mergeActions(config, actions2), jest.fn());

    expect(result1).not.toBe(result2);
  });
});
