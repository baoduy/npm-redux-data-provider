import { Id, IdFunc } from './rdpDefinitions';
/**
 * @description Load original Id if input is Function.
 * @param {(Id | Array<Id> | IdFunc)} id
 * @param {*} props
 * @returns {(Id | Array<Id>)} Should be Id or Array of Id
 */
export declare const getIds: <T>(id: string | number | Id[] | IdFunc, props?: any, slot?: T[] | import("./rdpDefinitions").RdpStoreDataItem<T> | undefined) => string | number | Id[];
