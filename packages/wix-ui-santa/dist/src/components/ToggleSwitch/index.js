'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ToggleSwitch = require('wix-ui-core/dist/src/components/ToggleSwitch');

var _ToggleSwitch2 = _interopRequireDefault(_ToggleSwitch);

var _src = require('wix-ui-theme/dist/src');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ToggleSwitch = function ToggleSwitch(_ref) {
  var coreProps = _objectWithoutProperties(_ref, []);

  return _react2.default.createElement(
    _src.ThemedComponent,
    null,
    _react2.default.createElement(_ToggleSwitch2.default, coreProps)
  );
};

ToggleSwitch.propTypes = _extends({}, _ToggleSwitch2.default.propTypes);

exports.default = ToggleSwitch;