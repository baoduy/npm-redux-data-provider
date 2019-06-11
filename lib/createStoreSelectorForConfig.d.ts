import { RdpStoreItem } from './rdpDefinition';
/**
 * @description Get Data Slot in Redux Store by name
 * @template TStore
 * @template T
 * @param {string} name the name of slot
 * @param {TStore} state redux state
 * @returns {Array<T>}
 */
export declare const getSlotFromStore: <TStore, T>(name: string, state: TStore) => RdpStoreItem<T>;
/**
 * The Store Selector for a config
 * This just select the slot based name of Config there is no filtering happening here.
 * The Store selector should be the same for each config so this func will be memoize
 */
export declare const createStoreSelectorForConfig: any;
