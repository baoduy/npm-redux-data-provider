import {
  DataItem,
  Id,
  RdpConfig,
  RdpData,
  RdpDataItem,
  RdpFinalConfig,
  RdpFinalConfigItem,
  ValidateResult
} from './RdpDefinition';

import isEmpty from 'lodash/isEmpty';
import memoize from 'lodash/memoize';

export const validateDataItem = <T extends DataItem>(
  dataItem: RdpDataItem<T> | undefined,
  configItem: RdpFinalConfigItem
): true | string => {
  //Validate whether dataItem is empty or not
  if (isEmpty(dataItem)) return 'Data Item is empty.';

  const dataArray = Array.isArray(dataItem) ? dataItem : [dataItem];
  const listId =
    configItem.id && Array.isArray(configItem.id)
      ? (configItem.id as Array<Id>)
      : [configItem.id];

  if (listId) {
    const notFoundId = listId.find(
      id => dataArray.findIndex(d => d.id === id) < 0
    );
    if (notFoundId)
      return `The required Id ${notFoundId} is not found in Data Item.`;
  }

  if (configItem.validate && !configItem.validate(dataItem))
    return 'Data Item is not passed custom validation';

  return true;
};

/**
 * @description Validate Data whether all required of config or not.
 * @template T
 * @param {RdpConfig} config
 * @param {T} data
 * @returns {boolean}
 */
export default memoize(
  <TConfig extends RdpConfig>(
    data: RdpData<TConfig>,
    config: RdpFinalConfig<TConfig>
  ): ValidateResult<TConfig> => {
    if (!config) return true;
    const result = {};

    Object.keys(config).forEach(k => {
      const configItem = <RdpFinalConfigItem>config[k];
      //The data item will be passed if satisfy both validation below.
      const dataItem = data && <RdpDataItem>data[k];

      let error: string | true = true;

      if (configItem.force) error = 'Data invalid because fore load.';
      else error = validateDataItem(dataItem, configItem);

      result[k] = error;
    });

    return result as ValidateResult<TConfig>;
  }
);
