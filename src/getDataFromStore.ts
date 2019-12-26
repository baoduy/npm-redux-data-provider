import { RdpConfig } from "./RdpDefinition";
import { Store } from "redux";
import createConfigProvider from "./createConfigProvider";
import getConfigFromProps from "./getConfigFromProps";

type DataConfig<TConfig extends RdpConfig, S> = {
  config: TConfig;
  store: Store<S> | S;
  [key: string]: any;
};

/** This was designed to get date from Store inside getInitialProps of NextJs Page  */
export default <TConfig extends RdpConfig, S = any>({ config, store, ...rest }: DataConfig<TConfig, S>) => {
  const state: S = typeof (store as any).getState === "function" ? (store as any).getState() : store;
  const finalConfig = getConfigFromProps({ config, ...rest }, state);
  const provider = createConfigProvider(finalConfig as TConfig, rest);
  const data = provider && provider(state);
  return data;
};
