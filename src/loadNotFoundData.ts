import {
  Id,
  RdpActionsCollection,
  RdpConfig,
  RdpConfigItem,
  RdpData,
  RequiredRdpActionsCollection
} from './RdpDefinition';

import { validateDataItem } from './validateData';

const cacheLoadData = new Set();

/** Load Not found data of config */
export const loadNotFoundData = async <TConfig extends RdpConfig>(
  config?: TConfig,
  data?: RdpData<TConfig> | undefined,
  actions?:
    | RdpActionsCollection<TConfig>
    | RequiredRdpActionsCollection<TConfig>
) => {
  if (!config || !actions) {
    console.warn('4. loadNotFoundData: There is no config or actions found.', {
      config,
      actions
    });
    return;
  }

  if (cacheLoadData.has(config)) {
    console.error(
      '4. loadNotFoundData: Data is loading action will be ignore.'
    );
    return;
  }

  cacheLoadData.add(config);

  console.warn('4. loadNotFoundData: Start calling API for.', config);

  return Promise.all(
    Object.keys(config).map(k => {
      const dataItem = (data && data[k]) || {};
      const cfg =
        typeof config[k] === 'boolean'
          ? ({} as RdpConfigItem)
          : (config[k] as RdpConfigItem);

      //If data is not loaded or not force then do nothing
      if (!cfg.force && validateDataItem(dataItem, cfg)) return;

      const api = cfg.name ? actions[cfg.name] || actions[k] : actions[k];

      if (!api) {
        console.warn(
          '4. loadNotFoundData: There is no actions found for ',
          k,
          cfg
        );
        return;
      }

      if ((!cfg.id || Array.isArray(cfg.id)) && api.get) {
        console.warn('4.  loadNotFoundData:: calling GET action.', k, {
          id: cfg.id as Array<Id>
        });
        return api.get({ id: cfg.id as Array<Id> });
      }

      if (api.getById) {
        console.warn(
          '4.  loadNotFoundData:: calling GET_BY_ID action.',
          k,
          cfg.id
        );
        return api.getById(cfg.id as Id);
      }

      if (api.get) {
        console.warn('4.  loadNotFoundData:: calling GET action.', k, cfg.id);
        return api.get({ id: [cfg.id as Id] });
      }
    })
  )
    .then(() => cacheLoadData.delete(config))
    .catch(error => {
      cacheLoadData.delete(config);
      throw error;
    });
};
