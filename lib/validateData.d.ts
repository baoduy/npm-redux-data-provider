import { DataItem, RdpConfig, RdpConfigItem, RdpData, RdpDataItem } from './rdpDefinitions';
export declare const validateDataItem: <T extends DataItem>(dataItem: RdpDataItem<T, any>, configItem: RdpConfigItem) => boolean;
/**
 * @description Validate Data whether all required of config or not.
 * @template T
 * @param {RdpConfig} config
 * @param {T} data
 * @returns {boolean}
 */
export declare const validateData: <TConfig extends RdpConfig>(data?: RdpData<TConfig> | undefined, config?: TConfig | undefined) => boolean;
