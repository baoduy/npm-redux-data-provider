import { RdpConfig, RdpProps } from './rdpDefinition';
export declare const RdpMapStateToProps: <TConfig extends RdpConfig, TStore>(state: TStore, props: RdpProps<TConfig>) => {
    data?: undefined;
    config?: undefined;
} | {
    data: any;
    config: any;
};
export declare const RdpMapDispatchToProps: <TConfig extends RdpConfig>(dispatch: any, props: RdpProps<TConfig>) => {
    actions?: undefined;
} | {
    actions: {};
};
