import { MetaDataFunc, RdpStoreItem } from "./RdpDefinition";

import { defaultMetaDataFunc } from "./createConfigProvider";

export default <T>(meta?: boolean | MetaDataFunc, slot?: RdpStoreItem<T>) => {
  if (!meta) return undefined;
  const func = meta === true ? defaultMetaDataFunc : (meta as MetaDataFunc);
  return func(slot);
};
