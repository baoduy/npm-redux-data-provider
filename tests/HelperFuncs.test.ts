import { IdFunc, RdpProps, RdpStoreItem } from '../src/rdpDefinitions';

import { getActionsForConfig } from '../src/getActionsForConfig';
import { getConfigFromProps } from '../src/getConfigFromProps';
import { getIds } from '../src/getIds';
import { getItemsFromStore } from '../src/getItemsFromStore';
import { getSlotFromStore } from '../src/createStoreSelectorForConfig';

//import { hashFunc } from '../src/hashFunc';

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
      getIds((_p, s: any) => s.id, { id: [1, 2] }, [1, 2, 3])
    ).toMatchObject([2, 3]);
  });

  test(`Test ${getItemsFromStore.name} with empty slot`, () => {
    const result = getItemsFromStore('name', { name: null }, { data: {} });
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
        customer: {
          get: () => Promise.resolve(),
          getById: (id: any) => Promise.resolve(id)
        }
      }
    );

    expect(result.customer.get).toBeInstanceOf(Function);
    expect(result.customer.getById).toBeInstanceOf(Function);
  });
});
