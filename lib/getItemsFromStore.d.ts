import { DataItem, Id, IdFunc } from './rdpDefinitions';
/**
 * @description Get item by Id in Redux Store
 * @template TStore
 * @template T
 * @param {string} name
 * @param {TStore} state
 * @param {(Id | Array<Id>)} [id]
 * @returns {ItemResult}
 */
export declare const getItemsFromStore: <T extends DataItem>(id?: string | number | Id[] | IdFunc | undefined, props?: any, slot?: T[] | import("./rdpDefinitions").RdpStoreDataItem<T> | undefined) => import("./rdpDefinitions").RdpSingleData<T, any> | import("./rdpDefinitions").RdpArrayData<T, any> | undefined;
