import { AnyAction, Dispatch } from "redux";
import { RdpConfig, RdpProps } from "./RdpDefinition";

import createConfigProvider from "./createConfigProvider";
import getConfigFromProps from "./getConfigFromProps";
import { isDisable } from "./isDisable";
import isEmpty from "lodash/isEmpty";
import mergeActions from "./mergeActions";

/**Get Data From Redux Store */
export const RdpMapStateToProps = <TConfig extends RdpConfig, TStore>(
  state: TStore,
  props: RdpProps<TConfig>
) => {
  const { config, children, ...rest } = props;
  //If there is no config found or Data already provided then do nothing
  if (!config || isEmpty(config)) {
    console.info("1. RDP: Data is Ready no need to get from Redux Store.", config);
    return {};
  }
  const finalConfig = getConfigFromProps(props as any, state);
  console.info("1a. RDP: Get RDP Config ", finalConfig);

  const provider = createConfigProvider(finalConfig as TConfig, rest);
  
  const data = provider && provider(state);
  console.info("1b. RDP: Get Data from Redux", data);

  return { data, config: finalConfig };
};

/** Map Actions to Redux Store */
export const RdpMapDispatchToProps = <TConfig extends RdpConfig>(
  dispatch: Dispatch<AnyAction>,
  { config, actions, disableRdp, bindActionToDispatch }: RdpProps<TConfig>
) => {
  if (isDisable(disableRdp)) return {};

  const latestActions = mergeActions(config, actions, dispatch, bindActionToDispatch);
  return { actions: latestActions };
};
