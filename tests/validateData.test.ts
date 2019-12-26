import { RdpFinalConfig } from '../src/RdpDefinition';
import validateData from '../src/validateData';

describe('Test Validation', () => {
  test('Validate data against config All Passed', () => {
    const config: RdpFinalConfig<any> = {
      //Load All Customer
      customer: {}, //Load vendor 1
      vendor: { id: 1 }, //Load product 1,2
      product: { id: [1, 2] }
    };

    const data = {
      //Load All Customer
      customer: [[{ id: 1, name: 'C1' }, { id: 2, name: 'C2' }]],
      vendor: { id: 1, name: 'V123' },
      product: [{ id: 1, name: 'P1' }, { id: 2, name: 'P2' }]
    }; //Load vendor 1 //Load product 1,2

    const result = validateData(data, config) as any;

    expect(result).toMatchObject({
      customer: true,
      vendor: true,
      product: true
    });
  });

  test('Validate data against config customer is empty', () => {
    const config: RdpFinalConfig<any> = {
      //Load All Customer
      customer: {}, //Load vendor 1
      vendor: { id: 1 }, //Load product 1,2
      product: { id: [1, 2] }
    };

    const data = {
      //Load All Customer
      customer: undefined,
      vendor: { id: 1, name: 'V123' },
      product: [{ id: 1, name: 'P1' }, { id: 2, name: 'P2' }]
    }; //Load vendor 1 //Load product 1,2

    const result = validateData(data, config) as any;
    expect(result.customer).toBe('Data Item is empty.');
  });

  test('Test validateData passed custom validation', () => {
    const config: RdpFinalConfig<any> = {
      vendor: { id: 1, validate: v => v.name === 'V123' }
    };

    const data = {
      vendor: { id: 1, name: 'V123' }
    };

    expect(validateData(data, config)).toMatchObject({ vendor: true });
  });

  test('Test validateData NOT passed custom validation', () => {
    const config: RdpFinalConfig<any> = {
      vendor: { id: 1, validate: v => v.name === '111' }
    };

    const data = {
      vendor: { id: 1, name: 'V123' }
    };

    expect(validateData(data, config)).toMatchObject({
      vendor: 'Data Item is not passed custom validation'
    });
  });

  test('Test validateData required id not found', () => {
    const config: RdpFinalConfig<any> = {
      vendor: { id: 1 }
    };

    const data = {
      vendor: { id: 2, name: 'V123' }
    };

    expect(validateData(data, config)).toMatchObject({
      vendor: 'The required Id 1 is not found in Data Item.'
    });
  });
});
