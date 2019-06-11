import { createStoreProviderConfig } from '../../src/redux-data-provider/createStoreProviderConfig';

test(`Test ${createStoreProviderConfig.name}`, () => {
  const state = {
    customer: {
      data: { items: [{ id: 1, name: 'C123' }, { id: 2, name: 'C123' }] }
    },
    verndor: {
      data: { items: [{ id: 1, name: 'V123' }, { id: 2, name: 'V123' }] }
    },
    product: [
      { id: 1, name: 'P123' },
      { id: 2, name: 'P123' },
      { id: 3, name: 'P123' }
    ],
    displayInfo: {
      data: { A: { id: 1, name: 'D1' }, B: { id: 1, name: 'D2' } }
    }
  }; //Load vendor 1 //Load product 1,2

  const props = {
    config: {
      //Load All Customer
      customer: { metaData: () => ({ a: 1, b: 1 }) },
      verndor: { id: 1 },
      product: { id: () => [1, 2], metaData: true },
      displayInfo: {}
    }
  }; //Load vendor 1 //Load product 1,2

  const provider = createStoreProviderConfig(props.config, props);
  const result = provider(state);

  expect(result.customer).toHaveLength(2);
  expect(result.customer.metaData).toBeDefined();

  expect(result.verndor).toBeDefined();

  expect(result.product).toHaveLength(2);
  expect(result.product.metaData).toBeUndefined();

  expect(result.displayInfo).toMatchObject(state.displayInfo.data);
});

test(`Test ${createStoreProviderConfig.name} with metaData for Object`, () => {
  const state = {
    customer: {
      data: {
        editId: 1,
        loading: false,
        items: [{ id: 1, name: 'C123' }, { id: 2, name: 'C123' }]
      }
    }
  };

  const props = {
    config: {
      customer: { id: 1, metaData: true }
    }
  };

  const provider = createStoreProviderConfig(props.config, props);
  const result = provider(state);

  expect(result.customer).toBeDefined();
  expect(result.customer.metaData).toBeDefined();

  expect(result.customer.metaData.editId).toBe(1);
  expect(result.customer.metaData.loading).toBeDefined();
  expect(result.customer.metaData.items).toBeUndefined();
});

test(`Test ${createStoreProviderConfig.name} with metaData for Array`, () => {
  const state = {
    customer: {
      data: {
        editId: 1,
        loading: false,
        items: [{ id: 1, name: 'C123' }, { id: 2, name: 'C123' }]
      }
    }
  };

  const props = {
    config: {
      customer: { metaData: true }
    }
  };

  const provider = createStoreProviderConfig(props.config, props);
  const result = provider(state);

  expect(result.customer).toHaveLength(2);
  expect(result.customer.metaData.editId).toBe(1);
  expect(result.customer.metaData.loading).toBeDefined();
  expect(result.customer.metaData.items).toBeUndefined();
});

test(`Test ${createStoreProviderConfig.name} with undefined config`, () => {
  const provider = createStoreProviderConfig(null, null);
  expect(provider).not.toBeDefined();
});
