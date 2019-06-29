import {
  IdFunc,
  RdpProps,
  RdpStoreItem
} from '../../src/redux-data-provider/RdpDefinition';

import getItemsFromStore from '../../src/redux-data-provider/getItemsFromStore';
import getSlotFromStore from '../../src/redux-data-provider/getSlotFromStore';

describe('Test Helper', () => {
  test('Test getItemsFromStore.name with empty slot', () => {
    const result = getItemsFromStore('name', { name: null }, { data: {} });
    expect(result).toBeUndefined();
  });

  test('Test getSlotFromStore', () => {
    const state = {
      customer: {
        data: { items: [{ id: 1, name: 'C123' }, { id: 2, name: 'C123' }] }
      }, //Load vendor 1
      vendor: {
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

    expect(getSlotFromStore('vendor', state)).toMatchObject(state.vendor.data);

    expect(getSlotFromStore('product', state)).toMatchObject(state.product);
  });

  test('Test getSlotFromStore with empty config', () => {
    expect(() => getSlotFromStore('', {})).toThrow();

    expect(getSlotFromStore('name', {})).toBeUndefined();
  });
});
