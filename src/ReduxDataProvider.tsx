import { RdpFinalConfig, RdpProps } from './RdpDefinition';
import { RdpMapDispatchToProps, RdpMapStateToProps } from './RdpMapToProps';

import React from 'react';
import { connect } from 'react-redux';
import { isDisable } from './isDisable';
import isEqual from 'lodash/isEqual';
import loadData from './loadData';
import { render } from 'react-universal-interface';
import { useSafeState } from '@src/useSafeState';

//PLEASE NOT RDP ls already optimized for loading, an data render. Please DO NOT remove any HOOKS usage.

/**
 * @description ReduxDataProvider is a Redux store helper for data extracting from store an calling server actions to reload the data. if it is not existed
 * @author (Set the text for this tag by adding this.authorName to your settings file.)
 * @class ReduxDataProvider
 * @extends {React.PureComponent<RdpProps<TConfig>, RdpState>}
 * @template TConfig
 */
function ReduxDataProvider<TConfig extends RdpFinalConfig<any>>({
  config,
  data,
  disableRdp,
  actions,
  Loading,
  ...rest
}: RdpProps<TConfig>) {
  const disabled = isDisable(disableRdp);
  //Data will be consider is loaded if disable is true.
  const [dataLoaded, setLoaded] = useSafeState(() => disabled);
  const [dataLoading, setLoading] = useSafeState(() => false);
  const [error, setError] = useSafeState<string | string[] | undefined>(() => undefined);

  //Load Data from server for those is not found
  React.useEffect(() => {
    if (dataLoading) return;

    if (dataLoaded) {
      console.info('3a. RDP: data is loaded', config);
      return;
    }

    if (disabled) {
      console.error('3b. RDP: disabled, loadData cancelled ', config);
      return setLoaded(true);
    }

    setLoading(true);
    console.warn('4. RDP: Start Loading Data for', config);

    loadData(config, data, actions)
      .then(rs => {
        console.warn('5. RDP: Data Loaded for', config, rs);
        setLoading(false);
        return setLoaded(true);
      })
      .catch((error: any) => {
        setError(error);
        setLoading(false);
        return setLoaded(true);
      });
  }, [config, data, disabled]);

  console.log('2. RDP: render for: ', { config, data, error, actions });

  if (!dataLoaded && Loading) return typeof Loading === 'string' ? <>{Loading}</> : <Loading />;

  //Only render when it has value.
  return render(rest, error ? { ...data, error, actions } : { ...data, actions });
}

ReduxDataProvider.whyDidYouRender = false;

/**
 * Connect to Redux and export Component as default
 */
const ConnectedRdp = React.memo(
  connect(RdpMapStateToProps, RdpMapDispatchToProps)(ReduxDataProvider),
  (prevProps: any, nextProps: any) => {
    const { render: r1, ...others } = prevProps;
    const { render: r2, ...rests } = nextProps;

    return isEqual(others, rests);
  }
);

export default ConnectedRdp;
