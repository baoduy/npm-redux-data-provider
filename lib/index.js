"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withReduxDataProvider", {
  enumerable: true,
  get: function get() {
    return _withReduxDataProvider["default"];
  }
});
exports["default"] = void 0;

var _reduxDataProvider = _interopRequireDefault(require("./reduxDataProvider"));

var _withReduxDataProvider = _interopRequireDefault(require("./withReduxDataProvider"));

var _default = _reduxDataProvider["default"];
exports["default"] = _default;