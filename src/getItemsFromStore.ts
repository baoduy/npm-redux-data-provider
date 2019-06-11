import {
  DataItem,
  Id,
  IdFunc,
  RdpDataItem,
  RdpStoreItem
} from './RdpDefinition';

import filterByIds from 'redux-toolbelt-immutable-helpers/lib/filterByIds';
import { getIds } from './getIds';

/**
 * @description Get item by Id in Redux Store
 * @template TStore
 * @template T
 * @param {string} name
 * @param {TStore} state
 * @param {(Id | Array<Id>)} [id]
 * @returns {ItemResult}
 */
export const getItemsFromStore = <T extends DataItem>(
  id?: Id | Array<Id> | IdFunc,
  props?: any,
  slot?: RdpStoreItem<T>
): RdpDataItem<T> | undefined => {
  if (!slot) return undefined;

  const finalSlot = Array.isArray(slot) ? slot : slot.data || slot;
  const items = Array.isArray(finalSlot)
    ? finalSlot
    : finalSlot.items || finalSlot;

  const finalId = id && getIds(id, props, slot);
  if (finalId === undefined || finalId === null) return <RdpDataItem<T>>items;

  if (!Array.isArray(items)) return undefined;
  //If Id is Array then return Array of Items
  if (Array.isArray(finalId)) return filterByIds(items, finalId);
  //If Id is value then find and return single object
  const found = filterByIds(items, [finalId]);
  return found && found[0];
};
