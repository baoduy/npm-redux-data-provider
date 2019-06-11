"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionsForConfig = void 0;

/**
 * @description Get Actions for config.
 *  If the actions are not provided in config the it will be lookup in allActions based on config property name
 *  const actions = config[k].actions || allActions[`${k}Actions`];
 * @param config the RdpConfig
 * @param allActions all available actions which providing by ErpConnect
 */
var getActionsForConfig = function getActionsForConfig(config, actions) {
  if (!config) return undefined;
  var results = {};
  Object.keys(config).forEach(function (k) {
    results[k] = actions && actions[k] || config[k] && config[k].actions;
    var name = config[k].name;

    if (!results[k] && name) {
      results[k] = actions && actions[name] || config[name] && config[name].actions;
    }
  });
  return results;
};

exports.getActionsForConfig = getActionsForConfig;