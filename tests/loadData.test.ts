import {
  RdpFinalConfig,
  RequiredRdpActionsCollection
} from '../../src/redux-data-provider/RdpDefinition';

import loadData from '../../src/redux-data-provider/loadData';
import { notDeepEqual } from 'assert';

describe('Test loadData', () => {
  test('load undefined data', () => {
    const config: RdpFinalConfig<any> = {
      customer: {}
    };
    const actions: RequiredRdpActionsCollection<any> = {
      customer: { get: jest.fn() }
    };
    const data = undefined;

    loadData(config, data, actions);

    expect(actions.customer.get).toBeCalled();
  });

  test('load only invalid data api called', () => {
    const config: RdpFinalConfig<any> = {
      customer: {},
      vendor: {}
    };
    const actions: RequiredRdpActionsCollection<any> = {
      customer: { get: jest.fn() },
      vendor: { get: jest.fn() }
    };
    const data = {
      customer: [{ id: 1 }],
      vendor: {}
    };

    loadData(config, data, actions);

    expect(actions.customer.get).not.toBeCalled();
    expect(actions.vendor.get).toBeCalled();
  });

  test('No api call for valid data', () => {
    const config: RdpFinalConfig<any> = {
      customer: {},
      vendor: {}
    };
    const actions: RequiredRdpActionsCollection<any> = {
      customer: { get: jest.fn() },
      vendor: { get: jest.fn() }
    };
    const data = {
      customer: [{ id: 1 }],
      vendor: { id: 2 }
    };

    loadData(config, data, actions);

    expect(actions.customer.get).not.toBeCalled();
    expect(actions.vendor.get).not.toBeCalled();
  });

  test('No data and No api', async () => {
    const config: RdpFinalConfig<any> = {
      customer: {},
      vendor: {}
    };
    const actions: RequiredRdpActionsCollection<any> = {
      customer: { get: undefined },
      vendor: { get: undefined }
    };
    const data = {
      customer: [],
      vendor: {}
    };

    const rs = await loadData(config, data, actions);
    expect(rs).toBeDefined();
  });
});
