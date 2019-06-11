"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RdpMapDispatchToProps = exports.RdpMapStateToProps = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _redux = require("redux");

var _createStoreProviderConfig = require("./createStoreProviderConfig");

var _getConfigFromProps = require("./getConfigFromProps");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

/** If all keys found in data then consider data is provided */
var isDataProvided = function isDataProvided(config, data) {
  if (!config || !data) return false;
  var provided = true;
  Object.keys(config).map(function (k) {
    return provided = provided && data.hasOwnProperty(k);
  });
  return provided;
};

var RdpMapStateToProps = function RdpMapStateToProps(state, props) {
  var config = props.config,
      children = props.children,
      rest = (0, _objectWithoutProperties2["default"])(props, ["config", "children"]); //If there is no config found or Data already provided then do nothing

  if (!config || (0, _isEmpty["default"])(config) || isDataProvided(config, rest)) return {};
  var finalConfig = (0, _getConfigFromProps.getConfigFromProps)(props, state);
  var provider = (0, _createStoreProviderConfig.createStoreProviderConfig)(finalConfig, rest);
  var data = provider && provider(state);
  return {
    data: data,
    config: finalConfig
  };
};

exports.RdpMapStateToProps = RdpMapStateToProps;

var RdpMapDispatchToProps = function RdpMapDispatchToProps(dispatch, props) {
  var config = props.config,
      actions = props.actions,
      mapActionToDispatch = props.mapActionToDispatch;
  if (!config || (0, _isEmpty["default"])(config)) return {};
  if (!(0, _isEmpty["default"])(actions) && !mapActionToDispatch) return {};
  var latestActions = {};
  Object.keys(config).forEach(function (k) {
    var cfg = config[k];
    if (!cfg.actions) return;
    latestActions[k] = (0, _redux.bindActionCreators)(cfg.actions, dispatch);
  });

  if (actions) {
    Object.keys(actions).forEach(function (k) {
      var cfg = actions[k];
      if (!cfg) return;
      latestActions[k] = (0, _redux.bindActionCreators)(cfg, dispatch);
    });
  }

  return {
    actions: latestActions
  };
};

exports.RdpMapDispatchToProps = RdpMapDispatchToProps;