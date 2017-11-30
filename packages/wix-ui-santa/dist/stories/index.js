'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _ToggleSwitch = require('./ToggleSwitch');

var _ToggleSwitch2 = _interopRequireDefault(_ToggleSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Components', module).add('ToggleSwitch', function () {
  return _react2.default.createElement(_ToggleSwitch2.default, null);
});