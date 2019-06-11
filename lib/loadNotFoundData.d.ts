import { RdpFinalConfig, RdpProps } from './rdpDefinition';
/** Load Not found data of config */
export declare const loadNotFoundData: <TConfig extends RdpFinalConfig<any>>(props: RdpProps<TConfig>) => Promise<boolean | undefined>;
