import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import {
  RdpActionsCollection,
  RdpConfig,
  RdpConfigItem,
  RequiredRdpActionsCollection
} from './RdpDefinition';

import { bindAction } from './bindAction';

//import memoize from 'lodash/memoize';

/**
 *Merge scenarios:
  - rule 1. If they key of config and global are the same and there is no name provided => overwrite the action in global.
  - rule 2. If the name is provided and there is no key in global has the same key => add to global else => rule 1.
  - rule 3. All the other keys should be merge to the global actions;
 */
function mergeActionsAndBind<TConfig extends RdpConfig>(
  config: TConfig | undefined,
  globalActions: RdpActionsCollection<TConfig> | undefined,
  dispatch?: Dispatch<AnyAction>,
  bindGlobalAction?: boolean
): RequiredRdpActionsCollection<TConfig> {
  if (!config) return globalActions as RequiredRdpActionsCollection<TConfig>;

  console.log('mergeActionsAndBind: ', bindGlobalAction);

  const finalActions: any =
    bindGlobalAction && globalActions
      ? bindAction(globalActions, dispatch)
      : { ...globalActions };

  Object.keys(config).forEach(k => {
    if (typeof config[k] === 'boolean') return;
    const { name, actions } = config[k] as RdpConfigItem;
    if (!actions) return;

    const bindAct = dispatch
      ? bindActionCreators(actions as any, dispatch)
      : actions;
    const hasKeyInGlobal = globalActions && globalActions.hasOwnProperty(k);

    if (hasKeyInGlobal && name) {
      finalActions[name] = bindAct;
    } else finalActions[k] = bindAct;
  });

  return finalActions as RequiredRdpActionsCollection<TConfig>;
}

//export default memoize(mergeActions, (c, a) => ({ c, a }));
export default mergeActionsAndBind;
