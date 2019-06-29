import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** useSafeState will prevent the issue `setState hook inside useEffect can cause unavoidable warning Can't perform a React state update`
 * This hooks only setSate once the component is mounted
 * @see https://github.com/facebook/react/issues/14369
 */
export default function useSafeState<S = undefined>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState(initialState);
  let mounted: boolean = true;

  //Detect unmounted state
  useEffect(
    () => () => {
      mounted = false;
    },
    []
  );

  /**Safe Set state. Check unmounted state before call setValue */
  const safeSetValue = (value: SetStateAction<S>) => {
    if (!mounted) return;
    setValue(value);
  };

  return [value, safeSetValue];
}
