import { RdpFinalConfig, RdpProps } from './rdpDefinitions';
/** Load Not found data of config */
export declare const loadNotFoundData: <TConfig extends RdpFinalConfig<any>>(props: RdpProps<TConfig>) => Promise<boolean | undefined>;
