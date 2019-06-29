import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { RdpConfig, RequiredRdpActionsCollection } from './RdpDefinition';

import memoize from 'lodash/memoize';

function bindAction<TConfig extends RdpConfig>(
  actions: RequiredRdpActionsCollection<TConfig>,
  dispatch: Dispatch<AnyAction>
): RequiredRdpActionsCollection<TConfig> {
  if (!actions) return actions;

  const finalActions = {};

  Object.keys(actions).forEach((k: string) => {
    finalActions[k] = bindActionCreators(actions[k] as any, dispatch);
  });

  return finalActions as RequiredRdpActionsCollection<TConfig>;
}

export default memoize(bindAction);
