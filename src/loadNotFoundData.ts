import { Id, RdpConfigItem, RdpFinalConfig, RdpProps } from './rdpDefinition';

import { getActionsForConfig } from './getActionsForConfig';
import { validateDataItem } from './validateData';

const cacheLoadData = new Set();

/** Load Not found data of config */
export const loadNotFoundData = async <TConfig extends RdpFinalConfig>(
  props: RdpProps<TConfig>
) => {
  const { config, data, actions } = props;

  if (!config || !data) {
    console.warn('4. loadNotFoundData: There is no config or data found.');
    return;
  }

  if (cacheLoadData.has(config)) {
    console.error(
      '4. loadNotFoundData: Data is loading action will be ignore.'
    );
    return;
  }

  const acts = getActionsForConfig(config, actions);
  if (!acts) {
    console.warn(
      '4. loadNotFoundData: There is no actions found for config.',
      config
    );
    return;
  }

  cacheLoadData.add(config);

  console.warn('4. loadNotFoundData: Start calling API for.', config);

  return Promise.all(
    Object.keys(config).map(k => {
      const cfg = <RdpConfigItem>config[k];
      const dataItem = data[k];

      //If data is not loaded or not force then do nothing
      if (!cfg.force && validateDataItem(dataItem, cfg)) return;

      const action = acts[k];

      if (!action) {
        console.warn(
          '4. loadNotFoundData: There is no actions found for ',
          k,
          cfg
        );
        return;
      }

      if ((!cfg.id || Array.isArray(cfg.id)) && action.get)
        return action.get({ id: cfg.id as Array<Id> });

      if (action.getById) return action.getById(cfg.id as Id);
      if (action.get) return action.get({ id: [cfg.id as Id] });
    })
  )
    .then(() => cacheLoadData.delete(config))
    .catch(error => {
      cacheLoadData.delete(config);
      throw error;
    });
};
