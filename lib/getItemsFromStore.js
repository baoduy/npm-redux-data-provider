"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemsFromStore = void 0;

var _filterByIds = _interopRequireDefault(require("redux-toolbelt-immutable-helpers/lib/filterByIds"));

var _getIds = require("./getIds");

/**
 * @description Get item by Id in Redux Store
 * @template TStore
 * @template T
 * @param {string} name
 * @param {TStore} state
 * @param {(Id | Array<Id>)} [id]
 * @returns {ItemResult}
 */
var getItemsFromStore = function getItemsFromStore(id, props, slot) {
  if (!slot) return undefined;
  var finalSlot = Array.isArray(slot) ? slot : slot.data || slot;
  var items = Array.isArray(finalSlot) ? finalSlot : finalSlot.items || finalSlot;
  var finalId = id && (0, _getIds.getIds)(id, props, slot);
  if (finalId === undefined || finalId === null) return items;
  if (!Array.isArray(items)) return undefined; //If Id is Array then return Array of Items

  if (Array.isArray(finalId)) return (0, _filterByIds["default"])(items, finalId); //If Id is value then find and return single object

  var found = (0, _filterByIds["default"])(items, [finalId]);
  return found && found[0];
};

exports.getItemsFromStore = getItemsFromStore;