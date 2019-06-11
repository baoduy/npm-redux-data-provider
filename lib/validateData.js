"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateData = exports.validateDataItem = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var validateDataItem = function validateDataItem(dataItem, configItem) {
  //Validate whether dataItem is empty or not
  if ((0, _isEmpty["default"])(dataItem)) return false; //validate the list of Id against data items

  if (Array.isArray(configItem.id)) {
    if (!Array.isArray(dataItem)) return false;
    var listId = configItem.id;
    if (listId.find(function (id) {
      return dataItem.findIndex(function (d) {
        return d.id === id;
      }) <= 0;
    })) return false;
  } //If it is not empty and custom validation provided then validate with custom rule.


  return configItem.validate ? configItem.validate(dataItem) : true;
};
/**
 * @description Validate Data whether all required of config or not.
 * @template T
 * @param {RdpConfig} config
 * @param {T} data
 * @returns {boolean}
 */


exports.validateDataItem = validateDataItem;

var validateData = function validateData(data, config) {
  if (!config) return true;
  if (!data) return false;
  var passed = true;
  Object.keys(config).forEach(function (k) {
    var configItem = config[k]; //The data item will be passed if satisfy both validation below.

    var dataItem = data[k];
    if (!passed) return;
    passed = configItem.force ? false : validateDataItem(dataItem, configItem);
  });
  return passed;
};

exports.validateData = validateData;