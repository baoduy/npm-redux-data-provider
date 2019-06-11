import {
  DataItem,
  Id,
  RdpConfig,
  RdpConfigItem,
  RdpData,
  RdpDataItem
} from './rdpDefinitions';

import isEmpty from 'lodash/isEmpty';

export const validateDataItem = <T extends DataItem>(
  dataItem: RdpDataItem<T>,
  configItem: RdpConfigItem
): boolean => {
  //Validate whether dataItem is empty or not
  if (isEmpty(dataItem)) return false;

  //validate the list of Id against data items
  if (Array.isArray(configItem.id)) {
    if (!Array.isArray(dataItem)) return false;

    const listId = <Array<Id>>configItem.id;

    if (listId.find(id => dataItem.findIndex(d => d.id === id) <= 0))
      return false;
  }

  //If it is not empty and custom validation provided then validate with custom rule.
  return configItem.validate ? configItem.validate(dataItem) : true;
};

/**
 * @description Validate Data whether all required of config or not.
 * @template T
 * @param {RdpConfig} config
 * @param {T} data
 * @returns {boolean}
 */
export const validateData = <TConfig extends RdpConfig>(
  data?: RdpData<TConfig>,
  config?: TConfig
): boolean => {
  if (!config) return true;
  if (!data) return false;

  let passed: boolean = true;

  Object.keys(config).forEach(k => {
    const configItem = <RdpConfigItem>config[k];
    //The data item will be passed if satisfy both validation below.
    const dataItem = <RdpDataItem>data[k];

    if (!passed) return;
    passed = configItem.force ? false : validateDataItem(dataItem, configItem);
  });

  return passed;
};
