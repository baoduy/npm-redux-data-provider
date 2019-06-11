import {
  RdpActionCollection,
  RdpActions,
  RdpFinalConfig
} from './RdpDefinition';

/**
 * @description Get Actions for config.
 *  If the actions are not provided in config the it willbe lookup in allActions based on config property name
 *  const actions = config[k].actions || allActions[`${k}Actions`];
 * @param config the RdpConfig
 * @param allActions all available actions which providing by ErpConnect
 */
export const getActionsForConfig = <TConfig extends RdpFinalConfig<any>>(
  config: TConfig,
  actions?: RdpActions
): RdpActionCollection<TConfig> | undefined => {
  if (!config) return undefined;

  const results = {};

  Object.keys(config).forEach(k => {
    results[k] = (actions && actions[k]) || (config[k] && config[k].actions);

    const { name } = config[k];
    if (!results[k] && name) {
      results[k] =
        (actions && actions[name]) || (config[name] && config[name].actions);
    }
  });

  return <RdpActionCollection<TConfig>>results;
};
