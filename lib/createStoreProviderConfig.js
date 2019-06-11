"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStoreProviderConfig = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reselect = require("reselect");

var _createStoreSelectorForConfig = require("./createStoreSelectorForConfig");

var _getItemsFromStore = require("./getItemsFromStore");

var _memoize = _interopRequireDefault(require("lodash/memoize"));

var defaultMetaDataFunc = function defaultMetaDataFunc(slot) {
  if (Array.isArray(slot)) return undefined;
  var finalSlot = slot.data || slot;
  var items = finalSlot.items,
      rest = (0, _objectWithoutProperties2["default"])(finalSlot, ["items"]);
  return rest;
};

var getMetaData = function getMetaData(meta, slot) {
  if (!meta) return undefined;
  var func = meta === true ? defaultMetaDataFunc : meta;
  return typeof func === 'function' ? func(slot) : undefined;
};
/**
 * get Store provider for cconfig,
 * the provider should be the same for a config. so this func will be memoize
 * @param config
 * @param props
 */


var createStoreProviderConfig = (0, _memoize["default"])(function (config, props) {
  var selector = (0, _createStoreSelectorForConfig.createStoreSelectorForConfig)(config);
  if (!selector) return undefined;
  return (0, _reselect.createSelector)([selector], function (store) {
    var results = {};
    Object.keys(config).forEach(function (k) {
      var item = config[k];
      var slot = store[k];
      var rs = (0, _getItemsFromStore.getItemsFromStore)(item.id, props, slot);
      var meta = getMetaData(item.meta, slot);

      if (meta) {
        if (Array.isArray(rs)) rs = (0, _toConsumableArray2["default"])(rs);else rs = (0, _objectSpread2["default"])({}, rs);
        rs.meta = meta;
      }

      results[k] = rs;
    });
    return results;
  });
});
exports.createStoreProviderConfig = createStoreProviderConfig;