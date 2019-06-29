import { Id, IdFunc, RdpStoreItem } from './RdpDefinition';

/**
 * @description Resolve Id .
 * @param {(Id | Array<Id> | IdFunc)} id
 * @param {*} props
 * @returns {(Id | Array<Id>)} Should be Id or Array of Id
 */
export default <T>(
  id: Id | Array<Id> | IdFunc,
  props?: any,
  slot?: RdpStoreItem<T>
): Id | Array<Id> => (typeof id === 'function' ? id(props, slot) : id);
