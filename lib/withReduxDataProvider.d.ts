import { RdpActions, RdpConfig } from './rdpDefinition';
import React from 'react';
/**
 * The HOC for ReduxDataProvider
 * @param {RdpConfig} config
 */
declare function WithRdp<TProps = any>(config: RdpConfig, otherActions?: {
    [key: string]: RdpActions;
}): (Component: React.ComponentType<TProps>) => React.MemoExoticComponent<(props: any) => JSX.Element>;
export default WithRdp;
