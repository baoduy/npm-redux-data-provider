import {
  Id,
  RdpActionsCollection,
  RdpConfig,
  RdpData,
  RdpFinalConfig,
  RequiredRdpActionsCollection
} from './RdpDefinition';

import getApi from './getApi';
import validateData from './validateData';

const cacheLoadData = new Set();

/** Load Not found data of config */
export default async <TConfig extends RdpConfig>(
  config?: RdpFinalConfig<TConfig>,
  data?: RdpData<TConfig> | undefined,
  actions?:
    | RdpActionsCollection<TConfig>
    | RequiredRdpActionsCollection<TConfig>
) => {
  if (!config || !actions) {
    console.warn('4. loadData: There is no config or actions found.', {
      config,
      actions
    });
    return Promise.resolve();
  }

  if (cacheLoadData.has(config)) {
    console.error('4. loadData: Data is loading, action will be ignore.');
    return;
  }

  const result = validateData(data || {}, config);
  if (result === true) {
    console.log('4. loadData: Data is valid, no API call.', {
      result,
      config
    });
    return Promise.resolve();
  }

  const invalid = Object.keys(result).filter(k => result[k] !== true);
  if (invalid.length <= 0) {
    console.log('4. loadData: Data is valid, no API call.', {
      result,
      invalid,
      config
    });
    return Promise.resolve();
  }

  cacheLoadData.add(config);
  console.warn('4. loadData: Start calling API for.', {
    invalid,
    data,
    actions,
    config
  });

  return Promise.all(
    invalid.map(k => {
      const cfg = config[k];
      const api = getApi(k, config, actions);

      if (!api) {
        console.warn('4. loadData: There is no actions found for ', k, config);
        return;
      }

      if (!cfg.id) {
        if (api.get) return api.get();
        else if (api.getById) return api.getById();
      }

      if (Array.isArray(cfg.id) && api.get) {
        console.warn('4.  loadData:: calling GET action.', k, {
          id: cfg.id as Array<Id>
        });
        return api.get({ id: cfg.id as Array<Id> });
      } else if (api.getById && cfg.id) {
        console.warn('4.  loadData:: calling GET_BY_ID action.', k, config);
        return api.getById(cfg.id as Id);
      } else if (api.get) {
        console.warn('4.  loadData:: calling GET action.', k, config);
        return api.get();
      }
    })
  )
    .then(rs => {
      cacheLoadData.delete(config);
      return rs;
    })
    .catch(error => {
      cacheLoadData.delete(config);
      throw error;
    });
};
