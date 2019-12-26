import { ActionCreator, ActionCreatorsMapObject } from "redux";

import { UniversalProps } from "react-universal-interface";

export declare type Id = number | string;

export declare type DataItem = {
  id: Id;

  [key: string]: any;
};

type MetaItem<TMetaData> = {
  meta?: TMetaData;
};

export declare type RdpSingleData<T extends DataItem = any, TMetaData = any> = T & MetaItem<TMetaData>;

export declare type RdpArrayData<T extends DataItem = any, TMetaData = any> = Array<T> & MetaItem<TMetaData>;

export declare type RdpDataItem<T extends DataItem = any, TMetaData = any> =
  | RdpSingleData<T, TMetaData>
  | RdpArrayData<T, TMetaData>;

export declare type ValidateFunc = <T extends RdpDataItem>(item: T) => boolean;

export declare type MetaDataFunc = <T>(slot?: RdpStoreItem<T>) => any;

export declare type IdFunc = <TConfig extends RdpConfig>(
  props: RdpProps<TConfig>,
  slot?: RdpStoreItem
) => Id | Array<Id>;

export declare interface RdpActions<A = any> extends Partial<ActionCreatorsMapObject<A>> {
  get: ActionCreator<A>;
  getById?: ActionCreator<A>;
  [key: string]: ActionCreator<A> | undefined;
}

export declare type RdpStoreDataItem<T> = {
  data: { items?: Array<T>; [key: string]: any };
};

export declare type RdpStoreItem<T = any> = Array<T> | RdpStoreDataItem<T>;

export declare type RequiredRdpActionsCollection<TConfig extends RdpConfig> = {
  [K in keyof TConfig]: RdpActions;
};

export declare type RdpActionsCollection<TConfig extends RdpConfig> = {
  [K in keyof TConfig]: RdpActions | undefined;
};

export declare type RdpConfigStore<TConfig extends RdpConfig, T = any> = {
  [K in keyof TConfig]: RdpStoreItem<T> | undefined;
};

/**
 * @description The Config item
 *  @id Id or Array of Id of items
 *      a Function with props and state parameters and return an Id or Array of Id.
 *  @name The slot name of redux store. leave it undefined if it is the same name with property.
 *  @actions The get and getById actions, if not provide the action will be pickup from Component props.
 *  @validate The function to validate the data item to see it is match which requirement or not.
 *      If it is not provided the data item will be valid if it is not null or empty.
 *  @meta the function or indicator allow to get other information from redux store. if it is true all info except items will be pickup.
 *  @force force re-load data from Api.
 * @export
 * @interface RdpConfigItem
 */
export declare interface RdpConfigItem {
  /** it can be an Array of Id, an Id or function which return Id from store */
  id?: IdFunc | Id | Array<Id>;
  /** Data transformer from the store */
  transform?: (items: RdpDataItem) => RdpDataItem;
  /** store name. incase the property is difference with store property */
  name?: string;
  /** The actions to load data from API if not found in store. */
  actions?: RdpActions;
  /** Custom validate of the item from the store*/
  validate?: ValidateFunc;
  /** Include meta data. Only work with Redux tool-belt store structure */
  meta?: boolean | MetaDataFunc;
  /** Force load data from API */
  force?: boolean;
}

export declare interface RdpFinalConfigItem extends RdpConfigItem {
  id?: Id | Array<Id>;
}

export declare type RdpFinalConfig<TConfig extends RdpConfig> = {
  [key in keyof TConfig]: RdpFinalConfigItem;
};

export declare type RdpConfig = {
  [key: string]: RdpConfigItem | boolean;
};

/**
 * @description Each RdpData is the result of a RdpConfig so the number of properties should be the same with config.
 * @author (Set the text for this tag by adding authorName to your settings file.)
 * @export
 * @interface RdpData
 * @template TData
 */
export declare type RdpData<TConfig extends RdpConfig> = {
  [K in keyof TConfig]: RdpDataItem;
};

export declare type ValidateResult<TConfig extends RdpConfig> =
  | { [k in keyof TConfig]: boolean | string }
  | true;

/**
 * @description The Data props of ReduxDataProvider which will be passed to the child Component
 * @author (Set the text for this tag by adding authorName to your settings file.)
 * @export
 * @interface RdpDataProps
 */

export declare type RdpDataProps<TConfig extends RdpConfig> = {
  loading?: boolean;
  error?: any;
  actions?: RequiredRdpActionsCollection<TConfig>;
} & { [k in keyof TConfig]: RdpDataItem };

/**
 * @description The props definition of ReduxDataProvider
 * @author (Set the text for this tag by adding authorName to your settings file.)
 * @export
 * @interface RdpProps
 * @extends {UniversalProps<RdpState<TConfig>>}
 * @template TConfig
 */
export declare interface RdpProps<TConfig extends RdpConfig> extends UniversalProps<RdpDataProps<TConfig>> {
  disableRdp?: (() => boolean) | boolean;
  config?: TConfig;
  data?: RdpData<TConfig>;
  actions?: RdpActionsCollection<TConfig>;
  Loading?: React.ComponentType;
  /** Indicate whether should bind action to Dispatch or not. */
  bindActionToDispatch?: boolean;
}
