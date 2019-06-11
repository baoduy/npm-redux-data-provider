import {
  MetaDataFunc,
  RdpConfig,
  RdpConfigItem,
  RdpConfigStore,
  RdpData,
  RdpProps,
  RdpStoreItem
} from './RdpDefinition';

import { createSelector } from 'reselect';
import { createStoreSelectorForConfig } from './createStoreSelectorForConfig';
import { getItemsFromStore } from './getItemsFromStore';
import memoize from 'lodash/memoize';

const defaultMetaDataFunc = <T>(slot: RdpStoreItem<T>) => {
  if (Array.isArray(slot)) return undefined;
  const finalSlot = slot.data || slot;
  const { items, ...rest } = finalSlot;
  return rest;
};

const getMetaData = <T>(
  meta?: boolean | MetaDataFunc,
  slot?: RdpStoreItem<T>
) => {
  if (!meta) return undefined;

  const func = (meta === true ? defaultMetaDataFunc : meta) as MetaDataFunc;
  return typeof func === 'function' ? func(slot) : undefined;
};

/**
 * get Store provider for cconfig,
 * the provider should be the same for a config. so this func will be memoize
 * @param config
 * @param props
 */
export const createStoreProviderConfig = memoize(
  <TConfig extends RdpConfig>(
    config: TConfig,
    props?: RdpProps<TConfig> | undefined
  ) => {
    const selector = createStoreSelectorForConfig(config);
    if (!selector) return undefined;

    return createSelector(
      [selector as any],
      (store: RdpConfigStore<TConfig>): RdpData<TConfig> => {
        const results = {};

        Object.keys(config).forEach(k => {
          const item = <RdpConfigItem>config[k];
          const slot = store[k];

          let rs = getItemsFromStore(item.id, props, slot);
          const meta = getMetaData(item.meta, slot);

          if (meta) {
            if (Array.isArray(rs)) rs = [...rs];
            else rs = { ...rs };
            rs.meta = meta;
          }

          results[k] = rs;
        });
        return <RdpData<TConfig>>results;
      }
    );
  }
);
