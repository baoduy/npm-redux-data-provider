import createConfigProvider from '../src/createConfigProvider';

test('Test createConfigProvider', () => {
  const state = {
    customer: {
      data: {
        items: [
          { id: 1, name: 'C123' },
          { id: 2, name: 'C123' }
        ]
      }
    },
    vendor: {
      data: {
        items: [
          { id: 1, name: 'V123' },
          { id: 2, name: 'V123' }
        ]
      }
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
      customer: { meta: () => ({ a: 1, b: 1 }) },
      vendor: { id: 1 },
      product: { id: () => [1, 2], meta: true },
      displayInfo: {}
    }
  }; //Load vendor 1 //Load product 1,2

  const provider = createConfigProvider(props.config, props);
  const result: any = provider(state);

  expect(result.customer).toHaveLength(2);
  expect(result.customer.meta).toBeDefined();

  expect(result.vendor).toBeDefined();

  expect(result.product).toHaveLength(2);
  expect(result.product.meta).toBeUndefined();

  expect(result.displayInfo).toMatchObject(state.displayInfo.data);
});

test('Test createConfigProvider with meta for Object', () => {
  const state = {
    customer: {
      data: {
        editId: 1,
        loading: false,
        items: [
          { id: 1, name: 'C123' },
          { id: 2, name: 'C123' }
        ]
      }
    }
  };

  const props = {
    config: {
      customer: { id: 1, meta: true }
    }
  };

  const provider = createConfigProvider(props.config, props);
  const result: any = provider(state);

  expect(result.customer).toBeDefined();
  expect(result.customer.meta).toBeDefined();

  expect(result.customer.meta.editId).toBe(1);
  expect(result.customer.meta.loading).toBeDefined();
  expect(result.customer.meta.items).toBeUndefined();
});

test('Test createConfigProvider with meta for Array', () => {
  const state = {
    customer: {
      data: {
        editId: 1,
        loading: false,
        items: [
          { id: 1, name: 'C123' },
          { id: 2, name: 'C123' }
        ]
      }
    }
  };

  const props = {
    config: {
      customer: { meta: true }
    }
  };

  const provider = createConfigProvider(props.config, props);
  const result: any = provider(state);

  expect(result.customer).toHaveLength(2);
  expect(result.customer.meta.editId).toBe(1);
  expect(result.customer.meta.loading).toBeDefined();
  expect(result.customer.meta.items).toBeUndefined();
});
