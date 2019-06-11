import { DataItem, Id, IdFunc } from './rdpDefinition';
/**
 * @description Get item by Id in Redux Store
 * @template TStore
 * @template T
 * @param {string} name
 * @param {TStore} state
 * @param {(Id | Array<Id>)} [id]
 * @returns {ItemResult}
 */
export declare const getItemsFromStore: <T extends DataItem>(id?: string | number | Id[] | IdFunc | undefined, props?: any, slot?: T[] | import("./rdpDefinition").RdpStoreDataItem<T> | undefined) => import("./rdpDefinition").RdpSingleData<T, any> | import("./rdpDefinition").RdpArrayData<T, any> | undefined;
