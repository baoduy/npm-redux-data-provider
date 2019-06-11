import { RdpActionCollection, RdpActions, RdpFinalConfig } from './rdpDefinitions';
/**
 * @description Get Actions for config.
 *  If the actions are not provided in config the it will be lookup in allActions based on config property name
 *  const actions = config[k].actions || allActions[`${k}Actions`];
 * @param config the RdpConfig
 * @param allActions all available actions which providing by ErpConnect
 */
export declare const getActionsForConfig: <TConfig extends RdpFinalConfig<any>>(config: TConfig, actions?: RdpActions<any> | undefined) => RdpActionCollection<TConfig> | undefined;
