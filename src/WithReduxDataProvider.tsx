import { RdpActions, RdpConfig } from './RdpDefinition';

import React from 'react';
import ReduxDataProvider from './ReduxDataProvider';

/**
 * The HOC for ReduxDataProvider
 * @param {RdpConfig} config
 */
function WithRdp<TProps = any>(
  config: RdpConfig,
  otherActions?: { [key: string]: RdpActions }
) {
  return (Component: React.ComponentType<TProps>) =>
    React.memo((props: any) => {
      //Get action in Props
      const { actions, children, ...rest } = props;
      /** The actions passing from HOC is always need to be map to Redux store */
      return (
        <ReduxDataProvider
          {...rest}
          actions={otherActions || actions}
          mapActionToDispatch={Boolean(otherActions)}
          config={config}
          render={data => <Component {...rest} {...data} />}
        />
      );
    });
}

export default WithRdp;
