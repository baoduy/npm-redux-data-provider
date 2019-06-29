import {
  RdpActionsCollection,
  RdpConfig,
  RdpConfigItem,
  RequiredRdpActionsCollection
} from './RdpDefinition';

//import memoize from 'lodash/memoize';

function mergeActions<TConfig extends RdpConfig>(
  config?: TConfig,
  globalActions?: RdpActionsCollection<TConfig>
): RequiredRdpActionsCollection<TConfig> {
  if (!config) return globalActions as RequiredRdpActionsCollection<TConfig>;
  //Merge scenarios:
  //rule 1. If they key of config and global are the same and there is no name provided => overwrite the action in global.
  //rule 2. If the name is provided and there is no key in global has the same key => add to global else => rule 1.
  //rule 3. All the other keys should be merge to the global actions;
  const finalActions = { ...globalActions };

  Object.keys(config).forEach(k => {
    if (typeof config[k] === 'boolean') return;
    const { name, actions } = config[k] as RdpConfigItem;

    if (!actions) return;
    const hasKeyInGlobal = globalActions && globalActions.hasOwnProperty(k);

    if (hasKeyInGlobal && name) {
      finalActions[name] = actions;
    } else finalActions[k] = actions;
  });

  return finalActions as RequiredRdpActionsCollection<TConfig>;
}

//export default memoize(mergeActions, (c, a) => ({ c, a }));
export default mergeActions;
