import {
  RdpConfig,
  RdpConfigItem,
  RdpConfigStore,
  RdpData,
  RdpStoreItem
} from './RdpDefinition';

import createConfigSelector from './createConfigSelector';
import { createSelector } from 'reselect';
import getItemsFromStore from './getItemsFromStore';
import getMetaData from './getMetaData';
import memoize from 'lodash/memoize';

export const defaultMetaDataFunc = <T>(slot?: RdpStoreItem<T>) => {
  if (!slot || Array.isArray(slot)) return undefined;
  const finalSlot = slot.data || slot;
  const { items, ...rest } = finalSlot;
  return rest;
};

/**
 * get Store provider for config,
 * the provider should be the same for a config. so this func will be memoize
 * @param config
 * @param props
 */
export default memoize(
  <TConfig extends RdpConfig>(config: TConfig, props?: any) => {
    const selector = createConfigSelector(config);
    if (!selector) return () => ({});

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
