import { RdpConfigStore, RdpFinalConfig } from './RdpDefinition';

import getSlotFromStore from './getSlotFromStore';
import memoize from 'lodash/memoize';

/**
 * The Store Selector for a config
 * This just select the slot based name of Config there is no filtering happening here.
 * The Store selector should be the same for each config so this func will be memoize
 */
export default memoize(
  <TConfig extends RdpFinalConfig>(config: TConfig) => (
    store: any
  ): RdpConfigStore<TConfig> | undefined => {
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
  }
);
