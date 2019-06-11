import { RdpConfigStore, RdpFinalConfig, RdpStoreItem } from './rdpDefinitions';

import memoize from 'lodash/memoize';

/**
 * @description Get Data Slot in Redux Store by name
 * @template TStore
 * @template T
 * @param {string} name the name of slot
 * @param {TStore} state redux state
 * @returns {Array<T>}
 */
export const getSlotFromStore = <TStore, T>(
  name: string,
  state: TStore
): RdpStoreItem<T> => {
  if (!name) throw 'Name cannot be undefined';

  const storeItems = state[name];
  if (!storeItems) return storeItems;

  //if The slot has data prop then return data out else return slot.
  return storeItems.data ? storeItems.data : storeItems;
};

/**
 * The Store Selector for a config
 * This just select the slot based name of Config there is no filtering happening here.
 * The Store selector should be the same for each config so this func will be memoize
 */
export const createStoreSelectorForConfig = memoize(
  <TConfig extends RdpFinalConfig, TStore>(config?: TConfig) => {
    if (!config) return undefined;

    return (store: TStore): RdpConfigStore<TConfig> | undefined => {
      const results = {};

      Object.keys(config).forEach(k => {
        const cfg = config[k];
        const result = getSlotFromStore(cfg.name || k, store);

        const tr =
          cfg.transform && typeof cfg.transform === 'function'
            ? cfg.transform(result)
            : result;

        results[k] = tr;
      });

      return <RdpConfigStore<TConfig>>results;
    };
  }
);
