import * as React from 'react';

import { RdpFinalConfig, RdpProps } from './rdpDefinitions';
import {
  RdpMapDispatchToProps,
  RdpMapStateToProps
} from './rdpMapStateToProps';

import { connect } from 'react-redux';
import { loadNotFoundData } from './loadNotFoundData';
import { render } from 'react-universal-interface';
import { validateData } from './validateData';

/**
 * @description ReduxDataProvider is a Redux store helper for data extracting from store an calling server actions to reload the data. if it is not existed
 * @author (Set the text for this tag by adding this.authorName to your settings file.)
 * @class ReduxDataProvider
 * @extends {React.PureComponent<RdpProps<TConfig>, RdpState>}
 * @template TConfig
 */
function ReduxDataProvider<TConfig extends RdpFinalConfig>({
  config,
  data,
  disabled,
  actions,
  Loading,
  ...rest
}: RdpProps<TConfig>) {
  const [dataLoaded, setLoaded] = React.useState(false);
  const [dataLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | string[] | undefined>();

  //Load Data from server for those is not found
  React.useEffect(() => {
    if (dataLoading) return;

    if (dataLoaded) {
      console.info('3a. RDP: data is loaded', config);
      return setLoaded(true);
    }

    if (disabled) {
      console.error('3b. RDP: disabled, loadData cancelled ', config);
      return setLoaded(true);
    }

    const isValid = validateData(data, config);
    if (isValid) {
      console.info('3c. RDP: Data is valid. No API call ', config);
      return setLoaded(true);
    }

    console.info('3d. RDP: call API for ', config);
    setLoading(true);

    loadNotFoundData({ config, data, actions })
      .then(() => {
        console.warn('5. RDP: Data Loaded for', config);
        return setLoaded(true);
      })
      .catch((error: any) => {
        setError(error);
        return setLoaded(true);
      });
  }, [config, data, disabled, actions]);

  console.log('2. RDP: render for: ', { config, data, error });

  return React.useMemo(() => {
    if (!dataLoaded && Loading)
      return typeof Loading === 'string' ? <>{Loading}</> : <Loading />;

    //Only render when it has value.
    return render(
      rest,
      error ? { ...data, error, actions } : { ...data, actions }
    );
  }, [data, error, dataLoaded]);
}

//ReduxDataProvider.defaultProps = { Loading: 'loading...' };
/**
 * Connect to Redux and export Component as default
 */
export default React.memo(
  connect(
    RdpMapStateToProps,
    RdpMapDispatchToProps
  )(ReduxDataProvider as any)
);
