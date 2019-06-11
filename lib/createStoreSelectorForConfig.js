"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreSelectorForConfig = exports.getSlotFromStore = void 0;

var _memoize = _interopRequireDefault(require("lodash/memoize"));

/**
 * @description Get Data Slot in Redux Store by name
 * @template TStore
 * @template T
 * @param {string} name the name of slot
 * @param {TStore} state redux state
 * @returns {Array<T>}
 */
var getSlotFromStore = function getSlotFromStore(name, state) {
  if (!name) throw 'Name cannot be undefined';
  var storeItems = state[name];
  if (!storeItems) return storeItems; //if The slot has data prop then return data out else return slot.

  return storeItems.data ? storeItems.data : storeItems;
};
/**
 * The Store Selector for a config
 * This just select the slot based name of Config there is no filtering happening here.
 * The Store selector should be the same for each config so this func will be memoize
 */


exports.getSlotFromStore = getSlotFromStore;
var createStoreSelectorForConfig = (0, _memoize["default"])(function (config) {
  if (!config) return undefined;
  return function (store) {
    var results = {};
    Object.keys(config).forEach(function (k) {
      var cfg = config[k];
      var result = getSlotFromStore(cfg.name || k, store);
      var tr = cfg.transform && typeof cfg.transform === 'function' ? cfg.transform(result) : result;
      results[k] = tr;
    });
    return results;
  };
});
exports.createStoreSelectorForConfig = createStoreSelectorForConfig;