import { RdpConfig, RdpConfigItem, RdpProps } from './rdpDefinitions';

import { bindActionCreators } from 'redux';
import { createStoreProviderConfig } from './createStoreProviderConfig';
import { getConfigFromProps } from './getConfigFromProps';
import isEmpty from 'lodash/isEmpty';

/** If all keys found in data then consider data is provided */
const isDataProvided = (config: RdpConfig, data: Object) => {
  if (!config || !data) return false;
  let provided = true;

  Object.keys(config).map(k => (provided = provided && data.hasOwnProperty(k)));

  return provided;
};

export const RdpMapStateToProps = <TConfig extends RdpConfig, TStore>(
  state: TStore,
  props: RdpProps<TConfig>
) => {
  const { config, children, ...rest } = props;
  //If there is no config found or Data already provided then do nothing
  if (!config || isEmpty(config) || isDataProvided(config, rest)) return {};

  const finalConfig = getConfigFromProps(props as any, state);
  console.info('1a. RDP: Get RDP Config ', finalConfig);

  const provider = createStoreProviderConfig(finalConfig as TConfig, rest);

  const data = provider && provider(state);
  console.info('1b. RDP: Get Data from Redux', data);

  return { data, config: finalConfig };
};

export const RdpMapDispatchToProps = <TConfig extends RdpConfig>(
  dispatch: any,
  props: RdpProps<TConfig>
) => {
  const { config, actions, mapActionToDispatch } = props;
  if (!config || isEmpty(config)) return {};
  if (!isEmpty(actions) && !mapActionToDispatch) return {};

  const latestActions = {};

  Object.keys(config).forEach((k: string) => {
    const cfg = config[k] as RdpConfigItem;
    if (!cfg.actions) return;
    latestActions[k] = bindActionCreators(cfg.actions as any, dispatch);
  });

  if (actions) {
    Object.keys(actions).forEach((k: string) => {
      const cfg = actions[k];
      if (!cfg) return;
      latestActions[k] = bindActionCreators(cfg, dispatch);
    });
  }

  return { actions: latestActions };
};
