import { RdpActionsCollection, RdpConfig, RdpProps } from './RdpDefinition';

import React from 'react';
import ReduxDataProvider from './ReduxDataProvider';
import { isDisable } from './isDisable';

declare type ExtraProps = {
  displayName?: string;
  getInitialProps: (props: any) => Promise<any>;
};

function getDisplayName<TProps>(Component: React.ComponentType<TProps>) {
  return Component.displayName || Component.name || 'NextComponent';
}

/**
 * The HOC for ReduxDataProvider for NextJs Pages
 * @param {RdpConfig} config
 */
function WithNextRdp<TConfig extends RdpConfig, TProps = any>(
  config?: TConfig,
  globalActions?: RdpActionsCollection<TConfig>
) {
  return (Component: React.ComponentType<TProps> & ExtraProps) =>
    class extends React.Component<TProps & RdpProps<TConfig>> {
      static getInitialProps = Component.getInitialProps;
      static displayName = `withNextReduxDataProvider(${getDisplayName(Component)})`;

      dataRender = (data: any) => {
        const { actions, children, disableRdp, ...rest } = this.props;
        return <Component {...rest} {...data} children={children} />;
      };

      render() {
        //Get action in Props
        const { actions, children, disableRdp, ...rest } = this.props;
        const finalActions = globalActions || actions;

        if (isDisable(disableRdp)) return <Component {...this.props} />;

        //Load Data from Redux Store
        /** The actions passing from HOC is always need to be map to Redux store */
        return (
          <ReduxDataProvider
            {...rest}
            disableRdp={disableRdp}
            actions={finalActions}
            bindActionToDispatch={Boolean(globalActions)}
            config={config}
            render={this.dataRender}
          />
        );
      }
    };
}

export default WithNextRdp;
