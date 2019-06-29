import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import {
  RdpActionsCollection,
  RdpConfig,
  RequiredRdpActionsCollection
} from './RdpDefinition';

export function bindAction<TConfig extends RdpConfig>(
  actions: RdpActionsCollection<TConfig>,
  dispatch?: Dispatch<AnyAction>
): RequiredRdpActionsCollection<TConfig> {
  if (!actions) return actions;

  const finalActions = {};

  Object.keys(actions).forEach((k: string) => {
    const ac = actions[k] as any;
    if (!ac) return;

    finalActions[k] = dispatch
      ? bindActionCreators(actions[k] as any, dispatch)
      : actions[k];
  });

  return finalActions as RequiredRdpActionsCollection<TConfig>;
}
