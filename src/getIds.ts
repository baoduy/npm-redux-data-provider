import { Id, IdFunc, RdpStoreItem } from './rdpDefinition';

/**
 * @description Load original Id if input is Function.
 * @param {(Id | Array<Id> | IdFunc)} id
 * @param {*} props
 * @returns {(Id | Array<Id>)} Should be Id or Array of Id
 */
export const getIds = <T>(
  id: Id | Array<Id> | IdFunc,
  props?: any,
  slot?: RdpStoreItem<T>
): Id | Array<Id> => (typeof id === 'function' ? id(props, slot) : id);
