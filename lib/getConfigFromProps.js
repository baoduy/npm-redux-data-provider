"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFromProps = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _createStoreSelectorForConfig = require("./createStoreSelectorForConfig");

var _getIds = require("./getIds");

var _memoize = _interopRequireDefault(require("lodash/memoize"));

/**
 * @description get and consolidate config from props,
 * the config of the same props should be the same
 * @param {RdpProps} props
 * @returns {(RdpConfig | undefined)}
 */
var getConfigFromProps = (0, _memoize["default"])(function (props, reduxStore) {
  var config = props.config,
      rest = (0, _objectWithoutProperties2["default"])(props, ["config"]);
  var selector = (0, _createStoreSelectorForConfig.createStoreSelectorForConfig)(config);
  if (!config || !selector) return undefined;
  var configStore = reduxStore && selector(reduxStore);
  var results = {};
  Object.keys(config).forEach(function (k) {
    var cfg = config[k];
    var item = typeof cfg === 'boolean' && cfg ? {} : cfg;
    var slot = configStore && configStore[item.name || k];
    var id = item.id != undefined ? (0, _getIds.getIds)(item.id, rest, slot) : undefined;
    results[k] = (0, _objectSpread2["default"])({}, item, {
      id: id
    });
  });
  return results;
});
exports.getConfigFromProps = getConfigFromProps;