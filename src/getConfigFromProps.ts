import {
  RdpConfig,
  RdpConfigItem,
  RdpFinalConfig,
  RdpProps
} from './rdpDefinition';

import { createStoreSelectorForConfig } from './createStoreSelectorForConfig';
import { getIds } from './getIds';
import memoize from 'lodash/memoize';

/**
 * @description get and consolidate config from props,
 * the config of the same props should be the same
 * @param {RdpProps} props
 * @returns {(RdpConfig | undefined)}
 */
export const getConfigFromProps = memoize(
  <TConfig extends RdpConfig, TStore>(
    props: RdpProps<TConfig>,
    reduxStore?: TStore
  ): RdpFinalConfig<TConfig> | undefined => {
    const { config, ...rest } = props;
    const selector = createStoreSelectorForConfig(config);
    if (!config || !selector) return undefined;

    const configStore = reduxStore && selector(reduxStore);
    const results = {};

    Object.keys(config).forEach(k => {
      const cfg = config[k];

      const item =
        typeof cfg === 'boolean' && cfg
          ? <RdpConfigItem>{}
          : <RdpConfigItem>cfg;

      const slot = configStore && configStore[item.name || k];
      const id = item.id != undefined ? getIds(item.id, rest, slot) : undefined;

      results[k] = { ...item, id };
    });

    return <RdpFinalConfig<TConfig>>results;
  }
);
