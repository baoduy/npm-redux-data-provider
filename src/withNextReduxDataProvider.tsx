import { NextComponentType, getDisplayName } from "next/dist/next-server/lib/utils";
import { RdpActionsCollection, RdpConfig, RdpProps } from "./RdpDefinition";

import App from "next/app";
import React from "react";
import ReduxDataProvider from "./ReduxDataProvider";
import { isDisable } from "./isDisable";

declare type ExtraProps = Partial<NextComponentType> & {
  displayName?: string;
};

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
      static displayName = `withNextReduxDataProvider(${getDisplayName(App)})`;

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
