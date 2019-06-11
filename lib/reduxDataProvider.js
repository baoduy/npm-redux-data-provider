"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _rdpMapStateToProps = require("./rdpMapStateToProps");

var _reactRedux = require("react-redux");

var _loadNotFoundData = require("./loadNotFoundData");

var _reactUniversalInterface = require("react-universal-interface");

var _validateData = require("./validateData");

/**
 * @description ReduxDataProvider is a Redux store helper for data extracting from store an calling server actions to reload the data. if it is not existed
 * @author (Set the text for this tag by adding this.authorName to your settings file.)
 * @class ReduxDataProvider
 * @extends {React.PureComponent<RdpProps<TConfig>, RdpState>}
 * @template TConfig
 */
function ReduxDataProvider(_ref) {
  var config = _ref.config,
      data = _ref.data,
      disabled = _ref.disabled,
      actions = _ref.actions,
      Loading = _ref.Loading,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["config", "data", "disabled", "actions", "Loading"]);

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      dataLoaded = _React$useState2[0],
      setLoaded = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      dataLoading = _React$useState4[0],
      setLoading = _React$useState4[1];

  var _React$useState5 = React.useState(),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      error = _React$useState6[0],
      setError = _React$useState6[1]; //Load Data from server for those is not found


  React.useEffect(function () {
    if (dataLoading) return;

    if (dataLoaded) {
      return setLoaded(true);
    }

    if (disabled) {
      return setLoaded(true);
    }

    var isValid = (0, _validateData.validateData)(data, config);

    if (isValid) {
      return setLoaded(true);
    }

    setLoading(true);
    (0, _loadNotFoundData.loadNotFoundData)({
      config: config,
      data: data,
      actions: actions
    }).then(function () {
      return setLoaded(true);
    })["catch"](function (error) {
      setError(error);
      return setLoaded(true);
    });
  }, [config, data, disabled, actions]);
  return React.useMemo(function () {
    if (!dataLoaded && Loading) return typeof Loading === 'string' ? React.createElement(React.Fragment, null, Loading) : React.createElement(Loading, null); //Only render when it has value.

    return (0, _reactUniversalInterface.render)(rest, error ? (0, _objectSpread2["default"])({}, data, {
      error: error,
      actions: actions
    }) : (0, _objectSpread2["default"])({}, data, {
      actions: actions
    }));
  }, [data, error, dataLoaded]);
} //ReduxDataProvider.defaultProps = { Loading: 'loading...' };

/**
 * Connect to Redux and export Component as default
 */


var _default = React.memo((0, _reactRedux.connect)(_rdpMapStateToProps.RdpMapStateToProps, _rdpMapStateToProps.RdpMapDispatchToProps)(ReduxDataProvider));

exports["default"] = _default;