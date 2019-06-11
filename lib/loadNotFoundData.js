"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadNotFoundData = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _getActionsForConfig = require("./getActionsForConfig");

var _validateData = require("./validateData");

var cacheLoadData = new Set();
/** Load Not found data of config */

var loadNotFoundData =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(props) {
    var config, data, actions, acts;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = props.config, data = props.data, actions = props.actions;

            if (!(!config || !data)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            if (!cacheLoadData.has(config)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            acts = (0, _getActionsForConfig.getActionsForConfig)(config, actions);

            if (acts) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            cacheLoadData.add(config);
            return _context.abrupt("return", Promise.all(Object.keys(config).map(function (k) {
              var cfg = config[k];
              var dataItem = data[k]; //If data is not loaded or not force then do nothing

              if (!cfg.force && (0, _validateData.validateDataItem)(dataItem, cfg)) return;
              var action = acts[k];

              if (!action) {
                return;
              }

              if ((!cfg.id || Array.isArray(cfg.id)) && action.get) return action.get({
                id: cfg.id
              });
              if (action.getById) return action.getById(cfg.id);
              if (action.get) return action.get({
                id: [cfg.id]
              });
            })).then(function () {
              return cacheLoadData["delete"](config);
            })["catch"](function (error) {
              cacheLoadData["delete"](config);
              throw error;
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadNotFoundData(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadNotFoundData = loadNotFoundData;