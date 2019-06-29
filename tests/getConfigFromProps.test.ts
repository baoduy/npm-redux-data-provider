import { RdpProps } from '../src/RdpDefinition';
import getConfigFromProps from '../src/getConfigFromProps';

describe('Test getConfigFromProps', () => {
  test('Test getConfigFromProps for the diff Props, they are should not be the same', () => {
    const props1: RdpProps<any> = {
      config: {
        //Load All Customer
        customer: { required: false }, //Load vendor 1
        vendor: { id: 1 }, //Load product 1,2
        product: { id: () => [1, 2] }
      }
    };

    const props2: RdpProps<any> = {
      config: {
        //Load All Customer
        customer: { required: false },
        vendor: { id: 2 },
        product: { id: () => [1, 2] }
      }
    }; //Load vendor 1 //Load product 1,2

    const config1 = getConfigFromProps(props1);
    const config2 = getConfigFromProps(props2);

    expect(Object.keys(config1).length).toBe(Object.keys(config2).length);

    expect(config1).not.toBe(config2);
    expect(config1).not.toMatchObject(config2);

    expect(config1.vendor.id).toBe(1);
    expect(config2.vendor.id).toBe(2);

    //Get again
    const config3 = getConfigFromProps(props1);
    const config4 = getConfigFromProps(props2);

    expect(config3).not.toBe(config4);

    expect(config1).toBe(config3);
    expect(config2).toBe(config4);
  });

  test('Test getConfigFromProps with MetaData', () => {
    const props: RdpProps<any> = {
      config: {
        customer: { required: false, meta: true }
      }
    };

    const config = getConfigFromProps(props, {
      customer: {
        editId: 1,
        loading: false,
        items: []
      }
    });

    expect(config.customer.meta).toBeDefined();
    expect(typeof config.customer.meta).toBeDefined();
  });
});
