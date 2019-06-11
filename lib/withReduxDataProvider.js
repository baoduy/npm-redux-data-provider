"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reduxDataProvider = _interopRequireDefault(require("./reduxDataProvider"));

/**
 * The HOC for ReduxDataProvider
 * @param {RdpConfig} config
 */
function WithRdp(config, otherActions) {
  return function (Component) {
    return _react["default"].memo(function (props) {
      //Get action in Props
      var actions = props.actions,
          children = props.children,
          rest = (0, _objectWithoutProperties2["default"])(props, ["actions", "children"]);
      /** The actions passing from HOC is always need to be map to Redux store */

      return _react["default"].createElement(_reduxDataProvider["default"], (0, _extends2["default"])({}, rest, {
        actions: otherActions || actions,
        mapActionToDispatch: Boolean(otherActions),
        config: config,
        render: function render(data) {
          return _react["default"].createElement(Component, (0, _extends2["default"])({}, rest, data));
        }
      }));
    });
  };
}

var _default = WithRdp;
exports["default"] = _default;