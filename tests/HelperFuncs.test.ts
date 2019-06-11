import {
  IdFunc,
  RdpProps,
  RdpStoreItem
} from '../../src/redux-data-provider/RdpDefinition';

import { getActionsForConfig } from '../../src/redux-data-provider/getActionsForConfig';
import { getConfigFromProps } from '../../src/redux-data-provider/getConfigFromProps';
import { getIds } from '../../src/redux-data-provider/getIds';
import { getItemsFromStore } from '../../src/redux-data-provider/getItemsFromStore';
import { getSlotFromStore } from '../../src/redux-data-provider/createStoreSelectorForConfig';
import { hashFunc } from '../../src/redux-data-provider/hashFunc';

describe('Test Helper', () => {
  test('Test getIds', () => {
    expect(getIds(1, null, null)).toBe(1);
    expect(getIds([1, 2], null, null)).toMatchObject([1, 2]);

    expect(getIds(() => 1, null, null)).toBe(1);
    expect(getIds((p: any) => p.id, { id: [1, 2] }, null)).toMatchObject([
      1,
      2
    ]);

    expect(
      getIds((_p, s: any) => s.id, { id: [1, 2] }, { id: [2, 3] })
    ).toMatchObject([2, 3]);
  });

  test(`Test ${getItemsFromStore.name} with empty slot`, () => {
    const result = getItemsFromStore('name', { name: null }, {});
    expect(result).toBeUndefined();
  });

  test(`Test ${getSlotFromStore.name}`, () => {
    const state = {
      customer: {
        data: { items: [{ id: 1, name: 'C123' }, { id: 2, name: 'C123' }] }
      }, //Load vendor 1
      verndor: {
        data: { items: [{ id: 1, name: 'V123' }, { id: 2, name: 'V123' }] }
      }, //Load product 1,2
      product: [
        { id: 1, name: 'P123' },
        { id: 2, name: 'P123' },
        { id: 3, name: 'P123' }
      ]
    };

    expect(getSlotFromStore('customer', state)).toMatchObject(
      state.customer.data
    );

    expect(getSlotFromStore('verndor', state)).toMatchObject(
      state.verndor.data
    );

    expect(getSlotFromStore('product', state)).toMatchObject(state.product);
  });

  test(`Test ${getSlotFromStore.name} with empty config`, () => {
    expect(() => getSlotFromStore('', {})).toThrow();

    expect(getSlotFromStore('name', {})).toBeUndefined();
  });

  test('Test getConfigFromProps', () => {
    const props: RdpProps<any> = {
      maxDataLoadingCall: 1,
      config: {
        //Load All Customer
        customer: { required: false },
        //Load vendor 1
        verndor: { id: 1 },
        //Load product 1,2
        product: { id: () => [1, 2] }
      }
    };

    const config = getConfigFromProps(props);

    expect(config.customer).toBeDefined();
    expect(config.verndor).toBeDefined();
    expect(config.product).toBeDefined();
  });

  test(`Test ${
    getConfigFromProps.name
  } for the Props twice, they are should be the same`, () => {
    const props: RdpProps<any> = {
      maxDataLoadingCall: 1,
      config: {
        //Load All Customer
        customer: { required: false }, //Load vendor 1
        verndor: { id: 1 }, //Load product 1,2
        product: { id: () => [1, 2] }
      }
    };

    const config1 = getConfigFromProps(props);
    const config2 = getConfigFromProps(props);

    expect(config1).toBe(config2);
  });

  test(`Test ${getConfigFromProps.name} with Store`, () => {
    const func = jest.fn();
    const props: RdpProps<any> = {
      maxDataLoadingCall: 1,
      config: {
        //Load All Customer
        customer: { required: false },
        verndor: { id: 1 },
        product: { id: func }
      }
    }; //Load vendor 1 //Load product 1,2

    const store = {
      customer: { data: {} },
      verndor: null,
      product: { id: 10 }
    }; //Load vendor 1 //Load product 1,2

    const config = getConfigFromProps(props, store);
    expect(config.product).toBeDefined();

    expect(config.customer.id).toBeUndefined();
    expect(config.verndor.id).toBe(1);
    expect(func).toBeCalled();
  });

  test(`Test ${getConfigFromProps.name} with undefined`, () => {
    expect(getConfigFromProps({ maxDataLoadingCall: 1 })).toBeUndefined();

    const config = getConfigFromProps(
      {
        maxDataLoadingCall: 1,
        config: {
          customer: { id: <IdFunc>((p: RdpProps, s: RdpStoreItem) => s) }
        }
      },
      null
    );

    expect(config.customer.id).toBeNull();
  });

  test(`Test ${
    getActionsForConfig.name
  } for the Props twice, they are should be the same`, () => {
    const props: RdpProps<any> = {
      maxDataLoadingCall: 1,
      config: {
        //Load All Customer
        customer: { required: false }, //Load vendor 1
        verndor: { id: 1 }, //Load product 1,2
        product: { id: () => [1, 2] }
      }
    };

    const config = getConfigFromProps(props);
    const actions1 = getActionsForConfig(config, props);
    const actions2 = getActionsForConfig(config, props);

    expect(actions1).toMatchObject(actions2);
  });

  test(`Test ${getActionsForConfig.name} with null config`, () => {
    expect(getActionsForConfig(null, null)).toBeUndefined();
  });

  test(`Test ${getActionsForConfig.name} with allActions`, () => {
    const result = getActionsForConfig(
      { customer: {} },
      {
        actions: {
          customer: {
            get: () => {},
            getById: () => {}
          }
        }
      }
    );

    expect(result.customer.get).toBeInstanceOf(Function);
    expect(result.customer.getById).toBeInstanceOf(Function);
  });

  test('Test HashFunc for the 2 config, they are should be difference', () => {
    const config1 = {
      customer: { id: 1 }
    };

    const config2 = {
      customer: { id: 2 }
    };

    const h1 = hashFunc(config1);
    const h2 = hashFunc(config2);

    expect(h1).not.toBe(h2);
  });
});
