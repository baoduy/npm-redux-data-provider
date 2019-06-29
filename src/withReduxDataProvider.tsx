import { RdpActionsCollection, RdpConfig, RdpData } from './RdpDefinition';

import React from 'react';
import ReduxDataProvider from './ReduxDataProvider';
import { isDisable } from './isDisable';

/**
 * The HOC for ReduxDataProvider
 * @param {RdpConfig} config
 */
function WithRdp<TConfig extends RdpConfig, TProps = any>(
  config: TConfig,
  globalActions?: RdpActionsCollection<TConfig>
) {
  return (Component: React.ComponentType<TProps>) =>
    React.memo((props: any) => {
      //Get action in Props
      const { actions, children, disableRdp, ...rest } = props;

      /** The actions passing from HOC is always need to be map to Redux store */
      if (isDisable(disableRdp))
        return <Component {...rest} actions={actions} />;

      //Load Data from Redux Store
      return (
        <ReduxDataProvider
          {...rest}
          disableRdp={disableRdp}
          actions={globalActions || actions}
          bindActionToDispatch={Boolean(globalActions)}
          config={config}
          render={(data: RdpData<TConfig>) => <Component {...rest} {...data} />}
        />
      );
    });
}

export default WithRdp;
