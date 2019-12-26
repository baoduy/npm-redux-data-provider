import { RdpStoreItem } from "./RdpDefinition";

/**
 * @description Get Data Slot in Redux Store by name
 * @template TStore
 * @template T
 * @param {string} name the name of slot
 * @param {TStore} state redux state
 * @returns {Array<T>}
 */
export default <TStore, T>(name: string, state: TStore): RdpStoreItem<T> => {
  if (!name) throw "Name cannot be undefined";
  const storeItems = state[name];
  if (!storeItems) return storeItems;
  //if The slot has data prop then return data out else return slot.
  return storeItems.data ? storeItems.data : storeItems;
};
