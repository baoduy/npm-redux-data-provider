export const isDisable = (disableRdp?: (() => boolean) | boolean) =>
  typeof disableRdp === 'function' ? disableRdp() : disableRdp === true;
