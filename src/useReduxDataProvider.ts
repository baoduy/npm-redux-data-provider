import { RdpActionsCollection, RdpConfig, RdpData } from "./RdpDefinition";
import React, { useEffect } from "react";
import { shallowEqual, useSelector, useStore } from "react-redux";

import createConfigProvider from "./createConfigProvider";
import getConfigFromProps from "./getConfigFromProps";
import loadData from "./loadData";
import mergeActions from "./mergeActions";
import { useSafeState } from "@src/hooks/useSafeState";

export function useReduxDataProvider<TConfig extends RdpConfig>(
  config: TConfig,
  actions?: RdpActionsCollection<TConfig>,
  allowLoadData: boolean = true
) {
  const store = useStore();
  const [error, setError] = useSafeState<any>(() => undefined);
  const [loaded, setLoaded] = useSafeState(() => false);
  const [loading, setLoading] = useSafeState(() => false);

  const data: RdpData<any> = useSelector(createConfigProvider(config), shallowEqual);
  const finalConfig: any = React.useMemo(() => getConfigFromProps({ config }, store.getState()), [config]);
  const finalActions = React.useMemo(() => mergeActions(config, actions, store.dispatch, true), [config]);

  useEffect(() => {
    if (loaded || loading || !allowLoadData) return;

    console.info("1. useRDP: call API for ", config);
    setLoading(true);

    loadData(finalConfig, data, finalActions)
      .then(() => {
        console.warn("2. useRDP: Data Loaded for", config);
        setLoading(false);
        setLoaded(true);
      })
      .catch((error: any) => {
        setError(error);
        setLoading(false);
      });
  }, [allowLoadData]);

  return { data, loading, error, actions: finalActions };
}
