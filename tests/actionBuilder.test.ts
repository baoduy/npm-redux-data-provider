import { RdpFinalConfig } from '../src/RdpDefinition';
import mergeActions from '../src/mergeActions';

describe('Test mergeActions', () => {
  test('All keys should merge to final actions', () => {
    const config: RdpFinalConfig<any> = {
      a: { actions: { get: jest.fn(), getById: jest.fn() } }
    };
    const global = {
      b: { get: jest.fn(), getById: jest.fn() },
      c: { get: jest.fn(), getById: jest.fn() }
    };

    const final = mergeActions(config, global);
    expect(Object.keys(final).length).toBe(3);
  });

  test('The action in config will overwrite the global action', () => {
    const config: RdpFinalConfig<any> = {
      a: { actions: { get: jest.fn(), getById: jest.fn() } }
    };
    const global = {
      a: { get: jest.fn(), getById: jest.fn() }
    };

    const final: any = mergeActions(config, global);
    expect(final.a).toMatchObject(config.a.actions as any);
  });

  test('The action in config will merge to the global if name provided', () => {
    const config: RdpFinalConfig<any> = {
      a: { name: 'b', actions: { get: jest.fn(), getById: jest.fn() } }
    };
    const global = {
      a: { get: jest.fn(), getById: jest.fn() }
    };

    const final: any = mergeActions(config, global);
    expect(final.b).toMatchObject(config.a.actions as any);
  });
});
