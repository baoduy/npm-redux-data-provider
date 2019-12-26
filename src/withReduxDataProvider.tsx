import { RdpActionsCollection, RdpConfig, RdpProps } from "./RdpDefinition";

import React from "react";
import ReduxDataProvider from "./ReduxDataProvider";
import { isDisable } from "./isDisable";

/**
 * The HOC for ReduxDataProvider
 * @param {RdpConfig} config
 */
function WithRdp<TConfig extends RdpConfig, TProps = any>(
  config?: TConfig,
  globalActions?: RdpActionsCollection<TConfig>
) {
  return (Component: React.ComponentType<TProps>) => (props: TProps & RdpProps<TConfig>) => {
    //Get action in Props
    const { actions, children, disableRdp, ...rest } = props;
    const finalActions = globalActions || actions;

    if (isDisable(disableRdp)) return <Component {...props} />;

    const Render = React.useCallback((data: any) => <Component {...rest} {...data} children={children} />, [
      rest
    ]);

    //Load Data from Redux Store
    /** The actions passing from HOC is always need to be map to Redux store */
    return (
      <ReduxDataProvider
        {...rest}
        disableRdp={disableRdp}
        actions={finalActions}
        bindActionToDispatch={Boolean(globalActions)}
        config={config}
        render={Render}
      />
    );
  };
}

export default WithRdp;
