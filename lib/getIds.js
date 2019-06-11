"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIds = void 0;

/**
 * @description Load original Id if input is Function.
 * @param {(Id | Array<Id> | IdFunc)} id
 * @param {*} props
 * @returns {(Id | Array<Id>)} Should be Id or Array of Id
 */
var getIds = function getIds(id, props, slot) {
  return typeof id === 'function' ? id(props, slot) : id;
};

exports.getIds = getIds;