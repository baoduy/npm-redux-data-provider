import { RdpActionsCollection, RdpConfig, RdpData } from './RdpDefinition';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import createConfigProvider from './createConfigProvider';
import { loadNotFoundData } from './loadNotFoundData';
import mergeActions from './mergeActions';
import useSafeState from './useSafeState';
import { validateData } from './validateData';

export function useReduxDataProvider<TConfig extends RdpConfig>(
  config: TConfig,
  actions?: RdpActionsCollection<TConfig>
) {
  const [error, setError] = useSafeState<any>(() => undefined);
  const [loaded, setLoaded] = useSafeState(() => false);
  const [loading, setLoading] = useSafeState(() => false);
  const data: RdpData<TConfig> = useSelector(
    createConfigProvider(config),
    shallowEqual
  );
  const finalActions = React.useMemo(() => mergeActions(config, actions), [
    config,
    actions
  ]);

  useEffect(() => {
    if (loaded || loading) return;

    const isValid = validateData(data, config);
    if (isValid) {
      console.info('3c. RDP: Data is valid. No API call ', config);
      return setLoaded(true);
    }

    console.info('3d. RDP: call API for ', config);
    setLoading(true);

    loadNotFoundData(config, data, finalActions)
      .then(() => {
        console.warn('5. RDP: Data Loaded for', config);
        setLoading(false);
        return setLoaded(true);
      })
      .catch((error: any) => {
        setError(error);
        setLoading(false);
        return setLoaded(true);
      });
  }, [config]);

  return { data, loading, error };
}
