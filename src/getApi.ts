import {
  RdpActionsCollection,
  RdpConfig,
  RdpFinalConfig,
  RequiredRdpActionsCollection
} from './RdpDefinition';

export default <TConfig extends RdpConfig>(
  key: string,
  config: RdpFinalConfig<TConfig>,
  actions: RdpActionsCollection<TConfig> | RequiredRdpActionsCollection<TConfig>
) => {
  const cfg = config[key];
  return cfg.name ? actions[key] || actions[cfg.name] : actions[key];
};
